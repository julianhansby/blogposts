// EXPRESS
var express = require('express');
var app = express();
var router = express.Router();
var allposts = [];
var postbyid = [];

// SQL
var mysql = require('mysql');
var conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "blogposts"
});

// init connection
conn.connect();

// query the DB

var getAllFromDb = function(){
	conn.query("select * from posts", function (err,rows,fields) {
		if(!err){
			allposts = rows;
		} else {
			console.log("could not fetch ALL POSTS");
		}
	});
};

var getPostByIdFromDb = function(newId){
	conn.query("select * from posts where id = "+newId, function (err,rows,fields) {
		if(!err){
			postbyid = rows;
		} else {
			console.log("could not fetch ALL POSTS");
		}
	});
};

// run on init
getAllFromDb();
getPostByIdFromDb(1);

router.get("/posts", function(req,res){
	res.json(allposts)
})

router.get("/post", function(req,res){
	res.json(postbyid)
})

// prefix domain with URL if you wish to
app.use("/api",router);

// init web server
app.listen(3000, function(){
	console.log("listening on port 3000 now!");
})


// EXIT
conn.end();	