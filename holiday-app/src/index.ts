import express from "express";
import useRoutes from "./config/routes.config";
import  bodyParser from 'body-parser';

class Server {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.loadConfig();
  }

  public loadConfig() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.set("port", 3000);
    this.app.use('/api', useRoutes);
  }
  
  public start() {
    this.app.listen(this.app.get("port"), function () {
      console.log(`⚡️[server]: Server is running at http://localhost:3000`);
    });
  }
}
const server = new Server();
server.start();

interface ObjectDTO {
  data: object[];
}

