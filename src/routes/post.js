import { Router } from 'express';
import { create, get, list, remove, update } from '../controllers/post';


const router = Router();

router.get("/posts", list);
router.get("/posts/:id", get);

router.post("/posts", create);

router.delete("/posts/:id", remove);
router.put("/posts/:id", update);


export default router