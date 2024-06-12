import express from 'express';
import customRateLimiter from './limiter.js';

const app = express();
const PORT = process.env.PORT || 3000;

const callMe = (input) => {
    return `Processed ${input}`;
};

app.use(customRateLimiter);

app.get('/api', (req, res) => {
    const data = req.query.input || 'default';
    res.json({ result: callMe(data) });
});

app.get('/retry', (req, res) => {
    res.send(`
        <h1>Retry</h1>
        <p>Click <a href="/api?input=retry">here</a> to retry your request.</p>
    `);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
