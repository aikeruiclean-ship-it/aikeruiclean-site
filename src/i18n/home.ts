import type { Locale } from "./config";

// Homepage + shared UI copy in 5 languages.
// Product names / guide titles stay English (their pages are English for now).

export interface HomeDict {
  nav: {
    products: string;
    parts: string;
    guides: string;
    about: string;
    contact: string;
    quote: string;
  };
  hero: {
    badge: string;
    h1a: string;
    h1b: string;
    h1c: string;
    sub: string;
    cta: string;
    assurance: string;
  };
  categories: { kicker: string; title: string; sub: string; products: string };
  factoryNote: string;
  viewAll: string;
  trust: string[];
  verify: { lead: string; video: string; inspection: string; call: string };
  stats: { title: string; sub: string; items: { num: string; label: string }[] };
  featured: { title: string; sub: string; viewAll: string };
  parts: { title: string; sub: string; viewAll: string };
  why: { title: string; sub: string; items: { title: string; desc: string }[] };
  guides: { title: string; sub: string };
  cta: { title: string; sub: string; tour: string; browse: string; orCall: string; whatsapp: string };
  dubai: { title: string; sub: string; partner: string; address: string; contact: string; phone: string; note: string };
  footer: { tagline: string; quickLinks: string; contactUs: string };
}

const en: HomeDict = {
  nav: { products: "Products", parts: "Parts", guides: "Guides", about: "About", contact: "Contact", quote: "Get Quote" },
  hero: {
    badge: "Verified Manufacturer — Since 2008",
    h1a: "Floor Scrubber Brushes & Parts",
    h1b: "Factory Direct",
    h1c: "OEM & Wholesale",
    sub: "Aikerui is a verified brush manufacturer with our own factory in Anhui, China. Disc, cylindrical, roller & side brushes — replacement parts for Tennant, Karcher, Nilfisk & more. Factory-direct pricing, custom OEM.",
    cta: "Get Factory Price",
    assurance: "24-Hour Quote Response — Engineer-Level Support",
  },
  categories: { kicker: "Our Products", title: "Built in Our Factory, Shipped to You", sub: "Every machine is designed, manufactured, and tested in our Anqing facility before export.", products: "products" },
  factoryNote: "📸 Real photos from our factory floor",
  viewAll: "View all →",
  trust: ["Own 10,000+㎡ Factory", "CE & ISO Certified", "Export to 50+ Countries", "Talk to Our Sales Team"],
  verify: { lead: "Not sure if we are real? Here are 3 ways to verify:", video: "Live Video Tour", inspection: "Third-Party Inspection", call: "Call Factory Floor" },
  stats: {
    title: "Aikerui by the Numbers",
    sub: "Real factory, real capacity, real results.",
    items: [
      { num: "10,000+", label: "㎡ Factory" },
      { num: "50+", label: "Skilled Workers" },
      { num: "30+", label: "Machine Models" },
      { num: "2000+", label: "Machines Sold" },
    ],
  },
  featured: { title: "Featured Products", sub: "Our most popular industrial cleaning machines — factory direct", viewAll: "View All" },
  parts: { title: "Replacement Parts & Accessories", sub: "Disc brushes, squeegees, batteries, and more — manufactured to OEM specs", viewAll: "View All Parts" },
  why: {
    title: "Why Buy Direct from Aikerui?",
    sub: "When you buy from the factory, you save money, get better quality, and talk to the people who build the machines.",
    items: [
      { title: "Factory Direct Pricing", desc: "No middlemen markups. You pay the same price as our domestic distributors. Save 20-40% vs trading companies." },
      { title: "Quality You Can Verify", desc: "Every machine tested before shipment. CE certified, ISO 9001. Schedule a video call to see our QC process live." },
      { title: "Direct Engineer Support", desc: "When you need help, you talk to our engineers — not a sales rep. Spare parts shipped within 24 hours." },
    ],
  },
  guides: { title: "Floor Scrubber Buying Guides", sub: "Expert guides on brushes, parts, and maintenance — written by the manufacturer." },
  cta: { title: "Not Sure Yet? Let Us Show You.", sub: "Schedule a live video tour of our factory. See the production line, meet the team, and inspect the quality — all from your phone.", tour: "Request Live Video Tour", browse: "Browse Products", orCall: "Or call us directly:", whatsapp: "WhatsApp Sales Team" },
  dubai: {
    title: "Middle East Warehouse — Dubai, UAE",
    sub: "Local stock and support for Middle East and Africa customers.",
    partner: "Partner",
    address: "Address",
    contact: "Contact",
    phone: "Phone",
    note: "Fast delivery across the Gulf region. Contact us for stock availability.",
  },
  footer: { tagline: "Factory-direct manufacturer of industrial floor scrubbers, sweepers and replacement brushes since 2008.", quickLinks: "Quick Links", contactUs: "Contact Us" },
};

