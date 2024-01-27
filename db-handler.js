const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const mongoServer = new MongoMemoryServer();

module.exports.connect = async () => {
  const mongoUri = await mongoServer.getUri();
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.MONGODB_TEST_DATABASE,
  };

  await mongoose.connect(mongoUri, mongooseOpts);
};

module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};