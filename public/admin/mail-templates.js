/**
 * Modèles campagnes — secteurs IT (séquence HEXAHUB : question → relance → clôture)
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

    function interestButtons() {
        return (
            '<p style="margin:16px 0;">' +
            '<a href="' + CONTACT + '" style="display:inline-block;margin:4px 8px 4px 0;padding:10px 18px;background:#10b981;color:#fff;font-weight:700;text-decoration:none;border-radius:8px;">✔ Intéressé</a>' +
            '<a href="{{unsubscribe}}" style="display:inline-block;margin:4px 0;padding:10px 18px;background:#1e293b;color:#94a3b8;font-weight:600;text-decoration:none;border-radius:8px;border:1px solid rgba(148,163,184,0.3);">✖ Pas intéressé</a>' +
            '</p>'
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
            '<p style="font-size:12px;color:#8b9cb3;margin:0 0 8px;line-height:1.4;">Conseil · Stratégie · Écosystème IT</p>' +
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

    /** Secteurs liés à l'informatique — contenu métier par vertical */
    const IT_SECTORS = [
        {
            id: 'esn-ssii',
            label: 'ESN / SSII',
            tagline: 'ESN · Delivery · SI',
            peer: 'ESN, SSII et sociétés de services IT',
            intro: 'nous accompagnons des <strong style="color:#e8eef4;">ESN et SSII</strong> sur leur stratégie commerciale, leur delivery et leur développement en Europe.',
            pain: 'Beaucoup d\'acteurs IT peinent à industrialiser l\'avant-vente, à différencier leur offre et à générer un pipe commercial régulier — en parallèle du delivery.',
            painOnline: 'Perdez-vous des appels d\'offres ou des RFP parce que votre message, vos références ou votre présence digitale ne reflètent pas assez votre expertise ?',
            painMarket: 'Dans l\'écosystème ESN, les décideurs comparent vite les profils, les références sectorielles et la crédibilité en ligne avant de short-lister.',
            value: [
                'Stratégie commerciale &amp; ciblage comptes',
                'Structuration offre, packages &amp; pricing',
                'Processus avant-vente &amp; réponses AO',
                'Visibilité, crédibilité &amp; marque employeur IT'
            ],
            reminder: [
                'Pipe commercial &amp; prospection B2B',
                'Offre &amp; proposition de valeur IT',
                'Delivery &amp; satisfaction client',
                'Croissance en Europe (FR, BE, DE, CH…)'
            ]
        },
        {
            id: 'saas-editeur',
            label: 'SaaS / Éditeurs logiciels',
            tagline: 'SaaS · Product · Scale',
            peer: 'éditeurs SaaS et éditeurs de logiciels',
            intro: 'nous accompagnons des <strong style="color:#e8eef4;">éditeurs SaaS</strong> sur leur go-to-market, leur acquisition et leur structuration commerciale.',
            pain: 'Entre product roadmap, churn et acquisition, beaucoup d\'éditeurs manquent de clarté sur leur ICP, leur messaging et leur machine commerciale.',
            painOnline: 'Votre produit est solide, mais est-ce que votre site, votre démo et votre parcours inbound convertissent suffisamment de leads qualifiés ?',
            painMarket: 'Les acheteurs SaaS comparent fonctionnalités, preuves sociales et onboarding — souvent en ligne — avant de booker une démo.',
            value: [
                'Go-to-market &amp; positionnement produit',
                'ICP, messaging &amp; parcours inbound',
                'Structuration sales / CS / onboarding',
                'Site &amp; assets orientés conversion'
            ],
            reminder: [
                'Acquisition &amp; pipeline MQL/SQL',
                'Rétention &amp; expansion revenue',
                'Pricing &amp; packaging',
                'Scale commercial en Europe'
            ]
        },
        {
            id: 'agence-digital',
            label: 'Agences web & digital',
            tagline: 'Web · Digital · Studio',
            peer: 'agences web, studios digitaux et agences de communication technique',
            intro: 'nous accompagnons des <strong style="color:#e8eef4;">agences digitales</strong> sur leur développement commercial, leur différenciation et leur rentabilité.',
            pain: 'Beaucoup d\'agences alternent entre sur-booking et trous de pipeline, avec des devis longs à produire et une visibilité trop dépendante du bouche-à-oreille.',
            painOnline: 'Combien de prospects choisissent un concurrent parce que son portfolio, son site ou son process de devis inspirent plus confiance ?',
            painMarket: 'Les clients comparent portfolios, avis, stack technique et réactivité commerciale avant de vous contacter.',
            value: [
                'Positionnement &amp; niche (web, app, e-commerce)',
                'Processus devis &amp; closing',
                'Portfolio &amp; preuve sociale en ligne',
                'Prospection &amp; partenariats tech'
            ],
            reminder: [
                'Génération de leads qualifiés',
                'Devis plus rapides &amp; mieux cadrés',
                'Marge &amp; charge commerciale',
                'Visibilité locale &amp; sectorielle'
            ]
        },
        {
            id: 'cybersecurite',
            label: 'Cybersécurité',
            tagline: 'Cyber · Conformité · RSSI',
            peer: 'acteurs cybersécurité, MSSP et consultants sécurité',
            intro: 'nous accompagnons des acteurs de la <strong style="color:#e8eef4;">cybersécurité</strong> sur leur stratégie commerciale et leur crédibilité auprès des décideurs.',
            pain: 'Le marché cyber est bruyant : beaucoup d\'offres se ressemblent et les DSI/RSSI manquent de temps pour trier les prestataires crédibles.',
            painOnline: 'Vos prospects comparent certifications, cas clients et clarté de l\'offre — souvent via votre site — avant d\'accepter un audit ou un call.',
            painMarket: 'Sans message clair (audit, SOC, conformité, sensibilisation…), il est difficile de sortir du lot face aux grands intégrateurs.',
            value: [
                'Positionnement offre cyber (audit, SOC, GRC…)',
                'Message décideurs DSI / RSSI / DPO',
                'Contenus &amp; crédibilité (cas, certifications)',
                'Prospection comptes à enjeu'
            ],
            reminder: [
                'Confiance &amp; preuves sectorielles',
                'Parcours de vente consultatif',
                'Partenariats &amp; réseau',
                'Europe &amp; conformité (NIS2, RGPD…)'
            ]
        },
        {
            id: 'cloud-infra',
            label: 'Cloud & Infrastructure',
            tagline: 'Cloud · DevOps · Infra',
            peer: 'intégrateurs cloud, DevOps et infrastructure',
            intro: 'nous accompagnons des spécialistes <strong style="color:#e8eef4;">cloud &amp; infrastructure</strong> sur leur offre, leur delivery et leur développement commercial.',
            pain: 'Migration, run managed et FinOps demandent une proposition claire — beaucoup d\'équipes techniques excellent sur le delivery mais sous-investissent le commercial.',
            painOnline: 'Perdez-vous des projets cloud parce que votre offre n\'est pas assez lisible (migration, managed, FinOps, support) sur vos canaux digitaux ?',
            painMarket: 'Les CTO et DSI comparent expertise cloud (AWS, Azure, GCP), SLA et références avant de lancer un POC ou un appel d\'offres.',
            value: [
                'Packaging offre cloud &amp; managed services',
                'Avant-vente technique &amp; cadrage',
                'Références &amp; cas clients sectoriels',
                'Site &amp; contenus pour décideurs IT'
            ],
            reminder: [
                'Projets migration &amp; modernisation',
                'Run, SLA &amp; satisfaction client',
                'Partenariats hyperscalers',
                'Croissance B2B en Europe'
            ]
        },
        {
            id: 'startup-tech',
            label: 'Startups tech',
            tagline: 'Startup · Scale · Fundraising',
            peer: 'startups tech et scale-ups',
            intro: 'nous accompagnons des <strong style="color:#e8eef4;">startups tech</strong> sur leur stratégie, leur commercial et leur préparation à la scale.',
            pain: 'Entre produit, recrutement et runway, la priorité commerciale bouge vite — sans cadre, le pipe reste imprévisible.',
            painOnline: 'Investisseurs et premiers clients regardent votre storytelling, votre site et votre traction — une présentation floue freine les opportunités.',
            painMarket: 'Les early adopters et partenaires comparent vision, équipe et exécution commerciale avant de s\'engager.',
            value: [
                'Stratégie go-to-market early stage',
                'Pitch, storytelling &amp; site investisseurs',
                'Premiers clients &amp; boucles de feedback',
                'Préparation scale commerciale'
            ],
            reminder: [
                'ICP &amp; validation marché',
                'Pipeline fondateurs / sales',
                'Partenariats &amp; POC',
                'Expansion Europe'
            ]
        },
        {
            id: 'integrateur-msp',
            label: 'Intégrateurs & MSP',
            tagline: 'MSP · Infogérance · Support',
            peer: 'MSP, intégrateurs et infogéreurs',
            intro: 'nous accompagnons des <strong style="color:#e8eef4;">MSP et intégrateurs</strong> sur leur offre managed, leur rétention client et leur acquisition.',
            pain: 'Beaucoup de MSP vivent du parc installé sans assez de nouvelles signatures — avec des offres packagées peu différenciées.',
            painOnline: 'Vos prospects PME comparent réactivité, transparence des offres et avis en ligne avant de changer de prestataire IT.',
            painMarket: 'Sans site clair (support, sauvegarde, M365, sécurité…), difficile de capter les demandes locales qualifiées.',
            value: [
                'Offres packagées MSP (support, backup, M365)',
                'Rétention &amp; upsell parc client',
                'Acquisition PME / ETi locale',
                'Site &amp; tunnel demande de devis'
            ],
            reminder: [
                'Nouveaux contrats managed',
                'Marge &amp; standardisation delivery',
                'Marketing local B2B',
                'Process commercial réactif'
            ]
        },
        {
            id: 'data-ia',
            label: 'Data, IA & automatisation',
            tagline: 'Data · IA · Automation',
            peer: 'acteurs data, IA et automatisation',
            intro: 'nous accompagnons des structures <strong style="color:#e8eef4;">data &amp; IA</strong> sur leur positionnement, leurs cas d\'usage et leur développement commercial.',
            pain: 'L\'IA et la data suscitent de l\'intérêt — mais beaucoup d\'acheteurs ne savent pas quel ROI attendre ni comment choisir un partenaire crédible.',
            painOnline: 'Sans cas d\'usage concrets et une présentation claire (audit data, ML ops, agents, RPA…), les leads restent curieux mais ne convertissent pas.',
            painMarket: 'Les directions métier et IT comparent méthode, gouvernance data et références avant de lancer un POC.',
            value: [
                'Positionnement offre data / IA / automation',
                'Cas d\'usage &amp; ROI par vertical',
                'Contenus &amp; démos orientés métier',
                'Prospection comptes à fort enjeu data'
            ],
            reminder: [
                'POC &amp; industrialisation',
                'Gouvernance &amp; conformité data',
                'Partenariats tech &amp; cloud',
                'Europe &amp; secteurs régulés'
            ]
        },
        {
            id: 'ecommerce-tech',
            label: 'E-commerce & retail tech',
            tagline: 'E-commerce · Retail · Tech',
            peer: 'acteurs e-commerce et retail tech',
            intro: 'nous accompagnons des acteurs <strong style="color:#e8eef4;">e-commerce &amp; retail tech</strong> sur leur performance digitale et leur croissance.',
            pain: 'Stack technique, logistique et acquisition se télescopent — beaucoup de marques tech-first sous-optimisent conversion et rétention.',
            painOnline: 'Perdez-vous des ventes à cause d\'un parcours mobile, d\'une intégration paiement/stock ou d\'une stratégie d\'acquisition mal alignée ?',
            painMarket: 'Les consommateurs et partenaires B2B comparent expérience, performance site et crédibilité de marque en quelques clics.',
            value: [
                'Stratégie acquisition &amp; conversion',
                'Stack e-commerce &amp; intégrations',
                'UX, performance &amp; mobile',
                'CRM, fidélisation &amp; data client'
            ],
            reminder: [
                'Trafic qualifié &amp; CAC',
                'Conversion &amp; panier moyen',
                'Omnicanal &amp; marketplaces',
                'Scale en Europe'
            ]
        },
        {
            id: 'fintech',
            label: 'FinTech & insurtech',
            tagline: 'FinTech · InsurTech · Réglementé',
            peer: 'FinTech, InsurTech et acteurs finance digitale',
            intro: 'nous accompagnons des <strong style="color:#e8eef4;">FinTech &amp; InsurTech</strong> sur leur stratégie commerciale dans un environnement réglementé.',
            pain: 'Cycle de vente long, conformité exigeante : difficile de scaler le commercial sans message clair et preuves de confiance.',
            painOnline: 'Banques, assureurs et partenaires comparent conformité, sécurité et clarté produit — votre vitrine digitale compte autant que votre deck.',
            painMarket: 'Sans contenus adaptés (KYC, paiement, open banking, embedded…), les leads institutionnels ne passent pas le premier filtre.',
            value: [
                'Positionnement &amp; messaging réglementé',
                'Parcours de vente B2B / partenariats',
                'Crédibilité (sécurité, conformité, refs)',
                'Site &amp; assets pour décideurs finance'
            ],
            reminder: [
                'Partenariats &amp; intégrations',
                'Conformité &amp; confiance',
                'Pipeline institutionnel',
                'Expansion Europe'
            ]
        }
    ];

    function buildSectorTemplates(sector) {
        const base = {
            sectorGroup: sector.label,
            brand_wrap: '0',
            template_id: sector.id
        };

        return [
            {
                ...base,
                id: sector.id + '-question',
                sequenceLabel: '1 · Question rapide',
                name: sector.label + ' — Question rapide',
                subject: 'Question rapide — ' + sector.label,
                preheader: 'Un échange de 30 min pour voir si nous pouvons vous aider.',
                cta_url: CALENDLY,
                cta_label: '📅 Planifier un appel',
                body_html: darkShell(
                    sector.tagline,
                    '<p style="color:#ffffff;font-weight:600;margin-top:0;">{{salutation}},</p>' +
                    '<p style="color:#8b9cb3;">Je vous contacte car ' + sector.intro + '</p>' +
                    '<p style="color:#8b9cb3;">' + sector.pain + '</p>' +
                    valueBox('Ce que nous mettons en place', sector.value) +
                    '<p style="color:#8b9cb3;">Seriez-vous ouvert à un échange rapide pour voir si une amélioration est possible chez {{entreprise}} ?</p>' +
                    ctaButton(CALENDLY, '📅 Planifier un appel') +
                    '<p style="margin-top:18px;color:#8b9cb3;">ou répondez simplement à cet e-mail.</p>' +
                    signatureBlock(),
                    'Échange rapide — secteur ' + sector.label
                )
            },
            {
                ...base,
                id: sector.id + '-relance',
                sequenceLabel: '2 · Relance',
                name: sector.label + ' — Relance',
                subject: 'Je me permets de revenir vers vous',
                preheader: sector.label + ' — est-ce un sujet pour vous en ce moment ?',
                cta_url: CALENDLY,
                cta_label: '📅 Voir les disponibilités',
                body_html: darkShell(
                    sector.tagline,
                    '<p style="color:#ffffff;font-weight:600;margin-top:0;">{{salutation}},</p>' +
                    '<p style="color:#8b9cb3;">Je me permets de revenir vers vous suite à mon précédent message.</p>' +
                    '<p style="color:#8b9cb3;">Est-ce que la <strong style="color:#e8eef4;">croissance commerciale</strong> ou la <strong style="color:#e8eef4;">structuration de votre activité</strong> dans l\'IT est un sujet pour {{entreprise}} en ce moment ?</p>' +
                    valueBox('Rappel — ' + sector.label, sector.reminder) +
                    '<p style="color:#8b9cb3;">Si ce n\'est pas une priorité, je comprends totalement.<br/>Sinon, je propose un échange de 30 minutes.</p>' +
                    ctaButton(CALENDLY, '📅 Voir les disponibilités') +
                    signatureBlock(),
                    'Relance — ' + sector.label
                )
            },
            {
                ...base,
                id: sector.id + '-cloture',
                sequenceLabel: '3 · Clôture',
                name: sector.label + ' — Suite à mon message',
                subject: 'Suite à mon message',
                preheader: 'Dernier message — un simple retour suffit.',
                cta_url: CALENDLY,
                cta_label: '📅 Planifier un échange',
                body_html: darkShell(
                    '',
                    '<p style="color:#ffffff;font-weight:600;margin-top:0;">{{salutation}},</p>' +
                    '<p style="color:#8b9cb3;">Je me permets un dernier message pour ne pas vous déranger inutilement.</p>' +
                    '<p style="color:#8b9cb3;">Sans retour de votre part, j\'imagine que ce n\'est pas une priorité — je clôture proprement mon suivi.</p>' +
                    valueBox('Rappel — ' + sector.label, sector.value.slice(0, 4)) +
                    '<p style="color:#8b9cb3;">Un simple retour suffit :</p>' +
                    interestButtons() +
                    ctaButton(CALENDLY, '📅 Planifier un échange') +
                    '<p style="margin-top:18px;color:#8b9cb3;">Merci pour votre temps.</p>' +
                    signatureBlock(),
                    'Clôture séquence — ' + sector.label
                )
            },
            {
                ...base,
                id: sector.id + '-opportunites',
                sequenceLabel: '4 · Opportunités perdues',
                name: sector.label + ' — Opportunités',
                subject: 'Perdez-vous des opportunités commerciales ?',
                preheader: sector.painOnline.slice(0, 120),
                cta_url: CONTACT,
                cta_label: '📩 Oui, je suis intéressé',
                body_html: darkShell(
                    sector.tagline,
                    '<p style="color:#ffffff;font-weight:600;margin-top:0;">{{salutation}},</p>' +
                    '<p style="color:#8b9cb3;">Je contacte des ' + sector.peer + ' comme {{entreprise}}.</p>' +
                    '<p style="color:#8b9cb3;">' + sector.painOnline + '</p>' +
                    valueBox('Ce que nous mettons en place', sector.value) +
                    '<p style="color:#8b9cb3;">Seriez-vous ouvert à un échange de 30 minutes cette semaine ?</p>' +
                    ctaButton(CONTACT, '📩 Oui, je suis intéressé') +
                    signatureBlock(),
                    'Opportunités — ' + sector.label
                )
            },
            {
                ...base,
                id: sector.id + '-marche',
                sequenceLabel: '5 · Marché & visibilité',
                name: sector.label + ' — Marché & visibilité',
                subject: 'Votre visibilité sur le marché ' + sector.label,
                preheader: sector.painMarket.slice(0, 120),
                cta_url: CALENDLY,
                cta_label: '📅 Planifier un échange',
                body_html: darkShell(
                    sector.tagline,
                    '<p style="color:#ffffff;font-weight:600;margin-top:0;">{{salutation}},</p>' +
                    '<p style="color:#8b9cb3;">' + sector.painMarket + '</p>' +
                    '<p style="color:#8b9cb3;">Chez {{entreprise}}, une stratégie commerciale claire et une présence digitale crédible font souvent la différence.</p>' +
                    valueBox('Notre approche — ' + sector.label, sector.value) +
                    '<p style="color:#8b9cb3;">Seriez-vous ouvert à un échange rapide pour en discuter ?</p>' +
                    ctaButton(CALENDLY, '📅 Planifier un échange') +
                    signatureBlock(),
                    'Marché — ' + sector.label
                )
            }
        ];
    }

    const TEMPLATES = [];

    IT_SECTORS.forEach((sector) => {
        buildSectorTemplates(sector).forEach((t) => TEMPLATES.push(t));
    });

    TEMPLATES.push(
        {
            id: 'it-generique-question',
            sectorGroup: 'IT — Général',
            sequenceLabel: '1 · Question rapide',
            name: 'IT Général — Question rapide',
            subject: 'Question rapide — écosystème IT',
            preheader: 'Conseil & stratégie pour acteurs de l\'informatique en Europe.',
            brand_wrap: '0',
            cta_url: CALENDLY,
            cta_label: '📅 Planifier un appel',
            body_html: darkShell(
                'IT · Digital · Conseil · Europe',
                '<p style="color:#ffffff;font-weight:600;margin-top:0;">{{salutation}},</p>' +
                '<p style="color:#8b9cb3;">Je vous contacte car nous accompagnons des acteurs de l\'<strong style="color:#e8eef4;">écosystème informatique</strong> (ESN, SaaS, agences, cyber, cloud, startups…) sur leur stratégie commerciale et leur croissance en Europe.</p>' +
                '<p style="color:#8b9cb3;">Beaucoup peinent à structurer leur pipe, leur message et leur visibilité — tout en livrant la qualité technique attendue.</p>' +
                valueBox('Ce que nous mettons en place', [
                    'Stratégie commerciale &amp; go-to-market IT',
                    'Positionnement &amp; proposition de valeur',
                    'Processus avant-vente &amp; delivery',
                    'Visibilité digitale &amp; crédibilité B2B'
                ]) +
                '<p style="color:#8b9cb3;">Seriez-vous ouvert à un échange rapide pour {{entreprise}} ?</p>' +
                ctaButton(CALENDLY, '📅 Planifier un appel') +
                signatureBlock(),
                'IT général — premier contact'
            )
        },
        {
            id: 'remerciement-contact',
            sectorGroup: 'Autres',
            sequenceLabel: 'Remerciement',
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
            sectorGroup: 'Autres',
            sequenceLabel: 'Libre',
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
    );

    function getTemplate(id) {
        return TEMPLATES.find((t) => t.id === id) || null;
    }

    function listTemplates() {
        return TEMPLATES.map(({ id, name, sectorGroup }) => ({ id, name, sectorGroup }));
    }

    function listSectors() {
        return IT_SECTORS.map((s) => ({ id: s.id, label: s.label }));
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
            '<p style="margin:6px 0 0;font-size:13px;opacity:0.95;">IT · Conseil · Stratégie · Europe</p>' +
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
            .replace(/\{\{company\}\}/gi, 'TechFlow SAS')
            .replace(/\{\{entreprise\}\}/gi, 'TechFlow SAS')
            .replace(/\{\{unsubscribe\}\}/gi, '#');
    }

    global.GloriamMailTemplates = {
        TEMPLATES,
        IT_SECTORS,
        getTemplate,
        listTemplates,
        listSectors,
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
