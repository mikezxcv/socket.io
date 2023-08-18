import { Router } from "express";
import { get, post, getDocumentosGenerales, getDocumento  } from "../../controllers/UserController.mjs";

const router = Router();
router.get("/", get);
router.post("/", post);
router.get("/documentos-generales", getDocumentosGenerales);
router.get("/documento", getDocumento);

export default router;
