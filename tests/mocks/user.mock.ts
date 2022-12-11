import { User } from '@app/users/models/user';

export const USER_MOCK: User = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  phone: '1-770-736-8031 x56442',
};
export const NEW_USER_MOCK: User = {
  id: 0,
  name: 'test',
  username: 'test',
  email: 'test@test.te',
  phone: '11111111',
};

export const USERS_MOCK: User[] = [USER_MOCK];
