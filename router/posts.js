import express from "express";
import { index, show, store, storeReviews, update, modify, destroy } from "../controllers/postController.js";

const router = express.Router();

// fa una copia e filtra 
router.get("/", index);

// funzione che trova per l'id - una sola
router.get("/:id", show);

// Create - Store - crea uno nuovo
router.post("/", store);

// salvataggio reviews del form
router.post("/:id/reviews", storeReviews);

// Update totale - Update - Modifica 
router.put("/:id", update);

// Update parziale - Modify - modifica solo parziale
router.patch("/:id", modify);

// Delete (cancellazione) - Destroy - elimina
router.delete("/:id", destroy);

export default router;