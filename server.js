const express = require("express");
const { BetaAnalyticsDataClient } = require("@google-analytics/data");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;

const keyPath = path.resolve(
  __dirname,
  "./reartic`le-admin-da70e-firebase-adminsdk-d8jex-4f1e77e4b3 (1).json"
);

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: keyPath,
});

const propertyId = "453136110";
app.use(cors());

app.get("/user-activity", async (req, res) => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "2023-01-01", endDate: "2023-12-31" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }],
      returnPropertyQuota: true,
    });

    // Simulated user activity data
    const result = {
      dimensionHeaders: response.dimensionHeaders,
      metricHeaders: response.metricHeaders,
      rows: [
        {
          dimensionValues: ["2024-08-09"], 
          metricValues: ["150"], 
        },
        {
          dimensionValues: ["2024-07-30"], 
          metricValues: ["200"], 
        },
        {
          dimensionValues: ["2024-07-20"], 
          metricValues: ["250"], 
        },
        {
          dimensionValues: ["2024-07-10"],
          metricValues: ["100"],
        },
        {
          dimensionValues: ["2024-07-15"],
          metricValues: ["55"],
        },
        {
          dimensionValues: ["2024-07-20"],
          metricValues: ["196"],
        },
        {
          dimensionValues: ["2024-07-25"],
          metricValues: ["230"],
        },
        {
          dimensionValues: ["2024-08-04"],
          metricValues: ["69"],
        }
      ],
      rowCount: 7,
      metadata: response.metadata,
      propertyQuota: response.propertyQuota,
      kind: response.kind,
    };

    res.json(result);
  } catch (error) {
    console.error("Error fetching user activity data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
