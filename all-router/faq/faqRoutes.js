import { Router } from "express"
import { faqCotroller } from "../../src/controller/faq/faqController.js";

export const faqRouter = Router();

faqRouter.post("/faq-add", faqCotroller);