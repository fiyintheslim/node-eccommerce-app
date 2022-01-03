const mongoose = require('mongoose');

const connectDatabase = () =>{
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useUnifiedTopology:true,
        useNewUrlParser: true,
    })
    .then((res)=>{
        console.log(`Database connnected with HOST: ${res.connection.host}`)
    })
}

module.exports = connectDatabase