// Imports
import mongodb from "mongodb";
import CONFIG from "../config_variables.js";

// Defining Required Variables
const { MongoClient } = mongodb;
const connection = new MongoClient(CONFIG.MONGODB_URI, {
  useUnifiedTopology: true,
});

// Connects To Server
connection.connect();

// Exporting Server Interactions For Use In "index.js"
export default {
  findDocuments: async () => {
    let data = await connection
      .db(CONFIG.DB_NAME)
      .collection(CONFIG.DB_COLLECTION)
      .findOne({});

    return data;
  },
  updateDocuments: async (data) => {
    await connection
      .db(CONFIG.DB_NAME)
      .collection(CONFIG.DB_COLLECTION)
      .updateOne({}, { $set: data });

    return { success: true };
  },
};
