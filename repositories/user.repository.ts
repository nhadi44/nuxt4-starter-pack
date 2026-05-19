import { BaseRepository } from './base.repository'
import type { User } from '../types/user.type'

export class UserRepository extends BaseRepository {
  private mockUsers: User[] = [
    {
      id: 1,
      name: 'Hadi',
      email: 'hadi@example.com',
      role: 'Admin',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Hadi',
      createdAt: '2026-05-01',
    },
    {
      id: 2,
      name: 'Google Deepmind',
      email: 'deepmind@google.com',
      role: 'Developer',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Deepmind',
      createdAt: '2026-05-10',
    },
    {
      id: 3,
      name: 'Vue Expert',
      email: 'vue@expert.org',
      role: 'Reviewer',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Vue',
      createdAt: '2026-05-12',
    },
  ]

  async getUsers(): Promise<User[]> {
    try {
      return await this.get<User[]>('/users')
    } catch (error) {
      console.warn('API connection failed. Returning local mock users.', error)
      return [...this.mockUsers]
    }
  }

  async getUserById(id: string | number): Promise<User> {
    try {
      return await this.get<User>(`/users/${id}`)
    } catch (error) {
      console.warn(`API connection failed for user ID ${id}. Returning mock user.`)
      const user = this.mockUsers.find((u) => String(u.id) === String(id))
      if (!user) throw new Error('User not found')
      return { ...user }
    }
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    try {
      return await this.post<User>('/users', userData)
    } catch (error) {
      console.warn('API connection failed. Simulating user creation.')
      const newUser: User = {
        ...userData,
        id: this.mockUsers.length ? Math.max(...this.mockUsers.map((u) => Number(u.id))) + 1 : 1,
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(userData.name)}`,
        createdAt: new Date().toISOString().split('T')[0],
      }
      this.mockUsers.push(newUser)
      return { ...newUser }
    }
  }

  async updateUser(id: string | number, userData: Partial<User>): Promise<User> {
    try {
      return await this.put<User>(`/users/${id}`, userData)
    } catch (error) {
      console.warn(`API connection failed. Simulating user update for ID ${id}.`)
      const index = this.mockUsers.findIndex((u) => String(u.id) === String(id))
      if (index === -1) throw new Error('User not found')
      const existingUser = this.mockUsers[index]
      if (!existingUser) throw new Error('User not found')
      const updatedUser: User = {
        ...existingUser,
        ...userData,
        id: existingUser.id,
        name: userData.name ?? existingUser.name,
        email: userData.email ?? existingUser.email,
        updatedAt: new Date().toISOString().split('T')[0],
      }
      this.mockUsers[index] = updatedUser
      return { ...updatedUser }
    }
  }

  async deleteUser(id: string | number): Promise<{ success: boolean }> {
    try {
      await this.delete<any>(`/users/${id}`)
      return { success: true }
    } catch (error) {
      console.warn(`API connection failed. Simulating user deletion for ID ${id}.`)
      const index = this.mockUsers.findIndex((u) => String(u.id) === String(id))
      if (index === -1) throw new Error('User not found')
      this.mockUsers.splice(index, 1)
      return { success: true }
    }
  }
}

// Single instance export following SOLID Singleton standard
export const userRepository = new UserRepository()
