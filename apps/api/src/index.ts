import config from './config';
import createServer from './server';

(async () => {
  try {
    await createServer(config.PORT);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
