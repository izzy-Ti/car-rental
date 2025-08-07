export const API_BASE_URL = 'https://car-rental-1xr3.onrender.com'

export function apiUrl(path) {
  if (!path.startsWith('/')) path = `/${path}`
  return `${API_BASE_URL}${path}`
}

