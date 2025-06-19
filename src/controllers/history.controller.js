export const getHistory = async (req, res) => {
    try {


        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: error
        })
    }
}