import { Router } from 'express';
import { create, get, list, PaginationProduct, remove, SearchPro, update } from '../controllers/product';

import { userById } from '../controllers/user';
import { checkAuth, isAdmin, isAuth, requireSignin } from '../middleware/checkAuth';

const router = Router();
router.get("/search ", SearchPro);
router.get("/", list);

router.get("/:id", get);
router.post("/:userId", requireSignin, isAuth, isAdmin, create);

router.get('/new/:page', PaginationProduct);


router.delete("/:id", remove);
router.put("/:id", update);

router.param("userId", userById)

export default router