import { LocalStorageMethodReturn, UserLoggedInfoKey, UserLoggedInfoData } from './interfaces';

function userLoggedInfo(): LocalStorageMethodReturn<UserLoggedInfoKey, UserLoggedInfoData> {
  const key = 'user_logged_info';
  const get = () => {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data) as UserLoggedInfoData;
    }
    return null;
  };

  const set = (value: UserLoggedInfoData) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const remove = () => {
    localStorage.removeItem(key);
  }

  return {
    get,
    set,
    remove
  }
}

export function useLocallStorage() {
  return {
    userLoggedInfo: userLoggedInfo(),
  }
}
