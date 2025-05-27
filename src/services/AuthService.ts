import ForgottenPassword from "../pages/ForgottenPassword";

interface UserCredentials {
  username: string;
  email: string;
  password: string;
}

interface ForgottenPasswordCredentials {
  email: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    username: string;
  };
  expiration: string;
}

interface ForgottenPasswordResponse {
  status: number;
}

const LOGIN_URL = `${process.env.API_URL}/auth/login`;
const REGISTER_URL = `${process.env.API_URL}/auth/register`;
const FORGOTTEN_PASSWORD_URL = `${process.env.API_URL}/auth/forgot-password`;

export const authService = {

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  },

  async login(credentials: UserCredentials): Promise<AuthResponse> {

    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data: AuthResponse = await response.json();

    this.storeAuthData(data.token, data.expiration, data.user);

    return data;
  },

  async register(credentials: UserCredentials): Promise<AuthResponse> {

    const response = await fetch(REGISTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }

    const data: AuthResponse = await response.json();

    this.storeAuthData(data.token, data.expiration, data.user);

    return data;
  },

  async forgottenPassword(credentials: ForgottenPasswordCredentials): Promise<ForgottenPasswordResponse> {

    const response = await fetch(FORGOTTEN_PASSWORD_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data: ForgottenPasswordResponse = await response.json();

    return data;
  },

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expired');
    localStorage.removeItem('user');
  },

  getToken(): string | null {
    let token = localStorage.getItem('token');
    if ((token?.length ?? 0) > 0) {
      const raw = localStorage.getItem("expired");
      const expired = raw ? new Date(raw) : null;
      let currentDate = new Date();
      if (expired && expired < currentDate) {
        this.logout();
        return null;
      }
    }
    return token;
  },

  storeAuthData(token: string, expiration: string, user: { id: number, username: string, email: string }): void {
    localStorage.setItem('token', token);
    localStorage.setItem('expired', expiration);
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser(): { id: number; username: string, email: string } | null {
    const raw = localStorage.getItem('user');
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
};