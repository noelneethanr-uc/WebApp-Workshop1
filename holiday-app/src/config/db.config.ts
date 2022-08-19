import { Pool } from "pg";

class ConfigDb {
  private pool: Pool;

  constructor() {
    this.dbConfig();
  }

  public dbConfig() {
    this.pool = new Pool({
      host: process.env["POSTGRES_HOST"],
      port: parseInt(<string>process.env["POSTGRES_PORT"]),
      user: process.env["POSTGRES_USER"],
      password: process.env["POSTGRES_PASSWORD"],
      database: process.env["POSTGRES_DB"],
    });
  }

  public async query(query: string): Promise<any> {
    return await this.pool.query(query);
  }
}

export const DbCOnfig = new ConfigDb()