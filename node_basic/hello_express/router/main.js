/*
express에서 라우팅이라는 개념은 
클라이언트로부터 요청받은 URL과 뷰를 매칭시키는 것이라고 할 수 있습니다. 
라우팅이라는 사전적인 의미 그대로 특정한 URL에 대해 특정한 뷰로 연결하는 역할입니다. 
*/
module.exports = function(app) // module.exports는 이후 server.js에서 모듈로 쓰기 위해 필요.
{
  app.get('/',function(req,res){
    res.render('index.html');
  });
  app.get('/about',function(req,res){
    res.render('about.html');
  });
}
