import type { Product, ProductSpec, ProductTag } from '../types';

const kaspi = (query: string): string =>
  `https://kaspi.kz/shop/search/?text=${encodeURIComponent(query)}`;

interface Seed {
  slug: string;
  name: string;
  brand: string;
  categoryId: string;
  price: number;
  form: string;
  weight?: string;
  volume?: string;
  flavor?: string;
  servings?: string;
  shortDescription: string;
  description: string;
  extraSpecs?: ProductSpec[];
  ingredients?: string;
  nutrition?: ProductSpec[];
  usage?: string;
  tags?: ProductTag[];
  popularity?: number;
}

let counter = 0;

function makeProduct(seed: Seed): Product {
  counter += 1;

  const specs: ProductSpec[] = [
    { label: 'Бренд', value: seed.brand },
    { label: 'Форма выпуска', value: seed.form },
  ];
  if (seed.weight) specs.push({ label: 'Масса', value: seed.weight });
  if (seed.volume) specs.push({ label: 'Объём', value: seed.volume });
  if (seed.servings) specs.push({ label: 'Порций', value: seed.servings });
  if (seed.flavor) specs.push({ label: 'Вкус', value: seed.flavor });
  if (seed.extraSpecs) specs.push(...seed.extraSpecs);

  return {
    id: `p${String(counter).padStart(3, '0')}`,
    slug: seed.slug,
    name: seed.name,
    brand: seed.brand,
    categoryId: seed.categoryId,
    price: seed.price,
    imageUrl: `/sportfuel/images/products/${seed.slug}.jpg`,
    shortDescription: seed.shortDescription,
    description: seed.description,
    specs,
    weight: seed.weight,
    volume: seed.volume,
    flavor: seed.flavor,
    servings: seed.servings,
    ingredients: seed.ingredients,
    nutrition: seed.nutrition,
    usage: seed.usage,
    kaspiUrl: kaspi(`${seed.brand} ${seed.name}`),
    kaspiLinkType: 'search',
    tags: seed.tags ?? [],
    popularity: seed.popularity ?? 50,
    isDemo: true,
  };
}

