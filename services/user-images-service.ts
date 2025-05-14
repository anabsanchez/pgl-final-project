import axios, { AxiosRequestConfig } from "axios";
import { asyncStorageService } from "./async-storage-service";

const BASE_URL = "http://localhost:3000";

async function apiRequest<T>(
  endpoint: string,
  method: string,
  data?: any
): Promise<T | null> {
  const token = await asyncStorageService.getToken();
  const config: AxiosRequestConfig = {
    url: `${BASE_URL}${endpoint}`,
    method: method as any,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    data: data || {},
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`API Request Error: ${error}`);
    return null;
  }
}

export const apiService = {
  async login(email: string, pswd: string) {
    return apiRequest("/auth/login", "POST", { email, pswd });
  },

  async register(fullname: string, email: string, pswd: string) {
    return apiRequest("/auth/register", "POST", { fullname, email, pswd });
  },

  async getWelcomeMessage() {
    return apiRequest("/welcome", "GET");
  },

  async saveImage(width: number, height: number, encodedData: string) {
    return apiRequest("/images/save", "POST", { width, height, encodedData });
  },

  async getAllImages() {
    return apiRequest("/images/get-all", "GET");
  },

  async deleteImage(id: number) {
    return apiRequest(`/images/${id}`, "DELETE");
  },
};
