import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Heart, Search, X, Zap } from 'lucide-react';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { useFavorites } from '../hooks/useFavorites';
import { SearchBar } from './SearchBar';
import { CategoryIcon } from './CategoryIcon';

const NAV = [
  { to: '/', label: 'Главная' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/about', label: 'О проекте' },
];

export function Header() {
  const { count } = useFavorites();
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categoryCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of products) map.set(p.categoryId, (map.get(p.categoryId) ?? 0) + 1);
    return map;
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = searchOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [searchOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-x flex h-16 items-center gap-4">
        {/* Логотип */}
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="SportFuel — на главную">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Zap className="h-5 w-5" fill="currentColor" aria-hidden="true" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            Sport<span className="text-brand-600">Fuel</span>
          </span>
        </Link>

        {/* Навигация на десктопе */}
        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-brand-700' : 'text-slate-600 hover:text-slate-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Выпадающее меню категорий */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setCategoriesOpen((v) => !v)}
              aria-expanded={categoriesOpen}
              aria-haspopup="true"
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              Категории
              <ChevronDown
                className={`h-4 w-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            {categoriesOpen && (
              <div className="absolute left-0 top-full mt-2 w-[520px] rounded-2xl border border-slate-200 bg-white p-3 shadow-card-hover">
                <div className="grid grid-cols-2 gap-1">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.slug}`}
                      onClick={() => setCategoriesOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50"
                    >
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white"
                        style={{ background: `linear-gradient(135deg, ${category.color[0]}, ${category.color[1]})` }}
                      >
                        <CategoryIcon icon={category.icon} className="h-5 w-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-slate-800">
                          {category.name}
                        </span>
                        <span className="block text-xs text-slate-400">
                          {categoryCounts.get(category.id) ?? 0} товаров
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Поиск + избранное на десктопе */}
        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <SearchBar className="w-56 xl:w-72" />
          <Link
            to="/favorites"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            aria-label={`Избранное (${count})`}
          >
            <Heart className="h-5 w-5" aria-hidden="true" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-600 px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
        </div>

        {/* Мобильная кнопка: поиск */}
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white shadow-sm transition-colors hover:bg-brand-700 lg:hidden"
          aria-label="Поиск"
        >
          <Search className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Поисковый HUD — всплывает поверх интерфейса */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Поиск">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setSearchOpen(false)} />
          <div className="absolute inset-x-0 top-0 bg-white shadow-lg">
            <div className="container-x flex items-center gap-2 py-3">
              <SearchBar className="flex-1" onSubmitted={() => setSearchOpen(false)} autoFocus />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Закрыть поиск"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
