/**
 * Seed (2026-10-05): the Elsa Lenthal growth case study (Provence lavender brand, Meta sales
 * campaign + Brevo CRM + checkout journey), FR + EN, built on the G.A.T.O Tower template.
 * Figures come from the July–August 2026 campaign reports (emails of 26/08 and 25/09):
 * only ratios and deltas, no exact sales counts (client request). Created "Staging only".
 *
 *   npx sanity exec scripts/seed-growth-elsa-lenthal.ts --with-user-token -- --media=<dir> [--dry-run] [--replace]
 *
 * <dir> holds the three ad MP4s, their posters and logo.svg (kept out of the repo).
 */
import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import {getCliClient} from 'sanity/cli'

const DRY_RUN = process.argv.includes('--dry-run')
const REPLACE = process.argv.includes('--replace')
const MEDIA = process.argv.find((a) => a.startsWith('--media='))?.slice(8)
if (!MEDIA) throw new Error('--media=<dir> is required')
const client = getCliClient({apiVersion: '2026-09-29'})

type Lang = 'fr' | 'en'
let n = 0
const key = () => `k${(++n).toString(36)}`
const keyed = <T extends object>(items: T[], _type?: string) => items.map((item) => ({_key: key(), ...(_type ? {_type} : {}), ...item}))
const metrics = (items: [string, string][]) => keyed(items.map(([value, label]) => ({value, label})), 'metric')
const span = (text: string, marks: string[] = []) => ({_type: 'span', _key: key(), text, marks})
const block = (style: string, children: ReturnType<typeof span>[], extra: Record<string, unknown> = {}) => ({_type: 'block', _key: key(), style, markDefs: [], children, ...extra})
const p = (text: string) => block('normal', [span(text)])
const h2 = (text: string) => block('h2', [span(text)])
const li = (title: string, text: string, sep = ' : ') => block('normal', [span(title, ['strong']), span(`${sep}${text}`)], {listItem: 'bullet', level: 1})
const ref = (_ref: string) => ({_key: _ref, _type: 'reference', _ref})

const ADS = [
  {file: 'elsa-asmr-voix-off', duration: '0:20', platform: 'instagram'},
  {file: 'elsa-packshot-1-voix-off', duration: '0:21', platform: 'facebook'},
  {file: 'elsa-unboxing-1', duration: '0:19', platform: 'instagram'},
] as const

