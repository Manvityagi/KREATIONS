var mongoose = require("mongoose");
var Writeup     = require("./models/writeup/writeup");
var Comment  = require("./models/comment/comment")
//delete all existing Writeups
//add some new Writeups

var data = [
    {
        title: "BEST FRIEND",
        image: "https://images.pexels.com/photos/206582/pexels-photo-206582.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        body: `The one you love the most,
        The one you fight with the most,
        The one you care for the most,
        The one who loves you the most.`
    },
     {
        title: "MOMENT",
        image: "https://images.pexels.com/photos/298018/pexels-photo-298018.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        body: `Years ago, something broke in me;
        but that MOMENT that WOUND is still as fresh in my memories as if it occurred a minute ago.`
    },
     {
        title: "I wish I had never grown up.",
        image: "https://images.pexels.com/photos/1456951/pexels-photo-1456951.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        body: `Tik tok 
        Last night I slept a bit late coz i had to finish a work before deadline , 
        So scheduled an alarm of 9:55 am , planning that I would get up & pack the breakfast at first before 10:15 ...as the mess usually serves it till then only, 
        The alarm rang Sharp at 9:55 , I  snoozed it off & slept again ,the alarm rang again after 2 mins, i tried to get up but couldn't, I turned it off half-consciously .
        
        Tik Tok 
        Ohh it's 11:30 , breakfast , i ran up to the mess but it was all empty, ok no problem I thought ,
        I would do lunch early before leaving for a class at 2pm , 
        Daily chores took me through 12 pm, 
        I planned to work till 1:00 ,then,have a bath till 1:30 & most awaited lunch in remaining 30 mins & then leave.
        
        Tik Tok
        1:00 , I got up, packed my stuff for bathing, meanwhile I found myself searching for my towel in the room all around,  ohh oh I washed it yesterday, it must be on the roof. I ran as fast as I could to the 4th floor , got my towel,took a bath (not even properly��) but it was already 1:45 when I came out of bathroom . 
        I lost 15 mins searching for the towel ,going up & down. 
        Ok no problem, get ready in 5 mins, & do ur lunch in 15 mins, leave by 2:10 ; lunch is important even if I get late by 10 mins for meeting.
        
        Tik Tok 
        Getting ready ,all done , where are my socks ,
        Not beside shoes,not in the wardrobe, not visible on the bed or table, Mumma gave me 5 pairs of socks , I couldnt find 1. Let's wear the shoes without socks ..no pblm.
        I am ready,just hairs to be combed , didn't I put the comb on my table last night, where it is man,I am already late , cant leave with unkempted hairs , searching everything around, I found my comb in my roommates book shelf ..phew , ready, tiktok shitt already 2:00 ...i can't have lunch  & leave in 10 mins. 
        
        I kept 2 packets of biscuit which Mumma gave me when I last went home.
        I dont like biscuits though but before entering the classroom I ate them all,with almost tears rolling down my cheeks wishing I wish I had never grown up, wishing to be with my family.
        
        
        ©the_fire_girl`
    }
]

   function seedDB(){
       //remove all Writeups
       Writeup.deleteMany({},function(err){
            if(err){
                console.log(err);
            }else{
                console.log("removed all Writeups");
            }
            
            //adding few Writeups
            data.forEach(function(seed){
                Writeup.create(seed,function(err, writeup){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("created a writeup");
                        
                        Comment.create({
                            text: "This place is great, but I wish there were hot boys here!",
                            author: "Ibiza"
                        },function(err, comment){
                            if(err){
                                console.log(err);
                            }else{
                                writeup.comments.push(comment);
                                writeup.save();
                                console.log("added a comment");
                            }
                        })
                    }
                })
            })
        
       })
   }

module.exports = seedDB;