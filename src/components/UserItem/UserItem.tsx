import type { User } from '../userData';
import css from './UserItem.module.css';
import { memo } from 'react';

interface Props {
  user: User;
  isHighlight: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

export const UserItem = memo(
  ({ user, isHighlight, isSelected, onSelect }: Props) => {
    console.log(`👤 UserItem рендер`);
    const getUserClassNames = () => {
      const classes = [css.userItem];

      if (isHighlight && user.age > 30) {
        classes.push(css.highlight);
      }
      if (isSelected) {
        classes.push(css.selected);
      }

      return classes.join(' ');
    };

    return (
      <li className={getUserClassNames()} onClick={onSelect}>
        <h3 className={css.userName}>{user.name}</h3>
        <p className={css.userText}>
          Вік: <span className={css.userAge}>{user.age}</span>
        </p>
      </li>
    );
  },
);
