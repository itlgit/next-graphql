
export async function login(
  email: string,
  password: string
): Promise<{ token: string }> {
  // Simulate an API call to login
  return new Promise((resolve, reject) => {
    resolve({ token: 'fake-jwt-token' });
  });
}

export async function logout(): Promise<void> {
  // Simulate an API call to logout
  return new Promise((resolve) => {
    resolve();
  });
}
