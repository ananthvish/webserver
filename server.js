const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
app.use((req,res,next) =>{
    var dateTime = new Date().toDateString();
    var log = `${dateTime} : ${req.method} : ${req.url}`;

    fs.appendFile('logs.log', log + '\n',(err)=>{
    if(err){
        console.log('Unable to write logs');
    }
    });
    next();
});

/*app.use((req,res,next)=>{
    res.render('maintanence.hbs');
})*/

app.use(express.static(__dirname + '/public'));


var hello = {
    name : 'Ananth',
    age : 25
};

app.get('/' ,(req,res) =>{
    //res.send('<h1>Hello World!</h1>');
    //res.send(JSON.stringify(hello,undefined,2));
    res.render('home.hbs',{
        title:'Home'
    });
});

app.get('/about',(req,res)=>{
    //res.send('About Express');
    res.render('about.hbs',{
        title : 'About'
    })
});

app.get('/bad' ,(req,res)=>{
    res.send({
        errorMessage : 'Error with this page'
    })
});

app.listen(port, ()=>{
    console.log(`Server is up and running on port : ${port}`);
});