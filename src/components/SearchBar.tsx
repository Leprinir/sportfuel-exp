import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface Props {
  className?: string;
  onSubmitted?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

/** Поисковая строка: при отправке переходит в каталог с запросом. */
export function SearchBar({ className = '', onSubmitted, placeholder = 'Поиск по каталогу…', autoFocus = false }: Props) {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = value.trim();
    navigate(query ? `/catalog?q=${encodeURIComponent(query)}` : '/catalog');
    setValue('');
    onSubmitted?.();
  };

  return (
    <form onSubmit={handleSubmit} role="search" className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
      <input
        type="search"
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Поиск по каталогу"
        className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200"
      />
    </form>
  );
}
