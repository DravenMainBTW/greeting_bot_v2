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
  listBindings: async () => {
    let data = await connection
      .db(CONFIG.DB_NAME)
      .collection(CONFIG.DB_COLLECTION)
      .find();
    return data.toArray();
  },
  createBinding: async (data) => {
    await connection
      .db(CONFIG.DB_NAME)
      .collection(CONFIG.DB_COLLECTION)
      .insertOne(data);

    return { success: true };
  },
  updateBinding: async (id, data) => {
    await connection
      .db(CONFIG.DB_NAME)
      .collection(CONFIG.DB_COLLECTION)
      .findOneAndUpdate({ user_id: id }, { $set: { enabled: data } });

    return { success: true };
  },
  removeBinding: async (id) => {
    await connection
      .db(CONFIG.DB_NAME)
      .collection(CONFIG.DB_COLLECTION)
      .deleteOne({ user_id: id });

    return { success: true };
  },
};
