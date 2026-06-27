/**
 * Gloriam Admin API — Google Sheets + campagnes e-mail + tracking ouvertures
 */
var SHEET_CONTACTS = 'Contacts';
var SHEET_VISITS = 'Visits';
var SHEET_MAIL_CAMPAIGNS = 'MailCampaigns';
var SHEET_MAIL_RECIPIENTS = 'MailRecipients';
var SHEET_UNSUBSCRIBES = 'Unsubscribes';
var MAIL_CAMPAIGN_HEADERS = [
  'id', 'created_at', 'name', 'description', 'subject', 'body_html', 'audience',
  'status', 'total', 'sent', 'failed', 'opens', 'clicks',
  'preheader', 'cta_url', 'cta_label', 'brand_wrap', 'template_id'
];
var TOKEN_TTL = 86400;
var TRACK_GIF = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

function getSpreadsheet_() {
  var id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (id) return SpreadsheetApp.openById(id);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Ajoutez SPREADSHEET_ID dans les propriétés du script.');
  return ss;
}

function setupSheets() {
  var ss = getSpreadsheet_();
  ensureSheet_(ss, SHEET_CONTACTS, [
    'id', 'created_at', 'source', 'name', 'email', 'phone', 'company',
    'subject', 'message', 'location', 'service', 'budget', 'timeline',
    'project_details', 'status'
  ]);
  ensureSheet_(ss, SHEET_VISITS, [
    'id', 'created_at', 'session_id', 'page_path', 'page_title',
    'referrer', 'referrer_channel', 'user_agent', 'language'
  ]);
  ensureSheet_(ss, SHEET_MAIL_CAMPAIGNS, MAIL_CAMPAIGN_HEADERS);
  ensureSheet_(ss, SHEET_MAIL_RECIPIENTS, [
    'id', 'campaign_id', 'email', 'name', 'company', 'status',
    'sent_at', 'opened_at', 'open_count', 'click_count', 'error'
  ]);
  ensureSheet_(ss, SHEET_UNSUBSCRIBES, [
    'email', 'unsubscribed_at', 'source'
  ]);
}

function ensureSheet_(ss, name, headers) {
  var sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
}

function doGet(e) {
  var p = e.parameter || {};
  if (p.action === 'trackOpen' && p.rid) return actionTrackOpen_(p.rid);
  if (p.action === 'unsubscribe' && p.email) return actionUnsubscribePage_(p.email);
  if (p.action === 'version') {
    return jsonResponse_({ ok: true, version: 4, mail: true, templates: true });
  }
  return handleRequest_(e);
}

function doPost(e) {
  return handleRequest_(e);
}

