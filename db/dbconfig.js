const {MongoClient} = require('mongodb');
const url = "mongodb://127.0.0.1:27017";
const dbConnect = async()=>{
    const client=new MongoClient(url);
    const db=client.db("web");
    const collection = db.collection("user");
    return collection;
}

module.exports=dbConnect;
