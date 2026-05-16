import { createServer, IncomingMessage, Server, ServerResponse } from "http";


const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {
   // console.log(req.url); //? url ki ki hote pare >>> '/', '/user', '/products'
   // console.log(req.method); //? method hote pare >>> GET, POST, DELETE, PATCH, PUT
    
    const url = req.url
    const method = req.method

    if (url === '/' && method === 'GET') {
       // console.log("This is Root Route");
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "This is Root Route" }));
        

    } else if (url?.startsWith('/products')) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "This is Products Route" }));


    } else {
         res.writeHead(404, { "content-type": "text/plain" });
           res.end(JSON.stringify({ message: "Route Not Found" }));
    }
    


})

server.listen(5000, () => {
    console.log("server is running on port: 5000");
    
})