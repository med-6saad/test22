const PORT=4000;
const express=require('express');
const {ApolloServer}=require('apollo-server-express');
const mongoose=require('mongoose');
const URL="mongodb://localhost:27017/uploadProduct"
const cors=require('cors')
const multer=require('multer')
const body_parser=require('body-parser')
const path=require('path')
mongoose.connect(URL).then(()=>{
    console.log('data base connected...')
})
const typeDefs=require('./typeDefs');
const resolvers=require('./resolvers');

async function startServer(){
    const app=express();
    app.use('/images',express.static(path.join(__dirname,'public/images')))
    app.use(cors())
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'public/images')
        },
        filename:(req,file,cb)=>{
            cb(null,req.body.name)
        }
    })
    const upload=multer({storage:storage});
    app.post('/server/upload',upload.single('file'),(req,res,next)=>{
        try{
            return res.status(200).json('file uploaded successfuly.')
        }catch(err){
            return res.status(500).json(err)
        }
    })

    const server=new ApolloServer({
        typeDefs,
        resolvers
    })
    await server.start();
    server.applyMiddleware({app})
    app.listen(PORT,()=>{
        console.log('server runing in port '+PORT)
        console.log('apollo server runing in port '+server.graphqlPath);
    })
}

startServer();