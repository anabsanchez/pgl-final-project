import { asyncStorageService } from "./async-storage-service";
import { ApiResponse } from "../types/ApiResponse";
import { RegisterResponse } from "../types/RegisterResponse";
import { LoginResponse } from "../types/LoginResponse";
import { ImageResponse } from "../types/ImageResponse";

const BASE_URL = "http://192.168.1.101:5000";

async function apiRequest<T>(
  endpoint: string,
  method: string,
  data?: any
): Promise<ApiResponse<T>> {
  const token = await asyncStorageService.getToken();
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `${response.status} - ${errorData.message || response.statusText}`
      );
    }

    const json = await response.json();
    return json;
  } catch (error: any) {
    console.error(`API Request Error: ${error.message}`);
    return {
      message: error.message || "Request failed",
      statusCode: 500,
      object: null,
    };
  }
}

const apiService = {
  async login(
    email: string,
    pswd: string
  ): Promise<ApiResponse<LoginResponse>> {
    return apiRequest<LoginResponse>("/auth/login", "POST", { email, pswd });
  },

  async register(
    fullname: string,
    email: string,
    pswd: string
  ): Promise<ApiResponse<RegisterResponse>> {
    return apiRequest<RegisterResponse>("/auth/register", "POST", {
      fullname,
      email,
      pswd,
    });
  },

  async getWelcomeMessage(): Promise<ApiResponse<string>> {
    return apiRequest<string>("/welcome", "GET");
  },

  async getAllImages(): Promise<ApiResponse<ImageResponse[]>> {
    return apiRequest<ImageResponse[]>("/images/get-all", "GET");
  },

  async saveImage(
    width: number,
    height: number,
    encodedData: string
  ): Promise<ApiResponse<ImageResponse>> {
    return apiRequest<ImageResponse>("/images/save", "POST", {
      width,
      height,
      encodedData,
    });
  },

  async deleteImage(id: number): Promise<ApiResponse<null>> {
    return apiRequest<null>(`/images/${id}`, "DELETE");
  },
};

export default apiService;
