import express, {Request, Response} from 'express';
import { holidayApi } from '../controller/holiday.controller';

const useRoutes = express.Router();

useRoutes.get("/", async(req: Request, res: Response) => {
    res.send(await holidayApi.index('data'));
});

export default useRoutes;