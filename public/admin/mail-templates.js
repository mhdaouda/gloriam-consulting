/**
 * Modèles campagnes — adaptés des archives HEXAHUB (examples/mails/Archive/)
 * Variables : {{salutation}}, {{nom}}, {{email}}, {{entreprise}}, {{unsubscribe}}
 */
(function (global) {
    'use strict';

    const SITE = 'https://www.gloriam-consulting.com';
    const CALENDLY = 'https://calendly.com/daoudayinde/30min';
    const CONTACT = SITE + '/fr/contact';
    const PROFILE = SITE + '/images/profile-daouda.png';

    function valueBox(title, lines) {
        const items = lines.map((l) => '✓ ' + l).join('<br/>');
        return (
            '<table width="100%" cellpadding="0" cellspacing="0" ' +
            'style="margin:20px 0;background:#0c1220;border-radius:12px;border:1px solid rgba(16,185,129,0.25);">' +
            '<tr><td style="padding:18px;">' +
            '<div style="font-size:13px;font-weight:900;color:#10b981;text-transform:uppercase;">' + title + '</div>' +
            '<div style="margin-top:10px;color:#e8eef4;font-size:14px;line-height:1.8;">' + items + '</div>' +
            '</td></tr></table>'
        );
    }

    function ctaButton(href, label) {
        return (
            '<p style="margin:20px 0 0;"><a href="' + href + '" ' +
            'style="display:inline-block;padding:12px 22px;background:#10b981;color:#fff;font-weight:700;' +
            'text-decoration:none;border-radius:8px;">' + label + '</a></p>'
        );
    }

    function signatureBlock() {
        return (
            '<p style="margin-top:18px;color:#8b9cb3;">Cordialement,</p>' +
            '<table cellpadding="0" cellspacing="0" role="presentation" style="margin-top:20px;border-collapse:collapse;border-left:3px solid #10b981;">' +
            '<tr><td style="vertical-align:top;padding:0 16px 0 14px;width:88px;">' +
            '<img src="' + PROFILE + '" alt="Mohamed Daouda Ayinde" width="72" height="72" ' +
            'style="width:72px;height:72px;border-radius:50%;object-fit:cover;display:block;border:2px solid rgba(16,185,129,0.4);" />' +
            '</td><td style="vertical-align:top;">' +
            '<p style="font-size:15px;font-weight:700;color:#ffffff;margin:0 0 2px;">Mohamed Daouda Ayinde</p>' +
            '<p style="font-size:13px;font-weight:600;color:#10b981;margin:0 0 6px;">Fondateur · Gloriam Consulting</p>' +
            '<p style="font-size:12px;color:#8b9cb3;margin:0 0 8px;line-height:1.4;">Conseil · Stratégie · Europe</p>' +
            '<p style="font-size:12px;color:#8b9cb3;margin:0;line-height:1.5;">' +
            '<a href="mailto:contact@gloriam-consulting.com" style="color:#10b981;text-decoration:none;">contact@gloriam-consulting.com</a><br/>' +
            '<a href="' + SITE + '" style="color:#10b981;text-decoration:none;">www.gloriam-consulting.com</a>' +
            '</p></td></tr></table>'
        );
    }

    function darkShell(tagline, bodyContent, preheader) {
        const pre = preheader
            ? '<div style="display:none;max-height:0;overflow:hidden;opacity:0;">' + preheader + '</div>'
            : '';
        return (
            '<!-- gloriam:no-wrap -->\n<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"/></head>' +
            '<body style="margin:0;padding:0;">' + pre +
            '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" ' +
            'style="margin:0;padding:0;background:#070b12;font-family:Arial,Helvetica,sans-serif;">' +
            '<tr><td align="center" style="padding:30px 14px;">' +
            '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" ' +
            'style="max-width:620px;background:#0f1623;border-radius:16px;overflow:hidden;border:1px solid rgba(16,185,129,0.25);">' +
            '<tr><td style="background:linear-gradient(135deg,#10b981,#059669);padding:26px;text-align:center;">' +
            '<div style="font-size:22px;font-weight:900;color:#ffffff;">Gloriam Consulting</div>' +
            (tagline ? '<div style="margin-top:6px;font-size:13px;color:rgba(255,255,255,0.9);">' + tagline + '</div>' : '') +
            '</td></tr>' +
            '<tr><td style="padding:28px;color:#e8eef4;font-size:15px;line-height:1.7;">' +
            bodyContent +
            '</td></tr>' +
            '<tr><td style="padding:16px 24px;background:#0c1220;border-top:1px solid rgba(16,185,129,0.15);' +
            'font-size:11px;color:#64748b;text-align:center;line-height:1.6;">' +
            'Gloriam Consulting · <a href="' + SITE + '" style="color:#10b981;">gloriam-consulting.com</a> · ' +
            '<a href="{{unsubscribe}}" style="color:#64748b;">Se désinscrire</a>' +
            '</td></tr></table></td></tr></table></body></html>'
        );
    }

    const TEMPLATES = [
        {
            id: 'archive-question-rapide',
            name: '[Archive] Question rapide',
            subject: 'Question rapide',
            preheader: 'Un échange rapide pour voir si nous pouvons vous accompagner.',
            brand_wrap: '0',
            cta_url: CALENDLY,
            cta_label: '📅 Planifier un appel',
            body_html: darkShell(
                'Conseil · Stratégie · Croissance',
                '<p style="color:#ffffff;font-weight:600;margin-top:0;">{{salutation}},</p>' +
                '<p style="color:#8b9cb3;">Je vous contacte car nous accompagnons des structures comme la vôtre dans leur <strong style="color:#e8eef4;">transformation</strong>, leur <strong style="color:#e8eef4;">stratégie commerciale</strong> et leur croissance en Europe.</p>' +
                '<p style="color:#8b9cb3;">Aujourd\'hui, beaucoup d\'entreprises perdent du temps avec des processus peu structurés ou une vision digitale insuffisamment alignée sur leurs objectifs business.</p>' +
                valueBox('Ce que nous mettons en place', [
                    'Conseil stratégique &amp; feuille de route',
                    'Excellence commerciale &amp; développement',
                    'Transformation digitale pragmatique',
                    'Accompagnement opérationnel sur mesure'
                ]) +
                '<p style="color:#8b9cb3;">Seriez-vous ouvert à un échange rapide pour voir si une amélioration est possible dans votre organisation ?</p>' +
                ctaButton(CALENDLY, '📅 Planifier un appel') +
                '<p style="margin-top:18px;color:#8b9cb3;">ou simplement répondre à cet e-mail si vous préférez.</p>' +
                signatureBlock(),
                'Un échange rapide pour voir si nous pouvons vous accompagner.'
            )
        },
        {
            id: 'archive-revenir',
            name: '[Archive] Je me permets de revenir',
            subject: 'Je me permets de revenir vers vous',
            preheader: 'La transformation ou la visibilité de votre activité — est-ce un sujet pour vous ?',
            brand_wrap: '0',
            cta_url: CALENDLY,
            cta_label: '📅 Voir les disponibilités',
            body_html: darkShell(
                '',
                '<p style="color:#ffffff;font-weight:600;margin-top:0;">{{salutation}},</p>' +
                '<p style="color:#8b9cb3;">Je me permets de revenir vers vous suite à mon précédent message.</p>' +
                '<p style="color:#8b9cb3;">Je voulais simplement savoir si la <strong style="color:#e8eef4;">stratégie</strong>, la <strong style="color:#e8eef4;">transformation</strong> ou la <strong style="color:#e8eef4;">croissance</strong> de votre activité est un sujet pour vous en ce moment ?</p>' +
                valueBox('Rappel rapide', [
                    'Conseil stratégique &amp; priorités business',
                    'Excellence commerciale &amp; acquisition clients',
                    'Transformation digitale &amp; processus',
                    'Accompagnement opérationnel en Europe'
                ]) +
                '<p style="color:#8b9cb3;">Si ce n\'est pas une priorité actuellement, je comprends totalement.<br/>Sinon je peux vous proposer un échange rapide de 30 minutes.</p>' +
                ctaButton(CALENDLY, '📅 Voir les disponibilités') +
                signatureBlock(),
                'La transformation de votre activité — est-ce un sujet pour vous ?'
            )
        },
        {
            id: 'archive-suite-message',
            name: '[Archive] Suite à mon message',
            subject: 'Suite à mon message',
            preheader: 'Dernier message — intéressé ou pas intéressé, un simple retour suffit.',
            brand_wrap: '0',
            cta_url: CALENDLY,
            cta_label: '📅 Planifier un échange',
            body_html: darkShell(
                '',
                '<p style="color:#ffffff;font-weight:600;margin-top:0;">{{salutation}},</p>' +
                '<p style="color:#8b9cb3;">Je me permets un dernier message rapide pour ne pas vous déranger inutilement.</p>' +
                '<p style="color:#8b9cb3;">Je n\'ai pas eu de retour de votre part — ce n\'est peut-être pas une priorité pour vous actuellement. Je voulais simplement clôturer proprement mon suivi.</p>' +
                valueBox('Rappel', [
                    'Conseil stratégique &amp; feuille de route',
                    'Excellence commerciale &amp; développement',
                    'Transformation &amp; croissance durable',
                    'Intervention en Europe (FR, BE, DE, CH…)'
                ]) +
                '<p style="color:#8b9cb3;">Pouvez-vous simplement me dire :</p>' +
                '<p style="margin:16px 0;">' +
                '<a href="' + CONTACT + '" style="display:inline-block;margin:4px 8px 4px 0;padding:10px 18px;background:#10b981;color:#fff;font-weight:700;text-decoration:none;border-radius:8px;">✔ Intéressé</a>' +
                '<a href="{{unsubscribe}}" style="display:inline-block;margin:4px 0;padding:10px 18px;background:#1e293b;color:#94a3b8;font-weight:600;text-decoration:none;border-radius:8px;border:1px solid rgba(148,163,184,0.3);">✖ Pas intéressé</a>' +
                '</p>' +
                ctaButton(CALENDLY, '📅 Planifier un échange') +
                '<p style="margin-top:18px;color:#8b9cb3;">Dans tous les cas, merci pour votre temps.</p>' +
                signatureBlock(),
                'Dernier message — un simple retour suffit.'
            )
        },
        {
            id: 'archive-opportunites-en-ligne',
            name: '[Archive] Opportunités en ligne',
            subject: 'Perdez-vous des opportunités en ligne ?',
            preheader: 'Présence digitale & crédibilité — générer plus de demandes qualifiées.',
            brand_wrap: '0',
            cta_url: CONTACT,
            cta_label: '📩 Oui, je suis intéressé',
            body_html: darkShell(
                'Conseil · Digital · Croissance',
                '<p style="color:#ffffff;font-weight:600;margin-top:0;">{{salutation}},</p>' +
                '<p style="color:#8b9cb3;">Je vous contacte car nous aidons des entreprises à <strong style="color:#e8eef4;">générer plus d\'opportunités</strong> grâce à une stratégie commerciale claire et une présence digitale crédible.</p>' +
                '<p style="color:#8b9cb3;">Beaucoup perdent des clients parce qu\'elles ne sont pas assez visibles ou structurées en ligne (site, message, parcours de contact).</p>' +
                valueBox('Ce que nous mettons en place', [
                    'Positionnement &amp; message commercial clair',
                    'Site web professionnel orienté conversion',
                    'Visibilité locale &amp; acquisition',
                    'Processus de demande / devis simplifié'
                ]) +
                '<p style="color:#8b9cb3;">Seriez-vous ouvert à un échange de 30 minutes cette semaine pour voir si cela s\'applique à votre activité ?</p>' +
                ctaButton(CONTACT, '📩 Oui, je suis intéressé') +
                signatureBlock(),
                'Générer plus de demandes grâce à une présence digitale efficace.'
            )
        },
        {
            id: 'archive-visibilite-sectorielle',
            name: '[Archive] Visibilité & croissance',
            subject: 'Votre visibilité et votre croissance',
            preheader: 'Comment améliorer vos demandes clients qualifiées.',
            brand_wrap: '0',
            cta_url: CALENDLY,
            cta_label: '📅 Planifier un échange',
            body_html: darkShell(
                'Visibilité · Stratégie · Acquisition',
                '<p style="color:#ffffff;font-weight:600;margin-top:0;">{{salutation}},</p>' +
                '<p style="color:#8b9cb3;">Dans votre secteur, une grande partie des décisions commence aujourd\'hui par une recherche en ligne et un premier contact digital.</p>' +
                '<p style="color:#8b9cb3;">Sans stratégie commerciale claire et présence adaptée, il est souvent difficile de générer des demandes régulières de prospects qualifiés.</p>' +
                valueBox('Ce que nous mettons en place', [
                    'Audit stratégie &amp; parcours client',
                    'Message &amp; offre mieux positionnés',
                    'Génération de demandes qualifiées',
                    'Optimisation visibilité &amp; crédibilité'
                ]) +
                '<p style="color:#8b9cb3;">Seriez-vous ouvert à un échange rapide pour voir comment améliorer vos résultats commerciaux ?</p>' +
                ctaButton(CALENDLY, '📅 Planifier un échange') +
                signatureBlock(),
                'Améliorer vos demandes clients qualifiées.'
            )
        },
        {
            id: 'remerciement-contact',
            name: 'Remerciement contact',
            subject: 'Merci pour votre message — Gloriam Consulting',
            preheader: 'Nous avons bien reçu votre demande.',
            brand_wrap: '1',
            cta_url: CALENDLY,
            cta_label: 'Réserver un créneau',
            body_html: `<p>{{salutation}},</p>
<p>Merci pour votre intérêt pour <strong>Gloriam Consulting</strong>.</p>
<p>Nous confirmons la bonne réception de votre message. Notre équipe vous répondra <strong>sous 24 à 48 h ouvrées</strong>.</p>
<p><strong>Contact :</strong> {{email}}<br><strong>Organisation :</strong> {{entreprise}}</p>
<p>Cordialement,<br><strong>Mohamed Daouda Ayinde</strong><br>Gloriam Consulting</p>`
        },
        {
            id: 'vierge',
            name: 'Message libre (simple)',
            subject: '',
            preheader: '',
            brand_wrap: '1',
            cta_url: '',
            cta_label: '',
            body_html: `<p>{{salutation}},</p>
<p>Votre message ici…</p>
<p>Cordialement,<br><strong>Gloriam Consulting</strong></p>`
        }
    ];

    function getTemplate(id) {
        return TEMPLATES.find((t) => t.id === id) || null;
    }

    function listTemplates() {
        return TEMPLATES.map(({ id, name }) => ({ id, name }));
    }

    function isFullDocument(html) {
        const h = (html || '').trim().toLowerCase();
        return h.includes('gloriam:no-wrap') || h.startsWith('<!doctype') || h.startsWith('<html');
    }

    function wrapBrandPreview(innerHtml, opts) {
        if (isFullDocument(innerHtml)) {
            return innerHtml.replace(/\{\{unsubscribe\}\}/gi, '#');
        }
        opts = opts || {};
        const preheader = opts.preheader || '';
        const ctaUrl = opts.cta_url || '';
        const ctaLabel = opts.cta_label || 'En savoir plus';

        let ctaBlock = '';
        if (ctaUrl) {
            ctaBlock =
                '<p style="margin:24px 0 0;text-align:center;">' +
                '<a href="' + escAttr(ctaUrl) + '" style="display:inline-block;background:linear-gradient(90deg,#059669,#06b6d4);' +
                'color:#042f2e;font-weight:700;padding:12px 28px;border-radius:999px;text-decoration:none;font-size:15px;">' +
                escHtml(ctaLabel) + '</a></p>';
        }

        const preheaderBlock = preheader
            ? '<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">' +
              escHtml(preheader) + '</div>'
            : '';

        return (
            preheaderBlock +
            '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f8fb;padding:20px 10px;font-family:Arial,sans-serif;">' +
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
            '<a href="#" style="color:#64748b;">Se désinscrire</a> · ' +
            '<a href="' + SITE + '" style="color:#047857;">gloriam-consulting.com</a>' +
            '</td></tr></table></td></tr></table>'
        );
    }

    function escHtml(s) {
        return String(s || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function escAttr(s) {
        return escHtml(s).replace(/'/g, '&#39;');
    }

    function personalizePreview(html) {
        return html
            .replace(/\{\{salutation\}\}/gi, 'Bonjour Sophie')
            .replace(/\{\{name\}\}/gi, 'Sophie Martin')
            .replace(/\{\{nom\}\}/gi, 'Sophie Martin')
            .replace(/\{\{email\}\}/gi, 'sophie@exemple.fr')
            .replace(/\{\{company\}\}/gi, 'Université Paris')
            .replace(/\{\{entreprise\}\}/gi, 'Université Paris')
            .replace(/\{\{unsubscribe\}\}/gi, '#');
    }

    global.GloriamMailTemplates = {
        TEMPLATES,
        getTemplate,
        listTemplates,
        wrapBrandPreview,
        personalizePreview,
        isFullDocument,
        VARIABLES: [
            { key: '{{salutation}}', label: 'Salutation' },
            { key: '{{nom}}', label: 'Nom' },
            { key: '{{email}}', label: 'E-mail' },
            { key: '{{entreprise}}', label: 'Entreprise' },
            { key: '{{unsubscribe}}', label: 'Désinscription' }
        ]
    };
})(typeof window !== 'undefined' ? window : globalThis);
