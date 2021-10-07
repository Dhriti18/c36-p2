var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var FeedDog,lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);



  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  FeedDog=createButton("Feed The Dog");

  FeedDog.position(200,200);
  FeedDog.mousePressed(FeedDog1);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
async  function time (){
  var response= await fetch("https:worldtimeapi.org/api/timezone/Asia/Kolkata")
  
var responseJSON=await response.json();


var datetime=responseJSON.datetime;
var hour= datetime.slice(11,13);
console.log(hour);
time=hour;
conslr.log
hourC=hour%12;
text(hourC,100,100)
 LastFedTime=database.ref("FeedTime");
 LastFedTime.on("value",readTime);

}
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function readTime(data){
  LastFedTime=data.val();
  Feed.updateFoodStock(LastFedTime);
}




  //write code here to update food stock and last fed time
  function FeedDog1(){
    dog.addImage(happyDog);
   var foodStockval=foodObj.getFoodStock();
   if (foodStockval<=0){
     foodObj.updateFoodStock(foodStockval*0);
     
   }
   else{
    foodObj.updateFoodStock(foodStockval-1);
   }
  }
  


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
