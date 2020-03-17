

// Working of database connection done here.........
//change the database with yours
var mongoose = require("mongoose");
var url = 'mongodb://localhost:27017/learningMongoDB';
mongoose.connect(url);


// A cat schema is created........
var catSchema = new mongoose.Schema({
   name:String,
   age: Number,
   temperment:String
});
var Cat= mongoose.model("Cat",catSchema);



//-----------**ADDING A NEW CAT**--------------\\

// var newCat = new Cat({
//    name:"MaaKaLadla",
//    age: 4,
//    temperment:"Pyara"
// });

// newCat.save(function(err,cat){
//    if(err){
//     console.log("Something Went Wrong");
//    }else{
//        console.log(cat);
//    }
// });

//-------------------------------------------------------------


//-----------**ADDING A NEW CAT**(OTHER BETTER WAY)--------------\\

// Cat.create({
//      name:"Browny",
//      age: 9,
//      temperment:"Shy"
// },function(err,cat){
//     if(err){
//     console.log("Something Went Wrong");
//     }else{
//        console.log(cat);
//    }
// });

//-------------------------------------------------------------


//-----------**SHOWING CATS FROM DB**--------------\\

Cat.find({},function(err,cats){
    if(err){
        console.log("Something Went Wrong!!");
        console.log(error);
    }else{
        console.log("All Cats..........");
        console.log(cats);
    }
});