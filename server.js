const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const app = express();
const port = 9000;
const url = "mongodb://localhost:27017";

app.use('/', express.static('.'));
app.use(bodyParser.json());

app.get('/comments', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        let dbo = db.db("weblabs-db");
        let result = dbo.collection("comments").find().toArray().then(function (data) {
            res.send(data);
        });
        db.close();
    });
});

app.post('/comments', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        if (req.body) {
            let dbo = db.db("weblabs-db");
            dbo.collection("comments").insert(req.body, function(err, res) {
                if (err) throw err;
                db.close();
            });
        }
    });
    res.send();
});

app.put('/comments', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        if (req.body) {
            let dbo = db.db("weblabs-db");
            dbo.collection("comments").update(req.body, function(err, res) {
                if (err) throw err;
                db.close();
            });
        }
    });
    res.send();
});

app.delete('/comments', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        if (req.body) {
            let dbo = db.db("weblabs-db");
            dbo.collection("comments").remove(req.body, function(err, res) {
                if (err) throw err;
                db.close();
            });
        }
    });
    res.send();
});

app.get('/news', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        let dbo = db.db("weblabs-db");
        let result = dbo.collection("news").find().toArray().then(function (data) {
            res.send(data);
        });
        db.close();
    });
});

app.post('/news', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        if (req.body) {
            let dbo = db.db("weblabs-db");
            dbo.collection("news").insert(req.body, function(err, res) {
                if (err) throw err;
                db.close();
            });
        }
    });
    res.send();
});

app.put('/news', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        if (req.body) {
            let dbo = db.db("weblabs-db");
            dbo.collection("news").update(req.body, function(err, res) {
                if (err) throw err;
                db.close();
            });
        }
    });
    res.send();
});

app.delete('/news', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        if (req.body) {
            let dbo = db.db("weblabs-db");
            dbo.collection("news").remove(req.body, function(err, res) {
                if (err) throw err;
                db.close();
            });
        }
    });
    res.send();
});

app.listen(port, function () {
    console.log("Listening at port", port);
});