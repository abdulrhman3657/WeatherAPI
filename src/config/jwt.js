export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
  accessToken: {
    options: {
      expiresIn: '15m',
      algorithm: 'HS256',
    },
  },
  refreshToken: {
    options: {
      expiresIn: '7d',
      algorithm: 'HS256',
    },
  },
}; 