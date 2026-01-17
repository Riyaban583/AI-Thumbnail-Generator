import { Request, Response, NextFunction } from "express";

/**
 * 🔐 Auth Middleware
 * - Checks if user is logged in via session
 * - Attaches user info to req.user
 */
const protect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // express-session data
  const session = req.session as any;

  // ❌ Not logged in
  if (!session || !session.userId) {
    return res.status(401).json({
      message: "Unauthorized. Please login first.",
    });
  }

  // ✅ Attach user to request (single source of truth)
  (req as any).user = {
    id: String(session.userId),
  };

  next();
};

export default protect;
