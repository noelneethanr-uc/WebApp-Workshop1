import express, { Express, Request, Response } from "express";
import axios from "axios";
import { Pool } from "pg";
const bodyParser = require("body-parser");
class Server {
  private app: express.Application;
  private pool: Pool;

  constructor() {
    this.app = express();
    this.portConfig();
    this.parserConfig();
    this.dbConfig();
    this.routes();
  }

  //Port configuration
  public portConfig() {
    this.app.set("port", 3000);
  }

  //Body parser
  public parserConfig() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  //DB configuration
  public dbConfig() {
    this.pool = new Pool({
      host: process.env["POSTGRES_HOST"],
      port: parseInt(<string>process.env["POSTGRES_PORT"]),
      user: process.env["POSTGRES_USER"],
      password: process.env["POSTGRES_PASSWORD"],
      database: process.env["POSTGRES_DB"],
    });
  }

  public async query(query: string) {
    return await this.pool.query(query);
  }

  public routes() {
    this.app.get("/", async (req: Request, res: Response) => {
      const sqlQuery: string = "SELECT NOW()";
      const result = await this.query(sqlQuery);

      res.json({
        message: "Express + TypeScript Server",
        dbResult: result.rows,
      });
    });

    this.app.get("/country-list", async (req: Request, res: Response) => {
      try {
        const countryUrl: string =
          "https://date.nager.at/api/v3/AvailableCountries";
        const countryList: ObjectDTO = await axios.get(countryUrl);
        console.log(`Type of response: ${typeof countryList}`);
        res.send(countryList.data);
      } catch (error: any) {
        console.log(error.toString());
        return { message: "Something Went Wrong!!" };
      }
    });

    this.app.post("/country-holiday", async (req: Request, res: Response) => {
      console.log("Here -", req.body);

      if (req.body.countryCode == "" || req.body.year === "") {
        res.status(406).json("Invalid data");
        return;
      }

      try {
        const sqlCountryInsertQuery: string = `INSERT INTO country (country_code, holiday_year)
            VALUES(
                '${req.body.countryCode}',
                ${req.body.year}
            ) ON CONFLICT ON CONSTRAINT uq_year_code_together DO NOTHING RETURNING id`;

        const insertCountry = await this.query(sqlCountryInsertQuery);

        if (insertCountry.rowCount > 0) {
          const primaryKeyId: number = insertCountry.rows[0].id;

          let holidayApiUrl = `https://date.nager.at/api/v3/PublicHolidays/${req.body.year}/${req.body.countryCode}`;

          const holidayInfoResponse = await axios.get(holidayApiUrl);
          const data = holidayInfoResponse.data;

          /**
           * Insert holiday list into database
           */
          const sqlHolidayInsertQuery = `INSERT INTO holiday
         (country_id, holiday_date, local_name, holiday_name, launch_year)
         VALUES(
            ${primaryKeyId},
           '${data[0].date}',
           '${data[0].localName.replace("'", "")}',
           '${data[0].name.replace("'", "")}',
            ${data[0].launchYear}
         )`;

          await this.query(sqlHolidayInsertQuery);
          res.status(201).json({ status: "success", message: "Inserted data" });
        } else {
          res.status(400).json({ status: "fail", message: "Duplicate data" });
        }
      } catch (error) {
        res
          .status(500)
          .json({ status: "fail", message: "something went wrong" });
      }
    });
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
