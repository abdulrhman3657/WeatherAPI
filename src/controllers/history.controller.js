import History from "../models/history.model.js"

export const getHistory = async (req, res) => {
    try {

        const user = req.user

        console.log(user.email)

        const { skip, limit, sort, from, to, lat, lon, count } = req.query

        if(count){
            const historyList = await History.find({user: user._id})
            res.status(200).json({total: historyList.length})
            return
        }

        // const historyList = await History
        //     .find({user: user._id})
        //     .populate({path: "weather", select: ["data.source", "data.tempC", "data.humidity", "data.description", "-_id"]})
        //     .select(["-_id", "-user", "-__v"])
        //     .limit(limit)
        //     .sort(sort)

            const historyList = await History.aggregate(
                [
                    {
                        $match: { 
                            lat: lat ? Number(lat) : {$gte: 0},
                            lon: lon ? Number(lon) : {$gte: 0},
                            user: user._id
                        },
                    },
                    { $limit: limit ? Number(limit) : 100 },
                    { $sort: {_id: 1} },
                    {
                        $lookup: {
                            from: "weathers",
                            localField: "weather",
                            foreignField: "_id",
                            as: "weather",
                            pipeline: [{ $project: { _id: 0, lat: 0, lon: 0, fetchedAt: 0, __v: 0} }],
                        },
                    },
                    {
                        $project: {
                            "weather": 1,
                            "lat": 1,
                            "lon": 1,
                            "requestedAt": 1,
                            "_id": 0,
                        }
                    }


                ]
            )

        res.status(200).json(historyList)
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: error
        })
    }
}