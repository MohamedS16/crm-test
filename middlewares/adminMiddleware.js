let decodeJWT = require('./../utilities/decodeJWT.js')
let responseMsg = require('./../utilities/responseMsgs.js')

let checkAdmin = async(req,res,next)=>{
    try{
        let token = await req.cookies.jwt
        if(!token){
            throw("Please Login - No Token Provided")
        }else{
            let checkToken = await decodeJWT(token)
        console.log(checkToken)
        if(!checkToken){
            throw("Invalid Token")
        }else{
            if(checkToken.role != '1a'){
                throw("You Are Not Allowed Here")
            }else{
                next()
            }
        }
        }
    }catch(er){
        console.log(er)
        res.status(400).json({
            status : responseMsg.FAIL,
            data : er
        })
    }
}


module.exports = checkAdmin