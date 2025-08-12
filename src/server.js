
require('dotenv').config();
const app = require("./app");
const logger = require("../src/config/logger");
const PORT  =  process.env.PORT || 3000;

const  startServer = async ()=>{
    try {
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
          });
    }
    catch (error){
       logger.error("Server error",error);
       process.exit();
    }
} 

startServer();