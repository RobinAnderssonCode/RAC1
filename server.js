var express = require("express"),
    app = express(),
    mongojs = require("mongojs"),
    db = mongojs("mongodb://rac:qwaszx88!@ds147995.mlab.com:47995/contactlist", ["contactlist"]),
    bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

function getData() {
    app.get("/contactlist", function(req, res) {
        db.contactlist.find(function(err, docs) {
            res.json(docs);
        });
    });
}
getData();

app.post("/contactlist", function(req, res) {
    db.contactlist.insert(req.body, function(err, doc) {
        res.json(doc);
    });
});

app.get("/contactlist/:id", function(req, res) {
    var id = req.params.id;
    db.contactlist.findOne({ _id: mongojs.ObjectId(id) }, function(err, doc) {
        res.json(doc);
    });
});

app.put("/contactlist/:id", function(req, res) {
    var id = req.params.id;
    db.contactlist.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: { $set: { name: req.body.name, email: req.body.email, number: req.body.number } },
        new: true
    }, function(err, doc) {
        res.json(doc);
    });
});

app.delete("/contactlist/:id", function(req, res) {
    var id = req.params.id;
    db.contactlist.remove({ _id: mongojs.ObjectId(id) }, ["contactlist"], function(err, doc) {
        res.json(doc);
    });

});

app.listen(process.env.PORT || 5000);
console.log("Listening on port 5000...")
