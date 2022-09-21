var express = require('express');
var path = require('path');
var sessionstorage = require('sessionstorage');
var alert = require('alert'); 

var app = express();
var fs = require('fs');
const { constants } = require('buffer');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000);

app.get('/',function(req,res){
    res.render('login', {regcomment:"please log in"});
});

app.get('/registration',function(req,res){
    res.render('registration');
});

app.get('/books',function(req,res){
    var username_s = sessionstorage.getItem('User_namesession');
    if(username_s === null){
        alert("Must Log in First");
    }
    else{
        res.render('books');
    }
});

app.get('/boxing',function(req,res){
    var username_s = sessionstorage.getItem('User_namesession');
    if(username_s === null){
        alert("Must Log in First");
    }
    else{
        res.render('boxing');
    }
});

app.get('/cart', async function(req,res){
    var username_s = sessionstorage.getItem('User_namesession');
    if(username_s === null){
        alert("Must Log in First");
    }
    else{
        cart_output = await getelementscart();
        res.render('cart' , {cart_user: cart_output});res.render('books');
    } 
});

app.get('/galaxy',function(req,res){
    var username_s = sessionstorage.getItem('User_namesession');
    if(username_s === null){
        alert("Must Log in First");
    }
    else{
        res.render('galaxy');
    }
});

app.get('/home',function(req,res){
    var username_s = sessionstorage.getItem('User_namesession');
    if(username_s === null){
        alert("Must Log in First");
    }
    else{
        res.render('home');
    }
});

app.get('/iphone',function(req,res){
    var username_s = sessionstorage.getItem('User_namesession');
    if(username_s === null){
        alert("Must Log in First");
    }
    else{
        res.render('iphone');
    }
});

app.get('/leaves',function(req,res){
    var username_s = sessionstorage.getItem('User_namesession');
    if(username_s === null){
        alert("Must Log in First");
    }
    else{
        res.render('leaves');
    }
});

app.get('/phones',function(req,res){
    var username_s = sessionstorage.getItem('User_namesession');
    if(username_s === null){
        alert("Must Log in First");
    }
    else{
        res.render('phones');
    }
});

// app.get('/searchresults',function(req,res){
    
// });

app.get('/sports',function(req,res){
    var username_s = sessionstorage.getItem('User_namesession');
    if(username_s === null){
        alert("Must Log in First");
    }
    else{
        res.render('sports');
    }
});

app.get('/sun',function(req,res){
    var username_s = sessionstorage.getItem('User_namesession');
    if(username_s === null){
        alert("Must Log in First");
    }
    else{
        res.render('sun');
    }
});

app.get('/tennis',function(req,res){
    var username_s = sessionstorage.getItem('User_namesession');
    if(username_s === null){
        alert("Must Log in First");
    }
    else{
        res.render('tennis');
    }
});


//app.post('/',  function(req,res){
  //  var user_name =  req.body.username;
   // console.log(user_name);
//});

app.post('/',  async function(req,res){
    var user_name =  req.body.username;
    var  pass = req.body.password;
    var flag = await checklogin(user_name, pass);
    if (flag === true){
        sessionstorage.setItem('User_namesession', user_name);
        res.render('home');
    }
    else {
        res.render('login', {regcomment: "you entered a wrong username or password"});
    }

    });