const es: HomeDict = {
  nav: { products: "Productos", parts: "Repuestos", guides: "Guías", about: "Nosotros", contact: "Contacto", quote: "Cotización" },
  hero: {
    badge: "Fabricante Verificado — Desde 2008",
    h1a: "Cepillos y Repuestos para Fregadoras",
    h1b: "Directo de Fábrica",
    h1c: "OEM y Mayorista",
    sub: "Aikerui es un fabricante verificado de cepillos con fábrica propia en Anhui, China. Cepillos de disco, cilíndricos, de rodillo y laterales — repuestos compatibles con Tennant, Karcher, Nilfisk y más. Precio directo de fábrica, OEM personalizado.",
    cta: "Obtener Precio de Fábrica",
    assurance: "Respuesta en 24 Horas — Soporte Técnico",
  },
  categories: { kicker: "Nuestros Productos", title: "Fabricado en Nuestra Fábrica, Enviado a Usted", sub: "Cada máquina se diseña, fabrica y prueba en nuestras instalaciones de Anqing antes de la exportación.", products: "productos" },
  factoryNote: "📸 Fotos reales de nuestra fábrica",
  viewAll: "Ver todo →",
  trust: ["Fábrica Propia de +10.000㎡", "Certificado CE e ISO", "Exportamos a +50 Países", "Hable con Nuestro Equipo"],
  verify: { lead: "¿No está seguro de que somos reales? Aquí hay 3 formas de verificarlo:", video: "Tour en Video en Vivo", inspection: "Inspección de Terceros", call: "Llamar a la Fábrica" },
  stats: {
    title: "Aikerui en Números",
    sub: "Fábrica real, capacidad real, resultados reales.",
    items: [
      { num: "10.000+", label: "㎡ de Fábrica" },
      { num: "50+", label: "Trabajadores" },
      { num: "30+", label: "Modelos" },
      { num: "2000+", label: "Máquinas Vendidas" },
    ],
  },
  featured: { title: "Productos Destacados", sub: "Nuestras máquinas de limpieza industrial más populares — directo de fábrica", viewAll: "Ver Todo" },
  parts: { title: "Repuestos y Accesorios", sub: "Cepillos de disco, boquillas, baterías y más — fabricados según especificaciones OEM", viewAll: "Ver Todos los Repuestos" },
  why: {
    title: "¿Por Qué Comprar Directo a Aikerui?",
    sub: "Al comprar directamente de la fábrica ahorra dinero, obtiene mejor calidad y habla con quienes fabrican las máquinas.",
    items: [
      { title: "Precio Directo de Fábrica", desc: "Sin sobreprecio de intermediarios. Paga el mismo precio que nuestros distribuidores locales. Ahorre 20-40% frente a comercializadoras." },
      { title: "Calidad Verificable", desc: "Cada máquina probada antes del envío. Certificado CE, ISO 9001. Programe una videollamada para ver nuestro control de calidad en vivo." },
      { title: "Soporte Directo de Ingenieros", desc: "Cuando necesita ayuda, habla con nuestros ingenieros — no con un vendedor. Repuestos enviados en 24 horas." },
    ],
  },
  guides: { title: "Guías de Compra de Fregadoras", sub: "Guías expertas sobre cepillos, repuestos y mantenimiento — escritas por el fabricante." },
  cta: { title: "¿Aún no está seguro? Déjenos mostrárselo.", sub: "Programe un recorrido en video en vivo por nuestra fábrica. Vea la línea de producción, conozca al equipo e inspeccione la calidad — todo desde su teléfono.", tour: "Solicitar Tour en Video", browse: "Ver Productos", orCall: "O llámenos directamente:", whatsapp: "Equipo de Ventas WhatsApp" },
  dubai: {
    title: "Almacén de Oriente Medio — Dubái, EAU",
    sub: "Stock y soporte local para clientes de Oriente Medio y África.",
    partner: "Socio",
    address: "Dirección",
    contact: "Contacto",
    phone: "Teléfono",
    note: "Entrega rápida en toda la región del Golfo. Contáctenos para disponibilidad de stock.",
  },
  footer: { tagline: "Fabricante directo de fregadoras industriales, barredoras y cepillos de repuesto desde 2008.", quickLinks: "Enlaces Rápidos", contactUs: "Contacto" },
};

