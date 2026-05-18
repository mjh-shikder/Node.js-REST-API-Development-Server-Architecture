import path from "path";
import fs from "fs"
import { json } from "stream/consumers";

const filePath = path.join(process.cwd(), "./src/database/db.json");

export const readProducts = () => {
  // console.log(process.cwd());
    // console.log(filePath);
    
    const products = fs.readFileSync(filePath,'utf-8');
   // console.log(products);
    return JSON.parse(products)
};
