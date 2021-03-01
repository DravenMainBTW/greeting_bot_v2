import CONFIG from "../config_variables.js";

export default {
  findDocuments: (db, callback) => {
    db.collection(CONFIG.DB_COLLECTION).findOne({}, (err, docs) => {
      callback(docs);
    });
  },
  updateDocument: (db, message_status, callback) => {
    db.collection(CONFIG.DB_COLLECTION).updateOne(
      {},
      { $set: message_status },
      (err, result) => {
        callback(result);
      }
    );
  },
};
