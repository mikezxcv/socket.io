import { Router } from "express";
import { get, post, getDocumentosGenerales } from "../../controllers/UserController.mjs";

const router = Router();
router.get("/", get);
router.post("/", post);
router.get("/documentos-generales", getDocumentosGenerales);

export default router;
