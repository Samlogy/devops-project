const { Pool } = require("pg");

class RDSService {
  constructor() {
    this.pool = new Pool({
      user: process.env.RDS_USERNAME,
      host: process.env.RDS_HOST,
      database: process.env.RDS_DATABASE,
      password: process.env.RDS_PASSWORD,
      port: process.env.RDS_PORT,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async connect() {
    let client;
    try {
      client = await this.pool.connect();
      return client;
    } catch (err) {
      console.error("Err connect: ", err);
    } finally {
      client.release();
    }
  }

  async readAll(tableName) {
    const client = await this.connect(); //await this.pool.connect();
    try {
      const { rows } = await client.query(`SELECT * FROM ${tableName}`);
      return rows;
    } catch (err) {
      console.error("Err readAll: ", err);
    } finally {
      client.release();
    }
  }

  async create(tableName, data) {
    const client = await this.pool.connect();
    try {
      // Example: Insert data into the specified table
      const columns = Object.keys(data).join(", ");
      const values = Object.values(data);
      const result = await client.query(
        `INSERT INTO ${tableName}(${columns}) VALUES(${values
          .map((_, i) => `$${i + 1}`)
          .join(", ")}) RETURNING *`,
        values
      );
      return result.rows[0];
    } catch (err) {
      console.error("Err create: ", err);
    } finally {
      client.release();
    }
  }

  async read(tableName, id) {
    const client = await this.pool.connect();
    try {
      // Example: Retrieve data from the specified table by ID
      const result = await client.query(
        `SELECT * FROM ${tableName} WHERE id = $1`,
        [id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Err read: ", err);
    } finally {
      client.release();
    }
  }

  async update(tableName, id, newData) {
    const client = await this.pool.connect();
    try {
      // Example: Update data in the specified table by ID
      const setClause = Object.keys(newData)
        .map((column, i) => `${column} = $${i + 1}`)
        .join(", ");
      const values = Object.values(newData);
      const result = await client.query(
        `UPDATE ${tableName} SET ${setClause} WHERE id = $${
          values.length + 1
        } RETURNING *`,
        [...values, id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Err update: ", err);
    } finally {
      client.release();
    }
  }

  async delete(tableName, id) {
    const client = await this.pool.connect();
    try {
      // Example: Delete data from the specified table by ID
      const result = await client.query(
        `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`,
        [id]
      );
      return result.rows[0];
    } catch (err) {
      console.error("Err delete: ", err);
    } finally {
      client.release();
    }
  }
}

module.exports = RDSService;