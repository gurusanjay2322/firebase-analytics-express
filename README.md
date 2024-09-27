# Firebase Analytics Express

This project is an Express.js server that integrates with Google Analytics to fetch and serve user activity data. It utilizes the Google Analytics Data API to retrieve analytics data for a specific property.

## Features

- Fetch user activity data for a specified date range.
- Returns simulated user activity metrics in JSON format.
- CORS enabled for cross-origin requests.

## Prerequisites

Before you begin, ensure you have the following:

- Node.js installed on your machine.
- A Google Cloud project with the Analytics API enabled.
- A service account with the required permissions and the corresponding JSON key file.

## Getting Started

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gurusanjay2322/firebase-analytics-express.git
   cd firebase-analytics-express
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Google Analytics Credentials:**
   - Download the service account JSON key file from your Google Cloud project.
   - Place the JSON file in the root directory of the project and modify the `keyPath` in `server.js` to match your filename.

4. **Update the Property ID:**
   - In `server.js`, update the `propertyId` variable with your Google Analytics property ID.

5. **Run the server:**
   ```bash
   node server.js
   ```

   The server will start running at `http://localhost:3000`.

## API Endpoint

### `GET /user-activity`

Fetches user activity data for the specified date range.

- **Response:**
  - Returns a JSON object containing:
    - `dimensionHeaders`: Headers for the dimensions requested.
    - `metricHeaders`: Headers for the metrics requested.
    - `rows`: Array of user activity data, each containing:
      - `dimensionValues`: Date of the activity.
      - `metricValues`: Number of active users on that date.
    - `rowCount`: Total number of rows returned.
    - `metadata`: Metadata about the response.
    - `propertyQuota`: Quota information for the property.
    - `kind`: Type of response.

### Example Response

```json
{
  "dimensionHeaders": [...],
  "metricHeaders": [...],
  "rows": [
    {
      "dimensionValues": ["2024-08-09"], 
      "metricValues": ["150"]
    },
    ...
  ],
  "rowCount": 7,
  "metadata": {...},
  "propertyQuota": {...},
  "kind": "analyticsData#runReport"
}
```

## Error Handling

In case of an error while fetching data, the server will respond with a 500 Internal Server Error status and log the error message to the console.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request for any improvements or bug fixes.
