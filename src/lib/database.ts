import mongoose from "mongoose"

export const connectDB = async () => {
    mongoose.set('strictQuery', true)

    try {
        if (mongoose.connections[0].readyState) {
            console.log("MongoDB is running")
            return true
        }

        await mongoose.connect(process.env.MONGODB_URI as string)

        console.log("MongoDB Connected")
    } catch (err) {
        console.log(err)
    }
}