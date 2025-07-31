import express from 'express'
import cors from 'cors'
import connectDb from './config.db'
import rootRouter from './router/index'//./router.index//
const app = express();
const PORT = 3001;
connectDb();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', rootRouter)
app.post('/', (_req: express.Request, res: express.Response) => {
    // console.log("at root")
    res.status(404).json({hi:'Page not found'});
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});