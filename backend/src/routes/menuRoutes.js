import express from "express";
import {
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} from "../controllers/menuController.js";

const router = express.Router();

router.get("/", getMenu);
router.post("/", createMenu);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);

export default router;
