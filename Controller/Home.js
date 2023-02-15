export const Home = async (req, res, next) => {
    try {
       res.send("book app")
    } catch (error) {
        next(error)
    }
}