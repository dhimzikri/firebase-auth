const router = require("express").Router();
const { async } = require("@firebase/util");
const admin = require("firebase-admin");


//token validation /api/user/loginValidate
router.get("/loginvalidate", async (req, res) => {
    if(!req.headers.authorization){
        return res.status(500).send({msg: "invalid token"})
    }

    const token = req.headers.authorization.split(" ")[1];
    // res.send(token);
    try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if(!decodeValue){
            return res.status(500).send({ msg: "Unauthorized Access"})
        }else{
            return res.status(200).send({success : true, data: decodeValue})
        }
    } catch (error) {
        return res.status(500).send({ msg: `Error : ${error}` })
    }
})

module.exports = router;