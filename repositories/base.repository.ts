import { httpClient } from '../services/http'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

export class BaseRepository {
  protected http: AxiosInstance

  constructor() {
    this.http = httpClient
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.get<T>(url, config)
    return response.data
  }

  protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.post<T>(url, data, config)
    return response.data
  }

  protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.put<T>(url, data, config)
    return response.data
  }

  protected async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.patch<T>(url, data, config)
    return response.data
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.delete<T>(url, config)
    return response.data
  }
}
