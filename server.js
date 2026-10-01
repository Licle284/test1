const http = require("node:http");
const path = require("node:path");
const { readFile } = require("node:fs/promises");

const host = "0.0.0.0";
const port = Number(process.env.PORT) || 3000;
const publicFiles = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/index.html", ["index.html", "text/html; charset=utf-8"]],
  ["/style.css", ["style.css", "text/css; charset=utf-8"]],
  ["/script.js", ["script.js", "text/javascript; charset=utf-8"]],
]);

const server = http.createServer(async (request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
  const requestedFile = publicFiles.get(pathname);

  if (!requestedFile) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  try {
    const [filename, contentType] = requestedFile;
    const body = await readFile(path.join(__dirname, filename));
    response.writeHead(200, { "Content-Type": contentType });
    response.end(body);
  } catch (error) {
    console.error(error);
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Server error");
  }
});

server.listen(port, host, () => {
  console.log(`Hello button is available at http://localhost:${port}`);
});
