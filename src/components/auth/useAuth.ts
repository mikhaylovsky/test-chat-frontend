import { ref } from 'vue'

export enum AuthMode {
  SIGN_IN = 'signin',
  SIGN_UP = 'signup'
}

export const authError = ref<string | null>(null)
export const username = ref<string | null>(null)
export const authMode = ref<AuthMode>(AuthMode.SIGN_IN)

export const setAuthError = (message: string): void => {
  authError.value = message
  setTimeout((): null => (authError.value = null), 5000)
}

export const fillUsernameInput = (event: Event): void => {
  if (event && event.target) {
    const inputTarget: HTMLInputElement = event.target as HTMLInputElement
    username.value = inputTarget.value
  }
}

export const changeAuthMode = (value: AuthMode) => (authMode.value = value)
