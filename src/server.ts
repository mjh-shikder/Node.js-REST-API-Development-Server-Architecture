import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routeHandler } from "./routes/route";
import config from "./config";


const server: Server = createServer((req: IncomingMessage, res: ServerResponse) => {

    routeHandler(req, res)

})

server.listen(config.port, () => {
    console.log(`server is Running on Port: ${config.port}`); //* eita kintu browser e consol hobe na eita Terminal e asbe
    
})