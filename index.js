const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/conFusion';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

	assert.equal(err,null);

	console.log('connected successfully to the server');

	const db = client.db(dbname);
	const collection = db.collection("dishes");

	collection.insertOne({"name":"Uthapizza", "description":"test"},
		(err,result) => {

			assert.equal(err,null);

			console.log("after insert:\n");
			console.log(result.ops);

			collection.find({}).toArray((err, docs) => {
				assert.equal(err,null);

				console.log("found:\n");
				console.log(docs);

				db.dropCollection("dishes",(err,result)=> {
					assert.equal(err,null);

					client.close();
				});
			});
		});
});