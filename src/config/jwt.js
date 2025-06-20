export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'key123456',
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