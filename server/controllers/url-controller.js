import redisClient from "../config/redis.js";
import { encodeBase62 } from "../services/base_62_encoding_services.js";
import dotenv from 'dotenv';
dotenv.config();


export const shortenUrl = async(req, res) => {
    const { originalUrl } = req.body;

    try {
        if(!originalUrl){
            return res.status(400).json({
                success: false,
                message: "Invalid request. Please provide a valid URL."
            })
        }

        // Generate a unique ID and encode it
        const id = await redisClient.incr("global_counter");
        const shortUrlId = encodeBase62(id);

        // Store the original URL with the generated key
        await redisClient.hSet("urls", shortUrlId, originalUrl);

        // Construct the shortened URL
        const shortenedUrl = `${process.env.SHORTENED_BASE_URL}${shortUrlId}`;

        return res.status(201).json({
            success : true,
            message : "Url shortened successfully",
            data: { shortenedUrl },
        });
    } catch (error) {
        console.error("Error shortening URL:", error);
        return res.status(500).json({
            success : false,
            message : "Internal server error. Failed to shorten the URL.",
            error: error.message,
        })
    }
}

//get a long url from short url
export const getOriginalUrl = async(req, res) => {    
    try {
        const { shortUrlId } = req.params;

        // Validate the short URL ID
        if(!shortUrlId){
            return res.status(400).json({
                success: false,
                message: "Invalid request. Please provide a valid short URL ID.",
            });
        }

        // Retrieve the original URL from Redis
        const originalUrl = await redisClient.hGet("urls", shortUrlId);

        // Check if the short URL ID exists in Redis
        if(!originalUrl){
            return res.status(404).json({
                success: false,
                message: "Short URL not found. Please check the provided ID.",
            });
        }

       // Respond with the original URL
       return res.status(200).json({
            success: true,
            message: "Original URL retrieved successfully.",
            data: { originalUrl },
        });
    } catch (error) {
        
        console.error("Error retrieving original URL:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error. Failed to retrieve the original URL.",
            error: error.message,
        });        
    }
}

// redirect to original url
export const redirectToLongUrl = async(req, res) => {
    try {
        const { shortUrlId } = req.params;

        // Validate the short URL ID
        if(!shortUrlId){
            return res.status(400).json({
                success: false,
                message: "Invalid request. Please provide a valid short URL ID.",
            });
        }

        const originalUrl = await redisClient.hGet("urls", shortUrlId);

        // Check if the short URL ID exists
        if (!originalUrl) {
            return res.status(404).json({
                success: false,
                message: "Short URL not found.",
            });
        }

        //redirect to original url
        return res.redirect(302, originalUrl);
    } catch (error) {
        console.error("Error during redirection:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error. Failed to redirect.",
            error: error.message,
        });        
    }
}