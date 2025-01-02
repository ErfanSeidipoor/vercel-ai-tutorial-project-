import csv from "csv-parser";
import "dotenv/config";
import fs from "fs";
import path from "path";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Unicorns } from "./entity";

function parseDate(dateString: string): string {
  const parts = dateString.split("/");
  if (parts.length === 3) {
    const day = parts[0].padStart(2, "0");
    const month = parts[1].padStart(2, "0");
    const year = parts[2];
    return `${year}-${month}-${day}`;
  }
  console.warn(`Could not parse date: ${dateString}`);
  throw Error();
}

export async function seed() {
  console.log({
    type: "postgres",
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT!),
    database: process.env.POSTGRES_NAME,
  });

  const AppDataSource = new DataSource({
    type: "postgres",
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT!),
    database: process.env.POSTGRES_DATABASE,
    entities: [Unicorns],
    synchronize: true,
  });

  await AppDataSource.initialize();

  console.log(`Created "unicorns" table`);

  const results: any[] = [];
  const csvFilePath = path.join(process.cwd(), "unicorns.csv");

  await new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", resolve)
      .on("error", reject);
  }).then(async () => {
    const unicornRepository = AppDataSource.getRepository(Unicorns);

    for (const row of results) {
      const formattedDate = parseDate(row["Date Joined"]);

      const unicorn = unicornRepository.create({
        company: row.Company,
        valuation: parseFloat(
          row["Valuation ($B)"].replace("$", "").replace(",", "")
        ),
        date_joined: formattedDate,
        country: row.Country,
        city: row.City,
        industry: row.Industry,
        select_investors: row["Select Investors"],
        date: new Date(row["Date Joined"]),
      });

      await unicornRepository.save(unicorn);

      console.log({ unicorn });
    }
  });

  // await AppDataSource.destroy();

  return {
    unicorns: results,
  };
}

// seed().catch(console.error);
