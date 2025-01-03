"use server";

import { Unicorns } from "@/lib/entity";
import { configSchema, explanationSchema, Result } from "@/lib/types";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { DataSource } from "typeorm";
import { z } from "zod";
import * as fs from "fs";

/**
 * Executes a SQL query and returns the result data
 * @param {string} query - The SQL query to execute
 * @returns {Promise<Result[]>} Array of query results
 * @throws {Error} If query is not a SELECT statement or table doesn't exist
 */
export const runGeneratedSQLQuery = async (query: string) => {
  "use server";
  // Ensure the query is a SELECT statement. Otherwise, throw an error

  console.log("runGeneratedSQLQuery: ", { query });

  if (
    !query.trim().toLowerCase().startsWith("select") ||
    query.trim().toLowerCase().includes("drop") ||
    query.trim().toLowerCase().includes("delete") ||
    query.trim().toLowerCase().includes("insert") ||
    query.trim().toLowerCase().includes("update") ||
    query.trim().toLowerCase().includes("alter") ||
    query.trim().toLowerCase().includes("truncate") ||
    query.trim().toLowerCase().includes("create") ||
    query.trim().toLowerCase().includes("grant") ||
    query.trim().toLowerCase().includes("revoke")
  ) {
    throw new Error("Only SELECT queries are allowed");
  }

  let data: any;
  try {
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

    data = await AppDataSource.query(query);

    // console.log({ data });

    await AppDataSource.destroy();
  } catch (e: any) {
    if (e.message.includes('relation "unicorns" does not exist')) {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now..."
      );
      // throw error
      throw Error("Table does not exist");
    } else {
      throw e;
    }
  }

  fs.writeFileSync(
    "data.json",
    JSON.stringify(
      {
        return: data,
      },
      null,
      2
    ),
    "utf8"
  );

  return data as Result[];
};

export const generateQuery = async (input: string) => {
  "use server";
  try {
    const result = await generateObject({
      model: openai("gpt-4o"),
      system: `
      You are a SQL (postgres) expert. Your job is to explain to the user write a SQL query you wrote to retrieve the data they asked for. The table schema is as follows:
      unicorns (
        id SERIAL PRIMARY KEY,
        company VARCHAR(255) NOT NULL UNIQUE,
        valuation DECIMAL(10, 2) NOT NULL,
        date_joined DATE,
        country VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        industry VARCHAR(255) NOT NULL,
        select_investors TEXT NOT NULL
      );

      When you explain you must take a section of the query, and then explain it. Each "section" should be unique. So in a query like: "SELECT * FROM unicorns limit 20", the sections could be "SELECT *", "FROM UNICORNS", "LIMIT 20".
      If a section doesnt have any explanation, include it, but leave the explanation empty.
      `,
      prompt: `Generate the query necessary to retrieve the data the user wants: ${input}`,
      schema: z.object({
        query: z.string(),
      }),
    });

    console.log({ "result.object": result.object });

    return (result.object as { query: string }).query;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to generate query");
  }
};

export const explainQuery = async (input: string, sqlQuery: string) => {
  "use server";
  try {
    const result = await generateObject({
      model: openai("gpt-4o"),
      system: `You are a SQL (postgres) expert. ...`, // SYSTEM PROMPT AS ABOVE - OMITTED FOR BREVITY
      prompt: `Explain the SQL query you generated to retrieve the data the user wanted. Assume the user is not an expert in SQL. Break down the query into steps. Be concise.

      User Query:
      ${input}

      Generated SQL Query:
      ${sqlQuery}`,
      schema: explanationSchema,
      output: "array",
    });
    return result.object;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to generate query");
  }
};

export const generateChartConfig = async (
  results: Result[],
  userQuery: string
) => {
  "use server";

  try {
    const { object: config } = await generateObject({
      model: openai("gpt-4o"),
      system: "You are a data visualization expert.",
      prompt: `Given the following data from a SQL query result, generate the chart config that best visualises the data and answers the users query.
      For multiple groups use multi-lines.

      Here is an example complete config:
      export const chartConfig = {
        type: "pie",
        xKey: "month",
        yKeys: ["sales", "profit", "expenses"],
        colors: {
          sales: "#4CAF50",    // Green for sales
          profit: "#2196F3",   // Blue for profit
          expenses: "#F44336"  // Red for expenses
        },
        legend: true
      }

      User Query:
      ${userQuery}

      Data:
      ${JSON.stringify(results, null, 2)}`,
      schema: configSchema,
    });

    // Override with shadcn theme colors
    const colors: Record<string, string> = {};
    config.yKeys.forEach((key, index) => {
      colors[key] = `hsl(var(--chart-${index + 1}))`;
    });

    const updatedConfig = { ...config, colors };
    return { config: updatedConfig };
  } catch (e) {
    console.error(e);
    throw new Error("Failed to generate chart suggestion");
  }
};
