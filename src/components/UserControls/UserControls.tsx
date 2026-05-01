import css from './UserControls.module.css';
import { useDebouncedCallback } from 'use-debounce';
import { useCallback } from 'react';

interface Props {
  sort: (sortType: 'name' | 'age' | 'not') => void;
  search: (searchWord: string) => void;
  highlight: () => void;
}

export const UserControls = ({ sort, search, highlight }: Props) => {
  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value as 'name' | 'age' | 'not';
    sort(newSort);
  };

  const debouncedSearch = useDebouncedCallback((value: string) => {
    search(value);
  }, 500);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      debouncedSearch(e.target.value);
    },
    [debouncedSearch],
  );

  const handleHighlight = useCallback(() => {
    highlight();
  }, [highlight]);

  return (
    <div className={css.container}>
      <input
        placeholder="Введіть ім'я користувача:"
        className={css.searchInput}
        onChange={handleInputChange}
      />
      <p className={css.sortWrapper}>Сортування: </p>
      <select className={css.sortSelect} onChange={handleSort}>
        <option value="not"> Не сортувати</option>
        <option value="name">За ім'ям</option>
        <option value="age">За віком</option>
      </select>
      <button className={css.highlightButton} onClick={handleHighlight}>
        🔆 30+
      </button>
    </div>
  );
};
