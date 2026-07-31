import { Router } from "express";
import { faqControl } from "../../src/controller/faq/faqController.js";

export const faqRouter = Router();

faqRouter.post("/add-faq", faqControl);
