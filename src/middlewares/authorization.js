import { db } from "../app";

export default async function validateToken(req, res, next){
  
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if(!token){
        return res.status(401).send(`Não autorizado!`)
    }
    try{
        const verificaToken = await db
      .collection("sessions")
      .findOne({ token: token });
    if (!verificaToken) return res.status(401).send("Usuario não está logado");
        res.locals.user = user.rows[0] 
        next()
      
    }catch(err){
        res.status(500).send(err.message)
    }
}