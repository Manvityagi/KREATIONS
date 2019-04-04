var express        = require("express"),
    methodOverride = require("method-override"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
  expressSanitizer = require("express-sanitizer"),
    seedDB         = require("./seeds"),
    Comment        = require("./models/comment/comment"),
    Writeup        = require("./models/writeup/writeup");
    
    seedDB();
    
    //APP CONFIG
mongoose.connect("mongodb://localhost/kreationsDB",{useNewUrlParser: true});     
app.use(bodyParser.urlencoded({extended: true}));
app.use (expressSanitizer());
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));


/*
Writeup.create({
    title: "Food",
    image: "https://farm1.staticflickr.com/66/168201626_73bded336e.jpg",
    body: "HELLO! GOOD FOOD IS GOOD LIFE !"
});
*/
//RESTful Routes

app.get("/",(req,res) => {
    res.send("Home Page with Login/signup")
});

// app.get("/writeups",function(req,res){
//     res.redirect("/writeups");
// });

//INDEX ROUTE
app.get("/writeups",function(req,res){
    Writeup.find({},function(err, writeups){
        if(err){
            console.log("error!")
        }else{
             res.render("index",{writeups:writeups});     
        }
    });
});
 
 
//NEW ROUTE
app.get("/writeups/new",function(req,res){
    res.render("new");
});

//CREATE ROUTE
app.post("/writeups",function(req,res){
    //create writeup
    req.body.writeup.body = req.sanitize(req.body.writeup.body)
    Writeup.create(req.body.writeup, function(err, newWriteup){
        if(err){
            console.log(err);
        }else{
            res.redirect("/writeups");
        }
    });
});


//logic: take the id returned, find the corresponding writeup & render the show template
app.get("/writeups/:id",function(req,res){
    Writeup.findById(req.params.id).populate("comments").exec(function(err,foundWriteup){
// SHOW ROUTE
        if(err){
            res.redirect("/writeups");
        }else{
             res.render("show",{writeup: foundWriteup});     
        }
    });
});

//EDIT ROUTE
app.get("/writeups/:id/edit", function(req,res){
    Writeup.findById(req.params.id,function(err,foundWriteup){
        if(err){
            res.redirect("/writeups");
        }else{
            res.render("edit",{Writeup: foundWriteup});         
        }
    });
});

//UPDATE ROUTE
app.put("/writeups/:id",function(req,res){
     req.body.writeup.body = req.sanitize(req.body.writeup.body)
    writeup.findByIdAndUpdate(req.params.id, req.body.writeup, function(err, updatedwriteup){
        if(err){
            res.redirect("/writeups");
        } else {
            res.redirect("/writeups/" + req.params.id);
        }
    });
});

//DELETE ROUTE
app.delete("/writeups/:id",function(req,res){
    //destroy writeup
    Writeup.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/writeups");
        }else{
            res.redirect("/writeups");
        }
    });
    //redirect
});

//=======================================//
//         COMMNENT ROUTES              //
//=====================================//

//NEW (GET)
app.get("/writeups/:id/comments/new",function(req,res){
        Writeup.findById(req.params.id,function(err, writeup){
            if(err){
                console.log(err);
            }else{
                  res.render("newWriteup",{writeup: writeup})   
            }
        });
});

//CREATE(POST)
app.post("/writeups/:id/comments",function(req, res){
    Writeup.findById(req.params.id,function(err, foundWriteup) {
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment,function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    foundWriteup.comments.push(comment);
                    foundWriteup.save();
                    res.redirect("/writeups/" + foundWriteup._id)
                }
            });
        }
    });
});




app.listen(3030,function(){
    console.log("The Kreations_App server has started")
}); 