import { SignUpData, SignInData, AuthResponse } from '../models/User';

const BASE_URL = 'https://your-api-url.com';

export const authService = {
  signUp: async (data: SignUpData): Promise<AuthResponse> => {
    
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Sign up failed');
    }

    return response.json();
  },

  signIn: async (data: SignInData): Promise<AuthResponse> => {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Sign in failed');
    }

    return response.json();
  },
};