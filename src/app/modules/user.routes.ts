import express from 'express';
import { userControllers } from './user.controllers';

const router = express.Router();

router.get('/', userControllers.getAllUser);
router.post('/create-user', userControllers.setUser);
router.get('/:userId', userControllers.getUser);
router.put('/:userId', userControllers.setSingleUser);
router.delete('/:userId', userControllers.removeUser);

// order routes
router.put('/:userId/orders', userControllers.addOrder);
export const userRoutes = router;
