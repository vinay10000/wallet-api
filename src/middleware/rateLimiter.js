import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try{
        // Try to get user_id from params first, then from body
        let user_id = req.params.user_id || req.body.user_id;
        
        // If no user_id is found, skip rate limiting for this request
        if (!user_id) {
            console.log("No user_id found, skipping rate limiting");
            return next();
        }
        
        const { success } = await rateLimit.limit(user_id);
        if(!success){
            return res.status(429).json({message: "Too many requests, please try again later"});
        }
        next();
    }
    catch(e){
        console.log("Err in rate limiter", e);
        next(e);
    }
}

export default rateLimiter;
