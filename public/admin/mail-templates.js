/**
 * Modèles campagnes — projets IT / particuliers + secteurs IT pro (séquence HEXAHUB)
 * Variables : {{salutation}}, {{nom}}, {{email}}, {{entreprise}}, {{projet}}, {{unsubscribe}}
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

    /** Porteurs de projet, particuliers et TPE — besoins concrets (site web, app, digital) */
    const PROJECT_SECTORS = [
        {
            id: 'site-internet',
            label: 'Site internet',
            tagline: 'Site web · Vitrine · Landing',
            peer: 'personnes et organisations qui souhaitent lancer ou améliorer leur présence en ligne',
            intro: 'nous accompagnons des <strong style="color:#e8eef4;">particuliers, indépendants et petites structures</strong> qui veulent un site internet clair, professionnel et facile à faire évoluer.',
            pain: 'Beaucoup de projets de site restent au stade d\'idée : difficile de choisir la bonne approche, le bon budget, ou de trouver un interlocuteur qui comprend le besoin sans sur-complexifier.',
            painOnline: 'Votre activité mérite d\'être visible en ligne — mais entre modèles, CMS, freelance et agences, difficile de savoir par où commencer pour un site qui vous ressemble vraiment.',
            painMarket: 'Aujourd\'hui, un site crédible rassure avant même le premier échange : clarté du message, mobile, formulaire de contact et confiance visuelle font la différence.',
            value: [
                'Cadrage du besoin &amp; périmètre du site',
                'Structure, contenus &amp; parcours visiteur',
                'Design professionnel &amp; responsive',
                'Mise en ligne, suivi &amp; évolutions'
            ],
            reminder: [
                'Site vitrine ou landing page',
                'Portfolio, activité ou commerce local',
                'Formulaire de contact &amp; visibilité Google',
                'Budget maîtrisé &amp; livraison claire'
            ],
            closing: 'votre projet de site'
        },
        {
            id: 'particulier-projet',
            label: 'Particulier & projet perso',
            tagline: 'Projet IT · Particulier · Besoin concret',
            peer: 'particuliers et porteurs de projet avec un besoin informatique concret',
            intro: 'nous aidons des <strong style="color:#e8eef4;">particuliers</strong> à concrétiser un projet informatique : site web, outil en ligne, automatisation ou conseil pour structurer une idée.',
            pain: 'Quand on n\'est pas du métier, un projet IT peut sembler flou : par où commencer, combien ça coûte, qui peut réellement livrer — sans jargon ni mauvaises surprises.',
            painOnline: 'Vous avez une idée ou un besoin précis (site, outil, présence en ligne) mais vous cherchez quelqu\'un de fiable pour vous guider et réaliser proprement ?',
            painMarket: 'Un bon accompagnement, c\'est d\'abord écouter le besoin réel, proposer un plan simple et livrer quelque chose d\'utilisable — pas un devis incompréhensible.',
            value: [
                'Échange gratuit pour cadrer votre idée',
                'Recommandations honnêtes &amp; périmètre clair',
                'Réalisation ou mise en relation selon le besoin',
                'Suivi humain, sans jargon inutile'
            ],
            reminder: [
                'Site internet ou page de présentation',
                'Outil ou formulaire en ligne',
                'Conseil avant de lancer un projet',
                'Devis transparent &amp; délais réalistes'
            ],
            closing: 'votre projet'
        },
        {
            id: 'tpe-commerce',
            label: 'TPE, artisan & commerce',
            tagline: 'TPE · Artisan · Commerce local',
            peer: 'artisans, commerçants et TPE qui veulent développer leur activité grâce au digital',
            intro: 'nous accompagnons des <strong style="color:#e8eef4;">TPE, artisans et commerces locaux</strong> qui veulent être trouvés en ligne et convertir plus de contacts en clients.',
            pain: 'Entre Facebook, Google, bouche-à-oreille et un site vieillissant, beaucoup de petites structures perdent des opportunités faute d\'une vitrine digitale simple et efficace.',
            painOnline: 'Vos clients vous cherchent sur Google ou les réseaux — est-ce que votre site (ou votre absence de site) leur donne envie de vous contacter ?',
            painMarket: 'Pour une TPE, un site clair avec horaires, services, avis et contact direct peut remplacer des heures de prospection — si le message est bien cadré.',
            value: [
                'Site vitrine adapté à votre métier',
                'Référencement local &amp; fiche Google',
                'Prise de rendez-vous / devis en ligne',
                'Maintenance légère &amp; mises à jour'
            ],
            reminder: [
                'Visibilité locale &amp; crédibilité',
                'Site mobile &amp; rapide',
                'Contact &amp; demandes de devis',
                'Budget adapté aux TPE'
            ],
            closing: 'votre activité'
        },
        {
            id: 'refonte-site',
            label: 'Refonte & modernisation',
            tagline: 'Refonte · Migration · Mise à jour',
            peer: 'structures avec un site existant à moderniser ou remettre à niveau',
            intro: 'nous aidons à <strong style="color:#e8eef4;">refondre ou moderniser</strong> des sites internet devenus lents, datés ou difficiles à mettre à jour.',
            pain: 'Un site vieux de 5 ou 10 ans freine la confiance : design dépassé, pas adapté mobile, formulaires cassés — sans parler des failles de sécurité ou CMS abandonné.',
            painOnline: 'Votre site actuel vous freine-t-il : trop lent, pas mobile, difficile à modifier, ou plus du tout aligné avec ce que vous proposez aujourd\'hui ?',
            painMarket: 'Une refonte bien cadrée ne signifie pas tout recommencer : souvent, on garde l\'essentiel, on clarifie le message et on repart sur une base saine.',
            value: [
                'Audit rapide de l\'existant',
                'Nouveau design &amp; expérience mobile',
                'Migration contenus &amp; SEO de base',
                'Formation légère pour vos mises à jour'
            ],
            reminder: [
                'Site lent ou non responsive',
                'Contenus obsolètes ou confus',
                'Besoin de formulaires / paiement',
                'Sécurité &amp; maintenance'
            ],
            closing: 'votre refonte'
        },
        {
            id: 'app-sur-mesure',
            label: 'Application & outil sur mesure',
            tagline: 'App web · Outil métier · Sur mesure',
            peer: 'entrepreneurs et porteurs de projet qui ont besoin d\'un outil ou d\'une application web adaptée',
            intro: 'nous concevons des <strong style="color:#e8eef4;">applications et outils web sur mesure</strong> quand un site vitrine ou un Excel ne suffit plus.',
            pain: 'Tableurs, e-mails et outils génériques finissent par limiter la croissance : il faut un outil qui correspond vraiment au process métier — sans budget enterprise.',
            painOnline: 'Avez-vous un process (devis, réservation, suivi client, catalogue…) que vous aimeriez automatiser avec un outil simple et sur mesure ?',
            painMarket: 'Un bon outil métier fait gagner du temps chaque semaine — à condition d\'être bien cadré dès le départ, avec un MVP réaliste.',
            value: [
                'Atelier cadrage &amp; spécifications',
                'Prototype ou MVP fonctionnel',
                'Développement web sur mesure',
                'Évolutions &amp; support après lancement'
            ],
            reminder: [
                'Outil interne ou client',
                'Automatisation de process',
                'Tableau de bord &amp; reporting',
                'Intégrations (paiement, CRM…)'
            ],
            closing: 'votre application'
        }
    ];

    /** Secteurs liés à l'informatique — contenu métier par vertical (B2B pro) */
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

    function buildProjectTemplates(sector) {
        const base = {
            sectorGroup: 'Projets & particuliers',
            brand_wrap: '0',
            template_id: sector.id
        };
        const orgLine = sector.closing || 'votre projet';
        const whoLine =
            '<p style="color:#8b9cb3;">Je contacte des ' + sector.peer +
            '. Si {{entreprise}} correspond à votre profil, cet échange pourrait vous concerner.</p>';

        return [
            {
                ...base,
                id: sector.id + '-question',
                sequenceLabel: '1 · Question rapide',
                name: sector.label + ' — Question rapide',
                subject: 'Question rapide — ' + sector.label.toLowerCase(),
                preheader: 'Un échange gratuit pour cadrer votre besoin, sans engagement.',
                cta_url: CALENDLY,
                cta_label: '📅 Planifier un appel',
                body_html: darkShell(
                    sector.tagline,
                    '<p style="color:#ffffff;font-weight:600;margin-top:0;">{{salutation}},</p>' +
                    '<p style="color:#8b9cb3;">Je vous contacte car ' + sector.intro + '</p>' +
                    '<p style="color:#8b9cb3;">' + sector.pain + '</p>' +
                    valueBox('Ce que nous pouvons faire pour vous', sector.value) +
                    '<p style="color:#8b9cb3;">Avez-vous un besoin en cours pour {{projet}} ? Seriez-vous ouvert à un échange rapide (30 min, gratuit) pour en parler ?</p>' +
                    ctaButton(CALENDLY, '📅 Planifier un appel') +
                    '<p style="margin-top:18px;color:#8b9cb3;">ou répondez simplement à cet e-mail.</p>' +
                    signatureBlock(),
                    'Projet — ' + sector.label
                )
            },
            {
                ...base,
                id: sector.id + '-relance',
                sequenceLabel: '2 · Relance',
                name: sector.label + ' — Relance',
                subject: 'Toujours d\'actualité pour vous ?',
                preheader: sector.label + ' — votre projet est-il toujours d\'actualité ?',
                cta_url: CALENDLY,
                cta_label: '📅 Voir les disponibilités',
                body_html: darkShell(
                    sector.tagline,
                    '<p style="color:#ffffff;font-weight:600;margin-top:0;">{{salutation}},</p>' +
                    '<p style="color:#8b9cb3;">Je me permets de revenir vers vous suite à mon précédent message.</p>' +
                    '<p style="color:#8b9cb3;">Est-ce que <strong style="color:#e8eef4;">' + orgLine + '</strong> est toujours d\'actualité pour vous en ce moment ?</p>' +
                    valueBox('Rappel — ' + sector.label, sector.reminder) +
                    '<p style="color:#8b9cb3;">Si ce n\'est pas le bon moment, je comprends totalement.<br/>Sinon, je propose un court échange pour avancer concrètement.</p>' +
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
                    '<p style="color:#8b9cb3;">Je me permets un dernier message pour ne pas vous importuner.</p>' +
                    '<p style="color:#8b9cb3;">Sans retour de votre part, j\'imagine que ce n\'est pas une priorité — je clôture proprement mon suivi.</p>' +
                    valueBox('Rappel — ' + sector.label, sector.value.slice(0, 4)) +
                    '<p style="color:#8b9cb3;">Un simple retour suffit :</p>' +
                    interestButtons() +
                    ctaButton(CALENDLY, '📅 Planifier un échange') +
                    '<p style="margin-top:18px;color:#8b9cb3;">Merci pour votre temps.</p>' +
                    signatureBlock(),
                    'Clôture — ' + sector.label
                )
            },
            {
                ...base,
                id: sector.id + '-besoin',
                sequenceLabel: '4 · Besoin concret',
                name: sector.label + ' — Besoin concret',
                subject: 'Un besoin concret en informatique ?',
                preheader: sector.painOnline.slice(0, 120),
                cta_url: CONTACT,
                cta_label: '📩 Décrire mon besoin',
                body_html: darkShell(
                    sector.tagline,
                    '<p style="color:#ffffff;font-weight:600;margin-top:0;">{{salutation}},</p>' +
                    whoLine +
                    '<p style="color:#8b9cb3;">' + sector.painOnline + '</p>' +
                    valueBox('Comment nous vous aidons', sector.value) +
                    '<p style="color:#8b9cb3;">Si cela vous parle, décrivez votre besoin en quelques lignes — ou réservez 30 minutes pour en discuter.</p>' +
                    ctaButton(CONTACT, '📩 Décrire mon besoin') +
                    signatureBlock(),
                    'Besoin concret — ' + sector.label
                )
            },
            {
                ...base,
                id: sector.id + '-visibilite',
                sequenceLabel: '5 · Visibilité en ligne',
                name: sector.label + ' — Visibilité en ligne',
                subject: 'Votre présence en ligne vous aide-t-elle vraiment ?',
                preheader: sector.painMarket.slice(0, 120),
                cta_url: CALENDLY,
                cta_label: '📅 Planifier un échange',
                body_html: darkShell(
                    sector.tagline,
                    '<p style="color:#ffffff;font-weight:600;margin-top:0;">{{salutation}},</p>' +
                    '<p style="color:#8b9cb3;">' + sector.painMarket + '</p>' +
                    '<p style="color:#8b9cb3;">Que vous soyez particulier, indépendant ou petite structure — un projet digital bien mené doit être <strong style="color:#e8eef4;">simple, utile et crédible</strong>.</p>' +
                    valueBox('Notre approche — ' + sector.label, sector.value) +
                    '<p style="color:#8b9cb3;">Seriez-vous ouvert à un échange rapide pour voir si nous pouvons vous aider sur {{projet}} ?</p>' +
                    ctaButton(CALENDLY, '📅 Planifier un échange') +
                    signatureBlock(),
                    'Visibilité — ' + sector.label
                )
            }
        ];
    }

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

    PROJECT_SECTORS.forEach((sector) => {
        buildProjectTemplates(sector).forEach((t) => TEMPLATES.push(t));
    });

    IT_SECTORS.forEach((sector) => {
        buildSectorTemplates(sector).forEach((t) => TEMPLATES.push(t));
    });

    TEMPLATES.push(
        {
            id: 'it-generique-question',
            sectorGroup: 'IT — Général',
            sequenceLabel: '1 · Question rapide',
            name: 'IT Général — Question rapide',
            subject: 'Question rapide — projet ou activité IT',
            preheader: 'Particuliers, TPE et acteurs IT — conseil & réalisation en Europe.',
            brand_wrap: '0',
            cta_url: CALENDLY,
            cta_label: '📅 Planifier un appel',
            body_html: darkShell(
                'IT · Digital · Conseil · Europe',
                '<p style="color:#ffffff;font-weight:600;margin-top:0;">{{salutation}},</p>' +
                '<p style="color:#8b9cb3;">Je vous contacte car nous accompagnons <strong style="color:#e8eef4;">particuliers, TPE et acteurs de l\'informatique</strong> : site internet, outil sur mesure, refonte, ou stratégie commerciale pour les structures IT.</p>' +
                '<p style="color:#8b9cb3;">Que ce soit un projet concret (site web, application) ou le développement d\'une activité IT, beaucoup de monde manque de clarté sur le périmètre, le budget et le bon interlocuteur.</p>' +
                valueBox('Ce que nous mettons en place', [
                    'Sites web &amp; présence en ligne',
                    'Applications &amp; outils sur mesure',
                    'Conseil &amp; stratégie pour acteurs IT',
                    'Accompagnement clair, sans jargon'
                ]) +
                '<p style="color:#8b9cb3;">Avez-vous un besoin ou un projet en cours ? Seriez-vous ouvert à un échange rapide ?</p>' +
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
        const projects = PROJECT_SECTORS.map((s) => ({ id: s.id, label: s.label, group: 'projets' }));
        const it = IT_SECTORS.map((s) => ({ id: s.id, label: s.label, group: 'it' }));
        return projects.concat(it);
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
            .replace(/\{\{projet\}\}/gi, 'création de site vitrine')
            .replace(/\{\{unsubscribe\}\}/gi, '#');
    }

    global.GloriamMailTemplates = {
        TEMPLATES,
        PROJECT_SECTORS,
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
            { key: '{{entreprise}}', label: 'Entreprise / activité' },
            { key: '{{projet}}', label: 'Projet (ex. site internet)' },
            { key: '{{unsubscribe}}', label: 'Désinscription' }
        ]
    };
})(typeof window !== 'undefined' ? window : globalThis);
