import type { IncomingMessage, ServerResponse } from "http";
import { readProducts } from "../service/product.service";
import type { Iproduct } from "../types/product.type";
import { json } from "stream/consumers";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
    const method = req.method;
    

    //? /products => /product/1 => ['', 'products', '1']


    const urlParts = url?.split("/")
   // console.log(urlParts);
    
    const id = urlParts && urlParts[1] === 'products' ? Number(urlParts[2]) : null; 
    
   // console.log(id);
    

    //? Get All Products
    if (url === "/products" && method === "GET") {
      

        // const products = [
        //     {
        //     id: 1,
        //         name: "product 1"
        //     },
        //     {
        //     id: 2,
        //         name: "product 2"
        //     } 
        // ]
           
        
        const products = readProducts(); // [{},{},{}]

    res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({
          message: "Products Retrived Successfully",
        data: products
    }));
    }
    //? Single product logic
    else if (method === "GET" && id !== null) {
        const allProducts = readProducts();
        const product = allProducts.find((p: Iproduct) => p.id === id)
        // console.log(product);
        
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "Single product retrived successfully",
            data:product
        }))
    }
};
