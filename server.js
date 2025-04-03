import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import bodyParser from 'body-parser';
// import mainRouter from './src/routes/indexRouting.js';

// import productRoutes from './routes/products.js';
// import cartRoutes from './routes/cart.js';
// import { errorHandler } from './middleware/errorHandler.js';
import ProductRouter from './src/routes/products.js';
import UserRouter from './src/routes/userPath.js';
import CartRouter from './src/routes/cart.js';
import OrderRouter from './src/routes/orders.js';
import CategoryRouter from './src/routes/categories.js';
import { errorHandler, notFound } from './src/middleware/errorHandler.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors());

// app.use("/", mainRouter)

// app.use('/api/products', productRoutes);
// app.use('/api/cart', cartRoutes);

// app.use(errorHandler);

// Routes
app.use("/", ProductRouter)
app.use("/", UserRouter)
app.use("/", CartRouter)
app.use("/", OrderRouter)
app.use("/", CategoryRouter)




// Error handling middleware
app.use(notFound)
app.use(errorHandler)

const port=process.env.PORT ||3000
const db_user=process.env.DB_USER;
const db_pass=process.env.DB_PASS;
const db_name=process.env.DB_NAME;


const dbUri = `mongodb+srv://${db_user}:${db_pass}@cluster0.vqier.mongodb.net/${db_name}`;

mongoose.set("strictQuery", false);
mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Node API is running on port http://localhost:${port}`);
     
    });
  })
  .catch((error) => {
    console.log(error);
  });

// const PORT=5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });