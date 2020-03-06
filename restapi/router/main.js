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

  //세번째 API: POST addUser/:username
  //body: { “password”: “_____”, “name”: “_____” }
};
