import mongoose from 'mongoose';
//import { MongoClient } from 'mongodb'

const connectionString = process.env.ATLAS_URI || ""

export default async function connectToDb(){
    try {
        await mongoose.connect(connectionString);
        console.log('Connect to MongoDB');

    }  catch (err){
        console.log(err);
    } 

}

// const client = new MongoClient(connectionString)

// let conn;

// try {
//    conn = await client.connect()
//    console.log('Connected to MongoDB')
// } catch(err) {
//     console.log(err)
// }

// let db = conn.db("sample_training")

// export default db