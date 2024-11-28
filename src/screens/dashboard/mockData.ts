export const mockUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      status: 'active',
      registrationDate: '2023-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'moderator',
      status: 'active',
      registrationDate: '2023-02-20',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'user',
      status: 'pending',
      registrationDate: '2023-03-10',
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice@example.com',
      role: 'admin',
      status: 'active',
      registrationDate: '2023-04-05',
    },
    {
      id: 5,
      name: 'Charlie Wilson',
      email: 'charlie@example.com',
      role: 'user',
      status: 'banned',
      registrationDate: '2023-05-12',
    },
  ] as const;
  
  export const mockNotifications = [
    {
      id: 1,
      title: 'New User Request',
      message: 'John Doe has requested an account.',
      status: 'New',
      timestamp: '2023-06-01T10:00:00Z',
    },
    {
      id: 2,
      title: 'Technical Issue',
      message: 'User reported a problem with login.',
      status: 'In Progress',
      timestamp: '2023-06-01T11:30:00Z',
    },
  ] as const;
  
  export const mockLogs = [
    {
      id: 1,
      type: 'Error',
      timestamp: '2023-06-01T09:15:00Z',
      details: '404 Not Found: /api/nonexistent',
    },
    {
      id: 2,
      type: 'Update',
      timestamp: '2023-06-01T10:30:00Z',
      details: 'Application updated to version 2.1.0',
    },
  ] as const;
  
  export const mockContent = [
    {
      id: 1,
      title: 'Welcome Post',
      dateCreated: '2023-05-15',
      status: 'Published',
      author: 'Admin',
    },
    {
      id: 2,
      title: 'How to Use Our App',
      dateCreated: '2023-05-20',
      status: 'Draft',
      author: 'Jane Smith',
    },
  ] as const;
  
  