app.post('/register',  async function(req,res){
    var user_name =  req.body.username;
    var  pass = req.body.password;
    var flag = await checkReg(user_name, pass);
    //console.log(flag);
    if(flag === false){
        //user = {username: user_name , password: pass};
        //await client.db('NetworksProject').collection('UserInfo').insertOne(user)
        sessionstorage.setItem('User_namesession', user_name);
       res.render('home');
    } 
    else {
        res.render('login', { regcomment : "you are arleady registered please login or one  of the fields is blank"});
    }


});
//var {MongoClient} = require('mongodb');
 //var uri = "mongodb+srv://admin:Hackerzz@cluster0.yjlb4.mongodb.net/NetworksProject?retryWrites=true&w=majority"
 //var client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

  async function checkReg (user_name, pass){
    var {MongoClient} = require('mongodb');
    var uri = "mongodb+srv://admin:Hackerzz@cluster0.yjlb4.mongodb.net/NetworksProject?retryWrites=true&w=majority"
    var client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    await client.connect();
    var output = await client.db('NetworksProject').collection('UserInfo').find().toArray();

    var foundreg = false;
        for(i = 0; i < output.length; i++){
            if(output[i].username === user_name | user_name === "" | pass === "" ){
                foundreg = true;
                break;
            }
        }
        if (foundreg ===false){
         user = {username: user_name , password: pass , cartproducts: []};
         await client.db('NetworksProject').collection('UserInfo').insertOne(user);
        }
        return foundreg;
        client.close();
        
}
async function checklogin (user_name,pass){
    var {MongoClient} = require('mongodb');
    var uri = "mongodb+srv://admin:Hackerzz@cluster0.yjlb4.mongodb.net/NetworksProject?retryWrites=true&w=majority"
    var client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    await client.connect();
    var output = await client.db('NetworksProject').collection('UserInfo').find().toArray();
    var foundlog = false; 
    for(i = 0; i < output.length; i++){
        if(output[i].username === user_name && output[i].password === pass ){
            foundlog = true;
            break;
        }
    }
    return foundlog;
    client.close();
} 

app.post('/search',  async function(req,res){
    var {MongoClient} = require('mongodb');
    var uri = "mongodb+srv://admin:Hackerzz@cluster0.yjlb4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    var client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    await client.connect();

    var output = await client.db('NetworksProject').collection('Products').find().toArray();
    var searchText = req.body.Search;
    searchText = searchText.toLowerCase();
    //var searchText = inputSearch.value;

    var result = [];
    for(var i = 0; i < output.length; i++){
        // if((output[i].fullName).indexOf(searchText) !== -1){
        if((output[i].fullName.toLowerCase()).includes(searchText)){
            result.push({productname: output[i].productname,
                         fullName: output[i].fullName});        }
    }
    if(result==[]){
        res.render('searchresults' , {resvar: result, error: "No Items Found"});
    }
    else{
        res.render('searchresults' , {resvar: result, error: ""});
    }
    // res.render('searchresults',{});
    client.close();

});

// app.post('/search', function(req,res){
//     console.log("salma");
// });

// async function main (){
//    var {MongoClient} = require('mongodb');
//     var uri = "mongodb+srv://admin:Hackerzz@cluster0.yjlb4.mongodb.net/NetworksProject?retryWrites=true&w=majority"
//     var client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
//     await client.connect();

//     product ={productname:"iphone",
//               fullName: "iPhone 13 Pro"};
//     await client.db('NetworksProject').collection('Products').insertOne(product);
//     product ={productname:"galaxy",
//               fullName: "Galaxy S21 Ultra"};
//     await client.db('NetworksProject').collection('Products').insertOne(product);
//     product = {productname:"leaves",
//                fullName: "Leaves of Grass"};
//     await client.db('NetworksProject').collection('Products').insertOne(product);
//     product= {productname:"sun",
//               fullName: "The Sun and Her Flowers"};
//     await client.db('NetworksProject').collection('Products').insertOne(product);
//     product= {productname:"boxing",
//               fullName: "Boxing Bag"};
//     await client.db('NetworksProject').collection('Products').insertOne(product);
//     product= {productname:"tennis",
//               fullName: "Tennis Racket"};
//     await client.db('NetworksProject').collection('Products').insertOne(product);
//     client.close();

// }
// main().catch(console.error);

//CARTT

async function item_found (product_name){
    var {MongoClient} = require('mongodb');
    var uri = "mongodb+srv://admin:Hackerzz@cluster0.yjlb4.mongodb.net/NetworksProject?retryWrites=true&w=majority"
    var client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    await client.connect();
    var output = await client.db('NetworksProject').collection('UserInfo').find().toArray();
    var found_item = false;
    var username_s = sessionstorage.getItem('User_namesession');
    var user_index;
    for(i = 0; i < output.length; i++){
        if(output[i].username === username_s ){
               user_index =i;
            for (j=0;j< output[i].cartproducts.length;j++){
                if (output[i].cartproducts[j]=== product_name){
                    found_item= true;
                    break;
                }
            }
        }
    }
       if (found_item === true){
        alert("this item is already in your cart");
    }
    else{
        // console.log(user_index);
        // console.log(sessionstorage.getItem('User_namesession'));
        //(output[user_index].cartproducts).push(product_name);
        //output[user_index.cartproducts].insert(product_name);
        // output.updateOne(
        //     {"username": output[i].username},
        //     {"password": output[i].password},
        //     {$push: {"cartproducts": product_name}}
        // )
        const finalArray = [];
        for (j=0;j< output[user_index].cartproducts.length;j++){
            //cartproducts[j] =cart_user[j];
            finalArray[j] = output[user_index].cartproducts[j];
        }
        finalArray.push(product_name);
        await client.db('NetworksProject').collection('UserInfo').updateOne({username: output[user_index].username,
                                                                            password: output[user_index].password},
                                                                            {$set: {cartproducts: finalArray}});


    }
    client.close();
}

