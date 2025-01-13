import { AppDataSource } from "src/lib/data-source";
import { AIInsight } from "./ai-insight.entity";

export const AIInsightRepository = AppDataSource.getRepository(AIInsight);
