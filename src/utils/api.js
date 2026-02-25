// src/utils/api.js
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const handleResponse = async (res) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Network error' }))
    throw new Error(error.message || `HTTP error! status: ${res.status}`)
  }
  return res.json()
}

const api = {
  get: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    })
    return handleResponse(res)
  },

  post: async (endpoint, data, isFormData = false) => {
    const headers = isFormData ? { ...getAuthHeaders() } : {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    }
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: isFormData ? data : JSON.stringify(data),
    })
    return handleResponse(res)
  },

  patch: async (endpoint, data, isFormData = false) => {
    const headers = isFormData ? { ...getAuthHeaders() } : {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    }
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers,
      body: isFormData ? data : JSON.stringify(data),
    })
    return handleResponse(res)
  },

  delete: async (endpoint) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    })
    return handleResponse(res)
  },
}

// API endpoints
export const blogAPI = {
  getAll: (params = '') => api.get(`/blogs${params}`),
  getOne: (identifier) => api.get(`/blogs/${identifier}`),
  getFeatured: () => api.get('/blogs/featured'),
  getCategories: () => api.get('/blogs/categories'),
}

export const serviceAPI = {
  getAll: (params = '') => api.get(`/services${params}`),
  getOne: (identifier) => api.get(`/services/${identifier}`),
}

export const contactAPI = {
  submit: (data) => api.post('/contact', data),
}

export const bannerAPI = {
  getActive: (page = 'home') => api.get(`/banners/active?page=${page}`),
}

export default api
