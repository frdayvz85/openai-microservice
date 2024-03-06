import { rateLimit } from 'express-rate-limit'
import environment from '../config/environment';

const limiter = rateLimit({
	windowMs: 30 * 60 * 1000, // 30 minutes
	limit: environment.apiRateLimit, // Limit each IP to 5 requests per `window` (here, per 30 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	message: 'Too many requests video generate from this IP, please try again later'
})

export default limiter;