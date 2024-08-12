import dotenv from 'dotenv';

dotenv.config({ path: './environments/local.env' });

export default {
  mongodb: {
    url: process.env.MONGODB_URI,
    databaseName: process.env.MONGODB_NAME,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
  useFileHash: false,
};
