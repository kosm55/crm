// eslint-disable-next-line @typescript-eslint/no-var-requires
const { MongoClient } = require('mongodb');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './environments/local.env' });

const mongoURI = process.env.MONGODB_URI;

module.exports = {
  async up() {
    const client = new MongoClient(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const db = client.db('crm');
      const usersCollection = db.collection('users');

      // Check if the admin already exists
      const adminExists = await usersCollection.findOne({
        email: 'admin@gmail.com',
      });
      if (!adminExists) {
        // Hash the password
        const hashedPassword = await bcrypt.hash('admin', 10);

        // Insert admin user
        await usersCollection.insertOne({
          name: 'admin',
          surname: null,
          email: 'admin@gmail.com',
          password: hashedPassword,
          role: 'admin',
          createdAt: new Date(),
          isActive: true,
        });
        console.log('Admin user created successfully.');
      } else {
        console.log('Admin user already exists.');
      }
    } catch (err) {
      console.error('Failed to create admin user:', err);
      throw err;
    } finally {
      await client.close();
    }
  },

  async down() {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const db = client.db('crm');
      const usersCollection = db.collection('users');

      await usersCollection.deleteOne({ email: 'admin@gmail.com' });
      console.log('Admin user removed successfully.');
    } catch (err) {
      console.error('Failed to remove admin user:', err);
      throw err;
    } finally {
      await client.close();
    }
  },
};
