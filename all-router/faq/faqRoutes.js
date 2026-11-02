<<<<<<< HEAD
import { Router } from "express";
import { faqControl } from "../../src/controller/faq/faqController.js";

export const faqRouter = Router();

faqRouter.post("/add-faq", faqControl);
=======
import { Router } from "express"
import { faqCotroller } from "../../src/controller/faq/faqController.js";

export const faqRouter = Router();

faqRouter.post("/faq-add", faqCotroller);
>>>>>>> 62c724357e5c7a33315d1f03558b25441a366cfc