app.post('/boxing',  async function(req,res){
    await item_found ("Boxing Bag");
});

app.post('/iphone',  async function(req,res){
    await item_found ("iPhone 13 Pro");
});

app.post('/galaxy',  async function(req,res){
    await item_found ("Galaxy S21 Ultra");
});

app.post('/leaves',  async function(req,res){
    await item_found ("Leaves of Grass");
});

app.post('/sun',  async function(req,res){
    await item_found ("The Sun and Her Flowers");
});

app.post('/tennis',  async function(req,res){
    await item_found ("Tennis Racket");
});

// var  boxing = document.getElementById(cart_boxing); 
// boxing.onclick = async function item_found_boxing(){ 
//     var {MongoClient} = require('mongodb');
//     var uri = "mongodb+srv://admin:Hackerzz@cluster0.yjlb4.mongodb.net/NetworksProject?retryWrites=true&w=majority"
//     var client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//     await client.connect();
//     var output = await client.db('NetworksProject').collection('UserInfo').find().toArray();
//     var found_item = false;
//     var username_s = sessionStorage.getItem(User_namesession);
//     var user_index;
//     for(i = 0; i < output.length; i++){
//         if(output[i].username === username_s ){
//                user_index =i;
//             for (j=0;j< output[i].cartproducts.length;j++){
//                 if (cartproducts[j]=== "galaxy"){
//                     found_item= true;
//                     break;
//                 }
//             }
            
//         }
//     }
//        if (found_item === true){
//         alert("this item is already in your cart");

//     }
//     else{
//          output[user_index].cartproducts.push("galaxy");
//     }
    
    
//     client.close();

// }
// var  tennis_button = document.getElementById("cart_tennis");
// tennis_button.onclick = async function item_found_tennis(){
//     var {MongoClient} = require('mongodb');
//     var uri = "mongodb+srv://admin:Hackerzz@cluster0.yjlb4.mongodb.net/NetworksProject?retryWrites=true&w=majority"
//     var client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//     await client.connect();
//     var output = await client.db('NetworksProject').collection('UserInfo').find().toArray();
//     var found_item = false;
//     var username_s = sessionStorage.getItem(User_namesession);
//     var user_index;
//     for(i = 0; i < output.length; i++){
//         if(output[i].username === username_s ){
//                user_index =i;
//             for (j=0;j< output[i].cartproducts.length;j++){
//                 if (cartproducts[j]=== "tennis"){
//                     found_item= true;
//                     break;
//                 }
//             }
            
//         }
//     }
//        if (found_item === true){
//         alert("this item is already in your cart");

//     }
//     else{
//          output[user_index].cartproducts.push("tennis");
//     }
    
    
//     client.close();

// }
// var galaxy_button = document.getElementById("cart_galaxy");
// galaxy_button.onclick = async function item_found_galaxy(){
//     var {MongoClient} = require('mongodb');
//     var uri = "mongodb+srv://admin:Hackerzz@cluster0.yjlb4.mongodb.net/NetworksProject?retryWrites=true&w=majority"
//     var client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//     await client.connect();
//     var output = await client.db('NetworksProject').collection('UserInfo').find().toArray();
//     var found_item = false;
//     var username_s = sessionStorage.getItem(User_namesession);
//     var user_index;
//     for(i = 0; i < output.length; i++){
//         if(output[i].username === username_s ){
//                user_index =i;
//             for (j=0;j< output[i].cartproducts.length;j++){
//                 if (cartproducts[j]=== "tennis"){
//                     found_item= true;
//                     break;
//                 }
//             }
            
