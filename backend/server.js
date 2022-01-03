const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
//setting up config file
dotenv.config({path:'backend/config/config.env'})

//connecting to database
connectDatabase()

app.listen(process.env.PORT, ()=>{
    console.log(`App started on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})