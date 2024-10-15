export interface User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'admin' | 'moderator' | 'user';
    status: 'pending' | 'active' | 'banned';
    registrationDate: Date;
  }
  
  export interface SignUpData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role:'user';
    status:'pending';
    registrationDate: Date;
  }
  
  export interface SignInData {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    user: User;
    token: string;
  }