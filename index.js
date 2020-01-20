require('dotenv').config();
const server=require('./api/server');



const port = process.env.PORT || 2000;
server.listen(port,() =>{
    console.log(`\n *** Server Running on http://localhost:${port} ***/n`);
})