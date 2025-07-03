import jwt from "jsonwebtoken";
import { StringValue } from "ms";

const JWT_SECRET = process.env.JWT_SECRET!;
const ACCESS_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES || "15m";
const REFRESH_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES || "7d";

interface TokenPayload {
  userId: string;
  email: string;
}

export function signAccessToken(payload: TokenPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: ACCESS_EXPIRES as StringValue,
  });
}

export function signRefreshToken(payload: TokenPayload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: REFRESH_EXPIRES as StringValue,
  });
}

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};
