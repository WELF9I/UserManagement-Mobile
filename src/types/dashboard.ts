export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'moderator' | 'user';
    status: 'active' | 'pending' | 'banned';
    registrationDate: string;
  }
  
  export interface Notification {
    id: number;
    title: string;
    message: string;
    status: 'New' | 'In Progress' | 'Resolved';
    timestamp: string;
  }
  
  export interface Log {
    id: number;
    type: 'Error' | 'Update' | 'Connection';
    timestamp: string;
    details: string;
  }
  
  export interface ContentItem {
    id: number;
    title: string;
    dateCreated: string;
    status: 'Published' | 'Draft';
    author: string;
  }
  
  