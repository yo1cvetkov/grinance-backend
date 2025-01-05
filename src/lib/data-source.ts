import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "grinance",
  synchronize: true,
  logging: true,
  entities: [],
});

export async function connectToDb() {
  try {
    console.log("Connecting to the database...");
    await AppDataSource.initialize();
    console.log("Connected to database.");
  } catch (error) {
    console.log((error as Error).message);
    process.exit(1);
  }
}
