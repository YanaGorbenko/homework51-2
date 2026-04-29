import { useState, useCallback, useMemo } from 'react';
import { userData } from '../userData';
import css from './App.module.css';
import { UserList } from '../UserList/UserList';
import { UserControls } from '../UserControls/UserControls';

export const App = () => {
  const [searchWord, setSearchWord] = useState('');
  const [sortType, setSortType] = useState<'name' | 'age' | 'not'>('not');
  const [isHighlight, setIsHighlight] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const visibleUsers = useMemo(() => {
    console.log('🔄 Пересчёт visibleUsers');
    let result = [...userData];

    if (searchWord.trim()) {
      result = result.filter(user =>
        user.name.toLowerCase().includes(searchWord.toLowerCase()),
      );
    }

    if (sortType === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === 'age') {
      result.sort((a, b) => a.age - b.age);
    }

    return result;
  }, [searchWord, sortType]);

  const sortUsers = useCallback((sortTypeParam: 'name' | 'age' | 'not') => {
    setSortType(sortTypeParam);
  }, []);

  const handleSearch = useCallback((word: string) => {
    setSearchWord(word);
  }, []);

  const handleHighlite = useCallback(() => {
    setIsHighlight(!isHighlight);
  }, []);

  const toggleUserSelection = useCallback((userId: string) => {
    setSelectedUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  }, []);

  const clearSearch = useCallback(() => {
    setSearchWord('');
  }, []);

  return (
    <>
      <div className={css.app}>
        <div className={css.container}>
          <h1 className={css.title}>UserList — розумний список користувачів</h1>
          <UserControls
            sort={sortUsers}
            search={handleSearch}
            highlight={handleHighlite}
          />
          {visibleUsers.length === 0 && searchWord && (
            <div className={css.notFound}>
              <span>🔍</span>
              <p>
                По запросу <strong>"{searchWord}"</strong> нічого не знайдено
              </p>
              <small>Спробуйте змінити пошуковий запит</small>
              <button className={css.clearButton} onClick={clearSearch}>
                Очистити пошук
              </button>
            </div>
          )}
          <UserList
            users={visibleUsers}
            isHighlight={isHighlight}
            selectedUsers={selectedUsers}
            onToggleSelect={toggleUserSelection}
          />
        </div>
      </div>
    </>
  );
};
