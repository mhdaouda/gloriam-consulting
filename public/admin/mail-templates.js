/**
 * Modèles de campagnes — style HEXAHUB (header gradient, corps structuré, footer légal)
 * Variables : {{salutation}}, {{nom}}, {{email}}, {{entreprise}}, {{cta_url}}, {{cta_label}}
 */
(function (global) {
    'use strict';

    const TEMPLATES = [
        {
            id: 'relance-devis',
            name: 'Relance devis',
            subject: '{{nom}}, votre projet avec Gloriam Consulting',
            preheader: 'Un point rapide sur votre demande — nous restons disponibles.',
            cta_url: 'https://www.gloriam-consulting.com/fr/contact',
            cta_label: 'Planifier un échange',
            body_html: `<p>{{salutation}},</p>
<p>J'espère que vous allez bien. Suite à votre prise de contact avec <strong>Gloriam Consulting</strong>, je reviens vers vous pour faire le point sur votre projet.</p>
<p>Nous accompagnons les entreprises en <strong>conseil stratégique</strong>, transformation digitale et excellence commerciale — avec une approche concrète et orientée résultats.</p>
<p>Si vous souhaitez avancer, je vous propose un échange de 30 minutes pour cadrer vos besoins et vous adresser une proposition adaptée.</p>
<p>Bien cordialement,<br><strong>L'équipe Gloriam Consulting</strong></p>`
        },
        {
            id: 'newsletter-services',
            name: 'Newsletter services',
            subject: 'Gloriam Consulting — nos expertises pour votre croissance',
            preheader: 'Stratégie, digital et accompagnement opérationnel en Europe.',
            cta_url: 'https://www.gloriam-consulting.com/fr/services',
            cta_label: 'Découvrir nos services',
            body_html: `<p>{{salutation}},</p>
<p>Chez <strong>Gloriam Consulting</strong>, nous aidons les dirigeants et équipes à accélérer leur transformation — de la stratégie à l'exécution.</p>
<div style="margin:18px 0;padding:16px;background:#f4f8fb;border:1px solid #dce5e0;border-radius:10px;">
<p style="margin:0 0 10px;font-weight:700;color:#047857;">Ce que nous proposons</p>
<ul style="margin:0;padding-left:20px;color:#334155;line-height:1.7;">
<li>Conseil stratégique &amp; feuille de route</li>
<li>Transformation digitale &amp; processus</li>
<li>Excellence commerciale &amp; développement</li>
<li>Accompagnement opérationnel sur mesure</li>
</ul>
</div>
<p>Nous intervenons en Europe (France, Belgique, Allemagne, Suisse et au-delà) — à distance ou sur site selon vos enjeux.</p>
<p>Envie d'en discuter ? Répondez à cet e-mail ou utilisez le bouton ci-dessous.</p>
<p>À bientôt,<br><strong>Gloriam Consulting</strong></p>`
        },
        {
            id: 'remerciement-contact',
            name: 'Remerciement contact',
            subject: 'Merci pour votre message — Gloriam Consulting',
            preheader: 'Nous avons bien reçu votre demande et revenons vers vous rapidement.',
            cta_url: 'https://calendly.com/daoudayinde/30min',
            cta_label: 'Réserver un créneau',
            body_html: `<p>{{salutation}},</p>
<p>Merci pour votre intérêt pour <strong>Gloriam Consulting</strong>.</p>
<p>Nous confirmons la bonne réception de votre message. Un membre de notre équipe vous répondra <strong>sous 24 à 48 h ouvrées</strong> avec les prochaines étapes.</p>
<div style="margin:18px 0;padding:16px;background:#f4f8fb;border:1px solid #dce5e0;border-radius:10px;">
<p style="margin:0 0 8px;font-weight:700;color:#334155;">Récapitulatif</p>
<p style="margin:0;color:#0f172a;line-height:1.6;">
<strong>Contact :</strong> {{email}}<br>
<strong>Organisation :</strong> {{entreprise}}
</p>
</div>
<p>Si votre demande est urgente, vous pouvez aussi réserver directement un créneau de 30 minutes.</p>
<p>Cordialement,<br><strong>L'équipe Gloriam Consulting</strong></p>`
        },
        {
            id: 'invitation-rdv',
            name: 'Invitation rendez-vous',
            subject: '{{nom}}, échangeons sur vos objectifs',
            preheader: '30 minutes pour cadrer votre projet — sans engagement.',
            cta_url: 'https://calendly.com/daoudayinde/30min',
            cta_label: 'Choisir un créneau Calendly',
            body_html: `<p>{{salutation}},</p>
<p>Je serais ravi d'échanger avec vous sur vos priorités business et la manière dont <strong>Gloriam Consulting</strong> peut vous accompagner.</p>
<p>Lors d'un appel de <strong>30 minutes</strong>, nous pouvons :</p>
<ul style="line-height:1.7;color:#334155;">
<li>Comprendre votre contexte et vos objectifs</li>
<li>Identifier les leviers rapides et la feuille de route</li>
<li>Vous proposer un format d'accompagnement adapté</li>
</ul>
<p>Cliquez sur le bouton ci-dessous pour choisir le créneau qui vous convient.</p>
<p>Bien à vous,<br><strong>Mohamed Daouda Ayinde</strong><br><span style="color:#64748b;font-size:14px;">Gloriam Consulting</span></p>`
        },
        {
            id: 'vierge',
            name: 'Message libre',
            subject: '',
            preheader: '',
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

    /**
     * Aperçu client — reproduit le wrapper serveur (GloriamAPI.gs)
     */
    function wrapBrandPreview(innerHtml, opts) {
        opts = opts || {};
        const preheader = opts.preheader || '';
        const ctaUrl = opts.cta_url || '';
        const ctaLabel = opts.cta_label || 'En savoir plus';
        const unsubUrl = '#';
        const siteUrl = 'https://www.gloriam-consulting.com';

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
            innerHtml +
            ctaBlock +
            '</td></tr>' +
            '<tr><td style="padding:14px 24px;background:#eef4f2;color:#64748b;font-size:12px;line-height:1.6;">' +
            'Gloriam Consulting · contact@gloriam-consulting.com<br>' +
            '<a href="' + escAttr(unsubUrl) + '" style="color:#64748b;">Se désinscrire</a> · ' +
            '<a href="' + escAttr(siteUrl) + '" style="color:#047857;">gloriam-consulting.com</a>' +
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
            .replace(/\{\{entreprise\}\}/gi, 'Université Paris');
    }

    global.GloriamMailTemplates = {
        TEMPLATES,
        getTemplate,
        listTemplates,
        wrapBrandPreview,
        personalizePreview,
        VARIABLES: [
            { key: '{{salutation}}', label: 'Salutation' },
            { key: '{{nom}}', label: 'Nom' },
            { key: '{{email}}', label: 'E-mail' },
            { key: '{{entreprise}}', label: 'Entreprise' }
        ]
    };
})(typeof window !== 'undefined' ? window : globalThis);
