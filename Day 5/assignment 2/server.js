const http = require("http");

const server = http.createServer((req, res) => {
  //    home
  if (req.url === "/") {
    
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Home");
  } //   about
  else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About");
  }
  //   contact
  else if (req.url === "/contact") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Contact");
  }
  //   error page
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page Not Found");
    // res.end();
  }
});
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
