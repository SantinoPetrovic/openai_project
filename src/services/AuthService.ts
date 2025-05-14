interface LoginCredentials {
  username: string;
  email: string;
  password: string;
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

const LOGIN_URL = `${process.env.API_URL}/auth/login`;

export const authService = {

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {

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