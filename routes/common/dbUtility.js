var {MongoClient} = require('mongodb');
var client = new MongoClient(process.env.DB_URL);


var dbUtils = {
    a: 100,
    doDbCommunication(data, type, cname) {
        return getDbConnection(data, type, cname);
    }
};

var getDbConnection =  async(userData, actionType, collectionName) => {
    console.log("From get db connection")
    await client.connect();
    var db = client.db(process.env.DATABASE_NAME);
    var collection = db.collection(collectionName);
    
    switch(actionType) {
        case 'find':
            var result =  collection.find(userData).toArray();
            break;
        case 'insertOne':
            var result =  collection.insertOne(userData);
            console.log(result)
            break;
        case 'deleteOne':
            var result =  collection.deleteOne(userData);
            break;

        
    }
    return result;
}

module.exports = dbUtils;