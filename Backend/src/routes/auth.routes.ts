
import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

// Step 1: Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Step 2: Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/",
  }),
  (req, res) => {
    const user = req.user as any;

    const token = jwt.sign(user, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.redirect(
      `${process.env.FRONTEND_URL}/auth-success?token=${token}`
    );
  }
);

export default router;
