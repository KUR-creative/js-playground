/*
  express에서 라우팅이라는 개념은 
  클라이언트로부터 요청받은 URL과 뷰를 매칭시키는 것이라고 할 수 있습니다. 
  라우팅이라는 사전적인 의미 그대로 특정한 URL에 대해 특정한 뷰로 연결하는 역할입니다. 
*/
module.exports = function(app, fs) // module.exports는 이후 server.js에서 모듈로 쓰기 위해 필요.
{
  app.get('/',function(req,res){
    res.render('index', {
      // JSON 데이터를 render 메소드의 두번째 인자로 전달함으로서
      // 페이지에서 데이터를 사용가능하게됩니다.
      title: "MY HOMEPAGE",
      length: 5
    });
  });
};
