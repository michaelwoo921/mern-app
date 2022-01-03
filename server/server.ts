import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRouter from './routes/api/user.router';
import authRouter from './routes/api/auth.router';
import postRouter from './routes/api/post.router';
import profileRouter from './routes/api/profile.router';

dotenv.config();

mongoose
  .connect(process.env.mongoURI as string)
  .then(() => {
    console.log('connected to database');
  })
  .catch((err: any) => {
    console.error(err.message);
    process.exit(1);
  });

const app = express();

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/profile', profileRouter);

app.use(express.static('client/build'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`);
});
