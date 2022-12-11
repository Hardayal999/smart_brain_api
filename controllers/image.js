const Clarifai= require('clarifai');
const app = new Clarifai.App({
    apiKey: "cde4c79e660e406999583a47bff45972",
  });

const handleApiCall=(req,res)=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=>{
        res.json(data)
    })
    .catch(err=>res.status(404).json('unable to work with Api'))
}

const handlerImage=(req,res,db)=>{
    const {id}= req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0].entries)
    })
    .catch(err=>res.status(404).json('unable to get entries'))
}

module.exports={
    handlerImage:handlerImage,
    handleApiCall:handleApiCall
}