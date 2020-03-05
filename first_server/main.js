var http = require('http');
var fs = require('fs');
const url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    const queryData = url.parse(_url, true).query;
    var title = queryData.id;

    //console.log(queryData);
    if(_url == '/'){
        title = "Welcome";
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    console.log(__dirname + _url);
    //response.end(fs.readFileSync(__dirname + url));
    const template = `
    <!doctype html>
    <html>
    <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
    </head>
    <body>
    <h1><a href="/">WEB</a></h1>
    <ol>
	<li><a href="/?id=HTML">HTML</a></li>
	<li><a href="/?id=CSS">CSS</a></li>
	<li><a href="/?id=JavaScript">JavaScript</a></li>
    </ol>
    <h2>${title}</h2>
    <p><a href="https://www.w3.org/TR/html5/" target="_blank" title="html5 speicification">Hypertext Markup Language (HTML)</a> is the standard markup language for <strong>creating <u>web</u> pages</strong> and web applications.Web browsers receive HTML documents from a web server or from local storage and render them into multimedia web pages. HTML describes the structure of a web page semantically and originally included cues for the appearance of the document.
    <img src="coding.jpg" width="100%">
    </p><p style="margin-top:45px;">HTML elements are the building blocks of HTML pages. With HTML constructs, images and other objects, such as interactive forms, may be embedded into the rendered page. It provides a means to create structured documents by denoting structural semantics for text such as headings, paragraphs, lists, links, quotes and other items. HTML elements are delineated by tags, written using angle brackets.
    </p>
    </body>
    </html>
    `;
    response.end(template);
 
});
app.listen(3000); // <-- port 3000으로 
//app.listen(80); // <-- well-knwon port, 뚫으려면 sudo가 필요함.

// URL
//  http://opentutorials.org:3000/main?id=HTML&page=12
//   ^     ^~~host(domain)~~ port path^~~~~~~~~~~~~~~ query string
// protocol: 어떻게 통신할 것인가?
// domain(host): 인터넷에 접속된 컴퓨터의 주소
// port: host에 서버가 여러개일 때 포트에 연결된 서버와 통신하게 됨
// path: host에서의 파일 경로
// query string: 웹서버에게 데이터를 줄 수 있다
//  - 이를 통해 동적으로 생성한 데이터를 서버에서 클라로 줄 수 있다.

/*
  CRUD
    Create
    Read  
    Update
    Delete
*/
