// Configuration of the API base URL
// In development, use a proxy (empty string)
// In production, use the Render URL from the environment variable
export const API_URL = import.meta.env.VITE_API_URL || "";
