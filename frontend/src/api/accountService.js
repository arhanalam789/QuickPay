import BASE_URL from './baseUrl';

export const fetchUserAccounts = async () => {
  const res = await fetch(`${BASE_URL}/api/account/allAccounts`, {
    credentials: 'include'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch accounts');
  return data.accounts;
};

export const fetchAccountDetails = async (accountId) => {
  const res = await fetch(`${BASE_URL}/api/account/${accountId}`, {
    credentials: 'include'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch account details');
  return data;
};

export const createAccount = async () => {
  const res = await fetch(`${BASE_URL}/api/account/createAccount`, {
    method: 'POST',
    credentials: 'include'
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create account');
  return data.account;
};
