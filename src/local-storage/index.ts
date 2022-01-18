import { LocalStorageMethodReturn, UserLoggedInfoKey, UserLoggedInfoData } from './interfaces';

function userLoggedInfo(): LocalStorageMethodReturn<UserLoggedInfoKey, UserLoggedInfoData> {
  const get = (key: UserLoggedInfoKey) => {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data) as UserLoggedInfoData;
    }
    return null;
  };

  const set = (value: UserLoggedInfoData) => {
    localStorage.setItem('user_logged_info', JSON.stringify(value));
  };

  return {
    get,
    set
  }
}

export function useLoadlStorage() {
  return {
    userLoggedInfo,
  }
}
