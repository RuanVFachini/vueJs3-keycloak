import { Request, Response, Router } from "express";

var router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    "message": "olá"
  });
});

export default router;