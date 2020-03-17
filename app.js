
var express    = require('express'),
    bodyParser = require('body-parser'),
    app        = express();

// Working of database connection done here.........
var mongoose = require("mongoose");
// var url = 'mongodb://localhost:27017/myYelpCamp';
var url = 'mongodb+srv://anshaj:anshaj@cluster0-6lapa.mongodb.net/test'
mongoose.connect(url,{ useNewUrlParser: true , useUnifiedTopology: true });

mongoose.setD
// A campground schema is created........
var campgroundSchema = new mongoose.Schema({
  name:String,
  imageUrl:String,
  description:String,
  timestamp: {type:Number, default: new Date().getTime()},
  create: { type:Date , default:Date.now }   
});

var Campground= mongoose.model("Campground",campgroundSchema);

//CREATING NEW CAMPS IN DATABASE......
// Campground.create({
//     name:'Nice One',
//     imageUrl:"https://cdn.pixabay.com/photo/2017/08/07/02/34/people-2598902__340.jpg"
//   },function(err,camp){
//     if(err){
//     console.log("Something Went Wrong");
//     }else{
//        console.log(camp);
//    }
// });

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"));
app.set("view engine" , "ejs");  // After writing this line we do not have to write .ejs
                                 // during rendering

const request = require('request');

var camps = [
    { name:'Wonderful',imageUrl:"https://cdn.pixabay.com/photo/2019/10/03/11/14/camp-4522970__340.jpg" },
    { name:'Nice',imageUrl:"https://cdn.pixabay.com/photo/2020/02/04/10/42/camping-4817872__340.jpg" },
    { name:'A1',imageUrl:"https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402__340.jpg" },
    { name:'Excellent',imageUrl:"https://cdn.pixabay.com/photo/2018/12/24/22/19/camping-3893587__340.jpg" },
    { name:'Nice One',imageUrl:"https://cdn.pixabay.com/photo/2017/08/07/02/34/people-2598902__340.jpg" }
             ];


  app.get('/', function (req, res) {
    console.log(req.body);
    res.render('landing')

  })
  app.post('/', function (req, res) {
    console.log(req.body);
    res.render('landing')

  })
  app.get('/new', function (req, res) {
    console.log(req.body);
    res.render('new')

  })

  app.get('/show/:id', function (req, res) {

    var id = req.params.id; 

    Campground.findById(id,function(err,foundCampGround){
      if(err)
      {
        console.log(err);
        res.send('Image not Found..');
      }else{
        res.render('show',{foundCampGround:foundCampGround});
      }
    });

    
  })

  app.get('/show/:id/edit', function (req, res) {

    var id = req.params.id; 

    Campground.findById(id,function(err,foundCampGround){
      if(err)
      {
        console.log(err);
        res.send('Image not Found..');
      }else{
        res.render('edit',{foundCampGround:foundCampGround});
      }
    });
  
  })

  app.get('/campgrounds',function (req, res)
  {
    Campground.find({},function(err,camps){
     if(err)
     {
       res.send('Something Went Wrong');
       console.log(err);
     }else{
      res.render('campgrounds',{camps:camps});
      // console.log(camps);
     }
    });
    
     
  })

  app.post('/newImage', function (req, res) {
    var title=req.body.title;
    var image_url = req.body.image_url;  
    var description=req.body.description; 
      
    Campground.create({
    name:title,
    imageUrl:image_url,
    description:description
  },function(err,camp){
    if(err){
    console.log("Something Went Wrong");
    }else{
       console.log(camp);
   }
   });
   res.redirect('/campgrounds');
   })




 // Put star always in bottom.........
 app.get('*', function (req, res) {
    res.send('This page is not defined....... By Anshaj')
  })
  
  app.listen(process.env.PORT || 3000,function(){
      console.log('Server is running at port 3000 !!');
      console.log('Enjoy YelpCamp!!')
  })