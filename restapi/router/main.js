/*
  express에서 라우팅이라는 개념은 
  클라이언트로부터 요청받은 URL과 뷰를 매칭시키는 것이라고 할 수 있습니다. 
  라우팅이라는 사전적인 의미 그대로 특정한 URL에 대해 특정한 뷰로 연결하는 역할입니다. 
*/
module.exports = function(app, fs) // module.exports는 이후 server.js에서 모듈로 쓰기 위해 필요.
{
  app.get('/',function(req,res){
    res.render('index', {
      title: "MY HOMEPAGE",
      length: 5
    });
  });
  
  // 첫번째 API: GET /list
  // 모든 유저 리스트를 출력하는 GET API 를 작성해보겠습니다. 
  app.get('/list', function (req, res) {
    fs.readFile( __dirname + "/../data/" + "user.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
    });
  });

  // 두번째 API:  GET /getUser/:username
  app.get('/getUser/:username', function(req, res){
    fs.readFile( __dirname + "/../data/user.json", 'utf8', function (err, data) {
      var users = JSON.parse(data);
      res.json(users[req.params.username]);
    });
  });

  // 세번째 API: POST addUser/:username
  // body: { “password”: “_____”, “name”: “_____” }
  // postman에서 테스트할 때, 다음은 됨
  //  http://localhost:3000/addUser/a    {"password": "bbab", "name": "NAME"}
  //  http://localhost:3000/addUser/ppap {"password": "bbab", "name": "NAME"}
  //  보니까 addUser 뒤에 붙는 이름이 달라지면 duplicate가 일어나지 않음. body가 같아도.. 왜?
  // 근데 다음은 안 됨. 왜?
  //  http://localhost:3000/addUser      {"password": "bbab", "name": "NAME"}
  //  http://localhost:3000/addUser/     {"password": "bbab", "name": "NAME"}
  app.post('/addUser/:username', function(req, res){
    var result = {  };
    var username = req.params.username;

    // CHECK REQ VALIDITY
    if(!req.body["password"] || !req.body["name"]){
      result["success"] = 0;
      result["error"] = "invalid request";
      res.json(result);
      return;
    }

    // LOAD DATA & CHECK DUPLICATION
    fs.readFile( __dirname + "/../data/user.json", 'utf8', function(err, data){
      var users = JSON.parse(data);
      if(users[username]){
	// DUPLICATION FOUND
	result["success"] = 0;
	result["error"] = "duplicate";
	res.json(result);
	return;
      }

      // ADD TO DATA
      users[username] = req.body;

      // SAVE DATA
      fs.writeFile(
	__dirname + "/../data/user.json",
	JSON.stringify(users, null, '\t'), "utf8", function(err, data){
          // stringify to pretty print json
	  result = {"success": 1};
	  res.json(result);
	});
    });
  });

  // 네번째 API: PUT updateUser/:username
  // body: { “password”: “_____”, “name”: “_____” }
  app.put('/updateUser/:username', function(req, res){
    var result = {  };
    var username = req.params.username;

    // CHECK REQ VALIDITY
    if(!req.body["password"] || !req.body["name"]){
      result["success"] = 0;
      result["error"] = "invalid request";
      res.json(result);
      return;
    }

    // LOAD DATA
    fs.readFile( __dirname + "/../data/user.json", 'utf8',  function(err, data){
      var users = JSON.parse(data);
      // ADD/MODIFY DATA
      users[username] = req.body;

      // SAVE DATA
      fs.writeFile(
	__dirname + "/../data/user.json",
	JSON.stringify(users, null, '\t'), "utf8", function(err, data){
	  result = {"success": 1};
	  res.json(result);
	});
    });
  });


  app.delete('/deleteUser/:username', function(req, res){
    var result = { };
    //LOAD DATA
    fs.readFile(__dirname + "/../data/user.json", "utf8", function(err, data){
      var users = JSON.parse(data);

      // IF NOT FOUND
      if(!users[req.params.username]){
	result["success"] = 0;
	result["error"] = "not found";
	res.json(result);
	return;
      }

      // DELETE FROM DATA
      delete users[req.params.username];

      // SAVE FILE
      fs.writeFile(
	__dirname + "/../data/user.json",
	JSON.stringify(users, null, '\t'), "utf8", function(err, data){
	  result["success"] = 1;
	  res.json(result);
	  return;
	});
    });

  });
};
