const MOCKED_USER = {
  email: 'test@test.com',
}

export const useAuth = () => {
  return {
    isAuthneticated: true,
    user: MOCKED_USER,
  }
}
