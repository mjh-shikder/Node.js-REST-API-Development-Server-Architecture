import dontenv from "dotenv"
import path from "path"

dontenv.config({ path: path.resolve(process.cwd(), ".env") })

const config = {
    port: process.env.PORT,
    
}

export default config

//* export default mane ei file theke ei ekta e export hobe ar kono kisu export hobe na