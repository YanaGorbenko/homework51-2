import { memo, useCallback } from 'react';

import { type User } from '../userData';
import { UserItem } from '../UserItem/UserItem';
import css from './UserList.module.css';
interface Props {
  users: User[];
  isHighlight: boolean;
  selectedUsers: string[];
  onToggleSelect: (userId: string) => void;
}

export const UserList = memo(
  ({ users, isHighlight, selectedUsers, onToggleSelect }: Props) => {
    console.log('📋 UserList рендер');

    const handleSelect = useCallback(
      (userId: string) => {
        onToggleSelect(userId);
      },
      [onToggleSelect],
    );
    return (
      <ul className={css.usersList}>
        {users.map(user => (
          <UserItem
            key={user.id}
            user={user}
            isHighlight={isHighlight}
            isSelected={selectedUsers.includes(user.id)}
            onSelect={() => handleSelect(user.id)}
          />
        ))}
      </ul>
    );
  },
);
