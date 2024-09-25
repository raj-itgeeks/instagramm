import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import connectDB from './db/index.js';
import userRoutes from './routers/user.router.js';
import followerRoutes from './routers/follower.router.js';

const app = express();
const port = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    });
}).catch(err => console.log(err, "Mongo db connection failed"));
app.use(cors());
app.use(express.json());
// use userRoutes
app.use(userRoutes);
app.use(followerRoutes);