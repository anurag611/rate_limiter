let requestQueue = [];
let lastCallTime = 0;
const maxCalls = 15;
const period = 60 * 1000; // 1 minute
const penaltyTime = 60 * 1000; // 1 minute penalty

const customRateLimiter = (req, res, next) => {
    const currentTime = Date.now();
    requestQueue = requestQueue.filter(time => time > currentTime - period);

    if (requestQueue.length < maxCalls) {
        requestQueue.push(currentTime);
        lastCallTime = currentTime;
        next();
    } else {
        const timeSinceLastCall = currentTime - lastCallTime;
        if (timeSinceLastCall < period) {
            console.log(`Rate limit exceeded. Applying penalty of ${penaltyTime / 1000} seconds.`);
            res.status(429).send(`
                <script>
                    alert('Too many requests, please try again later.');
                    window.location.href = '/retry'; // Redirect after alert
                </script>
            `);
            setTimeout(() => {
                requestQueue = [];
            }, penaltyTime);
        } else {
            requestQueue.push(currentTime);
            lastCallTime = currentTime;
            next();
        }
    }
};

export default customRateLimiter;
