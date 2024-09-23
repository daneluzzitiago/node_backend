import express, { json } from 'express';
import userRoutes from './routes/userRoutes';

require('dotenv').config();

const app = express();
const port = 8080;

app.use(json());
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running at ${port}`);
})