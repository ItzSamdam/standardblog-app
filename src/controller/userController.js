
const userModel = require('../model/user')
const {StatusCodes} = require('http-status-codes')
const {validateUser, jwtSignToken} = require('../utilities/helper')

const signup = async (req, res, next) => {
    const {
        firstname, lastname,
        password, email
    } = req.body

    try {
        let userExist = await userModel.findOne({email: email})
        if (userExist) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: false,
                message: "This user already exist"
            })
        }

        const user = await userModel.create({
            firstname,
            lastname,
            password,
            email
        })
        res.status(StatusCodes.ACCEPTED).json({
            status: true,
            message: "User created successfully",
            data: user
        })
    } catch (error) {
        next(error)
    }
}

const login = async(req, res, next) => {
    const {email, password} = req.body

    try {
        const user = validateUser(email, password)
        if (!user){
            return res.status(StatusCodes.UNAUTHORIZED).json("Email or Password does not exist")
        }
        const body = {_id: user._id, email: user.email}
        const token = jwtSignToken(body)
        res.status(StatusCodes.OK).json({
            status: true,
            message: "Login successful",
            token
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    signup,
    login
}
