//  configprod.env - Production keys here
NODE_ENV = development
PORT = 5000

module.exports = {

    //  Google auth keys
    clientID : proccess.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET_KEY,


    //  Database
    mongoURI : process.env.MONGO_URI,
    // mongoURI_Local : process.env.MONGO_URI_LOCAL,


    //  cookieKeys
    cookieKey : process.env.COOKIE_KEY
}