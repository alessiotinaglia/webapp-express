import express from "express";
import { index, show, store, storeReviews, update, modify, destroy } from "../controllers/postController.js";

const router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", store);
// salvataggio reviews
router.post("/:id/reviews", storeReviews);
router.put("/:id", update);
router.patch("/:id", modify);
router.delete("/:id", destroy);

export default router;