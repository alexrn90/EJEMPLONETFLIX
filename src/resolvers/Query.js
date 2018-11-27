const Movies= require("../schemas/Movies");
const Users= require("../schemas/Users");
const Subscriptions= require("../schemas/Subscriptions");


function prueba(_, args, context, info) {
    return "Esto es una prueba en graphql";
}

function movies(_, args, context, info){
    if(!context.user) throw new Error("Authentication is required")
    return Movies.find({}).then((movies)=>{
        console.log('movies: ', movies);
        return movies;
    }).catch((err)=>{
        throw err;
    })
}

function movie(_, args, context, info){
    if(!context.user) throw new Error("Authentication is required")
    return Movies.findById(args.id).then((movie)=>{
        return movie;
    }).catch((err)=>{
        throw err
    })
}

function me(_, args, context, info){
    if(!context.user) throw new Error("Authentication is required")
    return Users.findById(context.user._id)
            .populate("subscription_id")
            .then((user)=>{
                return user
            })
            .catch((err)=> {throw err;})
}

module.exports = {
    prueba,
    movies,
    movie,
    me
};