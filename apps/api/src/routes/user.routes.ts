import { Router } from "express";
import {
  authenticate,
  AuthenticatedRequest,
} from "../middleware/auth.middleware";

const router = Router();

router.get("/me", authenticate, (req: AuthenticatedRequest, res) => {
  res.json({
    message: "You are authenticated",
    userId: req.userId,
  });
});

export default router;