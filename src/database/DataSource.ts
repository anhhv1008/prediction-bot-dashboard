import "reflect-metadata";
import { DataSource } from "typeorm";
import { BotSignalConfig } from "./entities/BotSignalConfig";
import { BotSignalLog } from "./entities/BotSignalLog";
import { Wallet } from "./entities/Wallet";
import { WalletExchangeApi } from "./entities/WalletExchangeApi";
import { User } from "./entities/User";
import { BotOrder } from "./entities/BotOrder";
import { BotPhase } from "./entities/BotPhase";
import { BotWorker } from "./entities/BotWorker";
import { BotPhaseLog } from "./entities/BotPhaseLog";
import { RedeemHistory } from "./entities/RedeemHistory";
import { BotOrderSimulation } from "./entities/BotOrderSimulation";
import { BotPhaseSimulation } from "./entities/BotPhaseSimulation";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_DB_HOST,
  port: Number(process.env.MYSQL_DB_PORT) || 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DBNAME,
  synchronize: false,
  logging: false,
  entities: [
    BotSignalConfig,
    BotSignalLog,
    Wallet,
    WalletExchangeApi,
    User,
    BotOrder,
    BotPhase,
    BotWorker,
    BotPhaseLog,
    RedeemHistory,
    BotOrderSimulation,
    BotPhaseSimulation,
  ],
  subscribers: [],
  connectTimeout: 60000,
  poolSize: 5,
});

export const initializeDB = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};
