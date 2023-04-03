
 
import 'dotenv/config';
import { App } from './app';
import connectToDatabase from './Database/Domains/Connection';

const PORT = process.env.PORT || 3001;
connectToDatabase()
  .then(() => {
    new App().start(PORT);
  })
  .catch((error: any) => {
    console.log('Connection with database generated an error:\r\n');
    console.error(error);
    console.log('\r\nServer initialization cancelled');
    process.exit(0);
  });