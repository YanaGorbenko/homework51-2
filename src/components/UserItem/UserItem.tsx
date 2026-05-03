import type { User } from '../userData';
import css from './UserItem.module.css';
import { memo, useCallback } from 'react';

interface Props {
  user: User;
  isHighlight: boolean;
  isSelected: boolean;
  onSelect: (userId: string) => void;
}

export const UserItem = memo(
  ({ user, isHighlight, isSelected, onSelect }: Props) => {
    console.log(`👤 UserItem рендер`);
    const getUserClassNames = useCallback(() => {
      const classes = [css.userItem];

      if (isHighlight && user.age > 30) {
        classes.push(css.highlight);
      }
      if (isSelected) {
        classes.push(css.selected);
      }

      return classes.join(' ');
    }, [isHighlight, isSelected, user.age]);

    const handleClick = useCallback(() => {
      onSelect(user.id);
    }, [onSelect, user.id]);

    return (
      <li className={getUserClassNames()} onClick={handleClick}>
        <h3 className={css.userName}>{user.name}</h3>
        <p className={css.userText}>
          Вік: <span className={css.userAge}>{user.age}</span>
        </p>
      </li>
    );
  },
);
