// Content of the /merci-2 landing page: the exact copy and images of /merci (the Astro page served as is),
// laid out with the site's design system so the two versions can be compared. Images are the local
// copies made for /merci (public/lp/merci/img).

const img = (name: string) => `/lp/merci/img/${name}`;

export const CALENDLY_ARTHUR = "https://calendly.com/arthur-techflow-connect/appel-decouverte";
export const ANCHOR = "#rendez-vous";

export const merci = {
  meta: {
    title: "Votre demande est bien reçue, choisissez votre créneau | TechFlow",
    description: "Dernière étape : réservez vos 30 minutes avec Arthur pour analyser votre présence en ligne et repartir avec un plan d'action.",
  },
  cta: "Choisir mon créneau",
  hero: {
    eyebrow: "Demande reçue · Il reste une étape",
    line1: "Votre demande est bien arrivée.",
    line2: "Choisissez votre créneau.",
    text: [
      "Lors de cette visio de 30 minutes, on analyse votre présence en ligne, on identifie ce qui freine vos visiteurs, et vous repartez avec un plan d'action concret.",
      "Réservez le moment qui vous arrange, juste en dessous.",
    ],
    strong: "Sans engagement, sans carte bancaire.",
  },
  calendly: { fallback: "Le calendrier ne s'affiche pas ?", open: "Ouvrir dans un nouvel onglet" },
  logos: {
    label: "Ils nous font confiance",
    items: [
      { name: "Havas", src: img("5f9831-68f917934c54a3dfd00c1dcf_Havas-logo.png") },
      { name: "Studi", src: img("b55d0c-68f91792b0594a0ea54db775_Studi-logo.svg") },
      { name: "Epoka", src: img("51a157-68f91791899d883c59158a2c_epoka-logo.svg") },
      { name: "Kretz", src: img("fa91a6-68f91793f1b9d28e8e3db60b_kretz-real-estate-logo.svg") },
      { name: "Leapmotor", src: img("af5af5-68f91792de9a569f2d51c207_leap-motor-logo.svg") },
      { name: "Exelmans", src: img("425f16-68f91791eb2eda3a9d7f995e_exelmans-logo.svg") },
      { name: "Groupe Revive", src: img("583b4a-68f91792ca1f95adf37d2711_Groupe-Revive-logo.png") },
      { name: "Monsite", src: img("445af2-68f91792ecc989ff304080be_LOGO-MONSITE.png") },
    ],
  },
  stats: [
    { value: "+1 500", label: "sites créés, tous secteurs" },
    { value: "12 ans", label: "d'accompagnement des TPE et PME" },
    { value: "98 %", label: "de clients satisfaits" },
    { value: "12", label: "designers, développeurs, chefs de projet" },
  ],
  videos: {
    title: "Ils l'ont fait. *Écoutez-les.*",
    sub: "Des dirigeants comme vous, qui ont transformé leur présence en ligne en machine à demandes.",
    items: [
      { playbackId: "EnaeBc01go7l4cDKZgvBb02NOiBC8pYTElMQgIXWeKsxY", name: "Sebastien Pointel", role: "Fondateur @Elevat'up" },
      { playbackId: "pxHRX5JBT701PYGLG6upuB6ybS1oh44dan5ywg00K1Z00U", name: "Maxime Parra", role: "Fondateur @Agence 48h" },
      { playbackId: "JHyglAa02I8rjDBy1mB01Y6Lwrg02EQ4IJa2klHUI00pgSQ", name: "Guillaume Reislin", role: "Directeur @AMA-Campus" },
    ],
  },
  diagnostic: {
    eyebrow: "Le diagnostic",
    title: "30 minutes qui peuvent *changer votre année*",
    items: [
      { title: "On analyse votre présence en ligne", text: "Votre site actuel, ou son absence, votre image, votre visibilité sur les recherches de votre métier." },
      { title: "On identifie les 3 plus gros freins", text: "Ce qui empêche concrètement vos visiteurs de devenir des clients : structure, messages, réassurance, appels à l'action." },
      { title: "Vous repartez avec un plan d'action", text: "Concret et chiffré. Que nous travaillions ensemble ou non, vous repartez avec des réponses." },
    ],
  },
  gallery: {
    eyebrow: "Réalisations",
    title: "Voici les sites que nous *avons réalisés*",
    sub: "Chaque site est conçu sur mesure : votre image, vos messages, votre métier.",
    rows: [
      [
        "93832c-6a840be9c8592b2f664708cc_OPCO-EP.webp",
        "088092-6a840ba850b85c048a23774b_Little-Spark.webp",
        "53c483-6a840b9b089f4318bad90641_LeapMotor.webp",
        "48c787-6a840bd4b8f2ae2557d8e4c3_Mandil.webp",
        "af6ea5-6a840b06aa8839a1086860aa_Concorde.webp",
        "e2ae6b-6a840b5d1b1c232e75fbe614_EXELMANs.webp",
        "a5aae3-6a840b1eb8f2ae2557d87110_D6.webp",
        "140550-6a840af52f3135c185bc5f39_Caretta.webp",
        "6c41a2-6a840bff8b6f9af87d3ed724_Tandem-Partners.webp",
      ].map(img),
      [
        "b75450-6a840b69b45c8931435a3a92_Group-Revive.webp",
        "9e815f-6a840b4aaa8839a10868823a_Eureka.webp",
        "ed1f32-6a840bb45a546c7889cb2a6c_Ma-Carrie-re-Immo.webp",
        "aac701-6a840b90ac152ba54ad04fec_Koulier.webp",
        "8556ae-6a840b14aa8839a1086867a7_Convergences.webp",
        "d24e69-6a840b2aaa8839a1086870bc_Emme-Studio.webp",
        "67a0db-6a840be0dcd3f783ed10bcf3_ooinvestir.webp",
        "191e13-6a840b7aa30b90c0ceaec2d5_Je-trouve-mon-avocat.webp",
        "e333be-6a840b868bb7a268e56c33d7_Je-Trouve-Mon-Demenageur.webp",
      ].map(img),
    ],
  },
  projects: {
    eyebrow: "Réalisations",
    title: "Des projets menés, *des chiffres à l'appui*",
    sub: "Trois métiers différents, la même méthode, et des résultats mesurés.",
    cta: "Choisir mon créneau",
    items: [
      {
        name: "Épargne Plurielle Avenir",
        sector: "Conseil en gestion de patrimoine",
        text: "Montée en gamme du cabinet : identité élégante, réassurance, audit patrimonial accessible depuis chaque page.",
        image: img("lp-proof-epa.webp"),
        metrics: [["×3", "demandes de rendez-vous"], ["12 %", "des visiteurs demandent un audit"], ["1,4 s", "de chargement"]],
      },
      {
        name: "AMA Campus",
        sector: "Organisme de formation · groupe Studi",
        text: "Refonte complète d'un site de 6 ans : architecture, catalogue de 60 formations filtrable, formulaires repensés.",
        image: img("lp-proof-ama.webp"),
        metrics: [["+41 %", "de visiteurs en 6 mois"], ["+21 %", "de conversion"], ["+54", "inscriptions par mois"]],
      },
      {
        name: "Place des Aînés",
        sector: "Plateforme médico-sociale",
        text: "Une activité entière créée en ligne : marque, parcours familles et plateforme complète avec automatisations.",
        image: img("lp-proof-pda.webp"),
        metrics: [["3 mois", "de la page blanche au lancement"], ["100 %", "du parcours digitalisé"], ["48 h", "de délai de mise en relation"]],
      },
    ],
  },
  compare: {
    title: "Pourquoi nous sommes *le choix naturel ?*",
    sub: "Une seule équipe qui couvre stratégie, design et développement, engagée sur vos résultats, pas seulement sur des livrables.",
    columns: ["TechFlow", "Autres agences", "Freelances"] as [string, string, string],
    criterion: "Ce qui compte pour vous",
    rows: [
      { label: "Équipe dédiée", values: ["yes", "yes", "no"] },
      { label: "Accompagnement stratégique", values: ["yes", "no", "no"] },
      { label: "Design et ingénierie", values: ["yes", "yes", "yes"] },
      { label: "Migrations sans perte de référencement", values: ["yes", "no", "yes"] },
      { label: "Suivi après le lancement", values: ["yes", "yes", "no"] },
      { label: "Engagement sur les résultats", values: ["yes", "no", "no"] },
    ] as { label: string; values: ["yes" | "no", "yes" | "no", "yes" | "no"] }[],
  },
  who: {
    eyebrow: "Pour qui ?",
    title: "Vous vous *reconnaissez ?*",
    cards: [
      { title: "Les TPE sans site sérieux", text: "Votre activité tourne, mais votre présence en ligne ne suit pas. Vos clients vous cherchent, et trouvent vos concurrents." },
      { title: "Les dirigeants sans une minute", text: "Devis, clients, équipes… Le site passe toujours en dernier. Il vous faut quelqu'un qui s'en occupe entièrement." },
      { title: "Les PME au site vieillissant", text: "Fait il y a 5 ans, plus au niveau de votre entreprise. Chaque visite renvoie une image qui vous dessert." },
    ],
    highlight: { title: "Envie de savoir ce que votre site devrait vous rapporter ?", text: "30 minutes pour analyser votre potentiel, chiffres à l'appui.", cta: "Choisir mon créneau ↗" },
  },
  reviews: {
    eyebrow: "Avis clients",
    title: "Ils nous ont confié *leur projet*",
    sub: "Des avis 5 étoiles, tous secteurs confondus, et des clients qui reviennent.",
    items: [
      { quote: "J'ai eu le plaisir de travailler avec TechFlow sur la création complète du site internet Rox Evolution, et je suis ravi du résultat ! Leur expertise technique associée à leur capacité d'écoute ont permis de répondre parfaitement à nos besoins tout en respectant un budget très compétitif. Ils ont également pris le temps nécessaire pour former mes équipes.", name: "Barthélémy Fendt", photo: img("57e37a-6a6972f73fd2321ce1906711_69004936a82e20bd87450667_Barthe-le-my-Fendt.webp"), role: "Podcasteur @Extraterrien" },
      { quote: "Nous avons fait appel à TechFlow et leurs équipes pour l'identité visuelle et la construction du site internet d'une de nos ventures. Très satisfaits à la fois de la manière dont le projet a été géré et de son résultat final.", name: "Soreasmey Ke Bin", photo: img("7eef24-6a697152495be66e86ffb4de_67a18d1411f7b73395ce2a44_61f8bd75106f7801ff8e50d9_Soreasmey-KeBin-Confluences.webp"), role: "CEO @Confluences.asia" },
      { quote: "TechFlow a pu comprendre notre identité et notre culture d'entreprise en peu de temps et a livré un site qui répond précisément à ces aspects clés de notre stratégie numérique.", name: "Denis Barre", photo: img("738e55-6a6972c6790e43ba8a823476_67a18b3f398337dc6c9d33c1_denis-barre.webp"), role: "CEO @Convergences" },
      { quote: "Ils ont parfaitement compris nos besoins et ont fourni des solutions créatives et efficaces. Le site est moderne, fonctionnel et reflète exactement l'image que nous voulions donner à l'entreprise.", name: "Adrien Charrier", photo: img("782d6d-6a6973f6edcd3dec7f50249d_2026-07-29-10.29.11.webp"), role: "Directeur Général @Eureka" },
      { quote: "TechFlow a livré un projet web exceptionnel. Tout était parfaitement exempt de bugs, bien documenté et a dépassé toutes les attentes. Leur communication proactive a fait de notre collaboration un jeu d'enfant.", name: "Ludovic de Jouvancourt", photo: img("1f54c8-6a7004d2d1ab382fc1ff66c3_680607bc0efd49f10a5c33bd_1695201008865.webp"), role: "CEO @Prello" },
      { quote: "Nous avons été pleinement satisfaits de cette collaboration. Le suivi était vraiment pro jusqu'au bout.", name: "Tommy Jean", role: "CEO @Gin Agency" },
      { quote: "TechFlow ont parfaitement compris mes besoins et mes difficultés et ont su proposer des solutions proactives. La communication a été fluide et le travail a été livré dans les délais. Merci !", name: "Elsa Lenthal", photo: img("b75849-6a7004d2cdd0f83278cf8ec5_68060165bc81ec3380a1f36c_mif-13_0.webp"), role: "CEO @Elsa Lenthal Lavandes" },
      { quote: "Le nouveau site est visuellement attrayant, convivial et a considérablement amélioré ma présence en ligne. J'ai reçu de nombreux compliments sur son design et ses fonctionnalités. Ils ont pris le temps de comprendre mes besoins et mes objectifs spécifiques et m'ont livré un site web qui a dépassé mes attentes.", name: "Sarah Kolbenstetter", photo: img("4e34fb-6a7004d210410501f5a8e816_69004a6a7e999d5634fd6ed7_Sarah-Kolbenstetter.webp"), role: "Fondatrice @Little Green Spark" },
      { quote: "Efficace, professionnel et conforme à nos attentes. Les créations graphiques livrées étaient non seulement conformes à nos attentes, mais aussi réalisées avec efficacité et rigueur. La communication a été fluide et les délais respectés.", name: "Rémi Cabrieres", photo: img("ec2997-6a7003d2a1ff6f59ec75e8c5_68060410318be866fbe90caa_1517364174889.webp"), role: "CFO @Sakam Security Aviation" },
      { quote: "Nous avons confié la création de notre site à TechFlow et nous en sommes très satisfaits. De bonnes idées et force de propositions. Maximilien et son équipe ont su proposer des solutions à des problématiques de visibilité et de présentation de nos projets.", name: "Andrea Morena", photo: img("b68a2c-6a7004d2a85d134a14e31a1c_67a18bac6a1b30b8c7509443_andrea-morena.webp"), role: "Fondateur @Emme Studio" },
      { quote: "Super travail, créatif, rapide, efficace… une parfaite collaboration. La communication a été fluide et les délais respectés.", name: "David Bossan", photo: img("9cda74-6a6971d93a2495d2a8f4f02e_67a18d9fa0afa1791c9adcad_david-bossan-590x600.webp"), role: "Directeur Général @District 6 Publishing" },
      { quote: "Travailler avec TechFlow a été facile et nous a fourni exactement ce dont nous avions besoin dans les délais impartis. Je le recommande vivement.", name: "Matias Andres", photo: img("9d3a46-6a7004d2acb5d946183e0515_69004991550ade63440584d9_Matias-Andres-Frontkick.webp"), role: "Chief Editor @Frontkick.Online" },
    ] as { quote: string; name: string; role: string; photo?: string }[],
  },
  how: {
    eyebrow: "Et ensuite ?",
    title: "Comment *ça se passe*",
    items: [
      { title: "Réservez votre créneau", text: "Choisissez l'horaire qui vous arrange, la visio dure 30 minutes." },
      { title: "On échange sur votre activité", text: "Votre métier, vos clients, vos objectifs. Pas de jargon, pas de pression commerciale." },
      { title: "Recevez votre plan d'action", text: "Les 3 freins identifiés et nos recommandations, noir sur blanc, sous 48 heures." },
    ],
  },
  faq: {
    eyebrow: "Questions fréquentes",
    title: "Vos questions, *sans détour*",
    items: [
      { q: "Pourquoi choisir TechFlow pour mon projet ?", a: "Nous combinons expertise technique et créativité pour créer des solutions sur mesure. Notre équipe maîtrise les dernières technologies et suit une méthode éprouvée qui garantit des projets livrés dans les temps et le budget, avec une approche personnalisée, un suivi régulier et une communication transparente." },
      { q: "Quels types de projets réalisez-vous ?", a: "Sites vitrines professionnels, boutiques en ligne, pages d'atterrissage optimisées pour la conversion, applications web sur mesure et intégrations avec vos outils existants." },
      { q: "Combien ça coûte ?", a: "Chaque projet est unique : le budget dépend du périmètre, pages, contenus, fonctionnalités. Après le diagnostic, vous recevez une proposition ferme et détaillée. Pas de surprise, pas d'engagement caché." },
      { q: "Combien de temps faut-il pour créer mon site ?", a: "Un site vitrine se livre en 3 à 8 semaines selon sa complexité ; une boutique en ligne ou une application sur mesure demande 10 à 12 semaines. Le planning précis est fixé dès le début du projet." },
      { q: "Quel est votre processus de travail ?", a: "Quatre étapes : consultation initiale et analyse de vos besoins ; proposition détaillée avec maquettes et devis ; développement avec des points d'étape réguliers ; tests, mise en ligne et formation." },
      { q: "J'ai déjà un site, est-ce un problème ?", a: "Au contraire : nous partons de l'existant et nous l'améliorons, identité plus professionnelle, contenus mieux positionnés sur les moteurs de recherche, formulaires qui qualifient vos demandes." },
      { q: "Que se passe-t-il après la mise en ligne ?", a: "Vous bénéficiez de 3 mois de support gratuit après le lancement, corrections et ajustements mineurs inclus. Nous proposons ensuite des contrats de maintenance pour garantir la performance et la sécurité de votre site sur le long terme." },
      { q: "Mon site sera-t-il optimisé pour le référencement ?", a: "Oui, tous nos sites appliquent les meilleures pratiques : structure optimisée, vitesse de chargement, contenus travaillés, compatibilité mobile. Nous vous conseillons aussi pour améliorer votre visibilité sur le long terme, moteurs de recherche et intelligences artificielles." },
      { q: "Le diagnostic est-il vraiment gratuit ?", a: "Oui : 30 minutes, sans engagement et sans carte bancaire. Vous repartez avec un plan d'action, que nous travaillions ensemble ou non." },
    ],
  },
  final: {
    title: "Et si votre site travaillait *enfin pour vous ?*",
    sub: "30 minutes avec nous. Vous repartez avec les 3 freins à votre conversion et un plan d'action concret, que nous travaillions ensemble ou non.",
    primary: "Choisir mon créneau",
    secondary: "Voir les créneaux disponibles",
    mention: "Gratuit · Sans engagement · Réponse sous 48 h",
  },
  footer: {
    credit: "© 2026 TechFlow. Tous droits réservés.",
    legal: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Conditions générales d'utilisation", href: "/conditions-generales" },
      { label: "Paramètres des cookies", href: "/politique-de-confidentialite" },
    ],
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/we.are.techflow/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/techflow-agence/" },
    ],
  },
};
