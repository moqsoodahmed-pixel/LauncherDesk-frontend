import apiClient from './apiClient';

export async function listTasks(params = {}) {
  const { data } = await apiClient.get('/tasks', { params });
  return data.data;
}

export async function getWorkflowStats() {
  const { data } = await apiClient.get('/tasks/stats');
  return data.data;
}

export async function getTask(id) {
  const { data } = await apiClient.get(`/tasks/${id}`);
  return data.data;
}

export async function createTask(payload) {
  const { data } = await apiClient.post('/tasks', payload);
  return data.data;
}

export async function updateTask(id, payload) {
  const { data } = await apiClient.patch(`/tasks/${id}`, payload);
  return data.data;
}

export async function completeTask(id) {
  const { data } = await apiClient.patch(`/tasks/${id}/complete`);
  return data.data;
}
