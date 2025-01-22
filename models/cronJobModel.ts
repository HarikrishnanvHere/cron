import { sequelize } from "../database/database";
import { DataTypes } from "sequelize";

export const CronJobModel = sequelize.define("cronjob", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  interval: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cronExpression: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
