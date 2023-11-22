import express from 'express';
import { userControllers } from './user.controllers';

const router = express.Router();

// router.get('/');
router.post('/create-user', userControllers.setUser);
export const userRoutes = router;
