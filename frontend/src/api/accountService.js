import BASE_URL from './baseUrl';
import { getAuthHeaders } from './authStorage';

export const fetchUserAccounts = async () => {
  const res = await fetch(`${BASE_URL}/api/account/allAccounts`, {
    headers: getAuthHeaders(),
    credentials: 'include'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch accounts');
  return data.accounts;
};

export const fetchAccountDetails = async (accountId) => {
  const res = await fetch(`${BASE_URL}/api/account/${accountId}`, {
    headers: getAuthHeaders(),
    credentials: 'include'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch account details');
  return data;
};

export const createAccount = async () => {
  const res = await fetch(`${BASE_URL}/api/account/createAccount`, {
    method: 'POST',
    headers: getAuthHeaders(),
    credentials: 'include'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create account');
  return data.account;
};
