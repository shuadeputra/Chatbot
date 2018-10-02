var express = require('express');
var bodyParser = require('body-parser')
var app = express();

// include ini untuk bisa menampilkan semua file foto di public
app.use(express.static(__dirname));
///////////////////////////////////////////////////////////////

// untuk include cors (semua orang bisa akses)
var cors = require('cors')
app.use(cors());

// boddy parser yang kita terima berbentuk jason dari react jadi harus di include
app.use(bodyParser.json());

var MY_TOKEN = "E5MI7OB6KWUGMMDPPSU4PX424HN6KFWS"
const {Wit, log} = require('node-wit');

app.post('/test', function (req, res) {

  var id = req.body.id
  // console.log(id)
  const client = new Wit({accessToken: 'E5MI7OB6KWUGMMDPPSU4PX424HN6KFWS'});
  client.message(id, {})
  .then((data) => {
    // console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
      res.send(data)
  })
  .catch(console.error);
})

app.listen(3001);
