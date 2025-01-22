import { CronJob } from "cron";
import express, { Application, Request, Response } from "express";
const app: Application = express();
import { sequelize } from "./database/database";
import { CronJobModel } from "./models/cronJobModel";

app.get("/runCron", async (req: Request, res: Response) => {
  const interval = req.query.cJ;
  const cronExpression = `*/${interval} * * * * *`;
  const description = `Api hit with interval: ${interval}`;
  console.log(description);
  await CronJobModel.create({
    description: description,
    cronExpression: cronExpression,
    interval: interval,
  });
  new CronJob(
    cronExpression,
    function () {
      console.log("You will see this message every " + interval + " seconds");
    },
    null,
    true
  );
});

async function runExistingCronJobs() {
  const cronJobs = await CronJobModel.findAll();
  cronJobs.forEach((job) => {
    const cronExpression = job.dataValues.cronExpression;
    const interval = job.dataValues.interval;
    new CronJob(cronExpression, function () {
      console.log(`You will see this message after every ${interval} seconds`);
    }, null, true);
    console.log(cronExpression);
  });
}

sequelize
  .sync({})
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
      runExistingCronJobs();
    });
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
