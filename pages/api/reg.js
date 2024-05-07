import db from "@/app/db";
import crt from "crypto";   

export default function handler(req, res) {
    if (req.method === "POST"){
        let { body } = req
        console.log(body)
        // body = JSON.parse(body)
        let key = crt.randomBytes(32).toString("hex")
        db.addUser(body.username,body.password,key)
        console.log(key)
        res.json({data: {key:key}})
    }
}