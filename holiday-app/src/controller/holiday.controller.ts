import { DbCOnfig } from "../config/db.config";

class holidayController {
  constructor() {}

  /**
   * route /api/
   * */
  public async index(param): Promise<object> {

    const sqlQuery: string = "SELECT NOW()";
    const result = await DbCOnfig.query(sqlQuery);

    return ({
      message: "Express + TypeScript Server" + param,
      dbResult: result.rows,
    });
    
  }
}

export const holidayApi = new holidayController();