function handleRequest_(e) {
  try {
    var body = {};
    if (e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      body = e.parameter;
    }
    var action = body.action;
    var result;

    switch (action) {
      case 'login': result = actionLogin_(body.password); break;
      case 'contact': result = actionContact_(body); break;
      case 'visit': result = actionVisit_(body); break;
      case 'data': result = actionData_(body.token); break;
      case 'updateStatus': result = actionUpdateStatus_(body.token, body.id, body.status); break;
      case 'logout': result = actionLogout_(body.token); break;
      case 'mailList': result = actionMailList_(body.token); break;
      case 'mailGet': result = actionMailGet_(body.token, body.campaignId); break;
      case 'mailCreate': result = actionMailCreate_(body.token, body); break;
      case 'mailUpdate': result = actionMailUpdate_(body.token, body); break;
      case 'mailDuplicate': result = actionMailDuplicate_(body.token, body.campaignId); break;
      case 'mailSend': result = actionMailSend_(body.token, body.campaignId); break;
      case 'mailDelete': result = actionMailDelete_(body.token, body.campaignId); break;
      case 'mailTest': result = actionMailTest_(body.token, body); break;
      default: result = { error: 'Action inconnue' };
    }
    return jsonResponse_(result);
  } catch (err) {
    return jsonResponse_({ error: String(err.message || err) });
  }
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function actionLogin_(password) {
  var expected = PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
  if (!expected) return { error: 'ADMIN_PASSWORD non défini' };
  if (!password || password !== expected) return { error: 'Mot de passe incorrect' };
  var token = Utilities.getUuid();
  CacheService.getScriptCache().put('tok_' + token, '1', TOKEN_TTL);
  return { ok: true, token: token };
}

function isValidToken_(token) {
  return token && CacheService.getScriptCache().get('tok_' + token) === '1';
}

function actionLogout_(token) {
  if (token) CacheService.getScriptCache().remove('tok_' + token);
  return { ok: true };
}

function actionContact_(body) {
  var spamError = validateContactSpam_(body);
  if (spamError) return { error: spamError };

  var sh = getSpreadsheet_().getSheetByName(SHEET_CONTACTS);
  if (!sh) setupSheets();
  sh = getSpreadsheet_().getSheetByName(SHEET_CONTACTS);
  var id = Utilities.getUuid();
  sh.appendRow([
    id, new Date().toISOString(),
    sanitize_(body.source, 20) || 'form',
    sanitize_(body.name, 200), sanitize_(body.email, 200),
    sanitize_(body.phone, 50), sanitize_(body.company, 300),
    sanitize_(body.subject, 300), sanitize_(body.message, 8000),
    sanitize_(body.location, 200), sanitize_(body.service, 80),
    sanitize_(body.budget, 40), sanitize_(body.timeline, 40),
    sanitize_(body.project_details, 8000), 'nouveau'
  ]);

  markContactCooldown_(sanitize_(body.email, 200).trim().toLowerCase());

  try {
    notifyContactSubmission_(body);
  } catch (e) {
    Logger.log('notifyContactSubmission_: ' + e);
  }

  return { ok: true, id: id };
}

function actionVisit_(body) {
  var sh = getSpreadsheet_().getSheetByName(SHEET_VISITS);
  if (!sh) setupSheets();
  sh = getSpreadsheet_().getSheetByName(SHEET_VISITS);
  sh.appendRow([
    Utilities.getUuid(), new Date().toISOString(),
    sanitize_(body.session_id, 80), sanitize_(body.page_path, 500),
    sanitize_(body.page_title, 300), sanitize_(body.referrer, 500),
    sanitize_(body.referrer_channel, 40), sanitize_(body.user_agent, 500),
    sanitize_(body.language, 20)
  ]);
  return { ok: true };
}

function actionData_(token) {
  if (!isValidToken_(token)) return { error: 'Session expirée — reconnectez-vous' };
  return {
    ok: true,
    contacts: readSheetAsObjects_(SHEET_CONTACTS),
    visits: readSheetAsObjects_(SHEET_VISITS),
    mailCampaigns: readSheetAsObjects_(SHEET_MAIL_CAMPAIGNS)
  };
}

function actionUpdateStatus_(token, id, status) {
  if (!isValidToken_(token)) return { error: 'Session expirée' };
  var allowed = { nouveau: 1, lu: 1, traite: 1, archive: 1 };
  if (!allowed[status]) return { error: 'Statut invalide' };
  return updateRowById_(SHEET_CONTACTS, 'id', id, { status: status });
}

function actionMailList_(token) {
  if (!isValidToken_(token)) return { error: 'Session expirée' };
  ensureMailSheets_();
  var campaigns = readSheetAsObjects_(SHEET_MAIL_CAMPAIGNS);
  return { ok: true, campaigns: campaigns };
}

function actionMailGet_(token, campaignId) {
  if (!isValidToken_(token)) return { error: 'Session expirée' };
  var campaign = findById_(SHEET_MAIL_CAMPAIGNS, 'id', campaignId);
  if (!campaign) return { error: 'Campagne introuvable' };
  var recipients = readSheetAsObjects_(SHEET_MAIL_RECIPIENTS).filter(function (r) {
    return String(r.campaign_id) === String(campaignId);
  });
  return { ok: true, campaign: campaign, recipients: recipients };
}

function actionMailCreate_(token, body) {
  if (!isValidToken_(token)) return { error: 'Session expirée' };
  ensureMailSheets_();

  var name = sanitize_(body.name, 200) || 'Campagne sans titre';
  var subject = sanitize_(body.subject, 200);
  var bodyHtml = sanitize_(body.body_html, 80000);
  var audience = sanitize_(body.audience, 30) || 'all';
  var description = sanitize_(body.description, 500);
  var preheader = sanitize_(body.preheader, 300);
  var ctaUrl = sanitize_(body.cta_url, 500);
  var ctaLabel = sanitize_(body.cta_label, 120) || 'En savoir plus';
  var brandWrap = body.brand_wrap === false || body.brand_wrap === '0' ? '0' : '1';
  var templateId = sanitize_(body.template_id, 80);

  if (!subject || !bodyHtml) return { error: 'Sujet et message requis' };

  var contacts = readSheetAsObjects_(SHEET_CONTACTS);
  var recipients = filterCampaignRecipients_(contacts, audience);
  if (!recipients.length) return { error: 'Aucun destinataire pour cette sélection (vérifiez les désinscriptions)' };

  var campaignId = Utilities.getUuid();
  var shC = getSpreadsheet_().getSheetByName(SHEET_MAIL_CAMPAIGNS);
  shC.appendRow([
    campaignId, new Date().toISOString(), name, description, subject, bodyHtml, audience,
    'draft', recipients.length, 0, 0, 0, 0,
    preheader, ctaUrl, ctaLabel, brandWrap, templateId
  ]);

  var shR = getSpreadsheet_().getSheetByName(SHEET_MAIL_RECIPIENTS);
  for (var i = 0; i < recipients.length; i++) {
    shR.appendRow([
      Utilities.getUuid(), campaignId, recipients[i].email, recipients[i].name,
      recipients[i].company, 'pending', '', '', 0, 0, ''
    ]);
  }

  return { ok: true, campaignId: campaignId, total: recipients.length };
}

function actionMailUpdate_(token, body) {
  if (!isValidToken_(token)) return { error: 'Session expirée' };
  var campaignId = body.campaignId;
  var campaign = findById_(SHEET_MAIL_CAMPAIGNS, 'id', campaignId);
  if (!campaign) return { error: 'Campagne introuvable' };
  if (campaign.status !== 'draft') return { error: 'Seuls les brouillons sont modifiables' };

  var patch = {};
  if (body.name != null) patch.name = sanitize_(body.name, 200);
  if (body.description != null) patch.description = sanitize_(body.description, 500);
  if (body.subject != null) patch.subject = sanitize_(body.subject, 200);
  if (body.body_html != null) patch.body_html = sanitize_(body.body_html, 80000);
  if (body.preheader != null) patch.preheader = sanitize_(body.preheader, 300);
  if (body.cta_url != null) patch.cta_url = sanitize_(body.cta_url, 500);
  if (body.cta_label != null) patch.cta_label = sanitize_(body.cta_label, 120);
  if (body.brand_wrap != null) {
    patch.brand_wrap = body.brand_wrap === false || body.brand_wrap === '0' ? '0' : '1';
  }
  if (body.template_id != null) patch.template_id = sanitize_(body.template_id, 80);

  if (!Object.keys(patch).length) return { error: 'Aucune modification' };
  updateRowById_(SHEET_MAIL_CAMPAIGNS, 'id', campaignId, patch);
  return { ok: true, campaignId: campaignId };
}

function actionMailDuplicate_(token, campaignId) {
  if (!isValidToken_(token)) return { error: 'Session expirée' };
  var campaign = findById_(SHEET_MAIL_CAMPAIGNS, 'id', campaignId);
  if (!campaign) return { error: 'Campagne introuvable' };

  return actionMailCreate_(token, {
    name: (campaign.name || 'Campagne') + ' (copie)',
    description: campaign.description || '',
    subject: campaign.subject,
    body_html: campaign.body_html,
    audience: campaign.audience || 'all',
    preheader: campaign.preheader || '',
    cta_url: campaign.cta_url || '',
    cta_label: campaign.cta_label || '',
    brand_wrap: campaign.brand_wrap !== '0' ? '1' : '0',
    template_id: campaign.template_id || ''
  });
}

function actionMailSend_(token, campaignId) {
  if (!isValidToken_(token)) return { error: 'Session expirée' };
  var campaign = findById_(SHEET_MAIL_CAMPAIGNS, 'id', campaignId);
  if (!campaign) return { error: 'Campagne introuvable' };

  var webAppUrl = getWebAppUrl_();
  if (!webAppUrl) return { error: 'URL Web App introuvable — redéployez le script' };

  updateRowById_(SHEET_MAIL_CAMPAIGNS, 'id', campaignId, { status: 'sending' });

  var recipients = readSheetAsObjects_(SHEET_MAIL_RECIPIENTS).filter(function (r) {
    return String(r.campaign_id) === String(campaignId) && r.status === 'pending';
  });

  var fromName = PropertiesService.getScriptProperties().getProperty('MAIL_FROM_NAME') || 'Gloriam Consulting';
  var sent = parseInt(campaign.sent, 10) || 0;
  var failed = parseInt(campaign.failed, 10) || 0;
  var meta = campaignMeta_(campaign);

  for (var i = 0; i < recipients.length; i++) {
    var r = recipients[i];
    try {
      var subject = personalizeCampaign_(campaign.subject || '', r);
      var html = buildCampaignHtml_(campaign.body_html, r, webAppUrl, meta);
      MailApp.sendEmail({
        to: r.email,
        subject: subject,
        htmlBody: html,
        name: fromName
      });
      updateRowById_(SHEET_MAIL_RECIPIENTS, 'id', r.id, {
        status: 'sent',
        sent_at: new Date().toISOString(),
        error: ''
      });
      sent++;
    } catch (err) {
      updateRowById_(SHEET_MAIL_RECIPIENTS, 'id', r.id, {
        status: 'failed',
        error: String(err.message || err).slice(0, 300)
      });
      failed++;
    }
    Utilities.sleep(350);
  }

  var stats = computeCampaignStats_(campaignId);
  updateRowById_(SHEET_MAIL_CAMPAIGNS, 'id', campaignId, {
    status: 'completed',
    sent: stats.sent,
    failed: stats.failed,
    opens: stats.opens,
    clicks: stats.clicks
  });

  return { ok: true, sent: sent, failed: failed, opens: stats.opens, total: campaign.total };
}

function actionMailTest_(token, body) {
  if (!isValidToken_(token)) return { error: 'Session expirée' };
  var subject = sanitize_(body.subject, 200);
  var bodyHtml = sanitize_(body.body_html, 80000);
  if (!subject || !bodyHtml) return { error: 'Sujet et message requis' };

  var testEmail = PropertiesService.getScriptProperties().getProperty('CAMPAIGN_TEST_EMAIL');
  if (!testEmail) testEmail = Session.getActiveUser().getEmail();
  if (!testEmail) return { error: 'CAMPAIGN_TEST_EMAIL manquant' };

  var webAppUrl = getWebAppUrl_();
  var fake = { id: 'test', email: testEmail, name: 'Test', company: 'Démo', project: 'création de site vitrine' };
  var meta = campaignMeta_(body);
  var html = buildCampaignHtml_(bodyHtml, fake, webAppUrl, meta);

  MailApp.sendEmail({
    to: testEmail,
    subject: '[TEST] ' + subject,
    htmlBody: html,
    name: PropertiesService.getScriptProperties().getProperty('MAIL_FROM_NAME') || 'Portfolio'
  });
  return { ok: true, test: true };
}

function actionMailDelete_(token, campaignId) {
  if (!isValidToken_(token)) return { error: 'Session expirée' };
  deleteRowsByField_(SHEET_MAIL_RECIPIENTS, 'campaign_id', campaignId);
  deleteRowsByField_(SHEET_MAIL_CAMPAIGNS, 'id', campaignId);
  return { ok: true };
}

function actionTrackOpen_(rid) {
  ensureMailSheets_();
  var row = findById_(SHEET_MAIL_RECIPIENTS, 'id', rid);
  if (row) {
    var openCount = (parseInt(row.open_count, 10) || 0) + 1;
    var patch = { open_count: openCount };
    if (!row.opened_at) patch.opened_at = new Date().toISOString();
    if (row.status !== 'opened') patch.status = 'opened';
    updateRowById_(SHEET_MAIL_RECIPIENTS, 'id', rid, patch);
    refreshCampaignOpenCount_(row.campaign_id);
  }
  return ContentService.createTextOutput(Utilities.base64Decode(TRACK_GIF))
    .setMimeType(ContentService.MimeType.GIF);
}

function buildCampaignHtml_(template, recipient, webAppUrl, meta) {
  meta = meta || {};
  var html = personalizeCampaign_(template, recipient);
  if (webAppUrl && recipient.email) {
    var unsubUrl = webAppUrl + '?action=unsubscribe&email=' + encodeURIComponent(recipient.email);
    html = html.replace(/\{\{unsubscribe\}\}/gi, unsubUrl);
  }
  html = textToHtmlIfNeeded_(html);

  var useBrand = meta.brand_wrap !== false && meta.brand_wrap !== '0';
  var isFullDoc = html.indexOf('<html') >= 0 || html.indexOf('<!-- gloriam:no-wrap -->') >= 0;
  if (useBrand && !isFullDoc) {
    html = wrapInGloriamTemplate_(html, recipient, webAppUrl, meta);
  }

  var pixel = '<img src="' + webAppUrl + '?action=trackOpen&rid=' + encodeURIComponent(recipient.id) +
    '" width="1" height="1" alt="" style="display:block;width:1px;height:1px;border:0;" />';
  if (html.indexOf('</body>') >= 0) {
    return html.replace('</body>', pixel + '</body>');
  }
  return html + pixel;
}

function campaignMeta_(campaign) {
  return {
    preheader: campaign.preheader || '',
    cta_url: campaign.cta_url || '',
    cta_label: campaign.cta_label || 'En savoir plus',
    brand_wrap: campaign.brand_wrap
  };
}

function wrapInGloriamTemplate_(innerHtml, recipient, webAppUrl, meta) {
  var siteUrl = PropertiesService.getScriptProperties().getProperty('SITE_URL') || 'https://www.gloriam-consulting.com';
  var unsubUrl = webAppUrl + '?action=unsubscribe&email=' + encodeURIComponent(recipient.email || '');
  var preheader = meta.preheader || '';
  var ctaUrl = meta.cta_url || '';
  var ctaLabel = meta.cta_label || 'En savoir plus';

  var ctaBlock = '';
  if (ctaUrl) {
    ctaBlock = '<p style="margin:24px 0 0;text-align:center;">' +
      '<a href="' + escapeHtml_(ctaUrl) + '" style="display:inline-block;background:linear-gradient(90deg,#059669,#06b6d4);' +
      'color:#042f2e;font-weight:700;padding:12px 28px;border-radius:999px;text-decoration:none;font-size:15px;">' +
      escapeHtml_(ctaLabel) + '</a></p>';
  }

  var preheaderBlock = preheader
    ? '<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">' +
      escapeHtml_(preheader) + '</div>'
    : '';

  return '<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">' +
    '</head><body style="margin:0;padding:0;background:#f4f8fb;font-family:Arial,sans-serif;">' +
    preheaderBlock +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f8fb;padding:20px 10px;">' +
    '<tr><td align="center">' +
    '<table role="presentation" width="600" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #dce5e0;">' +
    '<tr><td style="background:linear-gradient(90deg,#047857,#10b981);padding:20px 24px;color:#ffffff;">' +
    '<p style="margin:0;font-size:20px;font-weight:700;">Gloriam Consulting</p>' +
    '<p style="margin:6px 0 0;font-size:13px;opacity:0.95;">Conseil · Stratégie · Croissance</p>' +
    '</td></tr>' +
    '<tr><td style="padding:24px;color:#0f172a;font-size:15px;line-height:1.65;">' +
    innerHtml + ctaBlock +
    '</td></tr>' +
    '<tr><td style="padding:14px 24px;background:#eef4f2;color:#64748b;font-size:12px;line-height:1.6;">' +
    'Gloriam Consulting · contact@gloriam-consulting.com<br>' +
    '<a href="' + unsubUrl + '" style="color:#64748b;">Se désinscrire</a> · ' +
    '<a href="' + siteUrl + '" style="color:#047857;">gloriam-consulting.com</a>' +
    '</td></tr></table></td></tr></table></body></html>';
}

function actionUnsubscribePage_(email) {
  var clean = String(email || '').trim().toLowerCase();
  if (!clean || clean.indexOf('@') < 1) {
    return HtmlService.createHtmlOutput('<p>Adresse e-mail invalide.</p>');
  }
  recordUnsubscribe_(clean, 'link');
  var siteUrl = PropertiesService.getScriptProperties().getProperty('SITE_URL') || 'https://www.gloriam-consulting.com';
  return HtmlService.createHtmlOutput(
    '<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">' +
    '<title>Désinscription — Gloriam Consulting</title></head>' +
    '<body style="font-family:Arial,sans-serif;background:#f4f8fb;padding:40px 16px;text-align:center;">' +
    '<div style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;padding:32px;border:1px solid #dce5e0;">' +
    '<h1 style="color:#047857;font-size:22px;">Désinscription confirmée</h1>' +
    '<p style="color:#334155;line-height:1.6;">L\'adresse <strong>' + escapeHtml_(clean) + '</strong> ne recevra plus nos campagnes e-mail.</p>' +
    '<p style="margin-top:24px;"><a href="' + siteUrl + '" style="color:#047857;">Retour au site Gloriam</a></p>' +
    '</div></body></html>'
  ).setTitle('Désinscription confirmée');
}

function recordUnsubscribe_(email, source) {
  ensureMailSheets_();
  if (isUnsubscribed_(email)) return;
  var sh = getSpreadsheet_().getSheetByName(SHEET_UNSUBSCRIBES);
  sh.appendRow([email, new Date().toISOString(), source || 'link']);
}

function isUnsubscribed_(email) {
  var clean = String(email || '').trim().toLowerCase();
  if (!clean) return false;
  var rows = readSheetAsObjects_(SHEET_UNSUBSCRIBES);
  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i].email || '').trim().toLowerCase() === clean) return true;
  }
  return false;
}

