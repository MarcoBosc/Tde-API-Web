import mongoose from "mongoose";

const URI = 'mongodb+srv://marcobbrl:atpamzsOS61c2jHB@cluster0.4tmkwjw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
            

const databaseConnection = async () => {
    if (!global.mongoose) {
        mongoose.set("strictQuery", false)
        global.mongoose = await mongoose.connect(URI)
        .then(()=>console.log('connected to mongodb'))
        .catch(e=>console.log(e));
    }
}

export default databaseConnection