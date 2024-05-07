import db from "@/app/db";
import { redirect } from 'next/navigation'

export const config = {
    api: {
      externalResolver: true,
    },
  }
  

export default function handler(req, res) {
    if (req.method === "POST"){
        let { body } = req
        // body = JSON.parse(body)
        db.authUser(body.username,body.password,(user)=>{
            console.log(-1)
            if(user.length > 0){
                console.log(user)
                res.json({key:user[0].sshkey, status:200 })
            } else {
                res.json({ status:404 })
            }
        })

    }
}                           