function getUnsubscribedSet_() {
  var set = {};
  var rows = readSheetAsObjects_(SHEET_UNSUBSCRIBES);
  for (var i = 0; i < rows.length; i++) {
    var e = String(rows[i].email || '').trim().toLowerCase();
    if (e) set[e] = true;
  }
  return set;
}

function getWebAppUrl_() {
  try {
    return ScriptApp.getService().getUrl();
  } catch (e) {
    return PropertiesService.getScriptProperties().getProperty('WEB_APP_URL') || '';
  }
}

function computeCampaignStats_(campaignId) {
  var rows = readSheetAsObjects_(SHEET_MAIL_RECIPIENTS).filter(function (r) {
    return String(r.campaign_id) === String(campaignId);
  });
  var sent = 0, failed = 0, opens = 0, clicks = 0;
  for (var i = 0; i < rows.length; i++) {
    if (rows[i].status === 'sent' || rows[i].status === 'opened') sent++;
    if (rows[i].status === 'failed') failed++;
    if (parseInt(rows[i].open_count, 10) > 0) opens++;
    clicks += parseInt(rows[i].click_count, 10) || 0;
  }
  return { sent: sent, failed: failed, opens: opens, clicks: clicks };
}

function refreshCampaignOpenCount_(campaignId) {
  var stats = computeCampaignStats_(campaignId);
  updateRowById_(SHEET_MAIL_CAMPAIGNS, 'id', campaignId, { opens: stats.opens });
}

