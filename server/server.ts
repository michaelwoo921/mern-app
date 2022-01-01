import express from 'express';

import userRouter from './routes/user.router';
import postRouter from './routes/post.router';
import profileRouter from './routes/profile.router';

const app = express();

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/profile', profileRouter);

app.get('/', (req, res) => {
  console.log(Object.keys(req));
  res.status(200).send('API running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`);
});
