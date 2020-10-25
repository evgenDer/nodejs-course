const { PORT } = require('./common/config');
const app = require('./app');
const { connectToDB } = require('./common/dataBase');

const {
  unhandledRejection,
  uncaughtExceptionHandler
} = require('./middleware/processHandlers');

process
  .on('unhandledRejection', unhandledRejection)
  .on('uncaughtException', uncaughtExceptionHandler);

connectToDB(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
