var express        = require("express"),
    methodOverride = require("method-override"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
  expressSanitizer = require("express-sanitizer"),
    seedDB         = require("./seeds"),
    Comment        = require("./models/comment"),
    Blog           = require("./models/blog");
    
    seedDB();
    
    //APP CONFIG
mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true});     
app.use(bodyParser.urlencoded({extended: true}));
app.use (expressSanitizer());
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));


/*
Blog.create({
    title: "Food",
    image: "https://farm1.staticflickr.com/66/168201626_73bded336e.jpg",
    body: "HELLO! GOOD FOOD IS GOOD LIFE !"
});
*/
//RESTful Routes


app.get("/",function(req,res){
    res.redirect("/blogs");
});

//INDEX ROUTE
app.get("/blogs",function(req,res){
    Blog.find({},function(err, blogs){
        if(err){
            console.log("error!")
        }else{
             res.render("index",{blogs:blogs});     
        }
    });
});
 
 
//NEW ROUTE
app.get("/blogs/new",function(req,res){
    res.render("new");
});

//CREATE ROUTE
app.post("/blogs",function(req,res){
    //create blog
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log(err);
        }else{
            res.redirect("/blogs");
        }
    });
});


//logic: take the id returned, find the corresponding blog & render the show template
app.get("/blogs/:id",function(req,res){
    Blog.findById(req.params.id).populate("comments").exec(function(err,foundblog){
// SHOW ROUTE
        if(err){
            res.redirect("/blogs");
        }else{
             res.render("show",{blog: foundblog});     
        }
    });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id,function(err,foundblog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit",{blog: foundblog});         
        }
    });
});

//UPDATE ROUTE
app.put("/blogs/:id",function(req,res){
     req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DELETE ROUTE
app.delete("/blogs/:id",function(req,res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    });
    //redirect
});

//=======================================//
//         COMMNENT ROUTES              //
//=====================================//

//NEW (GET)
app.get("/blogs/:id/comments/new",function(req,res){
        Blog.findById(req.params.id,function(err, blog){
            if(err){
                console.log(err);
            }else{
                  res.render("newblog",{blog: blog})   
            }
        })
})

//CREATE(POST)
app.post("/blogs/:id/comments",function(req, res){
    Blog.findById(req.params.id,function(err, foundblog) {
        if(err){
            console.log(err);
        }else{
            Comment.create(req.body.comment,function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    foundblog.comments.push(comment);
                    foundblog.save();
                    res.redirect("/blogs/" + foundblog._id)
                }
            })
        }
    })
})




app.listen(process.env.PORT,process.env.IP,function(){
    console.log("The blog_App server has started")
}); 