function ensureMailSheets_() {
  var ss = getSpreadsheet_();
  if (!ss.getSheetByName(SHEET_MAIL_CAMPAIGNS)) setupSheets();
  migrateSheetHeaders_(SHEET_MAIL_CAMPAIGNS, MAIL_CAMPAIGN_HEADERS);
  if (!ss.getSheetByName(SHEET_UNSUBSCRIBES)) {
    ensureSheet_(ss, SHEET_UNSUBSCRIBES, ['email', 'unsubscribed_at', 'source']);
  }
}

function migrateSheetHeaders_(sheetName, expectedHeaders) {
  var sh = getSpreadsheet_().getSheetByName(sheetName);
  if (!sh || sh.getLastRow() === 0) return;
  var lastCol = Math.max(sh.getLastColumn(), 1);
  var current = sh.getRange(1, 1, 1, lastCol).getValues()[0];
  for (var i = 0; i < expectedHeaders.length; i++) {
    if (current.indexOf(expectedHeaders[i]) < 0) {
      sh.getRange(1, current.length + 1).setValue(expectedHeaders[i]);
      sh.getRange(1, current.length + 1).setFontWeight('bold');
      current.push(expectedHeaders[i]);
    }
  }
}

function filterCampaignRecipients_(contacts, audience) {
  var seen = {};
  var unsub = getUnsubscribedSet_();
  var list = [];
  for (var i = 0; i < contacts.length; i++) {
    var c = contacts[i];
    var email = String(c.email || '').trim().toLowerCase();
    if (!email || email.indexOf('@') < 1) continue;
    if (unsub[email]) continue;
    if (audience === 'nouveau' && c.status !== 'nouveau') continue;
    if (audience === 'form' && c.source !== 'form') continue;
    if (audience === 'chatbot' && c.source !== 'chatbot') continue;
    if (seen[email]) continue;
    seen[email] = true;
    list.push({
      name: c.name || '',
      email: email,
      company: c.company || '',
      project: summarizeProject_(c.project_details || c.message || '')
    });
  }
  return list;
}

