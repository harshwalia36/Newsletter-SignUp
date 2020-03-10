const express=require('express');
const bodyParser=require('body-parser');
const request=require('request');

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get('/',function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){

var fname=req.body.firstname;      //getting details from the form
var lname=req.body.lastname;
var email=req.body.email;

var data={
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:lname
      }
    }
  ]
};
var jsonData=JSON.stringify(data); //wehave to convert this J.S object into JSON format According to documentation

var options = {                                      //list-id
    url:"https://us3.api.mailchimp.com/3.0/lists/c858c1df4e",
    method:"POST",
    headers:{
      "Authorization":"harsh 3b8b93e5b87d3ee128d61b1c7f022446-us3 "
    },
    body: jsonData
  };
request(options,function(error,response,body){      //we are making request to mailchimp servers to post our data
if(error){
  res.sendFile(__dirname+"/failue.html");
}
else if(response.statusCode==200){
  res.sendFile(__dirname+"/success.html");
}
else{
  res.sendFile(__dirname+"/failue.html");
}

});

});
app.post("/failue.html",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT||3000,function(){
  console.log("server is running on port 3000");
});


// 3b8b93e5b87d3ee128d61b1c7f022446-us3   //api key . So, that any peson can't post or remove or Add our subscribers

// c858c1df4e    //list-id   to identify our list by mailchimp servers
