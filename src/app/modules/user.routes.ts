import express from 'express';
import { userControllers } from './user.controllers';

const router = express.Router();

// user routes
router.get('/api/users', userControllers.getAllUser);
router.post('/api/users', userControllers.setUser);
router.get('/api/users/:userId', userControllers.getUser);
router.put('/api/users/:userId', userControllers.setSingleUser);
router.delete('/api/users/:userId', userControllers.removeUser);

// order routes
router.get('/api/users/:userId/orders', userControllers.getUserOrders);
router.get(
  '/api/users/:userId/orders/total-price',
  userControllers.getTotalPrice,
);
router.put('/api/users/:userId/orders', userControllers.addOrder);
export const userRoutes = router;
