/**
 * QUATRÉA product catalogue.
 * One shared template (`pages/ProductDetails.jsx`) renders every fragrance
 * from this data, so adding a product is purely a data change.
 */

export const SIZES = [30, 50, 100];
export const DEFAULT_SIZE = 50;

export const NOTE_TIERS = [
  {
    key: 'top',
    numeral: 'I',
    title: 'Top Notes',
    caption: 'The first impression',
    description: 'Bright and fleeting the notes that greet you in the opening minutes.',
  },
  {
    key: 'heart',
    numeral: 'II',
    title: 'Heart Notes',
    caption: 'The character',
    description: 'Emerging as the opening softens, the heart carries the soul of the season.',
  },
  {
    key: 'base',
    numeral: 'III',
    title: 'Base Notes',
    caption: 'The memory',
    description: 'Warm, lasting notes that remain on the skin long after the first spray.',
  },
];

export const products = [
  {
    slug: 'spring',
    index: '01',
    season: 'Spring',
    emotion: 'Renewal',
    name: 'Éclat de Fleur',
    family: 'Floral · Fresh',
    personality: ['Floral', 'Fresh', 'Elegant'],
    accent: '#e8c4d2',
    particles: 'petals',
    short:
      'Dew bright peony and pear blossom on a veil of white musk the first warm morning of the year.',
    tagline: 'Where every beginning blooms.',
    scene: {
      headline: 'Where Every Beginning Blooms.',
      lines: ['Where Every', 'Beginning Blooms.'],
      description:
        'Fresh, delicate, and full of life. Éclat de Fleur captures the beauty of nature awakening after winter.',
    },
    intro: {
      statement: 'The first light of morning, caught on a petal.',
      body: 'Éclat de Fleur opens like a window thrown wide after winter. Pear blossom and bergamot sparkle over a heart of peony and cherry blossom, settling into a clean, luminous trail of white musk and pale woods. It is a fragrance of first times fresh, tender and quietly confident.',
    },
    notes: {
      top: ['Bergamot', 'Pear Blossom', 'Dew Accord'],
      heart: ['Peony', 'Cherry Blossom', 'Lily of the Valley'],
      base: ['White Musk', 'Cedarwood', 'Blond Woods'],
    },
    story: {
      eyebrow: 'The Awakening',
      title: 'A garden still wet with dew.',
      paragraphs: [
        'Imagine the first morning you open the window and the air feels different softer, sweeter, alive. The garden is still wet with dew, and somewhere a blossom has opened overnight.',
        'Éclat de Fleur was composed around that moment of awakening. Its florals are sheer rather than heavy, its musk as clean as linen dried in the sun. It is worn close, like a secret you are happy to share.',
      ],
      quote: 'Spring does not arrive. It unfolds.',
    },
    details: {
      concentration: 'Eau de Parfum',
      character: 'Luminous · Airy · Tender',
      moment: 'Bright mornings, garden lunches, new beginnings',
      longevity: '6 – 8 hours',
      sillage: 'Soft to moderate',
    },
    prices: { 30: 95, 50: 145, 100: 210 },
    image: 'products/spring',
    background: 'seasons/spring',
    alt: 'Éclat de Fleur by Quatréa a crystal flacon of pale blush eau de parfum among blossom petals in soft blue morning light.',
  },
  {
    slug: 'summer',
    index: '02',
    season: 'Summer',
    emotion: 'Freedom',
    name: 'Soléa',
    family: 'Citrus · Aquatic',
    personality: ['Citrus', 'Aquatic', 'Refreshing'],
    accent: '#e9c77b',
    particles: 'light',
    short:
      'Sun warmed lemon, sea air and neroli a fragrance of open horizons and long golden days.',
    tagline: 'Chase the warmth of every moment.',
    scene: {
      headline: 'Chase the Warmth of Every Moment.',
      lines: ['Chase the Warmth', 'of Every Moment.'],
      description:
        'Bright citrus, refreshing aquatic notes, and golden warmth come together in a fragrance that celebrates freedom.',
    },
    intro: {
      statement: 'Salt on the skin. Light on the water.',
      body: 'Soléa is the feeling of a day without edges. Lemon zest and mandarin burst like sunlight on a moving sea, a heart of neroli and orange blossom glows with warmth, and driftwood and sun warmed musk linger like the memory of an afternoon you never wanted to end.',
    },
    notes: {
      top: ['Lemon Zest', 'Mandarin', 'Sea Spray Accord'],
      heart: ['Neroli', 'Orange Blossom', 'Water Lily'],
      base: ['Driftwood', 'Ambrette Seed', 'Sun warmed Musk'],
    },
    story: {
      eyebrow: 'The Golden Hour',
      title: 'Light breaking on the water.',
      paragraphs: [
        'The tide pulls back across warm stone. Light breaks into a thousand pieces on the water, and the scent of citrus drifts from somewhere beyond the terrace.',
        'Soléa holds that golden hour in a single breath bright, salt kissed and generous. It is a fragrance for the days when time loosens its grip and every moment feels like an invitation.',
      ],
      quote: 'Freedom has a scent. It smells of salt, citrus and sun.',
    },
    details: {
      concentration: 'Eau de Parfum',
      character: 'Radiant · Breezy · Vivid',
      moment: 'Sunlit days, coastlines, warm evenings outdoors',
      longevity: '5 – 7 hours',
      sillage: 'Moderate',
    },
    prices: { 30: 95, 50: 145, 100: 210 },
    image: 'products/summer',
    background: 'seasons/summer',
    alt: 'Soléa by Quatréa a crystal flacon of pale golden eau de parfum on sunlit stone beside clear turquoise water.',
  },
  {
    slug: 'autumn',
    index: '03',
    season: 'Autumn',
    emotion: 'Mystery',
    name: 'Ambre Nocturne',
    family: 'Woody · Amber · Spicy',
    personality: ['Woody', 'Amber', 'Spicy'],
    accent: '#d38c4c',
    particles: 'leaves',
    short:
      'Glowing amber, smoked rose and cinnamon bark over sandalwood warmth for long, golden evenings.',
    tagline: 'Elegance in every falling moment.',
    scene: {
      headline: 'Elegance in Every Falling Moment.',
      lines: ['Elegance in Every', 'Falling Moment.'],
      description:
        'Deep amber, warm woods, and sophisticated spices create an unforgettable expression of autumn.',
    },
    intro: {
      statement: 'Candlelight on amber. Leaves turning to gold.',
      body: 'Ambre Nocturne is the hour when the light grows low and the air turns gold. Pink pepper and saffron flicker at the opening, a heart of cinnamon bark and smoked rose deepens the mood, and a base of amber resin, sandalwood and tonka wraps the skin like cashmere.',
    },
    notes: {
      top: ['Pink Pepper', 'Saffron', 'Cardamom'],
      heart: ['Cinnamon Bark', 'Smoked Rose', 'Clove'],
      base: ['Amber Resin', 'Sandalwood', 'Tonka Bean'],
    },
    story: {
      eyebrow: 'The Long Evening',
      title: 'When the light turns to gold.',
      paragraphs: [
        'The leaves are turning, the evenings arrive earlier, and the world seems to gather itself indoors toward candlelight, conversation and the warmth of familiar rooms.',
        'Ambre Nocturne is composed for those hours. Its spices glow rather than burn, its amber deepens slowly on the skin, and its woods leave a trail that is elegant, intimate and unmistakably yours.',
      ],
      quote: 'Some memories do not fade. They deepen, like amber.',
    },
    details: {
      concentration: 'Eau de Parfum',
      character: 'Warm · Enveloping · Mysterious',
      moment: 'Evenings, candlelit dinners, cooler nights',
      longevity: '8 – 10 hours',
      sillage: 'Moderate to strong',
    },
    prices: { 30: 110, 50: 165, 100: 240 },
    image: 'products/autumn',
    background: 'seasons/autumn',
    alt: 'Ambre Nocturne by Quatréa a crystal flacon of glowing amber eau de parfum among fallen copper leaves in warm, low light.',
  },
  {
    slug: 'winter',
    index: '04',
    season: 'Winter',
    emotion: 'Stillness',
    name: 'Nuit de Glace',
    family: 'Musk · Fresh Woods · Aromatic',
    personality: ['Musky', 'Fresh Woods', 'Cool Aromatic'],
    accent: '#cfe9ff',
    particles: 'frost',
    short:
      'Frosted juniper and iris over cashmere musk and fir balsam the quiet radiance of a winter night.',
    tagline: 'Find beauty in the stillness.',
    scene: {
      headline: 'Find Beauty in the Stillness.',
      lines: ['Find Beauty', 'in the Stillness.'],
      description:
        'Cool aromatic notes, refined musk, and elegant woods capture the mysterious beauty of winter.',
    },
    intro: {
      statement: 'A breath of frost. A world gone quiet.',
      body: 'Nuit de Glace captures the hush after snowfall, when the air is clear enough to hear your own thoughts. Frosted juniper and cool mint sparkle over violet leaf and iris, before cashmere musk, fir balsam and vetiver settle into a trail that is pure, serene and endlessly refined.',
    },
    notes: {
      top: ['Frosted Juniper', 'Elemi', 'Cool Mint'],
      heart: ['Violet Leaf', 'Iris', 'Lavender'],
      base: ['Cashmere Musk', 'Fir Balsam', 'Vetiver'],
    },
    story: {
      eyebrow: 'The Stillness',
      title: 'A city muffled by snow.',
      paragraphs: [
        'Snow has fallen through the night. The city is muffled, the sky a deep and silent blue, and every breath turns to silver in the cold air.',
        'Nuit de Glace translates that stillness into fragrance crisp aromatics, cool florals and soft musky woods that feel both pure and sophisticated. A scent for those who find their strength in quiet.',
      ],
      quote: 'In the silence of winter, every detail becomes luminous.',
    },
    details: {
      concentration: 'Eau de Parfum',
      character: 'Pure · Serene · Refined',
      moment: 'Crisp days, winter nights, quiet elegance',
      longevity: '7 – 9 hours',
      sillage: 'Soft to moderate',
    },
    prices: { 30: 105, 50: 160, 100: 230 },
    image: 'products/winter',
    background: 'seasons/winter',
    alt: 'Nuit de Glace by Quatréa a crystal flacon of icy silver blue eau de parfum on frosted ice in cold, misty light.',
  },
];

export const getProduct = (slug) => products.find((p) => p.slug === slug);

export const getRelated = (slug) => products.filter((p) => p.slug !== slug);

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export const formatPrice = (value) => currency.format(value);

export const fromPrice = (product) => Math.min(...Object.values(product.prices));
