import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js"

export const generateTokens = async (user) => {
    
  const accessToken = jwt.sign(
    {
      type: 'access',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    },
    jwtConfig.secret,
    jwtConfig.accessToken.options
  );

  const refreshToken = jwt.sign(
    {
      type: 'refresh',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    },
    jwtConfig.secret,
    jwtConfig.refreshToken.options
  );

  return { accessToken, refreshToken };
};