# Rate Limiter

## Description

This project implements a custom rate limiter for an Express.js API. The rate limiter controls the number of requests a client can make within a specified time period to prevent abuse and ensure fair usage.

## How It Works

- **Manual Rate Limiting:** 
  - A `requestQueue` array is used to store the timestamps of incoming requests.
  - When a request is made, the current time is added to `requestQueue` and the array is filtered to remove timestamps older than the allowed period (60 seconds).
  - If the number of timestamps in `requestQueue` is less than the maximum allowed calls (15), the request is processed.
  - If the limit is exceeded, a penalty is applied:
    - The client receives a `429 Too Many Requests` response with a browser alert message.
    - The client is redirected to a retry page where they must wait for the penalty period (60 seconds) before making new requests.

## Features

- **Rate Limiting:** Limits each client to 15 API calls per 60 seconds.
- **Penalty Mechanism:** Enforces a 60-second penalty period if the rate limit is exceeded.
- **Browser Alerts:** Informs the user via an alert message if they exceed the rate limit.
- **Retry Page:** Redirects the user to a retry page during the penalty period.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anurag611/rate_limiter.git
   cd rate_limiter
   ```
2. Install Dependencies:
  ```bash
  npm install
  ```
### Running the Server

1. Start the server:
   ```bash
   node app.js
   ```
2. Test the API:
   Open your browser or use a tool like Postman to send requests to http://localhost:3000/api?input=test .

### Project Structure
- **app.js:** Main server file that sets up the Express.js application and routes.
- **limiter.js:** Custom rate limiter middleware that handles request queuing, rate limiting, and penalties.

### Example Usage
- Make up to 15 requests to http://localhost:3000/api within a minute without penalty.
- On the 16th request within the same minute, you will receive a browser alert indicating that too many requests have been made.
- You will be redirected to a retry page and must wait 60 seconds before making new requests.

### Detailed Explanation
- **Request Queue:** The requestQueue array stores timestamps of incoming requests within a rolling time window (60 seconds).
- **Rate Limit Check:** Before processing a request, the current time is compared against the timestamps in requestQueue. If the number of requests exceeds the limit, the client receives a penalty.
- **Penalty Enforcement:** When the rate limit is exceeded, the server sends a response with an alert script and redirects the client to a retry page. The requestQueue is cleared after the penalty period (60 seconds).

  
