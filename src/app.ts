import express, { Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user.routes';
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

export default app;
