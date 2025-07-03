import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { signAccessToken, signRefreshToken, verifyToken } from "../utils/jwt";
import prisma from "../prisma";
import dayjs from "dayjs";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    const accessToken = signAccessToken({ userId: user.id, email: user.email });
    const refreshToken = signRefreshToken({
      userId: user.id,
      email: user.email,
    });

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: dayjs().add(7, "days").toDate(),
      },
    });

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        message: "User registered",
        user: { id: user.id, email: user.email },
      });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const accessToken = signAccessToken({ userId: user.id, email: user.email });
    const refreshToken = signRefreshToken({
      userId: user.id,
      email: user.email,
    });

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: dayjs().add(7, "days").toDate(),
      },
    });

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Logged in",
        user: { id: user.id, email: user.email },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const logoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const refreshToken = req.cookies.refresh;
  if (refreshToken) {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
  }

  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json({ message: "Logged out" });
};

export const refreshAccessToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.status(401).json({ error: "Missing token" });
      return;
    }

    const decoded = verifyToken(refreshToken);
    const tokenInDb = await prisma.refreshToken.findFirst({
      where: { token: refreshToken },
    });

    if (!tokenInDb || tokenInDb.expiresAt < new Date()) {
      res.status(403).json({ error: "Invalid or expired refresh token" });
      return;
    }

    const newAccessToken = signAccessToken({
      userId: decoded.userId,
      email: decoded.email,
    });

    res
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: false,
        maxAge: 15 * 60 * 1000,
      })
      .json({ message: "Access token refreshed" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.name, error.message);
    } else {
      console.error("unknown error:", error);
    }
    res.status(401).json({ error: "Invalid token" });
  }
};

export const getuser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json({ user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
