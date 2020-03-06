/*
var http = require('http');
var fs = require('fs');
var url = require('url');
 
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    var pathname = url.parse(_url, true).pathname;
    
    console.log(pathname);
    if(pathname === '/'){
	fs.readFile(`data/${title}`, 'utf8', function(err, description){
	    if(queryData.id === undefined){
		title = "Welcome";
		description = "Hell o";
	    }
	    var template = `
	    <!doctype html>
	    <html>
	    <head>
		<title>WEB1 - ${title}</title>
		<meta charset="utf-8">
	    </head>
	    <body>
		<h1><a href="/">WEB</a></h1>
		<ul>
		<li><a href="/?id=HTML">HTML</a></li>
		<li><a href="/?id=CSS">CSS</a></li>
		<li><a href="/?id=JavaScript">JavaScript</a></li>
		</ul>
		<h2>${title}</h2>
		<p>${description}</p>
	    </body>
	    </html>
	    `;
	    response.writeHead(200); // 200 means success
	    response.end(template);
	});
    }else{
	response.writeHead(404); // 404 means not found
	response.end("Not found");
    }
 
 
});
app.listen(3000);
*/

var http = require('http');
var fs = require('fs');
var url = require('url');
const qs = require('querystring');
 
function templateHTML(title, list, body){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">bbab</a></h1>
    ${list}
    <a href="/create"> create<a/>
    ${body}
  </body>
  </html>
  `;
}
function templateList(filelist){
  var list = '<ul>';
  var i = 0;
  while(i < filelist.length){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list+'</ul>';
  return list;
}
 
// createServer의 콜백함수는 요청이 들어올 때마다 노드 js에 의해 호출된다.
// 그 때 request는 요청할 때 웹브라우저가 보낸 정보
//      response는 응답할 때 우리가 웹브라우저에게 전송할 정보
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    console.log(pathname);
    if(pathname === '/'){ // go to home?
      if(queryData.id === undefined){
        fs.readdir('./data', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          var list = templateList(filelist);
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
          response.writeHead(200);
          response.end(template);
        });
      } else {
        fs.readdir('./data', function(error, filelist){
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
            var title = queryData.id;
            var list = templateList(filelist);
            var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
            response.writeHead(200);
            response.end(template);
          });
        });
      }
    } else if(pathname === "/create") {
        fs.readdir('./data', function(error, filelist){
          var title = 'WEB - create';
          var list = templateList(filelist);
          var template = templateHTML(
              title, list,`
		<form action="http://localhost:3000/create_process"
		    method="post">
		<p>
		    <input type="text" name="title" placeholder="title">
		</p>

		<p>
		    <textarea name="description" placeholder="description"> </textarea>
		</p>

		<p>
		    <input type="submit"/>
		</p>
		</form>
          `);
          response.writeHead(200);
          response.end(template);
        });
    } else if(pathname === "/create_process") {
      // post로 가져온 녀석을 어떻게 가져오는가?
        var body = "";
        request.on("data", (data) => {
            // post 데이터는 매우 클 수 있기 때문에
            // data 조각 조각을 받을 때마다 이 data의 콜백 함수를 호출한다.
            // data의 인자로 정보가 들어온다.
            console.log("dat");
            console.log(data);
            body = body + data;
        });
        request.on("end", () => { // 이런 data, end를 이벤트라고 한다.
            // 더이상 들어올 정보가 없으면
            // end의 콜백 함수가 호출됨.
            // 정보 수신이 끝난 것.
            var post = qs.parse(body); // - qs를 통해 데이터를 객체로 만든다.
            const title = post.title;
            const description = post.description;
            console.log(post);
            fs.writeFile(`data/${title}`, description, "utf8", (err) => {
                // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`
                response.writeHead(
		    // redirection: 어떤 처리를 끝내고, 사용자를 다른 페이지로 가게 하는 것.
                    // 302: 이렇게 (일시적으로 - 영구히가 아니라) 리디렉션 한다는 뜻
                    302, {Location: `/?id=${title}`}
                );
                response.end("ppap");
            });

                         
        });
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
