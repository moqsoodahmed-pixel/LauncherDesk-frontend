import apiClient from './apiClient';

export async function getFinanceDashboard() {
  const { data } = await apiClient.get('/finance/dashboard');
  return data.data;
}

export async function getRevenueTrend(months = 12) {
  const { data } = await apiClient.get(`/finance/revenue-trend?months=${months}`);
  return data.data;
}

export async function getPaymentMethods() {
  const { data } = await apiClient.get('/finance/payment-methods');
  return data.data;
}