const ar: HomeDict = {
  nav: { products: "المنتجات", parts: "قطع الغيار", guides: "الأدلة", about: "من نحن", contact: "اتصل بنا", quote: "طلب عرض سعر" },
  hero: {
    badge: "مصنع معتمد — منذ 2008",
    h1a: "فرش وقطع غيار ماكينات تنظيف الأرضيات",
    h1b: "مباشرة من المصنع",
    h1c: "تصنيع OEM والبيع بالجملة",
    sub: "أيكيروي مصنع فرش معتمد يمتلك مصنعه الخاص في أنهوي بالصين. فرش دائرية وأسطوانية وبكرات وفرش جانبية — قطع غيار متوافقة مع تينانت وكارشر ونيلفيسك وغيرها. أسعار مباشرة من المصنع، وتصنيع OEM مخصص.",
    cta: "احصل على سعر المصنع",
    assurance: "رد على العرض خلال 24 ساعة — دعم فني من المهندسين",
  },
  categories: { kicker: "منتجاتنا", title: "تُصنع في مصنعنا وتُشحن إليك", sub: "كل ماكينة تُصمم وتُصنع وتُختبر في منشأتنا في أنهوي قبل التصدير.", products: "منتج" },
  factoryNote: "📸 صور حقيقية من أرض مصنعنا",
  viewAll: "عرض الكل ←",
  trust: ["مصنع خاص بأكثر من 10,000 م²", "معتمد CE و ISO", "نصدّر إلى أكثر من 50 دولة", "تحدّث مع فريق المبيعات"],
  verify: { lead: "لست متأكدًا أننا حقيقيون؟ إليك 3 طرق للتحقق:", video: "جولة فيديو مباشرة", inspection: "فحص طرف ثالث", call: "اتصل بالمصنع" },
  stats: {
    title: "أيكيروي بالأرقام",
    sub: "مصنع حقيقي، قدرة حقيقية، نتائج حقيقية.",
    items: [
      { num: "+10,000", label: "م² مساحة المصنع" },
      { num: "+50", label: "عامل ماهر" },
      { num: "+30", label: "طراز ماكينة" },
      { num: "+2000", label: "ماكينة مبيعة" },
    ],
  },
  featured: { title: "منتجات مميزة", sub: "أكثر ماكينات التنظيف الصناعي رواجًا — مباشرة من المصنع", viewAll: "عرض الكل" },
  parts: { title: "قطع الغيار والملحقات", sub: "فرش دائرية، شفرات تجفيف، بطاريات، والمزيد — مصنوعة وفق مواصفات OEM", viewAll: "عرض كل قطع الغيار" },
  why: {
    title: "لماذا تشتري مباشرة من أيكيروي؟",
    sub: "عند الشراء من المصنع توفّر المال وتحصل على جودة أفضل وتتحدث مع من يصنعون الماكينات.",
    items: [
      { title: "سعر مباشر من المصنع", desc: "بلا هوامش وسطاء. تدفع نفس سعر موزّعينا المحليين. وفّر 20-40% مقارنة بشركات التجارة." },
      { title: "جودة يمكنك التحقق منها", desc: "كل ماكينة تُختبر قبل الشحن. معتمدة CE و ISO 9001. حدّد مكالمة فيديو لمشاهدة عملية فحص الجودة مباشرة." },
      { title: "دعم مباشر من المهندسين", desc: "عند حاجتك للمساعدة، تتحدث مع مهندسينا — لا مع مندوب بيع. قطع الغيار تُشحن خلال 24 ساعة." },
    ],
  },
  guides: { title: "أدلة شراء ماكينات تنظيف الأرضيات", sub: "أدلة متخصصة حول الفرش وقطع الغيار والصيانة — بقلم المصنّع." },
  cta: { title: "ما زلت غير متأكد؟ دعنا نُريك.", sub: "حدّد جولة فيديو مباشرة في مصنعنا. شاهد خط الإنتاج والتقِ بالفريق وافحص الجودة — كل ذلك من هاتفك.", tour: "اطلب جولة فيديو مباشرة", browse: "تصفّح المنتجات", orCall: "أو اتصل بنا مباشرة:", whatsapp: "فريق المبيعات على واتساب" },
  dubai: {
    title: "مستودع الشرق الأوسط — دبي، الإمارات",
    sub: "مخزون ودعم محلي لعملاء الشرق الأوسط وأفريقيا.",
    partner: "الشريك",
    address: "العنوان",
    contact: "جهة الاتصال",
    phone: "الهاتف",
    note: "توصيل سريع في منطقة الخليج. تواصل معنا لمعرفة توفر المخزون.",
  },
  footer: { tagline: "مصنّع مباشر لماكينات تنظيف الأرضيات الصناعية والكانسات وفرش الاستبدال منذ 2008.", quickLinks: "روابط سريعة", contactUs: "اتصل بنا" },
};

