export interface LocalStorageMethodReturn<K, V> {
  get(): V | null;
  set(value: V): void;
  remove(): void;
}

export type UserLoggedInfoKey = 'user_logged_info';

export interface UserLoggedInfoData {
  id: string;
  token: string;
  autoLogin: boolean;
}
