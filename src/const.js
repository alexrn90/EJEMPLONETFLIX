module.exports= {

    SECRET_KEY : process.env.SECRET_KEY || "F1ZIuSL+0nSu1jsjbSQ9lXHCens=",
    SECRET_KEY_STRIPE: process.env.SECRET_KEY || "sk_test_p4iszbvFvMtJQhsJhAnZXTOD",
    SUBSCRIPTIONS_TYPES:{
        "GOLD":"plan_E1B0OY20Nu8ayW",
        "PREMIUM":"plan_E1B2M7usLXycKs"
    },
    MONGO_URI:"mongodb://alex90:alex2908@ds121593.mlab.com:21593/pruebanetflix",
    TEST_MONGO_URI: "mongodb://alex90:alex2908@ds115664.mlab.com:15664/netflix-test"
}
