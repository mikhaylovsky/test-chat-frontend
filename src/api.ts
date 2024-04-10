import type { Message } from '@/types/message.type'
import type { User } from '@/types/user.type'

class Api {
  public readonly apiUrl: string

  constructor() {
    this.apiUrl = import.meta.env.VITE_BACKEND_APP_URL
  }

  /**
   * @param {number} limit
   * @returns Promise<Message[]>
   */
  public fetchLastMessages = async (limit: number): Promise<Message[]> => {
    const params: URLSearchParams = new URLSearchParams({
      limit: limit.toString()
    })

    return fetch(`${this.apiUrl}/messages?${params}`).then(
      async (response: Response): Promise<Message[]> => {
        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message)
        }

        return response.json()
      }
    )
  }

  /**
   * @param {string} username
   * @returns Promise<User>
   */
  public signIn = async (username: string): Promise<User> => {
    return fetch(`${this.apiUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    }).then(async (response: Response): Promise<User> => {
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }

      return response.json()
    })
  }

  /**
   * @param {string} username
   * @returns Promise<User>
   */
  public signUp = async (username: string): Promise<User> => {
    return fetch(`${this.apiUrl}/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    }).then(async (response: Response): Promise<User> => {
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }

      console.log('we should not be here')
      return response.json()
    })
  }
}

export default new Api()
