var mongoose = require("mongoose");
var Blog     = require("./models/blog");
var Comment  = require("./models/comment")
//delete all existing blogs
//add some new blogs

var data = [
    {
        title: "CLouds Fiesta",
        image: "https://pixabay.com/get/ee33b2082bf51c22d2524518b7444795ea76e5d004b0144593f5c57fa5e9b6_340.jpg",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla felis, iaculis blandit rhoncus non, facilisis eget libero. Nunc tincidunt arcu et viverra iaculis. Sed molestie in justo non interdum. Vestibulum eget purus nec ex feugiat aliquet vel vitae orci. Nam convallis malesuada dictum. Duis sagittis sit amet risus vel vehicula. Suspendisse accumsan vestibulum nisi, sed tincidunt erat convallis nec. Aliquam erat volutpat. Mauris sagittis tempus vehicula."
    },
     {
        title: "Rock Fields",
        image: "https://pixabay.com/get/e83db70829f6003ed1584d05fb1d4e97e07ee3d21cac104491f6c47da1efb4b8_340.jpg",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla felis, iaculis blandit rhoncus non, facilisis eget libero. Nunc tincidunt arcu et viverra iaculis. Sed molestie in justo non interdum. Vestibulum eget purus nec ex feugiat aliquet vel vitae orci. Nam convallis malesuada dictum. Duis sagittis sit amet risus vel vehicula. Suspendisse accumsan vestibulum nisi, sed tincidunt erat convallis nec. Aliquam erat volutpat. Mauris sagittis tempus vehicula."
    },
     {
        title: "CameybAys",
        image: "https://farm6.staticflickr.com/5115/5896065607_56ab27661c.jpg",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nulla felis, iaculis blandit rhoncus non, facilisis eget libero. Nunc tincidunt arcu et viverra iaculis. Sed molestie in justo non interdum. Vestibulum eget purus nec ex feugiat aliquet vel vitae orci. Nam convallis malesuada dictum. Duis sagittis sit amet risus vel vehicula. Suspendisse accumsan vestibulum nisi, sed tincidunt erat convallis nec. Aliquam erat volutpat. Mauris sagittis tempus vehicula."
    }
]

   function seedDB(){
       //remove all Blogs
       Blog.deleteMany({},function(err){
            if(err){
                console.log(err);
            }else{
                console.log("removed all blogs");
            }
            
            //adding few blogs
            data.forEach(function(seed){
                Blog.create(seed,function(err, blog){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("created a blog");
                        
                        Comment.create({
                            text: "This place is great, but I wish there were hot boys here!",
                            author: "Ibiza"
                        },function(err, comment){
                            if(err){
                                console.log(err);
                            }else{
                                blog.comments.push(comment);
                                blog.save();
                                console.log("added a comment");
                            }
                        })
                    }
                })
            })
        
       })
   }

module.exports = seedDB;