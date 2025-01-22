import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("todo-app", "root", "johnwick1#1", {
  dialect: "mysql",
  host: "localhost",
});
