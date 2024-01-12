import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const mongoUser = process.env.MONGO_USER
        const mongoPassword = process.env.MONGO_PASSWORD
        const mongoURL = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.8dm3jqk.mongodb.net/?retryWrites=true&w=majority`
        await mongoose.connect(mongoURL)
        console.log("Success: connected to MongoDB")
    } catch (err) {
        console.log("Failure: could not connect to MongoDB")
        console.log(err)
        throw new Error()
    }
}