const ru: HomeDict = {
  nav: { products: "Продукция", parts: "Запчасти", guides: "Руководства", about: "О нас", contact: "Контакты", quote: "Запрос цены" },
  hero: {
    badge: "Проверенный производитель — с 2008 года",
    h1a: "Щётки и запчасти для поломоечных машин",
    h1b: "Напрямую с завода",
    h1c: "OEM и оптом",
    sub: "Aikerui — проверенный производитель щёток с собственным заводом в Аньхой, Китай. Дисковые, цилиндрические, роликовые и боковые щётки — аналоги для Tennant, Karcher, Nilfisk и других. Цены напрямую с завода, индивидуальный OEM.",
    cta: "Получить заводскую цену",
    assurance: "Ответ в течение 24 часов — поддержка инженеров",
  },
  categories: { kicker: "Наша продукция", title: "Производим на своём заводе — отправляем вам", sub: "Каждая машина проектируется, производится и тестируется на нашем предприятии в Аньхой перед экспортом.", products: "товаров" },
  factoryNote: "📸 Реальные фото с нашего завода",
  viewAll: "Смотреть все →",
  trust: ["Собственный завод 10 000+ м²", "Сертификаты CE и ISO", "Экспорт в 50+ стран", "Свяжитесь с отделом продаж"],
  verify: { lead: "Не уверены, что мы реальны? Вот 3 способа проверить:", video: "Видеотур в прямом эфире", inspection: "Независимая инспекция", call: "Позвонить на завод" },
  stats: {
    title: "Aikerui в цифрах",
    sub: "Реальный завод, реальные мощности, реальные результаты.",
    items: [
      { num: "10 000+", label: "м² завода" },
      { num: "50+", label: "квалифицированных рабочих" },
      { num: "30+", label: "моделей машин" },
      { num: "2000+", label: "проданных машин" },
    ],
  },
  featured: { title: "Популярная продукция", sub: "Наши самые востребованные промышленные машины — напрямую с завода", viewAll: "Смотреть все" },
  parts: { title: "Запчасти и аксессуары", sub: "Дисковые щётки, скребки, аккумуляторы и другое — по спецификациям OEM", viewAll: "Все запчасти" },
  why: {
    title: "Почему покупать напрямую у Aikerui?",
    sub: "Покупая с завода, вы экономите, получаете лучшее качество и общаетесь с теми, кто делает машины.",
    items: [
      { title: "Цена напрямую с завода", desc: "Без наценок посредников. Вы платите столько же, сколько наши местные дистрибьюторы. Экономия 20-40% по сравнению с трейдерами." },
      { title: "Качество, которое можно проверить", desc: "Каждая машина тестируется перед отправкой. Сертификаты CE, ISO 9001. Организуйте видеозвонок и посмотрите наш контроль качества." },
      { title: "Прямая поддержка инженеров", desc: "Когда нужна помощь, вы говорите с инженерами, а не с продавцом. Запчасти отправляем в течение 24 часов." },
    ],
  },
  guides: { title: "Руководства по покупке поломоечных машин", sub: "Экспертные руководства по щёткам, запчастям и обслуживанию — от производителя." },
  cta: { title: "Ещё не уверены? Покажем вам.", sub: "Запланируйте видеотур по нашему заводу в прямом эфире. Посмотрите производственную линию, познакомьтесь с командой и проверьте качество — прямо с телефона.", tour: "Запросить видеотур", browse: "Смотреть продукцию", orCall: "Или позвоните нам:", whatsapp: "Отдел продаж в WhatsApp" },
  dubai: {
    title: "Склад на Ближнем Востоке — Дубай, ОАЭ",
    sub: "Местный запас и поддержка для клиентов Ближнего Востока и Африки.",
    partner: "Партнёр",
    address: "Адрес",
    contact: "Контакт",
    phone: "Телефон",
    note: "Быстрая доставка по региону Персидского залива. Свяжитесь с нами по наличию.",
  },
  footer: { tagline: "Производитель промышленных поломоечных машин, подметальных машин и сменных щёток с 2008 года.", quickLinks: "Быстрые ссылки", contactUs: "Контакты" },
};

