import express from 'express';
import initializeServer from './index';

const app = express();

initializeServer(app);

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
