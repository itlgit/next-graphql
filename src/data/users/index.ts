import users from './users.json';

export default users;

export function getUserById(id: string) {
  return users.find((user) => user.id === id);
}

export function getUserByEmail(email: string) {
  return users.find((user) => user.email === email);
}

export function getAllUsers() {
  return users;
}