const content: Record<Lang, Record<string, unknown>> = {
  fr: {
    summary:
      "Des publicités vidéo, une campagne Meta pilotée vers l'achat, un parcours d'achat simplifié et un CRM Brevo réactivé : des dizaines de ventes en ligne supplémentaires pour une marque artisanale de lavande de Provence.",
    services: ['Concepts & scripts', 'Montage vidéo', 'Campagne Meta Ads', 'Parcours d’achat', 'CRM Brevo', 'Suivi des ventes'],
    heroTags: ['sector-fr-growth-marketing', 'sector-fr-ecommerce'],
    headline: 'Faire vendre en ligne un savoir-faire de Provence.',
    ctaLabel: 'Lancer ma campagne',
    stats: [
      ['+52 %', 'de commandes en ligne en août*'],
      ['+46 %', 'de CA en ligne en août*'],
      ['+56 %', 'de retour sur le budget pub'],
      ['4,7 %', 'de taux de clic (CTR)'],
    ],
    body: [
      p("Elsa Lenthal cultive la lavande dans les Alpilles et la transforme à la main en fuseaux, coussins et sachets, une maîtrise reconnue par le label Métiers d'Art. Ses boutiques de Saint-Rémy-de-Provence et d'Arles accueillent les visiteurs de la région ; en ligne, la marque restait sous-exploitée. Notre mission : faire de la boutique en ligne un vrai canal de vente, mesuré à l'euro près."),
      h2('Le défi'),
      p("Un produit artisanal se vend par le toucher et le parfum, deux choses qu'un écran ne transmet pas. Avant la campagne, la boutique en ligne convertissait autour de 1 % de ses visiteurs : il fallait à la fois faire venir les bonnes personnes et lever leurs hésitations jusqu'au paiement."),
      li('Une émotion à transmettre', "montrer le geste, la matière et la personne derrière la marque, en quelques secondes et sans le son."),
      li('Une campagne de vente, pas de visibilité', "chaque euro investi devait se retrouver dans le chiffre d'affaires, pas dans des likes."),
      li('Un parcours à fluidifier', 'du clic sur la publicité jusqu’à la commande, chaque frein coûtait des ventes.'),
      h2('Concepts, scripts et montage'),
      p("Nous avons construit les concepts autour de ce qui rend la marque unique : la voix d'Elsa, ses gestes, la lavande des Alpilles. Chaque vidéo défend un seul argument et le pose dès la première seconde : le savoir-faire de l'artisane, l'objet précieux, le plaisir de recevoir son colis. Nous avons écrit les scripts, monté les vidéos au format vertical 9:16, sous-titré chaque version pour une lecture sans le son, et décliné chaque concept en plusieurs versions pour les tester."),
      h2('Ciblage et campagne Meta'),
      p("La campagne Facebook et Instagram est optimisée pour l'achat, pas pour le clic : Meta cherche les personnes qui commandent, pas celles qui regardent. Nous avons ciblé les femmes de 35 à 64 ans intéressées par la santé et le bien-être, le cœur de clientèle de la marque, et laissé l'algorithme élargir progressivement à partir des premiers acheteurs."),
      li('Tests en continu', 'plusieurs créas tournent en parallèle ; la moins rentable est coupée régulièrement et le budget part vers celle qui vend.'),
      li('Suivi quotidien', 'dépense, clics, ajouts au panier et achats suivis chaque jour, avec un reporting mensuel partagé.'),
      h2('Un parcours d’achat sans friction'),
      p("Attirer du trafic ne sert à rien si le site le laisse repartir. Nous avons analysé le parcours de bout en bout et levé les freins un par un :"),
      li('Capture des visiteurs', 'un popup testé en A/B (un guide des adresses préférées d’Elsa dans les Alpilles contre une remise de bienvenue) pour récupérer l’e-mail des visiteurs qui ne commandent pas tout de suite.'),
      li('Livraison et réassurance', 'recommandations sur le seuil de livraison offerte et les messages de délais, pour ne plus décourager l’achat au dernier moment.'),
      h2('Un CRM Brevo qui travaille seul'),
      p("La base clients existait mais dormait. Nous avons structuré Brevo pour qu'il relance au bon moment, sans intervention manuelle : e-mail de bienvenue, relance des paniers abandonnés, demande d'avis après achat, newsletters et séquences pour réactiver les anciens clients."),
      h2('Mesurer chaque vente'),
      p("Chaque commande venue de la campagne est identifiée grâce à des liens de tracking et au pixel Meta, puis rapprochée des commandes réelles de la boutique. Nous savons ainsi exactement ce que la publicité rapporte, au-delà des chiffres déclarés par Meta, et nous ajustons la campagne sur ces ventes réelles."),
      h2('Les résultats'),
      p("En août, la campagne a rapporté plus que son budget publicitaire : +56 % de retour sur investissement, et des dizaines de ventes supplémentaires sur l'été. Rapportées à l'activité en ligne habituelle de la marque, les commandes venues de la campagne représentent +52 % de commandes et +46 % de chiffre d'affaires en ligne sur le mois."),
      p("* Commandes et chiffre d'affaires suivis par les liens de tracking en août 2026, comparés à la moyenne mensuelle de la boutique en ligne sur les 12 mois précédant la campagne."),
    ],
    results: [
      ['Des dizaines', 'de ventes supplémentaires sur l’été'],
      ['+16 %', 'de ROAS entre juillet et août'],
      ['+11 %', 'de panier moyen entre juillet et août'],
      ['0,11 €', 'par clic au lancement'],
    ],
    adsHeading: 'Les publicités, *telles qu’elles passent.*',
    adsIntro: "Cliquez sur un écran pour regarder la vidéo avec le son et voir ce qu'elle teste.",
    ads: [
      {angle: 'Le geste de l’artisane', hook: 'Je m’appelle Elsa Lenthal, je suis artisane d’art.', caption: 'Des fuseaux de lavande tissés à la main, au cœur des Alpilles.', cta: 'Acheter', note: 'La voix de la fondatrice et le son du geste : l’authenticité artisanale comme raison d’acheter.'},
      {angle: 'L’objet précieux', hook: 'Un objet rare, cueilli et tissé à la main.', caption: 'Le lavandin des Alpilles, cueilli à la main et tissé en fuseau.', cta: 'Acheter', note: 'Le produit seul, mis en valeur, face aux versions incarnées : laquelle fait le plus acheter ?'},
      {angle: 'Le plaisir de recevoir', hook: 'Ce que vous recevez chez vous.', caption: 'Emballé à la main en Provence, livré chez vous.', cta: 'Acheter', note: 'Montrer la réception du colis pour lever le doute d’un premier achat en ligne.'},
    ],
    seoTitle: 'Elsa Lenthal : campagne Meta, CRM Brevo et ventes en ligne | TechFlow',
    seoDescription: 'Étude de cas e-commerce : publicités vidéo, campagne Meta orientée achat, parcours d’achat et CRM Brevo pour une marque artisanale de lavande de Provence.',
  },
  en: {
    summary:
      'Video ads, a Meta campaign optimised for purchases, a smoother checkout journey and a reactivated Brevo CRM: dozens of extra online sales for an artisan Provence lavender brand.',
    services: ['Concepts & scripts', 'Video editing', 'Meta Ads campaign', 'Checkout journey', 'Brevo CRM', 'Sales tracking'],
    heroTags: ['sector-en-growth-marketing', 'sector-en-ecommerce'],
    headline: 'Selling a Provence craft online.',
    ctaLabel: 'Launch my campaign',
    stats: [
      ['+52%', 'online orders in August*'],
      ['+46%', 'online revenue in August*'],
      ['+56%', 'return on ad spend'],
      ['4.7%', 'click-through rate'],
    ],
    body: [
      p('Elsa Lenthal grows lavender in the Alpilles and turns it by hand into lavender wands, cushions and sachets, a craft recognised by France’s Métiers d’Art label. Her shops in Saint-Rémy-de-Provence and Arles welcome visitors to the region; online, the brand was under-used. Our job: turn the online shop into a real sales channel, measured to the euro.'),
      h2('The challenge'),
      p('A handmade product sells through touch and scent, two things a screen can’t carry. Before the campaign the online shop converted around 1% of its visitors: we had to bring in the right people and remove their doubts all the way to checkout.'),
      li('An emotion to convey', 'show the gesture, the material and the person behind the brand, in a few seconds and without sound.', ': '),
      li('A sales campaign, not awareness', 'every euro spent had to show up in revenue, not in likes.', ': '),
      li('A journey to smooth out', 'from the ad click to the order, every bit of friction cost sales.', ': '),
      h2('Concepts, scripts and editing'),
      p('We built the concepts around what makes the brand unique: Elsa’s voice, her hands, Alpilles lavender. Each video makes a single case and states it in the first second: the maker’s craft, the precious object, the pleasure of receiving the parcel. We wrote the scripts, edited the videos in vertical 9:16, subtitled every version so it works without sound, and turned each concept into several versions to test.'),
      h2('Targeting and Meta campaign'),
      p('The Facebook and Instagram campaign is optimised for purchases, not clicks: Meta looks for people who buy, not people who watch. We targeted women aged 35 to 64 interested in health and wellbeing, the brand’s core customers, then let the algorithm broaden from the first buyers.'),
      li('Continuous testing', 'several creatives run side by side; the least profitable one is cut regularly and the budget moves to the one that sells.', ': '),
      li('Daily monitoring', 'spend, clicks, add-to-carts and purchases tracked every day, with a shared monthly report.', ': '),
      h2('A frictionless checkout journey'),
      p('Traffic is worthless if the site lets it walk away. We mapped the journey end to end and removed the obstacles one by one:'),
      li('Visitor capture', 'an A/B-tested popup (a guide to Elsa’s favourite places in the Alpilles against a welcome discount) to collect the email of visitors who don’t buy right away.', ': '),
      li('Shipping and reassurance', 'recommendations on the free-shipping threshold and delivery messages, so nothing discourages the purchase at the last step.', ': '),
      h2('A Brevo CRM that works on its own'),
      p('The customer base existed but lay dormant. We set Brevo up to follow up at the right time with no manual work: welcome email, abandoned-cart reminders, review requests after purchase, newsletters and sequences to win back past customers.'),
      h2('Measuring every sale'),
      p('Every order coming from the campaign is identified through tracking links and the Meta pixel, then matched against the shop’s real orders. We know exactly what the ads bring in, beyond the figures Meta reports, and tune the campaign on those real sales.'),
      h2('Results'),
      p('In August the campaign brought in more than its ad budget: a 56% return on ad spend, and dozens of extra sales over the summer. Compared with the brand’s usual online business, the orders it generated amount to 52% more online orders and 46% more online revenue for the month.'),
      p('* Orders and revenue tracked through the campaign links in August 2026, compared with the online shop’s monthly average over the 12 months before the campaign.'),
    ],
    results: [
      ['Dozens', 'of extra sales over the summer'],
      ['+16%', 'ROAS from July to August'],
      ['+11%', 'average order value from July to August'],
      ['€0.11', 'per click at launch'],
    ],
    adsHeading: 'The ads, *as they run.*',
    adsIntro: 'Click a screen to watch the video with sound and see what it tests.',
    ads: [
      {angle: 'The maker’s craft', hook: 'My name is Elsa Lenthal, I’m an artisan.', caption: 'Lavender wands woven by hand in the heart of the Alpilles.', cta: 'Shop now', note: 'The founder’s voice and the sound of her hands: craftsmanship as the reason to buy.'},
      {angle: 'The precious object', hook: 'A rare object, picked and woven by hand.', caption: 'Alpilles lavender, hand-picked and woven into a wand.', cta: 'Shop now', note: 'The product alone, in the spotlight, against the versions with a person: which one sells more?'},
      {angle: 'The joy of receiving', hook: 'What arrives at your door.', caption: 'Hand-packed in Provence, delivered to your home.', cta: 'Shop now', note: 'Showing the parcel arriving to remove the doubt of a first online purchase.'},
    ],
    seoTitle: 'Elsa Lenthal: Meta ads, Brevo CRM and online sales | TechFlow',
    seoDescription: 'E-commerce case study: video ads, a purchase-optimised Meta campaign, checkout journey and Brevo CRM for an artisan Provence lavender brand.',
  },
}

