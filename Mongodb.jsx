// mongoScript.js
const { MongoClient } = require('mongodb');

// Connection URI (replace <your_connection_string> with your MongoDB connection string)
const uri = 'mongodb://localhost:27017';

// Database and Collection names
const dbName = 'contact';
const collectionName = 'contactlist';

// Function to connect to MongoDB
async function connectToDatabase() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to the database');

    // Call the function to perform CRUD operations
    await performCRUDOperations(client);
  } finally {
    await client.close();
    console.log('Connection to the database closed');
  }
}

// Function to perform CRUD operations
async function performCRUDOperations(client) {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  // Insert documents
  const documentsToInsert = [
    { lastName: 'Ben Lahmer', firstName: 'Fares', email: 'fares@gmail.com', age: 26 },
    { lastName: 'Kefi', firstName: 'Seif', email: 'kefi@gmail.com', age: 15 },
    { lastName: 'Fatnassi', firstName: 'Sarra', email: 'sarra.f@gmail.com', age: 40 },
    { lastName: 'Ben Yahia', firstName: 'Rym', age: 4 },
    { lastName: 'Cherif', firstName: 'Sami', age: 3 },
  ];

  const resultInsert = await collection.insertMany(documentsToInsert);
  console.log(`${resultInsert.insertedCount} documents inserted`);

  // Read documents
  const resultRead = await collection.find().toArray();
  console.log('Documents in the collection:');
  console.log(resultRead);

  // Update document
  const updateFilter = { firstName: 'Fares' };
  const updateOperation = { $set: { age: 27 } };
  const resultUpdate = await collection.updateOne(updateFilter, updateOperation);
  console.log(`${resultUpdate.modifiedCount} document updated`);

  // Delete document
  const deleteFilter = { firstName: 'Rym' };
  const resultDelete = await collection.deleteOne(deleteFilter);
  console.log(`${resultDelete.deletedCount} document deleted`);
}

// Call the function to connect to the database and perform CRUD operations
connectToDatabase();
