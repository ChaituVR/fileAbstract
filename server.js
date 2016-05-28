var express = require('express');
var app = express();
var fs = require('fs');
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

app.post('/file_upload', upload.single('Image'), function (req, res, next) {
  console.log(req.file);
 
     
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<p>Image Size:'+req.file.size+'</p><br>');
  res.write('<p>Mime-type:'+req.file.mimetype+'</p><br>');
  res.write('<p>Original-name:'+req.file.originalname+'</p><br>');
  res.write('Uploaded File  : <br><div id="imageHolder"><img src="/image/'+req.file.filename+'"');
  res.end('"/><div>');
  
   
})

app.get('/image/:name',function(req,res){
  
  var img = fs.readFileSync(__dirname + '/uploads/'+req.params.name);
   res.writeHead(200, {'Content-Type': 'image/jpeg'});
  res.end(img,'binary');
});



app.get("/home", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 8080, process.env.IP, function() {
    console.log('Your App is running on port ' + process.env.PORT + ' !! !! ');
});