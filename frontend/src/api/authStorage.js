const USER_STORAGE_KEY = 'quickpay_user';
const TOKEN_STORAGE_KEY = 'quickpay_token';

const hasStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const getStoredUser = () => {
  if (!hasStorage()) return null;

  const storedUser = window.localStorage.getItem(USER_STORAGE_KEY);
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error('Failed to parse user from local storage');
    window.localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
};

export const getStoredToken = () => {
  if (!hasStorage()) return null;
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const storeAuthSession = ({ user, token }) => {
  if (!hasStorage()) return;

  if (user) {
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }

  if (token) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  }
};

export const clearAuthSession = () => {
  if (!hasStorage()) return;

  window.localStorage.removeItem(USER_STORAGE_KEY);
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const getAuthHeaders = (headers = {}) => {
  const token = getStoredToken();
  if (!token) return headers;

  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
};