function summarizeProject_(text) {
  var t = String(text || '').replace(/\s+/g, ' ').trim();
  if (!t) return '';
  return t.length > 120 ? t.slice(0, 117) + '…' : t;
}

function personalizeCampaign_(template, contact) {
  var salutation = contact.name ? ('Bonjour ' + contact.name) : 'Bonjour';
  var projet = contact.project || contact.project_details || contact.company || 'votre projet';
  return template
    .replace(/\{\{salutation\}\}/gi, salutation)
    .replace(/\{\{name\}\}/gi, contact.name || '')
    .replace(/\{\{nom\}\}/gi, contact.name || '')
    .replace(/\{\{email\}\}/gi, contact.email || '')
    .replace(/\{\{company\}\}/gi, contact.company || '')
    .replace(/\{\{entreprise\}\}/gi, contact.company || '')
    .replace(/\{\{projet\}\}/gi, projet);
}

function textToHtmlIfNeeded_(text) {
  if (text.indexOf('<') >= 0 && text.indexOf('>') >= 0) return text;
  return text.split('\n').map(function (line) {
    return '<p style="margin:0 0 12px">' + escapeHtml_(line) + '</p>';
  }).join('');
}

function escapeHtml_(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function findById_(sheetName, idField, id) {
  var rows = readSheetAsObjects_(sheetName);
  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i][idField]) === String(id)) return rows[i];
  }
  return null;
}