const fr: HomeDict = {
  nav: { products: "Produits", parts: "Pièces", guides: "Guides", about: "À propos", contact: "Contact", quote: "Devis" },
  hero: {
    badge: "Fabricant Vérifié — Depuis 2008",
    h1a: "Brosses et Pièces pour Autolaveuses",
    h1b: "Direct Usine",
    h1c: "OEM et Gros",
    sub: "Aikerui est un fabricant de brosses vérifié avec sa propre usine dans l'Anhui, en Chine. Brosses disque, cylindriques, rouleaux et latérales — pièces compatibles Tennant, Karcher, Nilfisk et plus. Prix direct usine, OEM personnalisé.",
    cta: "Obtenir le Prix Usine",
    assurance: "Réponse en 24 Heures — Support Technique",
  },
  categories: { kicker: "Nos Produits", title: "Fabriqué dans Notre Usine, Expédié Chez Vous", sub: "Chaque machine est conçue, fabriquée et testée dans notre site d'Anqing avant exportation.", products: "produits" },
  factoryNote: "📸 Photos réelles de notre usine",
  viewAll: "Voir tout →",
  trust: ["Usine Propre de 10 000+ ㎡", "Certifié CE et ISO", "Export vers 50+ Pays", "Parlez à Notre Équipe"],
  verify: { lead: "Pas sûr que nous soyons réels ? Voici 3 façons de vérifier :", video: "Visite Vidéo en Direct", inspection: "Inspection Tiers", call: "Appeler l'Usine" },
  stats: {
    title: "Aikerui en Chiffres",
    sub: "Vraie usine, vraie capacité, vrais résultats.",
    items: [
      { num: "10 000+", label: "㎡ d'Usine" },
      { num: "50+", label: "Ouvriers Qualifiés" },
      { num: "30+", label: "Modèles" },
      { num: "2000+", label: "Machines Vendues" },
    ],
  },
  featured: { title: "Produits Vedettes", sub: "Nos machines de nettoyage industriel les plus populaires — direct usine", viewAll: "Voir Tout" },
  parts: { title: "Pièces Détachées et Accessoires", sub: "Brosses disque, raclettes, batteries et plus — fabriqués selon spécifications OEM", viewAll: "Toutes les Pièces" },
  why: {
    title: "Pourquoi Acheter Directement Chez Aikerui ?",
    sub: "En achetant à l'usine, vous économisez, obtenez une meilleure qualité et parlez à ceux qui fabriquent les machines.",
    items: [
      { title: "Prix Direct Usine", desc: "Sans marge d'intermédiaires. Vous payez le même prix que nos distributeurs locaux. Économisez 20-40% par rapport aux négociants." },
      { title: "Qualité Vérifiable", desc: "Chaque machine testée avant expédition. Certifié CE, ISO 9001. Planifiez un appel vidéo pour voir notre contrôle qualité en direct." },
      { title: "Support Direct des Ingénieurs", desc: "En cas de besoin, vous parlez à nos ingénieurs — pas à un commercial. Pièces expédiées sous 24 heures." },
    ],
  },
  guides: { title: "Guides d'Achat d'Autolaveuses", sub: "Guides experts sur les brosses, pièces et entretien — rédigés par le fabricant." },
  cta: { title: "Pas Encore Sûr ? Laissez-nous Vous Montrer.", sub: "Planifiez une visite vidéo en direct de notre usine. Voyez la ligne de production, rencontrez l'équipe et inspectez la qualité — depuis votre téléphone.", tour: "Demander une Visite Vidéo", browse: "Voir les Produits", orCall: "Ou appelez-nous directement :", whatsapp: "Équipe Commerciale WhatsApp" },
  dubai: {
    title: "Entrepôt Moyen-Orient — Dubaï, EAU",
    sub: "Stock et support local pour les clients du Moyen-Orient et d'Afrique.",
    partner: "Partenaire",
    address: "Adresse",
    contact: "Contact",
    phone: "Téléphone",
    note: "Livraison rapide dans toute la région du Golfe. Contactez-nous pour la disponibilité.",
  },
  footer: { tagline: "Fabricant direct d'autolaveuses industrielles, balayeuses et brosses de rechange depuis 2008.", quickLinks: "Liens Rapides", contactUs: "Contact" },
};

export const homeDictionaries: Record<Locale, HomeDict> = { en, es, ar, ru, fr };

export function getHomeDict(locale: Locale): HomeDict {
  return homeDictionaries[locale] || homeDictionaries.en;
}

// Dubai warehouse info (shared across languages)
export const DUBAI = {
  company: "AL ADULIU GENERAL TRADING LLC",
  address: "Khansaheb Warehouse B2-7, Al Qusais Industrial 1, Doha Rd, Dubai, UAE",
  contact: "Amrinder Singh",
  phone: "+971 50 559 7103",
  email: "amrinder.db16@gmail.com",
  whatsapp: "971505597103",
};
