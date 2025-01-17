import express from 'express';
import { shortenUrl, getOriginalUrl, redirectToLongUrl } from "../controllers/url-controller.js";

const router = express.Router();

router.post('/shorten', shortenUrl);
router.get('/original/:shortUrlId', getOriginalUrl);
router.get('/redirect/:shortUrlId', redirectToLongUrl);

export default router;