function updateRowById_(sheetName, idField, id, patch) {
  var sh = getSpreadsheet_().getSheetByName(sheetName);
  var data = sh.getDataRange().getValues();
  var headers = data[0];
  var idCol = headers.indexOf(idField);
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][idCol]) === String(id)) {
      for (var key in patch) {
        var col = headers.indexOf(key);
        if (col >= 0) sh.getRange(i + 1, col + 1).setValue(patch[key]);
      }
      return { ok: true };
    }
  }
  return { error: 'Ligne introuvable' };
}

function deleteRowsByField_(sheetName, field, value) {
  var sh = getSpreadsheet_().getSheetByName(sheetName);
  var data = sh.getDataRange().getValues();
  if (data.length < 2) return;
  var headers = data[0];
  var col = headers.indexOf(field);
  for (var i = data.length - 1; i >= 1; i--) {
    if (String(data[i][col]) === String(value)) sh.deleteRow(i + 1);
  }
}

function readSheetAsObjects_(sheetName) {
  var sh = getSpreadsheet_().getSheetByName(sheetName);
  if (!sh || sh.getLastRow() < 2) return [];
  var values = sh.getDataRange().getValues();
  var headers = values[0];
  var rows = [];
  for (var i = 1; i < values.length; i++) {
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = values[i][j] != null ? String(values[i][j]) : '';
    }
    rows.push(obj);
  }
  rows.sort(function (a, b) {
    return new Date(b.created_at || 0) - new Date(a.created_at || 0);
  });
  return rows;
}

