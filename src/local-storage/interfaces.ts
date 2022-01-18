export interface LocalStorageMethodReturn<K, V> {
  get(key: K): V | null;
  set(value: V): void;
}

export type UserLoggedInfoKey = 'user_logged_info';

export interface UserLoggedInfoData {
  id: string;
  token: string;
  autoLogin: boolean;
}
