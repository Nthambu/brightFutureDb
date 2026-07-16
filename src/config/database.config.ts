import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const databaseConfig = (): TypeOrmModuleOptions => {
  const isProduction = process.env.NODE_ENV === "production";

  // If DATABASE_URL is provided (Render's preferred method), use it
  if (process.env.DATABASE_URL) {
    console.log("Using DATABASE_URL for database connection");
    return {
      type: "postgres",
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: !isProduction, 
      ssl: isProduction ? { rejectUnauthorized: false } : false,
      logging: process.env.NODE_ENV === "development",
      extra: isProduction
        ? {
            connectionLimit: 10,
            acquireTimeout: 60000,
            timeout: 60000,
          }
        : {},
    };
  }

  // Fallback to individual environment variables (for local development)
  console.log("Using individual database environment variables");
  console.log(
    `Connecting to: ${process.env.DATABASE_HOST || "localhost"}:${process.env.DATABASE_PORT || "5432"}`,
  );

  return {
    type: "postgres",
    host: process.env.DATABASE_HOST || "localhost",
    port: parseInt(process.env.DATABASE_PORT || "5432", 10),
    username: process.env.DATABASE_USERNAME || "postgres",
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || "brightFuture",
    autoLoadEntities: true,
    synchronize: !isProduction, 
    ssl:
      process.env.DATABASE_SSL === "true"
        ? { rejectUnauthorized: false }
        : false,
    logging: process.env.NODE_ENV === "development",
  };
};
