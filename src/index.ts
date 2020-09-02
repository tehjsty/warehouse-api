import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";

createConnection().then(async () => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    // register express routes from defined application routes
    app.use("/", routes);

    // setup express app here
    // ...

    // start express server
    app.listen(3000);

    console.log("API listening on port 3000");

}).catch(error => console.log(error));
