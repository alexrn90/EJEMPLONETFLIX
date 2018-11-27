const {GraphQLServer} = require('graphql-yoga');
const Query  = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const mongoose= require('mongoose');
const verifyToken= require('./utils/verifyToken');
const {importSchema}= require('graphql-import');
const {makeExecutableSchema}=require('graphql-tools')
const typeDefs= importSchema('./src/schema.graphql');

//mongoose.connect('mongodb://alex90:alex2908@ds121593.mlab.com:21593/pruebanetflix',{useNewUrlParser:true})
const mongoUri= process.env.NODE_ENV=== "test"? TEST_MONGO_URI: MONGO_URI

mongoose.connect(mongoUri,{
    useNewUrlParser: true
});

const db = mongoose.connection

db.on('error',
    (err)  => console.log("failed to conect to mongo: ", err))
    .once('open',() => console.log("Conected to database"));

const resolvers = {
    Query,
    Mutation
}

const schema= makeExecutableSchema({
    typeDefs,
    resolvers,
});

const server = new GraphQLServer({
    schema,
    context: async context => ({
        ...context,
        user: await verifyToken(context)
    })
});

const options = {
    port: process.env.PORT || 8000,
    endpoint: '/graphql',
    playground: '/playground',
    cors:{
        credentials: true,
        origin: ["http://localhost:3000"]
    }
};

server.start(options,
  ({port}) => {
      console.log('Start in port ' + port);
  });

  module.exports= {schema}