export const products: Product[] = [
  // ── Протеин ────────────────────────────────────────────────
  makeProduct({
    slug: 'gold-standard-100-whey',
    name: 'Gold Standard 100% Whey',
    brand: 'Optimum Nutrition',
    categoryId: 'protein',
    price: 38900,
    form: 'Порошок',
    weight: '2,27 кг',
    flavor: 'Шоколад',
    servings: '74 порции',
    shortDescription: 'Сывороточный протеин — классика для набора мышечной массы.',
    description:
      'Сывороточный протеин со сбалансированным аминокислотным профилем. Подходит для приёма после тренировки и в течение дня как дополнительный источник белка.',
    extraSpecs: [
      { label: 'Тип белка', value: 'Сывороточный концентрат' },
      { label: 'Белок на порцию', value: '24 г' },
    ],
    ingredients: 'Концентрат сывороточного белка, ароматизатор, подсластитель. (Демонстрационные данные)',
    nutrition: [
      { label: 'Белки', value: '24 г (на порцию 31 г)' },
      { label: 'Жиры', value: '1 г' },
      { label: 'Углеводы', value: '3 г' },
    ],
    usage: 'Смешайте одну порцию с водой или молоком. Принимайте после тренировки. (Демонстрационные данные)',
    tags: ['popular'],
    popularity: 98,
  }),
  makeProduct({
    slug: 'maxler-100-golden-whey',
    name: '100% Golden Whey',
    brand: 'Maxler',
    categoryId: 'protein',
    price: 21500,
    form: 'Порошок',
    weight: '908 г',
    flavor: 'Ваниль',
    servings: '30 порций',
    shortDescription: 'Универсальный сывороточный протеин на каждый день.',
    description:
      'Быстроусвояемый сывороточный белок с приятным вкусом. Удобный формат для ежедневного приёма и поддержания белкового баланса в рационе.',
    extraSpecs: [{ label: 'Белок на порцию', value: '24 г' }],
    tags: ['popular'],
    popularity: 91,
  }),
  makeProduct({
    slug: 'rline-whey',
    name: 'Whey Protein',
    brand: 'RLine',
    categoryId: 'protein',
    price: 16900,
    form: 'Порошок',
    weight: '900 г',
    flavor: 'Клубника',
    servings: '30 порций',
    shortDescription: 'Доступный сывороточный протеин для роста мышц.',
    description:
      'Концентрат сывороточного белка с хорошей растворимостью. Подходит как для набора массы, так и для восстановления после тренировок.',
    extraSpecs: [{ label: 'Белок на порцию', value: '22 г' }],
    popularity: 76,
  }),
  makeProduct({
    slug: 'biotech-iso-whey-zero',
    name: 'Iso Whey Zero',
    brand: 'BioTechUSA',
    categoryId: 'protein',
    price: 42000,
    form: 'Порошок',
    weight: '2,27 кг',
    flavor: 'Шоколад',
    servings: '80 порций',
    shortDescription: 'Изолят сывороточного белка без лишнего сахара.',
    description:
      'Высокоочищенный изолят сывороточного белка с низким содержанием жиров и углеводов. Подходит для контроля калорийности рациона.',
    extraSpecs: [{ label: 'Тип белка', value: 'Изолят' }],
    tags: ['new'],
    popularity: 82,
  }),

  // ── Креатин ────────────────────────────────────────────────
  makeProduct({
    slug: 'maxler-creatine-100',
    name: 'Creatine 100%',
    brand: 'Maxler',
    categoryId: 'creatine',
    price: 9900,
    form: 'Порошок',
    weight: '300 г',
    servings: '60 порций',
    shortDescription: 'Чистый моногидрат креатина для силы и мощности.',
    description:
      'Моногидрат креатина без добавок. Способствует повышению силовых показателей и работоспособности во время интенсивных тренировок.',
    extraSpecs: [{ label: 'Тип', value: 'Моногидрат' }],
    tags: ['popular'],
    popularity: 93,
  }),
  makeProduct({
    slug: 'on-micronized-creatine',
    name: 'Micronized Creatine Powder',
    brand: 'Optimum Nutrition',
    categoryId: 'creatine',
    price: 14500,
    form: 'Порошок',
    weight: '300 г',
    servings: '60 порций',
    shortDescription: 'Микронизированный креатин с высокой растворимостью.',
    description:
      'Микронизированный моногидрат креатина, который легко размешивается в воде. Подходит для циклов приёма креатина.',
    extraSpecs: [{ label: 'Тип', value: 'Моногидрат' }],
    popularity: 81,
  }),
  makeProduct({
    slug: 'rline-creatine-monohydrate',
    name: 'Creatine Monohydrate',
    brand: 'RLine',
    categoryId: 'creatine',
    price: 8500,
    form: 'Порошок',
    weight: '500 г',
    servings: '100 порций',
    shortDescription: 'Большая упаковка моногидрата креатина.',
    description:
      'Моногидрат креатина в экономичной упаковке. Простая и проверенная форма креатина для регулярного приёма.',
    extraSpecs: [{ label: 'Тип', value: 'Моногидрат' }],
    popularity: 70,
  }),

  // ── Гейнеры ────────────────────────────────────────────────
  makeProduct({
    slug: 'maxler-mega-gainer',
    name: 'Mega Gainer',
    brand: 'Maxler',
    categoryId: 'gainers',
    price: 32000,
    form: 'Порошок',
    weight: '3 кг',
    flavor: 'Шоколад',
    servings: '30 порций',
    shortDescription: 'Углеводно-белковая смесь для набора массы.',
    description:
      'Гейнер с высоким содержанием углеводов и белка. Подходит людям, которым сложно набрать массу при обычном питании.',
    extraSpecs: [
      { label: 'Белки на порцию', value: '30 г' },
      { label: 'Углеводы на порцию', value: '80 г' },
    ],
    tags: ['popular'],
    popularity: 90,
  }),
  makeProduct({
    slug: 'rline-mass-gainer',
    name: 'Mass Gainer',
    brand: 'RLine',
    categoryId: 'gainers',
    price: 21900,
    form: 'Порошок',
    weight: '3,3 кг',
    flavor: 'Банан',
    servings: '33 порции',
    shortDescription: 'Доступный гейнер для набора веса.',
    description:
      'Углеводно-белковый комплекс в большой упаковке. Помогает увеличить калорийность рациона и набрать массу.',
    extraSpecs: [{ label: 'Углеводы на порцию', value: '75 г' }],
    popularity: 74,
  }),
  makeProduct({
    slug: 'biotech-hyper-mass',
    name: 'Hyper Mass',
    brand: 'BioTechUSA',
    categoryId: 'gainers',
    price: 28500,
    form: 'Порошок',
    weight: '2,27 кг',
    flavor: 'Ваниль',
    servings: '22 порции',
    shortDescription: 'Сбалансированный гейнер для массонабора.',
    description:
      'Гейнер с хорошим соотношением углеводов и белка. Удобен для приёма между основными приёмами пищи.',
    extraSpecs: [{ label: 'Белки на порцию', value: '26 г' }],
    popularity: 68,
  }),
  makeProduct({
    slug: 'on-serious-mass',
    name: 'Serious Mass',
    brand: 'Optimum Nutrition',
    categoryId: 'gainers',
    price: 34900,
    form: 'Порошок',
    weight: '2,72 кг',
    flavor: 'Шоколад',
    servings: '16 порций',
    shortDescription: 'Высококалорийный гейнер для интенсивного набора массы.',
    description:
      'Гейнер с высокой калорийностью на порцию. Предназначен для людей, которым нужен значительный профицит калорий.',
    extraSpecs: [{ label: 'Калории на порцию', value: '1250 ккал' }],
    popularity: 77,
  }),

  // ── Аминокислоты и BCAA ────────────────────────────────────
  makeProduct({
    slug: 'maxler-bcaa-211',
    name: 'BCAA 2:1:1',
    brand: 'Maxler',
    categoryId: 'amino',
    price: 8900,
    form: 'Порошок',
    weight: '300 г',
    flavor: 'Кола',
    servings: '30 порций',
    shortDescription: 'Классические BCAA в соотношении 2:1:1.',
    description:
      'Комплекс аминокислот с разветвлённой цепью в классическом соотношении 2:1:1. Принимается во время или после тренировки.',
    extraSpecs: [{ label: 'Соотношение', value: '2:1:1' }],
    tags: ['popular'],
    popularity: 89,
  }),
  makeProduct({
    slug: 'on-bcaa-1000',
    name: 'BCAA 1000',
    brand: 'Optimum Nutrition',
    categoryId: 'amino',
    price: 11900,
    form: 'Капсулы',
    servings: '100 порций',
    shortDescription: 'BCAA в удобной капсульной форме.',
    description:
      'Аминокислоты BCAA в капсулах для тех, кто не любит порошковые напитки. Удобно брать с собой.',
    extraSpecs: [{ label: 'Количество капсул', value: '200 шт.' }],
    popularity: 72,
  }),
  makeProduct({
    slug: 'rline-bcaa-12000',
    name: 'BCAA 12000',
    brand: 'RLine',
    categoryId: 'amino',
    price: 6500,
    form: 'Порошок',
    weight: '300 г',
    flavor: 'Фруктовый пунш',
    servings: '30 порций',
    shortDescription: 'Доступные BCAA с большой дозировкой на порцию.',
    description:
      'Комплекс BCAA с увеличенной дозировкой на порцию. Подходит для восстановления после силовых тренировок.',
    extraSpecs: [{ label: 'BCAA на порцию', value: '12 г' }],
    popularity: 66,
  }),
  makeProduct({
    slug: 'scitec-amino-5600',
    name: 'Amino 5600',
    brand: 'Scitec Nutrition',
    categoryId: 'amino',
    price: 18900,
    form: 'Таблетки',
    servings: '83 порции',
    shortDescription: 'Полный аминокислотный комплекс в таблетках.',
    description:
      'Комплекс аминокислот, включающий BCAA и другие незаменимые аминокислоты. Форма таблеток удобна для регулярного приёма.',
    extraSpecs: [{ label: 'Количество таблеток', value: '1000 шт.' }],
    popularity: 61,
  }),

  // ── Предтренировочные комплексы ───────────────────────────
  makeProduct({
    slug: 'maxler-preworkout',
    name: 'Pre-Workout',
    brand: 'Maxler',
    categoryId: 'preworkout',
    price: 13900,
    form: 'Порошок',
    weight: '250 г',
    flavor: 'Апельсин',
    servings: '25 порций',
    shortDescription: 'Энергия и концентрация перед тренировкой.',
    description:
      'Предтренировочный комплекс для повышения энергии, концентрации и выносливости. Принимается за 20–30 минут до тренировки.',
    extraSpecs: [{ label: 'Кофеин', value: 'Содержит кофеин' }],
    tags: ['popular'],
    popularity: 88,
  }),
  makeProduct({
    slug: 'biotech-black-blood',
    name: 'Black Blood',
    brand: 'BioTechUSA',
    categoryId: 'preworkout',
    price: 16500,
    form: 'Порошок',
    weight: '300 г',
    servings: '30 порций',
    shortDescription: 'Интенсивный предтренировочный комплекс.',
    description:
      'Мощный предтренировочный комплекс для высокой интенсивности нагрузок. Содержит стимулирующие компоненты.',
    extraSpecs: [{ label: 'Кофеин', value: 'Содержит кофеин' }],
    popularity: 79,
  }),
  makeProduct({
    slug: 'rline-pump-up',
    name: 'Pump Up',
    brand: 'RLine',
    categoryId: 'preworkout',
    price: 7900,
    form: 'Порошок',
    weight: '300 г',
    flavor: 'Арбуз',
    servings: '30 порций',
    shortDescription: 'Доступный предтренировочный комплекс.',
    description:
      'Бюджетный предтренировочный комплекс для энергии и пампинга. Подходит для регулярных тренировок.',
    extraSpecs: [{ label: 'Кофеин', value: 'Содержит кофеин' }],
    popularity: 64,
  }),
  makeProduct({
    slug: 'scitec-hot-blood',
    name: 'Hot Blood',
    brand: 'Scitec Nutrition',
    categoryId: 'preworkout',
    price: 17900,
    form: 'Порошок',
    weight: '350 г',
    servings: '35 порций',
    shortDescription: 'Комплекс для энергии и фокуса.',
    description:
      'Предтренировочный комплекс с компонентами для энергии и ментальной концентрации. Для опытных пользователей.',
    extraSpecs: [{ label: 'Кофеин', value: 'Содержит кофеин' }],
    tags: ['new'],
    popularity: 73,
  }),

  // ── Витамины и минералы ───────────────────────────────────
  makeProduct({
    slug: 'maxler-daily-multivitamin',
    name: 'Daily Multivitamin',
    brand: 'Maxler',
    categoryId: 'vitamins',
    price: 7500,
    form: 'Таблетки',
    servings: '90 порций',
    shortDescription: 'Ежедневный мультивитаминный комплекс.',
    description:
      'Сбалансированный комплекс витаминов и минералов для ежедневной поддержки организма. Подходит для активных людей.',
    extraSpecs: [{ label: 'Количество таблеток', value: '90 шт.' }],
    tags: ['popular'],
    popularity: 86,
  }),
  makeProduct({
    slug: 'on-opti-men',
    name: 'Opti-Men',
    brand: 'Optimum Nutrition',
    categoryId: 'vitamins',
    price: 15900,
    form: 'Таблетки',
    servings: '90 порций',
    shortDescription: 'Мультивитаминный комплекс для мужчин.',
    description:
      'Витаминно-минеральный комплекс, разработанный с учётом потребностей мужчин, ведущих активный образ жизни.',
    extraSpecs: [{ label: 'Количество таблеток', value: '90 шт.' }],
    popularity: 75,
  }),
  makeProduct({
    slug: 'rline-vitamin-d3',
    name: 'Vitamin D3',
    brand: 'RLine',
    categoryId: 'vitamins',
    price: 3900,
    form: 'Капсулы',
    servings: '120 порций',
    shortDescription: 'Витамин D3 для иммунитета и костей.',
    description:
      'Витамин D3 в капсулах для поддержки иммунной системы и здоровья костей. Особенно актуален в осенне-зимний период.',
    extraSpecs: [{ label: 'Количество капсул', value: '120 шт.' }],
    popularity: 69,
  }),
  makeProduct({
    slug: 'biotech-multivitamin-men',
    name: 'Multivitamin for Men',
    brand: 'BioTechUSA',
    categoryId: 'vitamins',
    price: 8900,
    form: 'Капсулы',
    servings: '60 порций',
    shortDescription: 'Комплекс витаминов для мужчин.',
    description:
      'Мультивитаминный комплекс для мужчин с расширенным составом витаминов и минералов.',
    extraSpecs: [{ label: 'Количество капсул', value: '60 шт.' }],
    popularity: 63,
  }),

  // ── Омега-3 ────────────────────────────────────────────────
  makeProduct({
    slug: 'maxler-omega-3',
    name: 'Omega-3',
    brand: 'Maxler',
    categoryId: 'omega',
    price: 6900,
    form: 'Капсулы',
    servings: '100 порций',
    shortDescription: 'Жирные кислоты Омега-3 для сердца и суставов.',
    description:
      'Рыбий жир с жирными кислотами Омега-3. Поддерживает сердечно-сосудистую систему и общее самочувствие.',
    extraSpecs: [{ label: 'Количество капсул', value: '100 шт.' }],
    tags: ['popular'],
    popularity: 87,
  }),
  makeProduct({
    slug: 'on-fish-oil',
    name: 'Fish Oil',
    brand: 'Optimum Nutrition',
    categoryId: 'omega',
    price: 7900,
    form: 'Капсулы',
    servings: '100 порций',
    shortDescription: 'Очищенный рыбий жир в капсулах.',
    description:
      'Капсулы рыбьего жира как источник Омега-3 жирных кислот. Подходит для ежедневного приёма.',
    extraSpecs: [{ label: 'Количество капсул', value: '100 шт.' }],
    popularity: 71,
  }),
  makeProduct({
    slug: 'rline-omega-3',
    name: 'Omega-3',
    brand: 'RLine',
    categoryId: 'omega',
    price: 4500,
    form: 'Капсулы',
    servings: '90 порций',
    shortDescription: 'Доступный источник Омега-3.',
    description:
      'Бюджетный вариант Омега-3 для ежедневного восполнения полезных жирных кислот.',
    extraSpecs: [{ label: 'Количество капсул', value: '90 шт.' }],
    popularity: 62,
  }),
  makeProduct({
    slug: 'biotech-omega-3',
    name: 'Omega-3',
    brand: 'BioTechUSA',
    categoryId: 'omega',
    price: 8500,
    form: 'Капсулы',
    servings: '120 порций',
    shortDescription: 'Омега-3 в большой упаковке.',
    description:
      'Капсулы Омега-3 в упаковке на несколько месяцев регулярного приёма.',
    extraSpecs: [{ label: 'Количество капсул', value: '120 шт.' }],
    popularity: 65,
  }),

  // ── Аксессуары ─────────────────────────────────────────────
  makeProduct({
    slug: 'irongrip-training-gloves',
    name: 'Перчатки для тренировок',
    brand: 'IronGrip',
    categoryId: 'accessories',
    price: 4900,
    form: 'Аксессуар',
    shortDescription: 'Перчатки для защиты ладоней при силовых нагрузках.',
    description:
      'Тренировочные перчатки с усиленными накладками на ладонях. Защищают кожу и улучшают хват во время работы с весом.',
    extraSpecs: [{ label: 'Размер', value: 'L' }],
    tags: ['popular'],
    popularity: 80,
  }),
  makeProduct({
    slug: 'fittools-lifting-belt',
    name: 'Пояс для силовых тренировок',
    brand: 'FitTools',
    categoryId: 'accessories',
    price: 7900,
    form: 'Аксессуар',
    shortDescription: 'Пояс для поддержки поясницы в тяжёлых упражнениях.',
    description:
      'Силовой пояс для дополнительной поддержки корпуса при приседаниях и становой тяге.',
    extraSpecs: [{ label: 'Ширина', value: '10 см' }],
    popularity: 67,
  }),
  makeProduct({
    slug: 'irongrip-wrist-wraps',
    name: 'Кистевые бинты',
    brand: 'IronGrip',
    categoryId: 'accessories',
    price: 3500,
    form: 'Аксессуар',
    shortDescription: 'Бинты для фиксации запястий при жиме.',
    description:
      'Эластичные кистевые бинты для стабилизации запястий во время жимовых упражнений.',
    extraSpecs: [{ label: 'Длина', value: '50 см' }],
    popularity: 58,
  }),
  makeProduct({
    slug: 'nordic-fitness-gym-backpack',
    name: 'Спортивный рюкзак',
    brand: 'Nordic Fitness',
    categoryId: 'accessories',
    price: 12900,
    form: 'Аксессуар',
    shortDescription: 'Вместительный рюкзак для формы и аксессуаров.',
    description:
      'Спортивный рюкзак с отделением для обуви и карманами для мелочей. Удобен для походов в зал.',
    extraSpecs: [{ label: 'Объём', value: '25 л' }],
    tags: ['new'],
    popularity: 55,
  }),

  // ── Изотоники ──────────────────────────────────────────────
  makeProduct({
    slug: 'maxler-isodrink',
    name: 'Isodrink',
    brand: 'Maxler',
    categoryId: 'isotonic',
    price: 6500,
    form: 'Порошок',
    weight: '500 г',
    flavor: 'Лимон',
    servings: '25 порций',
    shortDescription: 'Изотонический напиток для поддержания гидратации.',
    description:
      'Изотоник с электролитами и углеводами для восполнения жидкости во время тренировок.',
    extraSpecs: [{ label: 'Электролиты', value: 'Содержит' }],
    popularity: 72,
  }),
  makeProduct({
    slug: 'biotech-isotonic',
    name: 'IsoTonic',
    brand: 'BioTechUSA',
    categoryId: 'isotonic',
    price: 7900,
    form: 'Порошок',
    weight: '640 г',
    flavor: 'Апельсин',
    servings: '20 порций',
    shortDescription: 'Напиток для восстановления водного баланса.',
    description:
      'Изотонический напиток с электролитами и витаминами. Подходит для длительных кардио- и командных нагрузок.',
    extraSpecs: [{ label: 'Электролиты', value: 'Содержит' }],
    popularity: 66,
  }),
  makeProduct({
    slug: 'rline-iso',
    name: 'Iso',
    brand: 'RLine',
    categoryId: 'isotonic',
    price: 4900,
    form: 'Порошок',
    weight: '500 г',
    flavor: 'Ягодный',
    servings: '25 порций',
    shortDescription: 'Доступный изотоник для тренировок.',
    description:
      'Бюджетный изотонический напиток для поддержания гидратации во время нагрузок.',
    extraSpecs: [{ label: 'Электролиты', value: 'Содержит' }],
    popularity: 59,
  }),

  // ── Батончики ──────────────────────────────────────────────
  makeProduct({
    slug: 'maxler-protein-bar',
    name: 'Protein Bar',
    brand: 'Maxler',
    categoryId: 'bars',
    price: 5900,
    form: 'Батончик',
    weight: '12 шт × 60 г',
    flavor: 'Шоколад',
    shortDescription: 'Протеиновые батончики для быстрого перекуса.',
    description:
      'Набор протеиновых батончиков для перекуса между тренировками. Удобно брать с собой.',
    extraSpecs: [{ label: 'Белок на батончик', value: '20 г' }],
    tags: ['popular'],
    popularity: 84,
  }),
  makeProduct({
    slug: 'rline-protein-bar',
    name: 'Protein Bar',
    brand: 'RLine',
    categoryId: 'bars',
    price: 4500,
    form: 'Батончик',
    weight: '12 шт × 50 г',
    flavor: 'Арахис',
    shortDescription: 'Доступные протеиновые батончики.',
    description:
      'Протеиновые батончики в экономичной упаковке. Хороший вариант быстрого перекуса.',
    extraSpecs: [{ label: 'Белок на батончик', value: '18 г' }],
    popularity: 60,
  }),
  makeProduct({
    slug: 'biotech-protein-bar',
    name: 'Protein Bar',
    brand: 'BioTechUSA',
    categoryId: 'bars',
    price: 6900,
    form: 'Батончик',
    weight: '12 шт × 60 г',
    shortDescription: 'Батончики с высоким содержанием белка.',
    description:
      'Протеиновые батончики с хорошим белковым профилем. Подходят как перекус в течение дня.',
    extraSpecs: [{ label: 'Белок на батончик', value: '20 г' }],
    popularity: 62,
  }),
  makeProduct({
    slug: 'on-protein-bar',
    name: 'Protein Bar',
    brand: 'Optimum Nutrition',
    categoryId: 'bars',
    price: 7900,
    form: 'Батончик',
    weight: '12 шт × 60 г',
    shortDescription: 'Протеиновые батончики премиум-сегмента.',
    description:
      'Батончики с высоким содержанием белка и приятным вкусом. Удобный формат для активного образа жизни.',
    extraSpecs: [{ label: 'Белок на батончик', value: '20 г' }],
    tags: ['new'],
    popularity: 70,
  }),

  // ── L-карнитин ─────────────────────────────────────────────
  makeProduct({
    slug: 'maxler-l-carnitine-3000',
    name: 'L-Carnitine 3000',
    brand: 'Maxler',
    categoryId: 'l-carnitine',
    price: 8900,
    form: 'Жидкость',
    volume: '1000 мл',
    flavor: 'Апельсин',
    servings: '50 порций',
    shortDescription: 'Жидкий L-карнитин для поддержки обмена веществ.',
    description:
      'L-карнитин в жидкой форме с высокой дозировкой. Поддерживает энергетический обмен и восстановление.',
    extraSpecs: [{ label: 'L-карнитин на порцию', value: '3000 мг' }],
    tags: ['popular'],
    popularity: 83,
  }),
  makeProduct({
    slug: 'rline-l-carnitine',
    name: 'L-Carnitine',
    brand: 'RLine',
    categoryId: 'l-carnitine',
    price: 4900,
    form: 'Жидкость',
    volume: '500 мл',
    flavor: 'Лимон',
    servings: '25 порций',
    shortDescription: 'Доступный L-карнитин в жидкой форме.',
    description:
      'L-карнитин для поддержки энергетического обмена. Удобная жидкая форма для приёма перед тренировкой.',
    extraSpecs: [{ label: 'L-карнитин на порцию', value: '2000 мг' }],
    popularity: 57,
  }),
  makeProduct({
    slug: 'biotech-l-carnitine-100000',
    name: 'L-Carnitine 100000',
    brand: 'BioTechUSA',
    categoryId: 'l-carnitine',
    price: 7500,
    form: 'Жидкость',
    volume: '500 мл',
    flavor: 'Грейпфрут',
    servings: '25 порций',
    shortDescription: 'Концентрированный L-карнитин.',
    description:
      'L-карнитин с высокой концентрацией на порцию. Подходит для регулярного приёма.',
    extraSpecs: [{ label: 'L-карнитин на порцию', value: '4000 мг' }],
    popularity: 64,
  }),

  // ── Шейкеры ────────────────────────────────────────────────
  makeProduct({
    slug: 'maxler-shaker-700',
    name: 'Шейкер 700 мл',
    brand: 'Maxler',
    categoryId: 'shakers',
    price: 2900,
    form: 'Аксессуар',
    volume: '700 мл',
    shortDescription: 'Шейкер для приготовления протеиновых коктейлей.',
    description:
      'Шейкер с сеткой для равномерного смешивания протеина. Удобная мерная шкала на корпусе.',
    extraSpecs: [{ label: 'Материал', value: 'Пластик' }],
    tags: ['popular'],
    popularity: 78,
  }),
  makeProduct({
    slug: 'rline-shaker-600',
    name: 'Шейкер 600 мл',
    brand: 'RLine',
    categoryId: 'shakers',
    price: 2500,
    form: 'Аксессуар',
    volume: '600 мл',
    shortDescription: 'Компактный шейкер для спортпита.',
    description:
      'Небольшой шейкер для приготовления коктейлей. Удобно брать с собой на тренировку.',
    extraSpecs: [{ label: 'Материал', value: 'Пластик' }],
    popularity: 56,
  }),
  makeProduct({
    slug: 'sportline-water-bottle-750',
    name: 'Бутылка для воды 750 мл',
    brand: 'SportLine',
    categoryId: 'shakers',
    price: 3200,
    form: 'Аксессуар',
    volume: '750 мл',
    shortDescription: 'Спортивная бутылка для воды.',
    description:
      'Бутылка для воды с удобной крышкой и мерной шкалой. Подходит для тренировок и повседневного использования.',
    extraSpecs: [{ label: 'Материал', value: 'Пластик' }],
    tags: ['new'],
    popularity: 54,
  }),
];

export const productById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const productBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);
