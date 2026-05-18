import type { IncomingMessage, ServerResponse } from "http";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

    if (url === "/products" && method === "GET") {
      

        const products = [
            {
            id: 1,
                name: "product 1"
            },
            {
            id: 2,
                name: "product 2"
            } 
        ]
           
        


    res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({
          message: "Products Retrived Successfully",
        data: products
    }));
  }
};
