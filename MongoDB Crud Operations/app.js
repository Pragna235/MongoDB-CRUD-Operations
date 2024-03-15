const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Your MongoDB URI
const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; //Ensure that the error is propagated
    }
}

connect();

async function insertDocument(db, collectionName, document) {
    try {
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(document);
        console.log(`Inserted ${result.insertedCount} document(s) into the collection.`);
    } catch (error) {
        console.error('Error inserting document:', error);
        throw error; // Ensure that the error is propagated
    }
}

async function findDocuments(db, collectionName, query = {}) {
    const collection = db.collection(collectionName);
    const documents = await collection.find(query).toArray();
    console.log('Found documents:', documents);
    return documents;
}

async function updateDocument(db, collectionName, filter, update) {
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(filter, { $set: update });
    console.log(`Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s).`);
}

async function deleteDocument(db, collectionName, filter) {
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne(filter);
    console.log(`Deleted ${result.deletedCount} document(s) from the collection.`);
}

async function main() {
    try {
        await connect();
        const db = client.db('Practise');
        const collectionName = 'CRUD_Operations';

        // Insert
        await insertDocument(db, collectionName, { name: 'John', age: 30 });

        // Read
        await findDocuments(db, collectionName);

        // Update
        await updateDocument(db, collectionName, { name: 'John' }, { age: 35 });

        // Delete
        //await deleteDocument(db, collectionName, { name: 'John' });
    } finally {
        await client.close();
    }
}

main().catch(error => {
    console.error('Error in main function:', error);
});