async function upload(kind: 'image' | 'file', name: string, filename: string) {
  if (DRY_RUN) return `dry-${name}`
  const asset = await client.assets.upload(kind, readFileSync(join(MEDIA!, name)), {filename})
  return asset._id
}

async function run() {
  const assets: Record<string, string> = {}
  for (const ad of ADS) {
    assets[ad.file] = await upload('file', `${ad.file}.mp4`, `${ad.file}.mp4`)
    assets[`${ad.file}-poster`] = await upload('image', `${ad.file}-poster.jpg`, `${ad.file}-poster.jpg`)
  }
  assets.logo = await upload('image', 'logo.svg', 'elsa-lenthal-logo.svg')
  const poster = (file: string) => ({_type: 'image', asset: {_type: 'reference', _ref: assets[`${file}-poster`]}})

  const ids: Record<Lang, string> = {fr: 'growth-elsa-lenthal-fr', en: 'growth-elsa-lenthal-en'}
  const tx = client.transaction()
  for (const lang of ['fr', 'en'] as const) {
    const c = content[lang] as Record<string, any>
    const doc = {
      _id: ids[lang],
      _type: 'growthCaseStudy',
      language: lang,
      title: 'Elsa Lenthal',
      previewOnly: true,
      slug: {_type: 'slug', current: 'elsa-lenthal'},
      accentColor: '#8e7cc3',
      handle: 'elsalenthal',
      order: 1,
      channels: ['Facebook', 'Instagram'],
      websiteUrl: 'https://elsalenthal.com',
      summary: c.summary,
      sectors: c.heroTags.map(ref),
      services: c.services,
      tools: [ref(lang === 'fr' ? 'FQ2Cy8IaSuS2fSnDjOsHTO' : 'VUn6cs9w33eiMCy1tObe0v')],
      team: [ref('FQ2Cy8IaSuS2fSnDjOsV48'), ref('1QxqbJjMgZAX0gBlijkQQ8')],
      hero: {tags: c.heroTags.map(ref), headline: c.headline, ctaLabel: c.ctaLabel, stats: metrics(c.stats)},
      body: c.body,
      results: {metrics: metrics(c.results)},
      adsSection: {heading: c.adsHeading, intro: c.adsIntro},
      ads: keyed(
        ADS.map((ad, i) => ({
          ...c.ads[i],
          platform: ad.platform,
          duration: ad.duration,
          video: {_type: 'file', asset: {_type: 'reference', _ref: assets[ad.file]}},
          poster: poster(ad.file),
        })),
        'adVideo',
      ),
      logo: {_type: 'image', asset: {_type: 'reference', _ref: assets.logo}},
      heroImage: {...poster('elsa-asmr-voix-off'), _type: 'imageWithAlt', alt: lang === 'fr' ? 'Panier de fuseaux de lavande dans un jardin des Alpilles' : 'Basket of lavender wands in an Alpilles garden'},
      coverImage: {...poster('elsa-packshot-1-voix-off'), _type: 'imageWithAlt', alt: lang === 'fr' ? 'Fuseaux de lavande rangés dans un tiroir en bois' : 'Lavender wands in a wooden drawer'},
      seo: {_type: 'seo', title: c.seoTitle, description: c.seoDescription},
    }
    console.log(`${lang}: ${(c.body as {style: string}[]).filter((b) => b.style === 'h2').length} chapters`)
    if (REPLACE) tx.createOrReplace(doc)
    else tx.createIfNotExists(doc)
  }
  tx.createIfNotExists({
    _id: 'translation-growth-elsa-lenthal',
    _type: 'translation.metadata',
    schemaTypes: ['growthCaseStudy'],
    translations: (['fr', 'en'] as const).map((language) => ({_key: language, _type: 'internationalizedArrayReferenceValue', language, value: {_type: 'reference', _ref: ids[language]}})),
  })
  if (DRY_RUN) return console.log('Dry run, nothing written.')
  await tx.commit()
  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
