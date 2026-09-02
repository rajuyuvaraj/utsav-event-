const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌸 Starting Utsav Decor database seed...');

  // 1. Clear existing data
  await prisma.request.deleteMany();
  await prisma.addonItem.deleteMany();
  await prisma.theme.deleteMany();
  await prisma.eventCategory.deleteMany();
  await prisma.adminUser.deleteMany();

  // 2. Create Admin User
  const passwordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.adminUser.create({
    data: {
      email: 'admin@utsavdecor.com',
      passwordHash,
      name: 'Utsav Admin',
      role: 'SUPER_ADMIN',
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // 3. Create Categories
  const categoriesData = [
    {
      name: 'Royal Weddings',
      slug: 'weddings',
      description: 'Grand mandaps, royal haldi stages, mesmerizing sangeet setups, and bespoke floral installations for your dream Indian wedding.',
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
      icon: 'HeartHandshake',
      displayOrder: 1,
    },
    {
      name: 'Ganesh Chaturthi Utsav',
      slug: 'ganesh-chaturthi',
      description: 'Devotional temple pandals, eco-friendly bamboo sanctums, fresh mogra canopies, and regal backdrops for Bappa’s auspicious arrival.',
      coverImage: 'https://images.unsplash.com/photo-1567591414240-e221379f53e6?auto=format&fit=crop&w=1200&q=80',
      icon: 'Sparkles',
      displayOrder: 2,
    },
    {
      name: 'Milestone Birthdays',
      slug: 'birthdays',
      description: 'Thematic 1st birthdays, royal prince/princess themes, elegant boho florals, and grand milestone celebrations designed to dazzle.',
      coverImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
      icon: 'Cake',
      displayOrder: 3,
    },
    {
      name: 'Griha Pravesh & Housewarming',
      slug: 'housewarming',
      description: 'Auspicious traditional marigold torans, brass samai decor, sacred homam backdrops, and modern floral entrance pathways.',
      coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      icon: 'Home',
      displayOrder: 4,
    },
    {
      name: 'Godh Bharai & Baby Shower',
      slug: 'baby-shower',
      description: 'Traditional silk swing (jhula) decorations, lotus ponds, soft pastel arches, and blessed mom-to-be floral styling.',
      coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
      icon: 'Baby',
      displayOrder: 5,
    },
    {
      name: 'Royal Engagement & Roka',
      slug: 'engagement',
      description: 'Contemporary ring-exchange stages, romantic candlelit walkways, bespoke floral arches, and shimmering fairy light backdrops.',
      coverImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
      icon: 'Gem',
      displayOrder: 6,
    },
  ];

  const createdCategories = {};
  for (const cat of categoriesData) {
    const created = await prisma.eventCategory.create({ data: cat });
    createdCategories[cat.slug] = created;
  }
  console.log('✅ Created 6 Event Categories');

  // 4. Create Themes for each category (20+ themes)
  const themesData = [
    // Weddings (4 themes)
    {
      categoryId: createdCategories['weddings'].id,
      name: 'Rajwada Palace Gold Mandapam',
      slug: 'rajwada-palace-gold-mandapam',
      shortDesc: 'Opulent carved pillars, cascading fresh red roses, brass urlis, and royal velvet draping.',
      description: 'Inspired by the royal heritage palaces of Udaipur and Jaipur, this signature mandap features hand-carved golden pillars crowned with cascading Dutch red roses and white tuberose (rajnigandha). Complete with raised glass flooring, crystal chandeliers, traditional brass oil lamps, and velvet seating for the couple and families.',
      features: JSON.stringify([
        '16x16 ft Royal Rajwada Golden Mandap Structure',
        'Over 4,000 fresh Dutch red roses & Rajnigandha strings',
        'Handcrafted Brass Samai & Floating Urli entrance path',
        'Gold Royal High-Back Maharaja & Maharani Seating Chairs',
        'Warm ambient LED warm wash lights & chandelier setup',
        'Havankund base with copper sacred fire setting',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      ]),
      isPopular: true,
      displayOrder: 1,
    },
    {
      categoryId: createdCategories['weddings'].id,
      name: 'Vrindavan Haldi Bloom with Brass Urlis',
      slug: 'vrindavan-haldi-bloom',
      shortDesc: 'Vibrant marigold cushions, handwoven tassel backdrops, huge brass bathing urlis, and floral umbrellas.',
      description: 'A joyfully colorful and traditional Haldi ceremony setup bringing the spirit of Vrindavan. Decorated with thousands of fresh orange and yellow marigold tassels, giant handcrafted brass bathing urlis, banana leaf borders, floral umbrella props, and cozy diwan seating for lively rituals.',
      features: JSON.stringify([
        'Giant 4.5 ft Brass Urli with floral petals for Haldi bath',
        'Layered Yellow & Orange Genda Phool backdrop (12x8 ft)',
        'Traditional floral hand-carved umbrella photobooth',
        '4 Low Diwan seating sets with silk bolster cushions',
        'Fresh flower jewelry display station and haldi thali setup',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1519225429813-f42199b9042b?auto=format&fit=crop&w=1200&q=80',
      ]),
      isPopular: true,
      displayOrder: 2,
    },
    {
      categoryId: createdCategories['weddings'].id,
      name: 'Sufi Night Starry Sangeet Stage',
      slug: 'sufi-night-sangeet-stage',
      shortDesc: 'Deep midnight blue velvet, Moroccan hanging lamps, warm fairy light canopy, and grand LED dance floor backdrop.',
      description: 'An enchanting musical ambiance designed for high-energy Sangeet performances. Featuring deep navy and emerald velvet drapes, geometric Moroccan filigree pendant lamps, dense fairy light mesh ceiling, custom stage riser, and professional intelligent lighting.',
      features: JSON.stringify([
        '24x14 ft Grand Concert Stage with velvet acoustic draping',
        'Suspended Moroccan brass lanterns & vintage crystal orbs',
        'Fairy light waterfall backdrop with programmable warm glow',
        'Curved plush VIP lounge seating with gold metallic tables',
        'Trussing with moving heads and haze atmospheric effect',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
      ]),
      isPopular: false,
      displayOrder: 3,
    },
    {
      categoryId: createdCategories['weddings'].id,
      name: 'Pastel Garden English-Vedic Reception',
      slug: 'pastel-garden-reception',
      shortDesc: 'Blush pink hydrangeas, white wisteria ceiling, golden mirrored stage, and luxury crystal chandeliers.',
      description: 'The perfect synthesis of modern pastel aesthetics and Indian wedding luxury. Features lush arches of baby’s breath, blush peonies, imported hydrangeas, custom monogram gold screen, and an expansive floral photo op wall.',
      features: JSON.stringify([
        '20x10 ft Geometric Gold Mirror Backing with Pastel Floral Crown',
        'Suspended White Wisteria & Fairy Light Hanging Ceiling',
        'Mirrored Couple Stage with soft velvet contemporary sofa',
        '8 Elevated Floral Roman Pedestals for aisle walkway',
        'Personalized laser-cut couple monogram nameplate',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1545232979-fbf6786c52bb?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
      ]),
      isPopular: false,
      displayOrder: 4,
    },

    // Ganesh Chaturthi (4 themes)
    {
      categoryId: createdCategories['ganesh-chaturthi'].id,
      name: 'Siddhivinayak Temple Sanctum Setup',
      slug: 'siddhivinayak-temple-sanctum',
      shortDesc: 'Traditional temple gopuram arch, pure brass samai towers, cascading marigold & mogra garlands, and royal red velvet throne.',
      description: 'A divine recreation of classic Indian temple sanctums for Lord Ganesha. Adorned with intricately designed temple pillars, golden brass bells, authentic tiered brass lamps, and an overwhelming fragrance of fresh Bangalore mogra and orange marigold.',
      features: JSON.stringify([
        '10x8 ft Carved Temple Gopuram & Sanctum Backdrop',
        'Fresh South Indian Mogra & Marigold garland cascade',
        'Pair of 5-ft Antique Brass Kuthu Vilakku (Standing Diyas)',
        'Elevated Wooden Singhasan with Royal Maroon Velvet Upholstery',
        'Aarti & Pooja essential brassware kit set on floral rangoli',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1567591414240-e221379f53e6?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600100397608-f010f443b743?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=1200&q=80',
      ]),
      isPopular: true,
      displayOrder: 1,
    },
    {
      categoryId: createdCategories['ganesh-chaturthi'].id,
      name: 'Eco-Friendly Bamboo & Mogra Nature Mandap',
      slug: 'eco-friendly-bamboo-ganesh-mandap',
      shortDesc: 'Sustainable natural bamboo frame, raw jute fabrics, banana leaves, fresh lotus blooms, and terracotta oil lamps.',
      description: 'Embrace sustainable divinity with 100% natural and biodegradable materials. Built with untreated golden bamboo shoots, organic jute weaves, vibrant green banana stems, earthen terracotta diyas, and fresh water-floating pink lotus blooms.',
      features: JSON.stringify([
        'Eco-conscious Handcrafted Bamboo Mandap Structure',
        'Fresh Lotus flowers floating in stone pond base',
        'Natural jute textile draping with banana leaf motifs',
        'Earthen clay diyas and natural sandalwood fragrant aura',
        'Handwoven cane baskets for prasad offering display',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1200&q=80',
      ]),
      isPopular: true,
      displayOrder: 2,
    },
    {
      categoryId: createdCategories['ganesh-chaturthi'].id,
      name: 'Mayur Pankh Royal Peacock Pavilion',
      slug: 'mayur-pankh-ganesh-pavilion',
      shortDesc: 'Handcrafted peacock floral sculpture, royal blue silk drapes, brass bells, and golden jali panels.',
      description: 'An artistic, regal theme featuring twin life-size floral peacocks sculpted with purple orchids and blue carnations flanking the deity throne, framed by laser-cut golden jali and twinkling warm starlight lamps.',
      features: JSON.stringify([
        'Twin 3D Floral Sculpted Peacocks (Orchids & Carnations)',
        'Gold Jali Backlit Panels with soft temple glow',
        'Royal Peacock-Blue & Emerald silk backdrop fabric',
        'Hanging temple brass bells with marigold tassels',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1569420038865-c357ec39460a?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
      ]),
      isPopular: false,
      displayOrder: 3,
    },

    // Birthdays (4 themes)
    {
      categoryId: createdCategories['birthdays'].id,
      name: 'Chhote Maharaj First Birthday Durbar',
      slug: 'chhote-maharaj-1st-birthday',
      shortDesc: 'Royal palace arches, miniature golden throne, pastel balloon & marigold garlands, and custom royal crest.',
      description: 'Celebrate your little prince’s 1st birthday in royal Indian grandeur. Combines palace jharokha arches, a velvet miniature baby throne, organic pastel balloon arches intertwined with yellow marigold, and a personalized royal coat-of-arms crest.',
      features: JSON.stringify([
        '10x8 ft Royal Palace Jharokha Castle Backdrop',
        'Miniature Gold-leafed Royal Velvet Baby Throne',
        '15-ft Organic Balloon Garland infused with fresh floral sprigs',
        'Custom 3D Acrylic Name Sign with Royal Crown element',
        'Miniature royal elephant & horse photo props',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
      ]),
      isPopular: true,
      displayOrder: 1,
    },
    {
      categoryId: createdCategories['birthdays'].id,
      name: 'Boho Desi Floral & Pampas Dream',
      slug: 'boho-desi-floral-pampas',
      shortDesc: 'Rustic cane furniture, pampas grass clouds, terracotta pots, macrame screens, and pastel roses.',
      description: 'A trendy aesthetic blending earthy bohemian warmth with Indian festive colors. Features natural cane seating, fluffy golden pampas grass, handcrafted macrame wall hangings, terracotta planters, and warm edison filament bulbs.',
      features: JSON.stringify([
        'Triple Arch Wooden Frame with Pampas Grass & Rose spray',
        'Natural Wicker Cane Peacock Chair for the birthday star',
        'Warm Edison filament bulb chandelier cluster',
        'Terracotta pottery with seasonal dry botanical styling',
        'Illuminated LED Neon "Happy Birthday" or custom age sign',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
      ]),
      isPopular: false,
      displayOrder: 2,
    },
    {
      categoryId: createdCategories['birthdays'].id,
      name: 'Golden Jubilee 50th / 60th Royal Milestone',
      slug: 'golden-jubilee-royal-milestone',
      shortDesc: 'Regal maroon and gold shimmer backdrop, memory photo gallery wall, vintage chandelier, and premium stage.',
      description: 'An elegant tribute for 50th, 60th (Shashti Poorthi), or 75th milestone birthdays. Elegant metallic gold shimmer sequin wall, framed family photo memory gallery, floral stage couch, and ambient warm golden uplighting.',
      features: JSON.stringify([
        '12x8 ft Shimmer Gold & Maroon Velvet Backdrop',
        'Framed "Life Memories" Photo Wall with brass highlights',
        'High-comfort double royal sofa for the guest of honour',
        'Stage floral runners with white lilies and golden carnations',
        'Personalized Milestone Cake table with glass pedestal',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=80',
      ]),
      isPopular: true,
      displayOrder: 3,
    },

    // Griha Pravesh & Housewarming (3 themes)
    {
      categoryId: createdCategories['housewarming'].id,
      name: 'Sampoorna Griha Pravesh Marigold Grandeur',
      slug: 'sampoorna-griha-pravesh-marigold',
      shortDesc: 'Traditional entrance toran, mango leaf door garlands, sacred pooja stage, brass samai, and floral rangoli.',
      description: 'Bestow divine blessings upon your new home. Complete setup covering the main entrance door with fresh mango leaf and marigold torans, a sacred pooja backdrop with Kalash motif, a dedicated havan kund area, and an elaborate welcome floral rangoli with brass oil lamps.',
      features: JSON.stringify([
        'Grand Entrance Door Floral Toran (Mango Leaves & Marigold)',
        '8x8 ft Mandir Pooja Backdrop with Shubh Labh / Om motif',
        'Elaborate 6-ft Natural Petal Rangoli at entryway',
        'Set of 4 Brass Standing Samai Lamps with flower garlands',
        'Havan Kund floor protection setup with copper accessories',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      ]),
      isPopular: true,
      displayOrder: 1,
    },
    {
      categoryId: createdCategories['housewarming'].id,
      name: 'Modern Contemporary Floral Housewarming',
      slug: 'modern-contemporary-floral-housewarming',
      shortDesc: 'Sleek geometric gold arches, white orchids, subtle warm fairy lights, and acrylic welcome signage.',
      description: 'Ideal for modern apartments and contemporary villas. Features minimalist geometric gold structures, delicate white orchids, subtle green eucalyptus foliage, brass accent urlis, and an elegant acrylic welcome board on an easel.',
      features: JSON.stringify([
        'Dual Hexagon Gold Arch with White Orchids & Baby’s Breath',
        'Custom Clear Acrylic Welcome Sign on Wooden Easel',
        'Brass Urlis with Floating Candle & Rose Petal accents',
        'Living room warm ambient lighting wash',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
      ]),
      isPopular: false,
      displayOrder: 2,
    },
    {
      categoryId: createdCategories['housewarming'].id,
      name: 'South Indian Traditional Seemantham / Gruhapravesam',
      slug: 'south-indian-traditional-gruhapravesam',
      shortDesc: 'Pattu saree backdrop, fresh banana trees at entrance, malligai (jasmine) garlands, and bell metal urlis.',
      description: 'Rooted in traditional South Indian heritage. Features dual live banana trees at the entrance, rich silk fabric backdrop, fragrant Madurai malligai strings, hanging brass temple bells, and traditional kolam designs.',
      features: JSON.stringify([
        'Twin Live Banana Trees tied with traditional sacred threads',
        'Rich Kanjeevaram-inspired Silk Fabric Backdrop',
        'Pure Madurai Mallipoo (Jasmine) & Sevvanthi flower strings',
        'Antique Bell-metal Urli with camphor and floating flowers',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&w=1200&q=80',
      ]),
      isPopular: false,
      displayOrder: 3,
    },

    // Baby Shower & Godh Bharai (3 themes)
    {
      categoryId: createdCategories['baby-shower'].id,
      name: 'Traditional Royal Silk Jhula (Swing) Setup',
      slug: 'traditional-royal-silk-jhula',
      shortDesc: 'Carved wooden swing enveloped in fragrant flowers, marigold drops, brass urlis, and silk bolster seating.',
      description: 'The quintessential Indian Godh Bharai / Seemantham centerpiece. A classic wooden carved swing fully draped in fresh mogra, roses, and marigold garlands, surrounded by brass oil lamps and soft carpeted seating for elderly family blessings.',
      features: JSON.stringify([
        'Solid Teakwood Carved Swing with Floral Wrap (Supports 180kg)',
        '10x8 ft Yellow & Green Festive Backdrop with Lotus Hangings',
        'Set of 4 Brass Diyas and Lotus Petal Flower Trays',
        'Soft Silk Mattresses and Gaddi bolsters for family blessings',
        'Pooja Thali decor for ritual kumkum and bangles ceremony',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
      ]),
      isPopular: true,
      displayOrder: 1,
    },
    {
      categoryId: createdCategories['baby-shower'].id,
      name: 'Pastel Floral Bloom Godh Bharai',
      slug: 'pastel-floral-bloom-godh-bharai',
      shortDesc: 'Soft peach, mint and blush florals, cozy mom-to-be velvet armchair, floral ring arch, and fairy light glow.',
      description: 'A charming, gentle setup honoring the mom-to-be. Features a 7-ft circular floral arch with blush roses, hydrangeas, and baby’s breath, an ergonomic plush velvet wingback chair for maximum comfort, and fairy lights.',
      features: JSON.stringify([
        '7-ft Circular Floral Ring Backdrop with Peach & Mint Florals',
        'Ultra-comfortable Velvet Mom-to-Be Armchair with Footstool',
        'LED Neon "Baby On The Way" / "Oh Baby" Signage',
        'Customized Bangle Presentation Counter & Favors Display',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1545232979-fbf6786c52bb?auto=format&fit=crop&w=1200&q=80',
      ]),
      isPopular: false,
      displayOrder: 2,
    },
    {
      categoryId: createdCategories['baby-shower'].id,
      name: 'Vedic Padmam Lotus Sanctum',
      slug: 'vedic-padmam-lotus-sanctum',
      shortDesc: 'Handmade giant paper lotus flowers, brass kalash props, traditional silk drapes, and fragrant vettiver garlands.',
      description: 'A deeply auspicious setting celebrating fertility and divine motherly grace with sacred lotus motifs, rich yellow Kanchi silk drapes, and traditional Indian auspicious symbols.',
      features: JSON.stringify([
        'Tiered Giant Lotus Motif Backdrop (9x8 ft)',
        'Traditional Brass Kalash and coconut ceremonial props',
        'Vettiver and Mogra scented floral garlands',
        'Traditional Bajot (low stool) and silk cushions',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
      ]),
      isPopular: false,
      displayOrder: 3,
    },

    // Engagement & Roka (3 themes)
    {
      categoryId: createdCategories['engagement'].id,
      name: 'Royal Shimmer & Rose Romance Stage',
      slug: 'royal-shimmer-rose-romance-stage',
      shortDesc: 'Cascading crimson roses, gold laser-cut arches, crystal chandeliers, and velvet couple love seat.',
      description: 'A showstopping engagement stage radiating romance and glamour. Handcrafted gold geometric screens adorned with thousands of fresh Dutch roses, suspended crystal chandeliers, cold spark entry path, and luxury couple seating.',
      features: JSON.stringify([
        '18x10 ft Gold Metallic Arch Backdrop with Crimson Rose Clouds',
        'Pair of 3-tier Sparkling Crystal Hanging Chandeliers',
        'Luxury Tufted Ivory Velvet Couple Loveseat',
        'Mirrored Walkway with floating glass candle cylinders',
        'Integrated ambient stage warm spot lighting',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
      ]),
      isPopular: true,
      displayOrder: 1,
    },
    {
      categoryId: createdCategories['engagement'].id,
      name: 'Infinity Floral Ring Engagement Backdrop',
      slug: 'infinity-floral-ring-engagement',
      shortDesc: '8-ft oversized floral engagement ring structure, fairy lights canopy, personalized neon monogram.',
      description: 'Symbolize eternal love with an oversized 8-ft circular ring structure densely covered in white blossoms, pink hydrangeas, and trailing ivy, finished with an illuminated couple name sign and candlelit stage floor.',
      features: JSON.stringify([
        '8-ft Oversized 3D Circular Ring Structure packed with Florals',
        'Custom Laser-cut Warm Neon Couple Initials Sign',
        'Fairy Light Curtain Wall (15x10 ft) behind the ring',
        'Glass Hurricane Lamps with Pillar Candles for stage edge',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1545232979-fbf6786c52bb?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80',
      ]),
      isPopular: false,
      displayOrder: 2,
    },
    {
      categoryId: createdCategories['engagement'].id,
      name: 'Jodhpur Blue & Gold Roka Ceremony Setup',
      slug: 'jodhpur-blue-gold-roka',
      shortDesc: 'Royal indigo velvet panels, Rajasthani jali work, brass lanterns, and warm marigold accents.',
      description: 'A regal royal setting bringing the royal courts of Rajasthan to your Roka ceremony. Rich indigo blue fabrics accented with shimmering antique gold borders, brass candle lanterns, and fragrant orange marigold runners.',
      features: JSON.stringify([
        'Traditional Rajasthani Jali Backlit Panels with Indigo Draping',
        'Handcrafted Brass Lantern Cluster with flickering LED candles',
        'Gold Embroidered Low Diwan seating sets for family Roka gifts',
        'Traditional welcoming brass urlis with rose petals',
      ]),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1519225429813-f42199b9042b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
      ]),
      isPopular: false,
      displayOrder: 3,
    },
  ];

  for (const theme of themesData) {
    await prisma.theme.create({ data: theme });
  }
  console.log(`✅ Created ${themesData.length} Themes across all categories`);

  // 5. Create Addon Items (16 comprehensive items)
  const addonsData = [
    {
      name: 'Grand Floral Entrance Arch',
      description: '10-ft full archway decorated with fresh marigolds, roses, and exotic greens to welcome guests in grandeur.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      itemCategory: 'Floral',
      unitType: 'Per Arch',
      active: true,
    },
    {
      name: 'Royal Brass Kuthu Vilakku (Pair)',
      description: 'Set of two 5-ft antique polished brass oil lamps adorned with fresh flower garlands.',
      image: 'https://images.unsplash.com/photo-1600100397608-f010f443b743?auto=format&fit=crop&w=600&q=80',
      itemCategory: 'Lighting',
      unitType: 'Pair',
      active: true,
    },
    {
      name: 'Fairy Light Starry Ceiling Canopy',
      description: 'Mesh of thousands of warm white LED fairy lights creating a magical night sky effect across the ceiling (approx 800 sq ft).',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
      itemCategory: 'Lighting',
      unitType: 'Per 500 sq ft',
      active: true,
    },
    {
      name: 'Cold Spark Pyro Entry Fireworks',
      description: 'Safe indoor non-hazardous 4-point cold spark fountains for the couple/celebrant grand entry.',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      itemCategory: 'FX',
      unitType: 'Set of 4 Machines',
      active: true,
    },
    {
      name: 'Low Cloud / Dry Ice Fog Effect',
      description: 'Dreamy dense white clouds dancing at feet level during ring exchange or first dance.',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80',
      itemCategory: 'FX',
      unitType: '1 Entry Shot',
      active: true,
    },
    {
      name: 'Royal Shahi Teakwood Jhula (Swing)',
      description: 'Solid carved wooden swing fully wrapped with fresh flowers and silk cushions.',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80',
      itemCategory: 'Seating',
      unitType: 'Per Unit',
      active: true,
    },
    {
      name: 'Maharaja & Maharani High-Back Chairs',
      description: 'Pair of gold-leaf carved royal high-back thrones upholstered in plush maroon velvet.',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
      itemCategory: 'Seating',
      unitType: 'Pair',
      active: true,
    },
    {
      name: 'Customised Laser-Cut Welcome Easel Board',
      description: 'Elegant frosted acrylic or wooden sign customized with event name, date, and floral corner arrangement.',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80',
      itemCategory: 'Signage',
      unitType: 'Per Board',
      active: true,
    },
    {
      name: 'Vintage Thematic Photo Booth Corner',
      description: 'Dedicated photo op booth featuring antique cycle rickshaw, marigold frame, and quirky Hindi event props.',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=600&q=80',
      itemCategory: 'Signage',
      unitType: 'Complete Setup',
      active: true,
    },
    {
      name: 'Giant Brass Floating Flower Urli (3-ft)',
      description: 'Hammered brass urli filled with scented rose petals and floating tea-light candles.',
      image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=600&q=80',
      itemCategory: 'Floral',
      unitType: 'Per Piece',
      active: true,
    },
    {
      name: 'Mogra & Rajnigandha Floral Waterfall Backdrop',
      description: 'Dense hanging strings of authentic fragrant white tuberose and jasmine for stage or backdrop accents.',
      image: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?auto=format&fit=crop&w=600&q=80',
      itemCategory: 'Floral',
      unitType: '10x8 ft Panel',
      active: true,
    },
    {
      name: 'Traditional Live Punjabi Dhol Troupe',
      description: 'High energy authentic 2-person Dhol performance for Baraat, Groom entry, or celebration welcoming.',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
      itemCategory: 'Sound',
      unitType: '2 Hours Session',
      active: true,
    },
    {
      name: 'Custom LED Neon Monogram Sign',
      description: 'Glow-in-the-dark custom name letters (e.g., "Raj & Simran" or "#AaravTurns1") in warm golden or white glow.',
      image: 'https://images.unsplash.com/photo-1545232979-fbf6786c52bb?auto=format&fit=crop&w=600&q=80',
      itemCategory: 'Lighting',
      unitType: 'Custom Sign',
      active: true,
    },
    {
      name: 'South Indian Fresh Kolam / Rangoli Floor Decor',
      description: 'Artisanal 6x6 ft intricate color powder and fresh flower petal rangoli design at the main event foyer.',
      image: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?auto=format&fit=crop&w=600&q=80',
      itemCategory: 'Floral',
      unitType: 'Per Pattern',
      active: true,
    },
    {
      name: 'Aisle Pathway Roman Pillars with Floral Urns',
      description: 'Set of 6 white classic Roman pedestals crowned with overflowing fresh hydrangea and rose bouquets.',
      image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=600&q=80',
      itemCategory: 'Entry',
      unitType: 'Set of 6 Pillars',
      active: true,
    },
    {
      name: 'Ambient LED Uplighter Set (12 Lights)',
      description: '12 high-power warm white and amber architectural uplighters to illuminate walls, pillars, and drapes.',
      image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=600&q=80',
      itemCategory: 'Lighting',
      unitType: 'Set of 12',
      active: true,
    },
  ];

  for (const addon of addonsData) {
    await prisma.addonItem.create({ data: addon });
  }
  console.log(`✅ Created ${addonsData.length} Add-on Decor Items`);

  // 6. Create realistic sample requests for admin dashboard
  const firstTheme = await prisma.theme.findFirst({ where: { slug: 'rajwada-palace-gold-mandapam' } });
  const secondTheme = await prisma.theme.findFirst({ where: { slug: 'vrindavan-haldi-bloom' } });
  const thirdTheme = await prisma.theme.findFirst({ where: { slug: 'sampoorna-griha-pravesh-marigold' } });

  const sampleRequests = [
    {
      requestNumber: 'UTSAV-2026-1042',
      customerName: 'Aarav & Meera Sharma',
      phone: '+91 98201 45872',
      email: 'aarav.sharma@gmail.com',
      eventDate: '2026-10-18',
      eventTimeSlot: 'Evening',
      location: 'The Leela Palace, Udaipur / Grand Ballroom',
      venueType: 'Banquet Hall',
      guestCount: 350,
      notes: 'We want the mandap to have extra red roses and authentic brass oil lamps. Haldi event will take place on the previous day morning.',
      selectedThemeId: firstTheme ? firstTheme.id : null,
      selectedThemeName: firstTheme ? firstTheme.name : 'Rajwada Palace Gold Mandapam',
      selectedAddons: JSON.stringify([
        { id: 'addon-1', name: 'Grand Floral Entrance Arch', quantity: 2, itemCategory: 'Floral' },
        { id: 'addon-2', name: 'Royal Brass Kuthu Vilakku (Pair)', quantity: 2, itemCategory: 'Lighting' },
        { id: 'addon-3', name: 'Cold Spark Pyro Entry Fireworks', quantity: 1, itemCategory: 'FX' },
      ]),
      status: 'NEW',
      adminNotes: JSON.stringify([
        { text: 'New high-priority inquiry received via website.', date: new Date().toISOString(), author: 'System' },
      ]),
    },
    {
      requestNumber: 'UTSAV-2026-1039',
      customerName: 'Pooja Venkatesh',
      phone: '+91 98450 12894',
      email: 'pooja.v@outlook.com',
      eventDate: '2026-09-28',
      eventTimeSlot: 'Morning',
      location: 'Prestige Lakeside Habitat Club House, Whitefield, Bengaluru',
      venueType: 'Home/Apartment',
      guestCount: 80,
      notes: 'Looking for an auspicious traditional Griha Pravesh setup with lots of fresh marigolds and mango leaves.',
      selectedThemeId: thirdTheme ? thirdTheme.id : null,
      selectedThemeName: thirdTheme ? thirdTheme.name : 'Sampoorna Griha Pravesh Marigold Grandeur',
      selectedAddons: JSON.stringify([
        { id: 'addon-4', name: 'South Indian Fresh Kolam / Rangoli Floor Decor', quantity: 1, itemCategory: 'Floral' },
        { id: 'addon-5', name: 'Giant Brass Floating Flower Urli (3-ft)', quantity: 2, itemCategory: 'Floral' },
      ]),
      status: 'CONTACTED',
      adminNotes: JSON.stringify([
        { text: 'Called Pooja on 1st Sep. Discussed pooja timings (7:00 AM muhurtham). Sent initial customized catalog via WhatsApp.', date: new Date(Date.now() - 86400000).toISOString(), author: 'Admin' },
      ]),
    },
    {
      requestNumber: 'UTSAV-2026-1035',
      customerName: 'Vikram Malhotra',
      phone: '+91 98112 77410',
      email: 'vikram.malhotra@rediffmail.com',
      eventDate: '2026-11-05',
      eventTimeSlot: 'Morning',
      location: 'Taj Vivanta, Surajkund, Delhi NCR',
      venueType: 'Lawn',
      guestCount: 150,
      notes: 'Need vibrant yellow marigolds, brass bathing urlis, and floral umbrella photo booths for Haldi ceremony.',
      selectedThemeId: secondTheme ? secondTheme.id : null,
      selectedThemeName: secondTheme ? secondTheme.name : 'Vrindavan Haldi Bloom with Brass Urlis',
      selectedAddons: JSON.stringify([
        { id: 'addon-6', name: 'Royal Shahi Teakwood Jhula (Swing)', quantity: 1, itemCategory: 'Seating' },
        { id: 'addon-7', name: 'Traditional Live Punjabi Dhol Troupe', quantity: 1, itemCategory: 'Sound' },
      ]),
      status: 'CONFIRMED',
      adminNotes: JSON.stringify([
        { text: 'Site visit completed on 28th Aug. Client approved quote and paid token advance of ₹25,000.', date: new Date(Date.now() - 172800000).toISOString(), author: 'Admin' },
      ]),
    },
  ];

  for (const req of sampleRequests) {
    await prisma.request.create({ data: req });
  }
  console.log('✅ Created sample customer requests for Admin dashboard');
  console.log('🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
