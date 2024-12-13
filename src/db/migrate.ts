import { migrate } from 'drizzle-orm/neon-http/migrator';

import { db } from '.';

const main = async () => {
  try {
    console.log('Migration Started');
    await migrate(db, {
      migrationsFolder: 'src/db/migrations',
    });
    console.log('Migration Completed');
  } catch (error) {
    console.log('Migration Failed');
    console.log(error);
    process.exit(1);
  }
};

main();
