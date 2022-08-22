//  configprod.env - Production keys here
NODE_ENV = development
PORT = 5000

module.exports = {

    //  Google auth keys
    GOOGLE_CLIENT_ID : proccess.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET_KEY : process.env.GOOGLE_CLIENT_SECRET_KEY,


    //  Database
    MONGO_URI : process.env.MONGO_URI,
    // mongoURI_Local : process.env.MONGO_URI_LOCAL,


    //  cookieKeys
    COOKIE_KEY : process.env.COOKIE_KEY
}