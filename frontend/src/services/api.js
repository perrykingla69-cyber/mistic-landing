import axios from 'axios';

const tenantId = import.meta.env.VITE_DEFAULT_TENANT_ID || '00000000-0000-0000-0000-000000000001';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'x-tenant-id': tenantId
  }
});

export default api;
