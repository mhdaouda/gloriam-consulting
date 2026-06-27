/**
 * Module campagnes e-mail — style HEXAHUB + suivi ouvertures
 */
(function () {
    'use strict';

    const $ = (s) => document.querySelector(s);
    const $$ = (s) => document.querySelectorAll(s);
    let campaigns = [];
    let contacts = [];
    let currentCampaign = null;
    let currentRecipients = [];
    let recipientFilter = 'all';
    let previewMode = 'brand';
    let editingCampaignId = null;

    function esc(s) {
        if (window.GloriamAPI?.escapeHtml) return GloriamAPI.escapeHtml(s);
        if (!s) return '';
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function formatDate(iso) {
        if (!iso) return '—';
        return new Date(iso).toLocaleString('fr-FR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    }

    function statusLabel(st) {
        const map = {
            draft: 'Brouillon',
            sending: 'En cours',
            completed: 'Terminée',
            pending: 'En attente',
            sent: 'Envoyé',
            opened: 'Ouvert',
            failed: 'Échec'
        };
        return map[st] || st;
    }

    function formatApiError(error) {
        const msg = error || 'Erreur serveur';
        if (msg === 'Action inconnue') {
            return 'Script Google obsolète : recopiez admin/google-apps-script/GloriamAPI.gs, exécutez setupSheets, puis Déployer → Gérer les déploiements → Nouvelle version.';
        }
        return msg;
    }

    function countAudience(audience) {
        const seen = new Set();
        return contacts.filter((c) => {
            const email = (c.email || '').trim().toLowerCase();
            if (!email.includes('@')) return false;
            if (audience === 'nouveau' && c.status !== 'nouveau') return false;
            if (audience === 'form' && c.source !== 'form') return false;
            if (audience === 'chatbot' && c.source !== 'chatbot') return false;
            if (seen.has(email)) return false;
            seen.add(email);
            return true;
        }).length;
    }

    function personalizePreview(html) {
        if (window.GloriamMailTemplates?.personalizePreview) {
            return GloriamMailTemplates.personalizePreview(html);
        }
        return html
            .replace(/\{\{salutation\}\}/gi, 'Bonjour Sophie')
            .replace(/\{\{name\}\}/gi, 'Sophie Martin')
            .replace(/\{\{nom\}\}/gi, 'Sophie Martin')
            .replace(/\{\{email\}\}/gi, 'sophie@exemple.fr')
            .replace(/\{\{company\}\}/gi, 'Université Paris')
            .replace(/\{\{entreprise\}\}/gi, 'Université Paris');
    }

    function getPreviewMeta() {
        return {
            preheader: $('#mail-preheader')?.value.trim() || '',
            cta_url: $('#mail-cta-url')?.value.trim() || '',
            cta_label: $('#mail-cta-label')?.value.trim() || 'En savoir plus',
            brand_wrap: $('#mail-brand-wrap')?.checked !== false
        };
    }

    function renderBodyPreview(body) {
        const html = personalizePreview(body);
        if (body.includes('<')) return html;
        return html.split('\n').map((l) => `<p>${esc(l)}</p>`).join('');
    }

    function updatePreview() {
        const body = $('#mail-body')?.value || '';
        const box = $('#mail-preview');
        if (!box) return;
        if (!body.trim()) {
            box.textContent = 'Saisissez un message pour voir l\'aperçu.';
            return;
        }
        if (window.GloriamMailTemplates?.isFullDocument?.(body)) {
            box.innerHTML = personalizePreview(body);
            return;
        }
        const inner = renderBodyPreview(body);
        const meta = getPreviewMeta();
        if (previewMode === 'brand' && meta.brand_wrap && window.GloriamMailTemplates?.wrapBrandPreview) {
            box.innerHTML = GloriamMailTemplates.wrapBrandPreview(inner, meta);
        } else {
            box.innerHTML = inner;
        }
    }

    function renderDetailPreview(campaign) {
        const card = $('#detail-preview-card');
        const box = $('#detail-preview');
        if (!card || !box || !campaign?.body_html) return;
        card.classList.remove('mail-hidden');
        const body = campaign.body_html;
        if (window.GloriamMailTemplates?.isFullDocument?.(body)) {
            box.innerHTML = personalizePreview(body);
            return;
        }
        const inner = renderBodyPreview(body);
        const meta = {
            preheader: campaign.preheader || '',
            cta_url: campaign.cta_url || '',
            cta_label: campaign.cta_label || 'En savoir plus',
            brand_wrap: campaign.brand_wrap !== '0'
        };
        if (meta.brand_wrap && window.GloriamMailTemplates?.wrapBrandPreview) {
            box.innerHTML = GloriamMailTemplates.wrapBrandPreview(inner, meta);
        } else {
            box.innerHTML = inner;
        }
    }

    function initTemplateSelect() {
        const sel = $('#mail-template');
        if (!sel || !window.GloriamMailTemplates) return;
        GloriamMailTemplates.TEMPLATES.forEach((t) => {
            const opt = document.createElement('option');
            opt.value = t.id;
            opt.textContent = t.name;
            sel.appendChild(opt);
        });
    }

    function initVariableChips() {
        const wrap = $('#mail-var-chips');
        const ta = $('#mail-body');
        if (!wrap || !ta || !window.GloriamMailTemplates) return;
        wrap.innerHTML = GloriamMailTemplates.VARIABLES.map((v) =>
            `<button type="button" class="mail-var-chip" data-var="${esc(v.key)}">${esc(v.label)}</button>`
        ).join('');
        wrap.querySelectorAll('.mail-var-chip').forEach((btn) => {
            btn.addEventListener('click', () => {
                const key = btn.dataset.var;
                const start = ta.selectionStart;
                const end = ta.selectionEnd;
                const val = ta.value;
                ta.value = val.slice(0, start) + key + val.slice(end);
                ta.focus();
                ta.selectionStart = ta.selectionEnd = start + key.length;
                updatePreview();
            });
        });
    }

    function applyTemplate(id) {
        if (!id || !window.GloriamMailTemplates) return;
        const t = GloriamMailTemplates.getTemplate(id);
        if (!t) return;
        if ($('#mail-subject') && t.subject) $('#mail-subject').value = t.subject;
        if ($('#mail-preheader') && t.preheader) $('#mail-preheader').value = t.preheader;
        if ($('#mail-cta-url') && t.cta_url) $('#mail-cta-url').value = t.cta_url;
        if ($('#mail-cta-label') && t.cta_label) $('#mail-cta-label').value = t.cta_label;
        if ($('#mail-body') && t.body_html) $('#mail-body').value = t.body_html;
        if ($('#mail-brand-wrap')) {
            $('#mail-brand-wrap').checked = t.brand_wrap !== '0' && t.brand_wrap !== false;
        }
        updatePreview();
    }

    function collectFormPayload() {
        return {
            name: $('#mail-name').value.trim(),
            description: $('#mail-description').value.trim(),
            subject: $('#mail-subject').value.trim(),
            body_html: $('#mail-body').value.trim(),
            audience: $('#mail-audience').value,
            preheader: $('#mail-preheader')?.value.trim() || '',
            cta_url: $('#mail-cta-url')?.value.trim() || '',
            cta_label: $('#mail-cta-label')?.value.trim() || 'En savoir plus',
            brand_wrap: $('#mail-brand-wrap')?.checked !== false ? '1' : '0',
            template_id: $('#mail-template')?.value || ''
        };
    }

    function fillFormFromCampaign(c) {
        $('#mail-name').value = c.name || '';
        $('#mail-description').value = c.description || '';
        $('#mail-subject').value = c.subject || '';
        $('#mail-preheader').value = c.preheader || '';
        $('#mail-cta-url').value = c.cta_url || '';
        $('#mail-cta-label').value = c.cta_label || '';
        $('#mail-body').value = c.body_html || '';
        $('#mail-audience').value = c.audience || 'all';
        if ($('#mail-brand-wrap')) $('#mail-brand-wrap').checked = c.brand_wrap !== '0';
        if ($('#mail-template') && c.template_id) $('#mail-template').value = c.template_id;
        $('#mail-new-count').textContent = `${countAudience($('#mail-audience').value)} destinataire(s)`;
        updatePreview();
    }

    function resetCreateForm() {
        editingCampaignId = null;
        $('#mail-create-form')?.reset();
        if ($('#mail-brand-wrap')) $('#mail-brand-wrap').checked = true;
        if ($('#mail-template')) $('#mail-template').value = '';
        $('#mail-new-count').textContent = `${countAudience('all')} destinataire(s)`;
        updatePreview();
    }

    async function loadContacts() {
        const res = await GloriamAPI.fetchDashboard();
        if (res.ok) contacts = res.contacts || [];
    }

    async function loadCampaigns() {
        const res = await GloriamAPI.mailList();
        if (!res.ok) {
            alert(formatApiError(res.error));
            campaigns = [];
            return;
        }
        campaigns = res.campaigns || [];
    }

    function renderList() {
        const el = $('#mail-campaigns-list');
        const count = $('#mail-list-count');
        if (count) count.textContent = `${campaigns.length} campagne(s)`;
        if (!el) return;

        if (!campaigns.length) {
            el.innerHTML = '<p style="padding:1.5rem;color:#64748b">Aucune campagne. Créez-en une pour commencer.</p>';
            return;
        }

        el.innerHTML = campaigns.map((c) => {
            const sent = parseInt(c.sent, 10) || 0;
            const failed = parseInt(c.failed, 10) || 0;
            const opens = parseInt(c.opens, 10) || 0;
            const total = parseInt(c.total, 10) || 0;
            const st = statusLabel(c.status);
            return `
            <div class="mail-list-item">
                <div>
                    <h3>${esc(c.name || c.subject)}</h3>
                    <p class="mail-desc">${esc(c.description || c.subject)}</p>
                    <p class="mail-list-meta">
                        <strong>${st}</strong>
                        · ${sent} envoyés
                        ${failed ? `<span class="mail-fail"> · ${failed} échecs</span>` : ''}
                        · <span class="mail-open">${opens} ouverts</span>
                        / ${total} destinataires
                    </p>
                </div>
                <div class="mail-list-actions">
                    <a href="#detail=${encodeURIComponent(c.id)}" class="mail-btn mail-btn--ghost">Ouvrir</a>
                    <button type="button" class="mail-btn mail-btn--danger" data-delete="${esc(c.id)}">Supprimer</button>
                </div>
            </div>`;
        }).join('');

        el.querySelectorAll('[data-delete]').forEach((btn) => {
            btn.addEventListener('click', async () => {
                if (!confirm('Supprimer cette campagne ?')) return;
                const res = await GloriamAPI.mailDelete(btn.dataset.delete);
                if (!res.ok) alert(formatApiError(res.error));
                else { await loadCampaigns(); renderList(); }
            });
        });
    }

    async function openDetail(id) {
        const res = await GloriamAPI.mailGet(id);
        if (!res.ok) {
            alert(formatApiError(res.error));
            location.hash = 'list';
            return;
        }
        currentCampaign = res.campaign;
        currentRecipients = res.recipients || [];
        renderDetail();
        showView('detail');
    }

    function renderDetail() {
        const c = currentCampaign;
        $('#detail-title').textContent = c.name || c.subject;
        const pct = c.total > 0 ? Math.round((parseInt(c.sent, 10) / parseInt(c.total, 10)) * 100) : 0;
        $('#detail-status').textContent = `${statusLabel(c.status)} — ${pct}% traités`;

        const sent = parseInt(c.sent, 10) || 0;
        const failed = parseInt(c.failed, 10) || 0;
        const opens = parseInt(c.opens, 10) || 0;
        const pending = currentRecipients.filter((r) => r.status === 'pending').length;

        $('#detail-stats').innerHTML = `
            <div class="mail-stat"><div class="label">Total</div><div class="value">${c.total}</div></div>
            <div class="mail-stat"><div class="label">En attente</div><div class="value">${pending}</div></div>
            <div class="mail-stat"><div class="label">Envoyés</div><div class="value">${sent}</div></div>
            <div class="mail-stat"><div class="label">Échecs</div><div class="value">${failed}</div></div>
            <div class="mail-stat"><div class="label">Ouverts</div><div class="value">${opens}</div></div>
            <div class="mail-stat"><div class="label">Taux ouverture</div><div class="value">${sent ? Math.round((opens / sent) * 100) : 0}%</div></div>
        `;

        const sendBtn = $('#mail-btn-send');
        if (sendBtn) {
            sendBtn.style.display = c.status === 'draft' ? 'inline-flex' : 'none';
        }

        const editBtn = $('#mail-btn-edit');
        if (editBtn) {
            editBtn.classList.toggle('mail-hidden', c.status !== 'draft');
        }

        renderDetailPreview(c);

        const filters = ['all', 'pending', 'sent', 'opened', 'failed'];
        const labels = { all: 'Tous', pending: 'En attente', sent: 'Envoyés', opened: 'Ouverts', failed: 'Échecs' };
        $('#recipient-filters').innerHTML = filters.map((f) =>
            `<button type="button" class="mail-chip ${recipientFilter === f ? 'is-active' : ''}" data-filter="${f}">${labels[f]}</button>`
        ).join('');
        $('#recipient-filters').querySelectorAll('[data-filter]').forEach((btn) => {
            btn.addEventListener('click', () => {
                recipientFilter = btn.dataset.filter;
                renderRecipientTable();
            });
        });

        renderRecipientTable();
    }

    function renderRecipientTable() {
        const q = ($('#recipient-search')?.value || '').toLowerCase();
        let rows = currentRecipients;
        if (recipientFilter !== 'all') {
            if (recipientFilter === 'opened') rows = rows.filter((r) => parseInt(r.open_count, 10) > 0);
            else rows = rows.filter((r) => r.status === recipientFilter);
        }
        if (q) rows = rows.filter((r) => (r.email + r.name).toLowerCase().includes(q));

        const tbody = $('#recipient-rows');
        tbody.innerHTML = rows.map((r) => {
            const pill = r.status === 'opened' ? 'opened' : r.status;
            const detail = r.sent_at ? formatDate(r.sent_at) : (r.error || '—');
            const opens = parseInt(r.open_count, 10) || 0;
            const openedAt = r.opened_at ? formatDate(r.opened_at) : '—';
            return `<tr>
                <td><span class="email-link">${esc(r.email)}</span><br><small style="color:#64748b">${esc(r.name)} · ${esc(r.company)}</small></td>
                <td><span class="mail-pill mail-pill--${pill}">${statusLabel(r.status)}</span></td>
                <td>${esc(detail)}</td>
                <td>${opens > 0 ? `<strong>${opens}</strong> (${openedAt})` : '—'}</td>
            </tr>`;
        }).join('') || '<tr><td colspan="4">Aucun destinataire</td></tr>';
    }

    function showView(name) {
        $('#view-list')?.classList.toggle('mail-hidden', name !== 'list');
        $('#view-new')?.classList.toggle('mail-hidden', name !== 'new');
        $('#view-detail')?.classList.toggle('mail-hidden', name !== 'detail');
        $$('.mail-subnav a[data-nav="list"]').forEach((a) => a.classList.toggle('is-active', name === 'list' || name === 'detail' || name === 'new'));
    }

    function route() {
        const hash = location.hash.slice(1) || 'list';
        if (hash === 'new') {
            resetCreateForm();
            showView('new');
            $('#mail-new-count').textContent = `${countAudience($('#mail-audience')?.value || 'all')} destinataire(s)`;
            updatePreview();
            return;
        }
        if (hash.startsWith('edit=')) {
            const id = decodeURIComponent(hash.split('=')[1]);
            openEdit(id);
            return;
        }
        if (hash.startsWith('detail=')) {
            openDetail(decodeURIComponent(hash.split('=')[1]));
            return;
        }
        showView('list');
        renderList();
    }

    async function openEdit(id) {
        const res = await GloriamAPI.mailGet(id);
        if (!res.ok) {
            alert(formatApiError(res.error));
            location.hash = 'list';
            return;
        }
        if (res.campaign.status !== 'draft') {
            alert('Seuls les brouillons sont modifiables.');
            location.hash = `detail=${id}`;
            return;
        }
        editingCampaignId = id;
        fillFormFromCampaign(res.campaign);
        showView('new');
        const submitBtn = $('#mail-create-form')?.querySelector('[type="submit"]');
        if (submitBtn) submitBtn.textContent = 'Enregistrer le brouillon';
    }

    function initDemoMail() {
        campaigns = (window.DEMO_MAIL_CAMPAIGNS || []).slice();
        contacts = window.DEMO_CONTACTS || window.DEMO_MAIL_CONTACTS || [];

        window.GloriamAPI = window.GloriamAPI || {};
        GloriamAPI.mailList = async () => ({ ok: true, campaigns });
        GloriamAPI.mailGet = async (id) => ({
            ok: true,
            campaign: campaigns.find((c) => c.id === id),
            recipients: (window.DEMO_MAIL_RECIPIENTS || {})[id] || []
        });
        GloriamAPI.mailCreate = async (p) => {
            const id = 'mc' + Date.now();
            const total = countAudience(p.audience);
            campaigns.unshift({
                id, created_at: new Date().toISOString(), name: p.name, description: p.description,
                subject: p.subject, body_html: p.body_html, audience: p.audience,
                status: 'draft', total: String(total), sent: '0', failed: '0', opens: '0', clicks: '0',
                preheader: p.preheader || '', cta_url: p.cta_url || '', cta_label: p.cta_label || '',
                brand_wrap: p.brand_wrap || '1', template_id: p.template_id || ''
            });
            return { ok: true, campaignId: id, total };
        };
        GloriamAPI.mailUpdate = async (p) => {
            const c = campaigns.find((x) => x.id === p.campaignId);
            if (!c) return { ok: false, error: 'Introuvable' };
            Object.assign(c, p);
            return { ok: true, campaignId: p.campaignId };
        };
        GloriamAPI.mailDuplicate = async (id) => {
            const c = campaigns.find((x) => x.id === id);
            if (!c) return { ok: false, error: 'Introuvable' };
            return GloriamAPI.mailCreate({
                name: (c.name || '') + ' (copie)',
                description: c.description, subject: c.subject, body_html: c.body_html,
                audience: c.audience, preheader: c.preheader, cta_url: c.cta_url,
                cta_label: c.cta_label, brand_wrap: c.brand_wrap, template_id: c.template_id
            });
        };
        GloriamAPI.mailSend = async (id) => {
            const c = campaigns.find((x) => x.id === id);
            if (c) {
                c.status = 'completed';
                c.sent = c.total;
                c.opens = String(Math.max(1, Math.floor(parseInt(c.total, 10) * 0.4)));
            }
            return { ok: true, sent: parseInt(c?.sent, 10) || 0, failed: 0, opens: parseInt(c?.opens, 10) || 0 };
        };
        GloriamAPI.mailDelete = async (id) => {
            campaigns = campaigns.filter((c) => c.id !== id);
            return { ok: true };
        };
        GloriamAPI.mailTest = async () => ({ ok: true, test: true });
        GloriamAPI.fetchDashboard = async () => ({ ok: true, contacts });

        bindMailEvents();
        route();
    }

    function bindMailEvents() {
        initTemplateSelect();
        initVariableChips();

        $('#mail-audience')?.addEventListener('change', () => {
            $('#mail-new-count').textContent = `${countAudience($('#mail-audience').value)} destinataire(s)`;
        });
        $('#mail-template')?.addEventListener('change', (e) => {
            if (e.target.value) applyTemplate(e.target.value);
        });
        $('#mail-body')?.addEventListener('input', updatePreview);
        $('#mail-preheader')?.addEventListener('input', updatePreview);
        $('#mail-cta-url')?.addEventListener('input', updatePreview);
        $('#mail-cta-label')?.addEventListener('input', updatePreview);
        $('#mail-brand-wrap')?.addEventListener('change', updatePreview);

        $$('.mail-preview-tabs [data-preview]').forEach((btn) => {
            btn.addEventListener('click', () => {
                previewMode = btn.dataset.preview;
                $$('.mail-preview-tabs [data-preview]').forEach((b) => b.classList.toggle('is-active', b === btn));
                updatePreview();
            });
        });

        $('#mail-create-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const payload = collectFormPayload();
            let res;
            if (editingCampaignId) {
                res = await GloriamAPI.mailUpdate({ campaignId: editingCampaignId, ...payload });
                if (res.ok) location.hash = `detail=${editingCampaignId}`;
            } else {
                res = await GloriamAPI.mailCreate(payload);
                if (res.ok) location.hash = `detail=${res.campaignId}`;
            }
            if (!res.ok) alert(formatApiError(res.error));
        });

        const isDemo = !!window.PORTFOLIO_MAIL_DEMO;

        $('#mail-btn-test')?.addEventListener('click', async () => {
            const payload = collectFormPayload();
            if (!payload.subject || !payload.body_html) {
                alert('Renseignez l\'objet et le message avant d\'envoyer un test.');
                return;
            }
            if (isDemo) {
                alert('Démo : e-mail de test simulé.');
                return;
            }
            const btn = $('#mail-btn-test');
            if (btn) { btn.disabled = true; btn.textContent = 'Envoi…'; }
            const res = await GloriamAPI.mailTest(payload);
            if (btn) { btn.disabled = false; btn.textContent = 'Envoyer un test'; }
            if (!res.ok) {
                alert(formatApiError(res.error));
                return;
            }
            alert('E-mail de test envoyé. Vérifiez votre boîte mail (objet [TEST] …).');
        });

        $('#mail-btn-edit')?.addEventListener('click', () => {
            if (currentCampaign?.id) location.hash = `edit=${currentCampaign.id}`;
        });

        $('#mail-btn-duplicate')?.addEventListener('click', async () => {
            if (!currentCampaign) return;
            if (!confirm('Dupliquer cette campagne en nouveau brouillon ?')) return;
            const res = await GloriamAPI.mailDuplicate(currentCampaign.id);
            if (!res.ok) {
                alert(formatApiError(res.error));
                return;
            }
            await loadCampaigns();
            location.hash = `detail=${res.campaignId}`;
        });

        $('#mail-btn-send')?.addEventListener('click', async () => {
            if (!currentCampaign) return;
            const confirmMsg = isDemo
                ? 'Simuler l\'envoi ?'
                : `Envoyer cette campagne à ${currentCampaign.total} destinataire(s) ?`;
            if (!confirm(confirmMsg)) return;
            const btn = $('#mail-btn-send');
            if (btn) { btn.disabled = true; btn.textContent = 'Envoi en cours…'; }
            const res = await GloriamAPI.mailSend(currentCampaign.id);
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Valider et envoyer';
            }
            if (!res.ok) {
                alert(formatApiError(res.error));
                return;
            }
            alert(isDemo
                ? 'Démo : campagne marquée comme envoyée.'
                : `Campagne envoyée : ${res.sent || 0} réussis, ${res.failed || 0} échecs.`);
            await openDetail(currentCampaign.id);
        });

        $('#mail-btn-delete')?.addEventListener('click', async () => {
            if (!currentCampaign || !confirm('Supprimer cette campagne ?')) return;
            const res = await GloriamAPI.mailDelete(currentCampaign.id);
            if (!res.ok) { alert(formatApiError(res.error)); return; }
            location.hash = 'list';
            if (isDemo) {
                campaigns = (await GloriamAPI.mailList()).campaigns;
            } else {
                await loadCampaigns();
            }
            renderList();
        });

        $('#recipient-search')?.addEventListener('input', renderRecipientTable);
        window.addEventListener('hashchange', route);
    }

    async function init() {
        if (window.PORTFOLIO_MAIL_DEMO) {
            initDemoMail();
            return;
        }

        if (!GloriamAPI.isConfigured()) {
            alert('API non configurée.');
            location.href = 'dashboard.html';
            return;
        }
        if (!GloriamAPI.isLoggedIn()) {
            location.href = 'dashboard.html';
            return;
        }

        await loadContacts();
        await loadCampaigns();

        bindMailEvents();

        route();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
