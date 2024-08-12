// eslint-disable-next-line @typescript-eslint/no-var-requires
const mongoose = require('mongoose');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './environments/local.env' });

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

/* Make any changes you need to make to the database here
 */
async function up() {
  const collection = db.collection('orders');

  await collection.updateMany({}, { $set: { manager: null, group: null } });
}

/* Make any changes that UNDO the up function side effects here (if possible)
 */
async function down() {
  const collection = db.collection('orders');

  await collection.updateMany({}, { $unset: { manager: '', group: '' } });
}
module.exports = { up, down };
