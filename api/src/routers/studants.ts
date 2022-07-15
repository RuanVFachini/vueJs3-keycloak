import { Request, Response, Router } from "express";
import Studant from "../studants/studant";

var router = Router();

const studants: Studant[] = []
studants.push(new Studant(1, "joao"));
studants.push(new Studant(2, "carlos"));
studants.push(new Studant(3, "monica"));
studants.push(new Studant(3, "marina"));

router.get("/", (req: Request, res: Response) => {
  res.json(studants);
})

export default router;
