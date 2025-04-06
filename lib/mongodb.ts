// import { MongoClient } from "mongodb";

// if (!process.env.MONGODB_URI) {
//   throw new Error("Please add your Mongo URI to .env.local");
// }

// const uri = process.env.MONGODB_URI;
// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (process.env.NODE_ENV === "development") {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   const globalWithMongo = global as typeof global & {
//     _mongoClientPromise?: Promise<MongoClient>;
//   };

//   if (!globalWithMongo._mongoClientPromise) {
//     client = new MongoClient(uri);
//     globalWithMongo._mongoClientPromise = client.connect();
//   }
//   clientPromise = globalWithMongo._mongoClientPromise;
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri);
//   clientPromise = client.connect();
// }

// export default clientPromise;

// import { MongoClient } from "mongodb";

// if (!process.env.MONGODB_URI) {
//   throw new Error("Please add your Mongo URI to .env.local");
// }

// const uri = process.env.MONGODB_URI;
// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (process.env.NODE_ENV === "development") {
//   const globalWithMongo = global as typeof global & {
//     _mongoClientPromise?: Promise<MongoClient>;
//   };
//   if (!globalWithMongo._mongoClientPromise) {
//     client = new MongoClient(uri);
//     globalWithMongo._mongoClientPromise = client.connect();
//     console.log("Connecting to MongoDB in development mode...");
//   }
//   clientPromise = globalWithMongo._mongoClientPromise;
// } else {
//   client = new MongoClient(uri);
//   clientPromise = client.connect();
//   console.log("Connecting to MongoDB in production mode...");
// }

// clientPromise
//   .then((client) => {
//     console.log("Connected to MongoDB", client);
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

// export default clientPromise;
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const uri = process.env.MONGODB_URI;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof global & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client
      .connect()
      .then((client) => {
        console.log("✅ Connected to MongoDB");
        return client;
      })
      .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        throw err;
      });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri);
  clientPromise = client
    .connect()
    .then((client) => {
      console.log("✅ Connected to MongoDB");
      return client;
    })
    .catch((err) => {
      console.error("❌ MongoDB Connection Error:", err);
      throw err;
    });
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
