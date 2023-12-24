import axios, {AxiosError, AxiosResponse} from 'axios';
import {logout} from "../store/auth/authSlice";
import store from "../store/store";

class ApiService {
    private static instance: ApiService;
    private readonly axiosInstance: any;

    private constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL: baseURL
        });

        this.axiosInstance.interceptors.response.use(
            (response : AxiosResponse) => response,
            (error : AxiosError) => {
                console.error(error)
                if (error.response?.status === 401 && error.config?.url !== '/login') {
                    store.dispatch(logout());
                }
                return Promise.reject(error);
            }
        );
    }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService('/api');
        }
        return ApiService.instance;
    }

    private async request(endpoint: string, method: string, token?: string | null, data?: any) {
        const headers: any = {
            'Content-Type': 'application/json',
        };

        if (token) {
            headers['Authorization'] = 'Bearer ' + token;
        }

        try {
            const response = await this.axiosInstance({
                url: endpoint,
                method: method,
                headers: headers,
                data: data
            });

            return response.data;
        } catch (error : any) {
            throw new Error(JSON.stringify(error.response.data));
        }
    }

    public async get(endpoint: string, token?: string | null) {
        return this.request(endpoint, 'GET', token);
    }

    public async post(endpoint: string, data?: any, token?: string | null) {
        return this.request(endpoint, 'POST', token, data);
    }

    public async put(endpoint: string, data?: any, token?: string | null) {
        return this.request(endpoint, 'PUT', token, data);
    }

    public async delete(endpoint: string, token?: string | null) {
        return this.request(endpoint, 'DELETE', token);
    }
}

export default ApiService;
