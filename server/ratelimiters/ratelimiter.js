const ratelimit=require('express-rate-limit');

const generalLimiter=ratelimit({
    max:500,
    windowMs:60*60*1000,
    message:'Too many requests from this IP,try after one hour'
})

const authLimiter=ratelimit({
    max:10,
    windowMs:60*60*1000,
    message:'Too many requests from this IP,try after one hour'
})

module.exports={generalLimiter,authLimiter};