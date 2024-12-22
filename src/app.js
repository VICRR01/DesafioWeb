import express from 'express';
import productsRoutes from './routes/products.routes.js';
import productsCategoryRoutes from './routes/productsCaterory.routes.js';
import stateRoutes from './routes/states.routes.js';
import clientRoutes from './routes/clients.routes.js';
import userRoutes from './routes/users.routes.js';
import orderRoutes from './routes/orders.routes.js';
import loginRoutes from './routes/login.routes.js';

const app = express();

app.use(express.json());

app.use(productsRoutes);

app.use(productsCategoryRoutes);

app.use(stateRoutes);

app.use(clientRoutes);

app.use(userRoutes);

app.use(orderRoutes);

app.use(loginRoutes);

export default app;