function sanitize_(val, maxLen) {
  if (val == null) return '';
  var s = String(val).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
  return s.length > maxLen ? s.substring(0, maxLen) : s;
}

function validateContactSpam_(body) {
  var hp = sanitize_(body.hp_field, 200);
  if (hp) return 'Soumission refusée';

  var source = sanitize_(body.source, 20) || 'form';
  var formTs = parseInt(body.form_ts, 10);
  if (source !== 'chatbot' && formTs && (Date.now() - formTs) < 4000) {
    return 'Soumission trop rapide';
  }

  var email = sanitize_(body.email, 200).trim().toLowerCase();
  var message = sanitize_(body.message, 8000).trim();
  var name = sanitize_(body.name, 200).trim();
  var subject = sanitize_(body.subject, 300).trim();

  if (!name || !email || !message) return 'Champs requis manquants';
  if (source !== 'chatbot' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return 'Email invalide';
  }
  if (message.length < 10) return 'Message trop court';

  var blob = (name + ' ' + subject + ' ' + message).toLowerCase();
  var urlCount = (blob.match(/https?:\/\/|www\./g) || []).length;
  if (urlCount > 4) return 'Trop de liens dans le message';

  var spamWords = ['viagra', 'cialis', 'casino', 'lottery', 'crypto pump', 'buy followers', '<script'];
  for (var i = 0; i < spamWords.length; i++) {
    if (blob.indexOf(spamWords[i]) >= 0) return 'Contenu suspect détecté';
  }

  if (source !== 'chatbot' && !verifyTurnstile_(body.turnstile_token)) {
    return 'Vérification anti-spam échouée';
  }

  if (source !== 'chatbot') {
    var globalErr = checkGlobalContactRateLimit_();
    if (globalErr) return globalErr;

    var cooldownErr = checkContactCooldown_(email);
    if (cooldownErr) return cooldownErr;

    var clientId = sanitize_(body.client_id, 80);
    if (clientId) {
      var clientErr = checkContactRateLimitByClient_(clientId);
      if (clientErr) return clientErr;
    }

    var rateErr = checkContactRateLimit_(email);
    if (rateErr) return rateErr;
  }

  var dupErr = checkContactDuplicate_(email, message);
  if (dupErr) return dupErr;

  return '';
}

