/**
 * Dashboard admin Gloriam Consulting
 */
(function () {
    'use strict';

    const DAYS = 30;
    const CHART_MONTHS = 6;

    const SERVICE_LABELS = {
        web_dev: 'Développement Web',
        mobile_app: 'Application Mobile',
        backend: 'Solutions Backend',
        maintenance: 'Maintenance & Support',
        seo: 'Optimisation SEO',
        training: 'Formation & Conseil',
        uiux: 'Design UI/UX',
        security: 'Sécurité Web',
        integration: 'Intégration Systèmes',
        wordpress: 'Migration WordPress'
    };

    const BUDGET_LABELS = { low: '< 1000€', medium: '1000€ – 5000€', high: '> 5000€' };
    const TIMELINE_LABELS = { urgent: 'Urgent (1–2 sem.)', normal: 'Normal (1–2 mois)', flexible: 'Flexible (3+ mois)' };

    let contacts = [];
    let visits = [];

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    function formatDate(iso) {
        if (!iso) return '—';
        const d = new Date(iso);
        return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    }

    function withinDays(iso, days) {
        const t = new Date(iso).getTime();
        return t >= Date.now() - days * 86400000;
    }

    function statusBadge(status) {
        const labels = { nouveau: 'nouveau', lu: 'lu', traite: 'traité', archive: 'archivé' };
        const cls = status === 'lu' ? 'admin-badge--lu' : status === 'traite' ? 'admin-badge--traite' : '';
        return `<span class="admin-badge ${cls}">${labels[status] || status}</span>`;
    }

    function channelLabel(ch) {
        const map = {
            direct: 'Direct',
            google: 'Google',
            bing: 'Bing',
            facebook: 'Facebook',
            linkedin: 'LinkedIn',
            twitter: 'Twitter/X',
            instagram: 'Instagram',
            referral: 'Autre site'
        };
        return map[ch] || ch;
    }

    function esc(str) {
        if (window.GloriamAPI?.escapeHtml) return GloriamAPI.escapeHtml(str);
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function isDemo() {
        return !!window.PORTFOLIO_ADMIN_DEMO;
    }

    function showLogin() {
        $('#admin-app')?.classList.add('admin-hidden');
        $('#admin-login')?.classList.remove('admin-hidden');
        $('#admin-session-user')?.classList.add('admin-hidden');
        const pwd = $('#login-password');
        if (pwd) pwd.value = '';
    }

    function showApp() {
        $('#admin-login')?.classList.add('admin-hidden');
        $('#admin-app')?.classList.remove('admin-hidden');
        $('#admin-session-user')?.classList.remove('admin-hidden');
    }

    async function loadData() {
        $('#admin-loading')?.classList.remove('admin-hidden');
        const result = await GloriamAPI.fetchDashboard();
        $('#admin-loading')?.classList.add('admin-hidden');

        if (!result.ok) throw new Error(result.error);
        contacts = (result.contacts || []).slice(0, 500);
        visits = (result.visits || []).slice(0, 5000);
        renderAll();
    }

    function getStats() {
        const recentVisits = visits.filter((v) => withinDays(v.created_at, DAYS));
        const sessions = new Set(recentVisits.map((v) => v.session_id));
        const channels = {};
        recentVisits.forEach((v) => {
            const ch = v.referrer_channel || 'direct';
            if (!channels[ch]) channels[ch] = { visitors: new Set(), visits: 0 };
            channels[ch].visitors.add(v.session_id);
            channels[ch].visits += 1;
        });

        const channelList = Object.entries(channels)
            .map(([key, val]) => ({
                key,
                visitors: val.visitors.size,
                visits: val.visits
            }))
            .sort((a, b) => b.visits - a.visits);

        const pages = {};
        recentVisits.forEach((v) => {
            pages[v.page_path] = (pages[v.page_path] || 0) + 1;
        });
        const topPages = Object.entries(pages).sort((a, b) => b[1] - a[1]).slice(0, 8);

        const singlePageSessions = {};
        recentVisits.forEach((v) => {
            singlePageSessions[v.session_id] = (singlePageSessions[v.session_id] || 0) + 1;
        });
        const bounceSessions = Object.values(singlePageSessions).filter((n) => n === 1).length;
        const bounceRate = sessions.size ? Math.round((bounceSessions / sessions.size) * 100) : 0;

        return {
            messages: contacts.length,
            newMessages: contacts.filter((c) => c.status === 'nouveau').length,
            chatbot: contacts.filter((c) => c.source === 'chatbot').length,
            form: contacts.filter((c) => c.source === 'form').length,
            totalVisits: recentVisits.length,
            uniqueVisitors: sessions.size,
            bounceRate,
            channelList,
            topPages
        };
    }

    function renderChannelList(containerId, channelList) {
        const el = $(containerId);
        if (!el) return;
        const maxVisits = channelList[0]?.visits || 1;
        el.innerHTML = channelList.length
            ? channelList.map((ch) => `
                <li class="admin-channel-item">
                    <span>${channelLabel(ch.key)} — ${ch.visitors} visiteurs, ${ch.visits} pages</span>
                    <div class="admin-channel-bar"><span style="width:${Math.round((ch.visits / maxVisits) * 100)}%"></span></div>
                </li>`).join('')
            : '<li>Aucune visite enregistrée.</li>';
    }

    function renderOverview() {
        const s = getStats();
        $('#stat-messages').textContent = s.messages;
        $('#stat-new').textContent = s.newMessages;
        $('#stat-chatbot').textContent = s.chatbot;
        $('#stat-visitors').textContent = s.uniqueVisitors;

        const recent = contacts.slice(0, 6);
        $('#overview-contacts').innerHTML = recent.length
            ? recent.map((c) => `
                <div class="admin-list-item">
                    <strong>${esc(c.name)}</strong>
                    <small>${esc(c.email)} · ${formatDate(c.created_at)} · ${statusBadge(c.status)}</small>
                </div>`).join('')
            : '<p class="admin-muted">Aucun message pour le moment.</p>';

        renderChannelList('#channels-list-overview', s.channelList);
    }

    function renderContacts() {
        $('#contacts-count').textContent = contacts.length;
        const tbody = $('#contacts-table-body');
        if (!tbody) return;

        tbody.innerHTML = contacts.map((c) => `
            <tr data-id="${c.id}">
                <td>${esc(c.name)}</td>
                <td>${esc(c.email)}</td>
                <td>${esc(c.phone || '—')}</td>
                <td>${esc(c.company || '—')}</td>
                <td><span class="admin-msg-preview">${esc(c.message)}</span></td>
                <td>${formatDate(c.created_at).split(' ')[0]}</td>
                <td>${statusBadge(c.status)}</td>
                <td><button type="button" class="admin-btn admin-btn--ghost admin-view-btn" data-id="${c.id}">Voir</button></td>
            </tr>
        `).join('');

        tbody.querySelectorAll('.admin-view-btn').forEach((btn) => {
            btn.addEventListener('click', () => openContactModal(btn.dataset.id));
        });
    }

    function getLastMonthKeys(count) {
        const months = [];
        const now = new Date();
        for (let i = count - 1; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            months.push({
                key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
                label: d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
            });
        }
        return months;
    }

    function countByMonth(items, filterFn) {
        const months = getLastMonthKeys(CHART_MONTHS);
        const counts = Object.fromEntries(months.map((m) => [m.key, 0]));
        items.filter(filterFn).forEach((item) => {
            const d = new Date(item.created_at);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            if (counts[key] !== undefined) counts[key]++;
        });
        return months.map((m) => ({ label: m.label, count: counts[m.key] }));
    }

    function renderMonthlyChart(containerId, series, barClass) {
        const el = $(containerId);
        if (!el) return;
        const max = Math.max(...series.map((s) => s.count), 1);
        el.innerHTML = series.map((s) => `
            <div class="admin-month-row ${barClass || ''}">
                <span class="month-label">${esc(s.label)}</span>
                <div class="month-bar-wrap">
                    <span class="month-bar" style="width:${s.count ? Math.round((s.count / max) * 100) : 0}%"></span>
                </div>
                <span class="month-count">${s.count}</span>
            </div>
        `).join('');
    }

    function renderBreakdown(containerId, items, keyField, labelMap) {
        const el = $(containerId);
        if (!el) return;
        const counts = {};
        items.forEach((item) => {
            const k = item[keyField];
            if (!k) return;
            counts[k] = (counts[k] || 0) + 1;
        });
        const list = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        if (!list.length) {
            el.innerHTML = '<p class="admin-muted">Aucune donnée pour le moment.</p>';
            return;
        }
        const max = list[0][1];
        el.innerHTML = list.map(([key, n]) => `
            <div class="admin-breakdown-item">
                <span><span>${esc(labelMap[key] || key)}</span><strong>${n}</strong></span>
                <div class="admin-channel-bar"><span style="width:${Math.round((n / max) * 100)}%"></span></div>
            </div>
        `).join('');
    }

    function renderChatbot() {
        const chatbotLeads = contacts.filter((c) => c.source === 'chatbot');
        const formLeads = contacts.filter((c) => c.source === 'form');
        const recentChatbot = chatbotLeads.filter((c) => withinDays(c.created_at, DAYS));

        $('#cb-total').textContent = chatbotLeads.length;
        $('#cb-recent').textContent = recentChatbot.length;
        $('#cb-form-total').textContent = formLeads.length;

        const withCompany = chatbotLeads.filter((c) => (c.company || '').trim()).length;
        const companyRate = chatbotLeads.length
            ? Math.round((withCompany / chatbotLeads.length) * 100)
            : 0;
        $('#cb-company-rate').textContent = `${companyRate}%`;

        renderMonthlyChart(
            '#chart-chatbot-monthly',
            countByMonth(contacts, (c) => c.source === 'chatbot')
        );
        renderMonthlyChart(
            '#chart-form-monthly',
            countByMonth(contacts, (c) => c.source === 'form'),
            'admin-month-row--form'
        );

        renderBreakdown('#cb-services', chatbotLeads, 'service', SERVICE_LABELS);

        const budgetEl = $('#cb-budget-timeline');
        if (budgetEl) {
            const budgetHtml = renderBreakdownHtml(chatbotLeads, 'budget', BUDGET_LABELS);
            const timelineHtml = renderBreakdownHtml(chatbotLeads, 'timeline', TIMELINE_LABELS);
            budgetEl.innerHTML = `
                <p class="admin-muted" style="margin:0 0 0.5rem;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.05em">Budget</p>
                ${budgetHtml}
                <p class="admin-muted" style="margin:1.25rem 0 0.5rem;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.05em">Délai</p>
                ${timelineHtml}
            `;
        }

        const recent = chatbotLeads.slice(0, 8);
        $('#cb-recent-leads').innerHTML = recent.length
            ? recent.map((c) => `
                <div class="admin-list-item">
                    <strong>${esc(c.name)}</strong>
                    <small>
                        ${esc(SERVICE_LABELS[c.service] || c.service || '—')}
                        · ${esc(c.company || 'Formation non renseignée')}
                        · ${formatDate(c.created_at).split(' ')[0]}
                    </small>
                </div>`).join('')
            : '<p class="admin-muted">Aucun lead chatbot enregistré.</p>';
    }

    function renderBreakdownHtml(items, keyField, labelMap) {
        const counts = {};
        items.forEach((item) => {
            const k = item[keyField];
            if (!k) return;
            counts[k] = (counts[k] || 0) + 1;
        });
        const list = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        if (!list.length) return '<p class="admin-muted">—</p>';
        const max = list[0][1];
        return list.map(([key, n]) => `
            <div class="admin-breakdown-item">
                <span><span>${esc(labelMap[key] || key)}</span><strong>${n}</strong></span>
                <div class="admin-channel-bar"><span style="width:${Math.round((n / max) * 100)}%"></span></div>
            </div>
        `).join('');
    }

    function renderVisitors() {
        const s = getStats();
        $('#vis-total').textContent = s.totalVisits;
        $('#vis-unique').textContent = s.uniqueVisitors;
        $('#vis-bounce').textContent = `${s.bounceRate}%`;

        renderChannelList('#channels-list', s.channelList);

        $('#top-pages').innerHTML = s.topPages.length
            ? s.topPages.map(([path, count]) => `
                <div class="admin-list-item">
                    <strong>${esc(path)}</strong>
                    <small>${count} vues (${DAYS} j)</small>
                </div>`).join('')
            : '<p class="admin-muted">—</p>';
    }

    function countCampaignRecipients(audience) {
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

    function updateCampaignRecipientCount() {
        const audience = $('#campaign-audience')?.value || 'all';
        const n = countCampaignRecipients(audience);
        const el = $('#campaign-recipient-count');
        if (el) el.textContent = `${n} destinataire(s) pour cette sélection`;
    }

    async function handleCampaignSubmit(e, testOnly) {
        if (e) e.preventDefault();

        if (isDemo()) {
            showCampaignResult(
                testOnly
                    ? 'Démo : envoi test simulé avec succès (aucun e-mail réel).'
                    : 'Démo : campagne simulée — en production, les e-mails partent via Gmail.',
                true
            );
            return;
        }

        const subject = $('#campaign-subject')?.value.trim();
        const message = $('#campaign-message')?.value.trim();
        const audience = $('#campaign-audience')?.value || 'all';
        const resultEl = $('#campaign-result');
        const sendBtn = $('#btn-campaign-send');
        const testBtn = $('#btn-campaign-test');

        if (!subject || !message) {
            showCampaignResult('Remplissez l’objet et le message.', false);
            return;
        }

        if (!testOnly) {
            const n = countCampaignRecipients(audience);
            if (!n) {
                showCampaignResult('Aucun destinataire pour cette sélection.', false);
                return;
            }
            if (!confirm(`Envoyer cette campagne à ${n} personne(s) ?\n\nCette action utilise votre quota Gmail.`)) {
                return;
            }
        }

        if (sendBtn) sendBtn.disabled = true;
        if (testBtn) testBtn.disabled = true;
        showCampaignResult('Envoi en cours…', true);

        const result = await GloriamAPI.sendCampaign({ subject, message, audience, testOnly });
        if (sendBtn) sendBtn.disabled = false;
        if (testBtn) testBtn.disabled = false;

        if (!result.ok) {
            showCampaignResult(result.error || 'Échec de l’envoi', false);
            return;
        }
        if (result.test) {
            showCampaignResult('E-mail de test envoyé. Vérifiez votre boîte Gmail.', true);
            return;
        }
        showCampaignResult(`Campagne terminée : ${result.sent} envoyé(s), ${result.failed} échec(s) sur ${result.total}.`, true);
    }

    function showCampaignResult(text, ok) {
        const el = $('#campaign-result');
        if (!el) return;
        el.textContent = text;
        el.classList.remove('admin-hidden', 'is-ok', 'is-error');
        el.classList.add(ok ? 'is-ok' : 'is-error');
    }

    function renderAll() {
        renderOverview();
        renderContacts();
        renderChatbot();
        renderVisitors();
        updateCampaignRecipientCount();
    }

    function openContactModal(id) {
        const c = contacts.find((x) => x.id === id);
        if (!c) return;

        const html = `
            <div class="admin-detail-row"><strong>Source</strong>${c.source === 'chatbot' ? 'Chatbot' : 'Formulaire'}</div>
            <div class="admin-detail-row"><strong>Nom</strong>${esc(c.name)}</div>
            <div class="admin-detail-row"><strong>Email</strong>${esc(c.email)}</div>
            <div class="admin-detail-row"><strong>Téléphone</strong>${esc(c.phone || '—')}</div>
            <div class="admin-detail-row"><strong>Formation / Entreprise</strong>${esc(c.company || '—')}</div>
            <div class="admin-detail-row"><strong>Localisation</strong>${esc(c.location || '—')}</div>
            <div class="admin-detail-row"><strong>Sujet</strong>${esc(c.subject || '—')}</div>
            ${c.service ? `<div class="admin-detail-row"><strong>Service</strong>${esc(c.service)}</div>` : ''}
            ${c.budget ? `<div class="admin-detail-row"><strong>Budget</strong>${esc(c.budget)}</div>` : ''}
            ${c.timeline ? `<div class="admin-detail-row"><strong>Délai</strong>${esc(c.timeline)}</div>` : ''}
            <div class="admin-detail-row"><strong>Message</strong><div class="admin-detail-message">${esc(c.message)}</div></div>
            ${c.project_details ? `<div class="admin-detail-row"><strong>Détails projet</strong><div class="admin-detail-message">${esc(c.project_details)}</div></div>` : ''}
            <div class="admin-detail-row"><strong>Date</strong>${formatDate(c.created_at)}</div>
            <div style="display:flex;gap:0.5rem;margin-top:1rem;flex-wrap:wrap">
                <button type="button" class="admin-btn admin-btn--ghost" data-status="lu" data-id="${c.id}">Marquer lu</button>
                <button type="button" class="admin-btn" data-status="traite" data-id="${c.id}">Marquer traité</button>
                <button type="button" class="admin-btn admin-btn--danger admin-modal-close">Fermer</button>
            </div>
        `;

        $('#modal-body').innerHTML = html;
        $('#admin-modal').classList.add('is-open');

        $('#modal-body').querySelectorAll('[data-status]').forEach((btn) => {
            btn.addEventListener('click', async () => {
                await updateStatus(btn.dataset.id, btn.dataset.status);
                closeModal();
            });
        });
        $('#modal-body').querySelector('.admin-modal-close')?.addEventListener('click', closeModal);

        if (!isDemo() && c.status === 'nouveau') {
            updateStatus(c.id, 'lu', false);
        }
    }

    function closeModal() {
        $('#admin-modal')?.classList.remove('is-open');
    }

    async function updateStatus(id, status, reload = true) {
        if (isDemo()) {
            const row = contacts.find((c) => c.id === id);
            if (row) row.status = status;
            if (reload) renderAll();
            return;
        }
        const result = await GloriamAPI.updateContactStatus(id, status);
        if (!result.ok) {
            alert(result.error);
            return;
        }
        const row = contacts.find((c) => c.id === id);
        if (row) row.status = status;
        if (reload) renderAll();
    }

    function switchTab(tabId) {
        $$('.admin-tab').forEach((t) => t.classList.toggle('is-active', t.dataset.tab === tabId));
        $$('.admin-panel').forEach((p) => p.classList.toggle('is-active', p.id === `panel-${tabId}`));
    }

    async function handleLogin(e) {
        e.preventDefault();
        const password = $('#login-password').value;
        const errEl = $('#login-error');
        errEl.classList.remove('is-visible');

        const result = await GloriamAPI.login(password);
        if (!result.ok) {
            errEl.textContent = result.error;
            errEl.classList.add('is-visible');
            return;
        }
        showApp();
        try {
            await loadData();
        } catch (err) {
            alert('Erreur chargement: ' + err.message);
        }
    }

    async function handleLogout() {
        if (!confirm('Se déconnecter du dashboard admin ?')) return;
        await GloriamAPI.logout();
        showLogin();
    }

    function bindAdminUI() {
        $('#login-form')?.addEventListener('submit', handleLogin);
        $('#btn-logout')?.addEventListener('click', handleLogout);
        $('#btn-refresh')?.addEventListener('click', () => {
            if (isDemo()) renderAll();
            else loadData().catch((e) => alert(e.message));
        });
        $$('.admin-tab').forEach((tab) => {
            tab.addEventListener('click', () => {
                if (tab.dataset.tab === 'campaigns' && !isDemo()) {
                    window.location.href = 'mail-campaigns.html';
                    return;
                }
                switchTab(tab.dataset.tab);
            });
        });

        $('#admin-modal')?.addEventListener('click', (e) => {
            if (e.target.id === 'admin-modal') closeModal();
        });
    }

    function renderDemoCampaignHistory() {
        const el = $('#campaign-history-list');
        if (!el || !window.DEMO_CAMPAIGNS?.length) return;
        el.innerHTML = window.DEMO_CAMPAIGNS.map((c) => `
            <div class="admin-list-item">
                <strong>${esc(c.subject)}</strong>
                <small>${formatDate(c.date).split(' ')[0]} · ${esc(c.audience)} · ${c.sent} envoyé(s)${c.failed ? `, ${c.failed} échec` : ''}</small>
            </div>
        `).join('');
    }

    function initDemo() {
        contacts = window.DEMO_CONTACTS || [];
        visits = window.DEMO_VISITS || [];
        renderAll();
        renderDemoCampaignHistory();

        const pre = window.DEMO_CAMPAIGN_PREFILL;
        if (pre) {
            const sub = $('#campaign-subject');
            const msg = $('#campaign-message');
            if (sub && !sub.value) sub.value = pre.subject;
            if (msg && !msg.value) msg.value = pre.message;
        }

        bindAdminUI();
    }

    async function init() {
        if (isDemo()) {
            initDemo();
            return;
        }

        if (!window.GloriamAPI) {
            $('#login-error').textContent = 'Scripts API non chargés.';
            $('#login-error').classList.add('is-visible');
            return;
        }

        const setupEl = $('#login-setup');
        if (!GloriamAPI.isConfigured()) {
            setupEl.textContent = 'Configurez js/gloriam-api-config.js (URL Apps Script) — guide : admin/SETUP-GOOGLE.md';
            setupEl.classList.remove('admin-hidden');
        }

        if (GloriamAPI.isLoggedIn() && GloriamAPI.isConfigured()) {
            showApp();
            try {
                await loadData();
            } catch (err) {
                GloriamAPI.logout();
                showLogin();
                $('#login-error').textContent = err.message;
                $('#login-error').classList.add('is-visible');
            }
        } else {
            showLogin();
        }

        bindAdminUI();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
