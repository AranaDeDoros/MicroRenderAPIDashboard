import axios from "axios"

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE"

export class Requester {

    private axiosInstance = axios.create()
    private baseUrl: string = import.meta.env.VITE_API_URL

    constructor() {
        this.axiosInstance.defaults.baseURL = this.baseUrl
    }

    async request(method: HTTPMethod, url: string, data?: unknown) {
        const response = await this.axiosInstance({
            method,
            url,
            data
        })
        return response.data
    }

}