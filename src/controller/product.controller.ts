import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProducts } from "../service/product.service";
import type { Iproduct } from "../types/product.type";
import { json } from "stream/consumers";
import { parseBody } from "../utility/parseBody";

//* Product Controller Function Start
export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
    const method = req.method;
    
    //console.log("Request", req);
    

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


    else if (method === "POST" && url === '/products') {

        const body = await parseBody(req);
        // console.log("Body", body);
        
        const products = readProducts(); // [{},{},{},{}]

        //? Create the new product
        const newProduct = {
            id: Date.now(),
            ...body
        }
        
        //console.log(newProduct);

        
        products.push(newProduct) // [{},{},{},{new}]
       // console.log(products);
        
        insertProduct(products)
        

           res.writeHead(200, { "content-type": "application/json" });
           res.end(
             JSON.stringify({
               message: "Product Created Successfully",
               data: newProduct
             }),
           );

    }
};
