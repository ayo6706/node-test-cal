import { Express, Request, Response } from "express";
import { calculateHandler } from "./controller";





export default function (app: Express) {



    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  
    app.post("/api/cal", calculateHandler);
}