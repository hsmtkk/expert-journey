import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://hk0316:olzyWvr73DcZNgHM@cluster0.8dm3jqk.mongodb.net/?retryWrites=true&w=majority")
        console.log("Success: connected to MongoDB")
    } catch (err) {
        console.log("Failure: could not connect to MongoDB")
        console.log(err)
        throw new Error()
    }
}