import pg from "pg";

const postgreSQLClient = new pg.Pool({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "172.16.210.171",
  database: process.env.PGDATABASE || "ip-verifier-mandiant",
  password: process.env.PGPASSWORD || "postgres",
  port: process.env.PGPORT || 5432,
});

export default postgreSQLClient;
