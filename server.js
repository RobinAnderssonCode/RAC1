var express = require("express"),
	app = express(),
	mongojs = require("mongojs"),
	db = mongojs("mongodb://rac:qwaszx88!@ds147995.mlab.com:47995/contactlist", ["contactlist"]),
	bodyParser = require("body-parser");


// "/"= indexsidan. Detta är en test för att se att det funkar
/*
app.get("/", function(req, res){
	res.send("server.js says hi");
})
*/
// Visar appen till public mappen i main-mappen.
app.use(express.static(__dirname + "/public"));

//Menas att app kommer använda sig av JSON formattering.
app.use(bodyParser.json());

// Get datan från db.
function getData() {
app.get("/contactlist", function(req, res) {
	console.log("server recieved a GET-request!")

	//get data från mongoDB
	db.contactlist.find(function(err, docs) {
		// Printar svaret i node terminalen.
		console.log(docs);
		// Skickar tillbaka response i form av JSON.
		res.json(docs);
	});
});
}
getData();

//Post nya grejer till servern från add contact
//för body behövs body-parser. res.json(doc); skickar svaret från
//mongodb till controllern. controllern skickar sedan vidare
//svaret till view.
app.post("/contactlist", function(req, res){
	console.log("Adding:");
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, doc){
		res.json(doc);
	});


});

app.delete("/contactlist/:id", function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove( { _id: mongojs.ObjectId(id)}, ["contactlist"], function(err, doc) {
		res.json(doc);
	});
	
});


app.listen(process.env.PORT || 5000);
console.log("Listening on port 5000...")