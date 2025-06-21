import History from "../models/history.model.js"

export const getHistory = async (req, res) => {
    try {

        const user = req.user

        console.log(user.email)

        const { limit, skip, sort } = req.query

        // console.log(limit)
        // console.log(skip)
        // console.log(sort)

        const historyList = await History.find({user: user._id}).populate({path: "weather", select: ["data.source", "data.tempC", "data.humidity", "data.description", "-_id"]}).select(["-_id", "-user", "-__v"])
        // 

        res.status(200).json(historyList)
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: error
        })
    }
}