//         }
//     }
//        if (found_item === true){
//         alert("this item is already in your cart");

//     }
//     else{
//          output[user_index].cartproducts.push("tennis");
//     }
    
    
//     client.close();

// }
// var iphone_button = document.getElementById("cart_iphone13");
// iphone_button.addEventListener("click", async function item_found_iphone13(){
//     var {MongoClient} = require('mongodb');
//     var uri = "mongodb+srv://admin:Hackerzz@cluster0.yjlb4.mongodb.net/NetworksProject?retryWrites=true&w=majority"
//     var client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//     await client.connect();
//     var output = await client.db('NetworksProject').collection('UserInfo').find().toArray();
//     var found_item = false;
//     var username_s = sessionstorage.getItem(User_namesession);
//     var user_index;
//     for(i = 0; i < output.length; i++){
//         if(output[i].username === username_s ){
//                user_index =i;
//             for (j=0;j< output[i].cartproducts.length;j++){
//                 if (cartproducts[j]=== "iPhone 13 Pro"){
//                     found_item= true;
//                     break;
//                 }
//             }
            
//         }
//     }
//        if (found_item === true){
//         alert("this item is already in your cart");

//     }
//     else{
//          output[user_index].cartproducts.push("iPhone 13 Pro");
//     }

//     client.close();
// });
// var sun_button = document.getElementById("cart_sun");
// sun_button.onclick=  async function item_found_sun(){
//     var {MongoClient} = require('mongodb');
//     var uri = "mongodb+srv://admin:Hackerzz@cluster0.yjlb4.mongodb.net/NetworksProject?retryWrites=true&w=majority"
//     var client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//     await client.connect();
//     var output = await client.db('NetworksProject').collection('UserInfo').find().toArray();
//     var found_item = false;
//     var username_s = sessionStorage.getItem(User_namesession);
//     var user_index;
//     for(i = 0; i < output.length; i++){
//         if(output[i].username === username_s ){
//                user_index =i;
//             for (j=0;j< output[i].cartproducts.length;j++){
//                 if (cartproducts[j]=== "sun"){
//                     found_item= true;
//                     break;
//                 }
//             }
            
//         }
//     }
//        if (found_item === true){
//         alert("this item is already in your cart");

//     }
//     else{
//          output[user_index].cartproducts.push("sun");
//     }
    
    
//     client.close();

// }
// var button_leaves = document.getElementById("cart_leaves" );
// button_leaves.onclick =  async function item_found_leaves(){
//     var {MongoClient} = require('mongodb');
//     var uri = "mongodb+srv://admin:Hackerzz@cluster0.yjlb4.mongodb.net/NetworksProject?retryWrites=true&w=majority"
//     var client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//     await client.connect();
//     var output = await client.db('NetworksProject').collection('UserInfo').find().toArray();
//     var found_item = false;
//     var username_s = sessionStorage.getItem(User_namesession);
//     var user_index;
//     for(i = 0; i < output.length; i++){
//         if(output[i].username === username_s ){
//                user_index =i;
//             for (j=0;j< output[i].cartproducts.length;j++){
//                 if (cartproducts[j]=== "leaves"){
//                     found_item= true;
//                     break;
//                 }
//             }
            
//         }
//     }
//        if (found_item === true){
//         alert("this item is already in your cart");

//     }
//     else{
//          output[user_index].cartproducts.push("leaves");
//     }
    
    
//     client.close();

// }

async function getelementscart(){ 
    var {MongoClient} = require('mongodb');
    var uri = "mongodb+srv://admin:Hackerzz@cluster0.yjlb4.mongodb.net/NetworksProject?retryWrites=true&w=majority"
    var client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    await client.connect();
    var output = await client.db('NetworksProject').collection('UserInfo').find().toArray();
    var username_s = sessionstorage.getItem('User_namesession');
    const cart_user=  [];
    for(i = 0; i < output.length; i++){
        if(output[i].username === username_s ){
               //user_index =i;
            for (j=0;j< output[i].cartproducts.length;j++){
                //cartproducts[j] =cart_user[j];
                cart_user[j] = output[i].cartproducts[j];
            }  
        }
    }
    // console.log(cart_user);
    // console.log(username_s);
    return cart_user;
    client.close();

}
