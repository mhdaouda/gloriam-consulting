/**
 * API Gloriam — Google Sheets via Apps Script (sans Supabase)
 */
(function () {
    'use strict';

    const TOKEN_KEY = 'gloriam_admin_token';

    function getBaseUrl() {
        return (window.GLORIAM_API?.baseUrl || '').trim();
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function getReferrerChannel(referrer) {
        if (!referrer) return 'direct';
        try {
            const host = new URL(referrer).hostname.toLowerCase();
            if (host.includes('google.')) return 'google';
            if (host.includes('bing.')) return 'bing';
            if (host.includes('facebook.') || host.includes('fb.')) return 'facebook';
            if (host.includes('linkedin.')) return 'linkedin';
            if (host.includes('twitter.') || host.includes('x.com')) return 'twitter';
            if (host.includes('instagram.')) return 'instagram';
            if (host === window.location.hostname) return 'direct';
            return 'referral';
        } catch {
            return 'direct';
        }
    }

    function getSessionId() {
        const key = 'gloriam_session_id';
        let id = sessionStorage.getItem(key);
        if (!id) {
            id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
            sessionStorage.setItem(key, id);
        }
        return id;
    }

    async function request(action, payload) {
        const baseUrl = getBaseUrl();
        if (!baseUrl) {
            return { ok: false, error: 'API non configurée' };
        }

        try {
            const res = await fetch(baseUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({ action, ...payload })
            });
            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch {
                return { ok: false, error: 'Réponse API invalide — vérifiez l\'URL Apps Script et le déploiement.' };
            }
            if (!res.ok || data.error) {
                return { ok: false, error: data.error || 'Erreur serveur' };
            }
            return { ok: true, ...data };
        } catch (err) {
            return { ok: false, error: err.message || 'Réseau' };
        }
    }

    async function insertContact(payload) {
        const row = {
            source: payload.source || 'form',
            name: (payload.name || '').trim().slice(0, 200),
            email: (payload.email || '').trim().slice(0, 200),
            phone: (payload.phone || '').trim().slice(0, 50) || '',
            company: (payload.company || '').trim().slice(0, 300) || '',
            subject: (payload.subject || '').trim().slice(0, 300) || '',
            message: (payload.message || '').trim().slice(0, 8000),
            location: (payload.location || '').trim().slice(0, 200) || '',
            service: payload.service || '',
            budget: payload.budget || '',
            timeline: payload.timeline || '',
            project_details: payload.project_details || ''
        };

        if (!row.name || !row.email || !row.message) {
            return { ok: false, error: 'Champs requis manquants' };
        }

        return request('contact', row);
    }

    async function trackPageView() {
        if (!getBaseUrl() || window.location.pathname.includes('/admin/')) return;

        const path = window.location.pathname + window.location.search;
        const dedupeKey = `gloriam_tracked_${path}`;
        if (sessionStorage.getItem(dedupeKey)) return;
        sessionStorage.setItem(dedupeKey, '1');

        const referrer = document.referrer || '';
        await request('visit', {
            session_id: getSessionId(),
            page_path: path.slice(0, 500),
            page_title: (document.title || '').slice(0, 300),
            referrer: referrer.slice(0, 500),
            referrer_channel: getReferrerChannel(referrer),
            user_agent: (navigator.userAgent || '').slice(0, 500),
            language: (navigator.language || '').slice(0, 20)
        });
    }

    function getToken() {
        return sessionStorage.getItem(TOKEN_KEY);
    }

    function setToken(token) {
        if (token) sessionStorage.setItem(TOKEN_KEY, token);
        else sessionStorage.removeItem(TOKEN_KEY);
    }

    async function login(password) {
        const result = await request('login', { password });
        if (result.ok && result.token) {
            setToken(result.token);
            return { ok: true };
        }
        return { ok: false, error: result.error || 'Identifiants incorrects' };
    }

    async function logout() {
        const token = getToken();
        if (token && getBaseUrl()) {
            await request('logout', { token });
        }
        setToken(null);
    }

    function isLoggedIn() {
        return !!getToken();
    }

    async function fetchDashboard() {
        const token = getToken();
        if (!token) return { ok: false, error: 'Non connecté' };
        const result = await request('data', { token });
        if (!result.ok) return result;
        return {
            ok: true,
            contacts: result.contacts || [],
            visits: result.visits || []
        };
    }

    async function updateContactStatus(id, status) {
        const token = getToken();
        if (!token) return { ok: false, error: 'Non connecté' };
        return request('updateStatus', { token, id, status });
    }

    async function mailList() {
        const token = getToken();
        if (!token) return { ok: false, error: 'Non connecté' };
        return request('mailList', { token });
    }

    async function mailGet(campaignId) {
        const token = getToken();
        if (!token) return { ok: false, error: 'Non connecté' };
        return request('mailGet', { token, campaignId });
    }

    async function mailCreate(payload) {
        const token = getToken();
        if (!token) return { ok: false, error: 'Non connecté' };
        return request('mailCreate', { token, ...payload });
    }

    async function mailSend(campaignId) {
        const token = getToken();
        if (!token) return { ok: false, error: 'Non connecté' };
        return request('mailSend', { token, campaignId });
    }

    async function mailDelete(campaignId) {
        const token = getToken();
        if (!token) return { ok: false, error: 'Non connecté' };
        return request('mailDelete', { token, campaignId });
    }

    async function mailUpdate(payload) {
        const token = getToken();
        if (!token) return { ok: false, error: 'Non connecté' };
        return request('mailUpdate', { token, ...payload });
    }

    async function mailDuplicate(campaignId) {
        const token = getToken();
        if (!token) return { ok: false, error: 'Non connecté' };
        return request('mailDuplicate', { token, campaignId });
    }

    async function mailTest(payload) {
        const token = getToken();
        if (!token) return { ok: false, error: 'Non connecté' };
        return request('mailTest', { token, ...payload });
    }

    window.GloriamAPI = {
        escapeHtml,
        insertContact,
        trackPageView,
        login,
        logout,
        isLoggedIn,
        fetchDashboard,
        updateContactStatus,
        mailList,
        mailGet,
        mailCreate,
        mailUpdate,
        mailDuplicate,
        mailSend,
        mailDelete,
        mailTest,
        isConfigured: () => !!getBaseUrl()
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => trackPageView());
    } else {
        trackPageView();
    }
})();
