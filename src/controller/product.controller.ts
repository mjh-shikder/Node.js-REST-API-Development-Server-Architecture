import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProducts } from "../service/product.service";
import type { Iproduct } from "../types/product.type";
import { json } from "stream/consumers";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

//* Product Controller Function Start
export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;

  //console.log("Request", req);

  //? /products => /product/1 => ['', 'products', '1']

  const urlParts = url?.split("/");
  // console.log(urlParts);

  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;

  // console.log(id);

  //* Get All Products-------

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

    // res.writeHead(200, { "content-type": "application/json" });
    // res.end(
    //   JSON.stringify({
    //     message: "Products Retrived Successfully",
    //     data: products,
    //   }),
    // );

    //? Replacing Repeted code with sendResponse funtion and for safty using try catch
    //! make sure always returnt sendResponse function after calling
    try {
      const products = readProducts(); // [{},{},{}]

      return sendResponse(
        res,
        200,
        true,
        "Products Retrived Successfully",
        products,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something Went Wrong", error);
    }
  }

  //? Single product logic
  else if (method === "GET" && id !== null) {
    const allProducts = readProducts();
    const product = allProducts.find((p: Iproduct) => p.id === id);
    // console.log(product);

    //? Jodi Product ta Delete kore dewa hoy tahole ei "if" er condition ta show korbe
    if (!product) {
      //    res.writeHead(404, { "content-type": "application/json" });
      //    res.end(
      //      JSON.stringify({
      //        message: "Product Not Exist",
      //        data: null,
      //      }),
      //    );
      try {
        return sendResponse(res, 404, false, "Product Does Not Exist", null);
      } catch (error) {
        return sendResponse(res, 500, false, "Something Went Wrong", error);
      }
    }

    // res.writeHead(200, { "content-type": "application/json" });
    // res.end(JSON.stringify({
    //     message: "Single product retrived successfully",
    //     data: product
    // }))

    try {
      return sendResponse(
        //! make sure always returnt sendResponse function after calling
        res,
        200,
        true,
        "Single product retrived successfully",
        product,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something Went Wrong", error);
    }
  }

  //* POST Method ---------
  else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
    // console.log("Body", body);

    const products = readProducts(); // [{},{},{},{}]

    //? Create the new product
    const newProduct = {
      id: Date.now(),
      ...body,
    };

    //console.log(newProduct);

    products.push(newProduct); // [{},{},{},{new}]
    // console.log(products);

    insertProduct(products);

    // res.writeHead(200, { "content-type": "application/json" });
    // res.end(
    //   JSON.stringify({
    //     message: "Product Created Successfully",
    //     data: newProduct,
    //   }),
    //   );

    try {
      return sendResponse(
        res,
        200,
        true,
        "Product Created Successfully",
        newProduct,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something Went Wrong", error);
    }
  }

  //* PUT Method --------
  else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = readProducts();

    const index = products.findIndex((p: Iproduct) => p.id === id); // ei khane ami frontend e id dia e search dibo
    console.log(index);
    if (index < 0) {
      //   res.writeHead(404, { "content-type": "application/json" });
      //   res.end(
      //     JSON.stringify({
      //       message: "Product Not Found!",
      //       data: null,
      //     }),
      //       );

      try {
        return sendResponse(res, 404, false, "Product Not Found!", null);
      } catch (error) {
        return sendResponse(res, 500, false, "Something Went Wrong", error);
      }
    }

    // console.log(products[index]);

    products[index] = { id: products[index].id, ...body };

    insertProduct(products); // eita db.json file ta ke edit kore

    // res.writeHead(200, { "content-type": "application/json" });
    // res.end(
    //   JSON.stringify({
    //     message: "Product Updated Successfully",
    //     data: products[index],
    //   }),
    // );

    try {
      return sendResponse(
        res,
        200,
        true,
        "Product Updated Successfully",
        products[index],
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something Went Wrong", error);
    }
  }

  //* DELETE Method --------
  else if (method === "DELETE" && id !== null) {
    const products = readProducts();
    const index = products.findIndex((p: Iproduct) => p.id === id);

    if (index < 0) {
    //   res.writeHead(404, { "content-type": "application/json" });
    //   res.end(
    //     JSON.stringify({
    //       message: "Product Not Found!",
    //       data: null,
    //     }),
        //   );
        
                           try {
                             return sendResponse(
                               res,
                               404,
                               false,
                               "Product Not Found!",
                               null,
                             );
                           } catch (error) {
                             return sendResponse(
                               res,
                               500,
                               false,
                               "Something Went Wrong",
                               error,
                             );
                           }


    }

    products.splice(index, 1); // splice er pore first err value index, 2nd value kotya delete korte chao oitar poriman eikhane 1 ta

    insertProduct(products); // targeted id ta array theke delete korar porer ja thakbe oigula ke abar notun kore write korbe

    // res.writeHead(200, { "content-type": "application/json" });
    // res.end(
    //   JSON.stringify({
    //     message: "Product Deleted Successfully",
    //     data: products[index],
    //   }),
      // );
      
               try {
                 return sendResponse(
                   res,
                   200,
                   true,
                   "Product Deleted Successfully",
                   products[index],
                 );
               } catch (error) {
                 return sendResponse(
                   res,
                   500,
                   false,
                   "Something Went Wrong",
                   error,
                 );
               }

  }
};
