'use client';
import React from 'react';
import useUserService from '@/hooks/useUser';
import { User } from '@/app/gql/graphql';

export default function TeamPage() {
  const [users, setUsers] = React.useState<User[]>([]);
  const userService = useUserService();

  React.useEffect(() => {
    userService.getAllUsers().then(setUsers)
  }, []);

  return (
    <>
      <h2>Team Members</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </>
  );
}