function verifyTurnstile_(token) {
  var secret = PropertiesService.getScriptProperties().getProperty('TURNSTILE_SECRET_KEY');
  if (!secret) return true;
  if (!token) return false;
  try {
    var resp = UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'post',
      muteHttpExceptions: true,
      payload: {
        secret: secret,
        response: String(token)
      }
    });
    var data = JSON.parse(resp.getContentText());
    return data.success === true;
  } catch (e) {
    return false;
  }
}

function checkContactRateLimit_(email) {
  var cache = CacheService.getScriptCache();
  var key = 'rl_' + Utilities.base64EncodeWebSafe(email).slice(0, 48);
  var count = parseInt(cache.get(key) || '0', 10);
  if (count >= 3) return 'Trop de messages — réessayez dans une heure';
  cache.put(key, String(count + 1), 3600);
  return '';
}

function checkContactRateLimitByClient_(clientId) {
  var cache = CacheService.getScriptCache();
  var key = 'rlc_' + Utilities.base64EncodeWebSafe(clientId).slice(0, 48);
  var count = parseInt(cache.get(key) || '0', 10);
  if (count >= 4) return 'Trop de messages — réessayez dans une heure';
  cache.put(key, String(count + 1), 3600);
  return '';
}

function checkGlobalContactRateLimit_() {
  var cache = CacheService.getScriptCache();
  var key = 'rl_global_contacts';
  var count = parseInt(cache.get(key) || '0', 10);
  if (count >= 40) return 'Service temporairement saturé — réessayez plus tard';
  cache.put(key, String(count + 1), 3600);
  return '';
}

function checkContactCooldown_(email) {
  if (!email) return '';
  var cache = CacheService.getScriptCache();
  var key = 'cd_' + Utilities.base64EncodeWebSafe(email).slice(0, 48);
  if (cache.get(key)) return 'Attendez 90 secondes avant un nouvel envoi';
  return '';
}

function markContactCooldown_(email) {
  if (!email) return;
  var cache = CacheService.getScriptCache();
  var key = 'cd_' + Utilities.base64EncodeWebSafe(email).slice(0, 48);
  cache.put(key, '1', 90);
}

function notifyContactSubmission_(body) {
  var to = PropertiesService.getScriptProperties().getProperty('CONTACT_NOTIFY_EMAIL')
    || 'contact@gloriam-consulting.com';
  var name = sanitize_(body.name, 200);
  var email = sanitize_(body.email, 200);
  var subject = sanitize_(body.subject, 300) || 'Nouveau message — site Gloriam';
  var message = sanitize_(body.message, 8000);
  var source = sanitize_(body.source, 20) || 'form';
  var html = [
    '<p><strong>Nouveau message</strong> (' + source + ')</p>',
    '<p><strong>Nom :</strong> ' + escapeHtml_(name) + '</p>',
    '<p><strong>Email :</strong> ' + escapeHtml_(email) + '</p>',
    '<p><strong>Objet :</strong> ' + escapeHtml_(subject) + '</p>',
    '<hr>',
    '<pre style="white-space:pre-wrap;font-family:sans-serif">' + escapeHtml_(message) + '</pre>'
  ].join('');
  MailApp.sendEmail({
    to: to,
    subject: '[Gloriam] ' + subject,
    htmlBody: html,
    replyTo: email,
    name: PropertiesService.getScriptProperties().getProperty('MAIL_FROM_NAME') || 'Gloriam Consulting'
  });
}

function escapeHtml_(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function checkContactDuplicate_(email, message) {
  var cache = CacheService.getScriptCache();
  var digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    email + '|' + message.slice(0, 240)
  );
  var key = 'dup_' + Utilities.base64EncodeWebSafe(digest).slice(0, 48);
  if (cache.get(key)) return 'Message déjà envoyé récemment';
  cache.put(key, '1', 600);
  return '';
}
