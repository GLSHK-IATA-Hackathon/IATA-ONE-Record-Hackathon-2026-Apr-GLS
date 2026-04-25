import axios, {type InternalAxiosRequestConfig} from 'axios';

// Microservice domain configuration
const MICROSERVICE_DOMAINS = {
    main: import.meta.env.VITE_MAIN_DOMAIN || 'http://localhost:3000',
} as const;

type MicroserviceType = keyof typeof MICROSERVICE_DOMAINS;

// Create individual API instances for each microservice
const createApiInstance = (baseURL: string) => {
    return axios.create({
        baseURL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

// Helper function to create service-specific API objects
const createServiceApi = (service: MicroserviceType) => ({
    get: <T = any>(url: string, config = {}) => get<T>(url, config, service),
    post: <T = any>(url: string, data = {}, config = {}) => post<T>(url, data, config, service),
    put: <T = any>(url: string, data = {}, config = {}) => put<T>(url, data, config, service),
    delete: <T = any>(url: string, config = {}) => del<T>(url, config, service)
});

export const del = <T = any>(url: string, config = {}, service?: MicroserviceType) =>
    makeRequest<T>('delete', url, undefined, config, service);

export const get = <T = any>(url: string, config = {}, service?: MicroserviceType) =>
    makeRequest<T>('get', url, undefined, config, service) as T;

const getApiInstance = (service?: MicroserviceType) => {
    if (service && apiInstances[service]) {
        return apiInstances[service];
    }
    return api; // Default to main service
};

// Helper function to get the appropriate API instance
// Generic request function to reduce code duplication
const makeRequest = async <T = any>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any,
    config = {},
    service?: MicroserviceType
) => {
    try {

        const apiInstance = getApiInstance(service);
        const response = await apiInstance[method](url, ...(data !== undefined ? [data, config] : [config]));

        return response.data;
    } catch (err: any) {
        console.error(`[${service || 'main'}] ${method.toUpperCase()} ${url} failed:`, err);
        return err.response.data;
    }
};

export const post = <T = any>(url: string, data = {}, config = {}, service?: MicroserviceType) =>
    makeRequest<T>('post', url, data, config, service) as T;

export const put = <T = any>(url: string, data = {}, config = {}, service?: MicroserviceType) =>
    makeRequest<T>('put', url, data, config, service);

const apiInstances = {
    main: createApiInstance(MICROSERVICE_DOMAINS.main)
};

// Default API instance (backwards compatibility)
const api = apiInstances.main;

// Apply request interceptor to all API instances
Object.entries(apiInstances).forEach(([serviceName, apiInstance]) => {
    apiInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        return config;
    });

    apiInstance.interceptors.response.use(response => response, async error => {
        // Return rejected promise for all other errors
        return Promise.reject(error);
    });
});

// Service-specific API objects (simplified)
export const fetchApi = {
    main: createServiceApi('main')
};

// Export microservice domains and types for external use
export {MICROSERVICE_DOMAINS, type MicroserviceType};
