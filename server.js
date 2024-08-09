const express = require('express');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const path = require('path');
const app = express();
const port = 3000;

const keyPath = path.resolve(__dirname, './analytics-daf9c-firebase-adminsdk-i0y24-6c384f3c69.json');

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: keyPath,
});

const propertyId = '453262886';

app.get('/user-activity', async (req, res) => {
  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '2023-01-01', endDate: '2023-12-31' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'activeUsers' }],
      returnPropertyQuota: true,
    });

    const result = {
      dimensionHeaders: response.dimensionHeaders,
      metricHeaders: response.metricHeaders,
      rows: response.rows.map(row => ({
        dimensionValues: row.dimensionValues.map(dim => dim.value),
        metricValues: row.metricValues.map(metric => metric.value),
      })),
      rowCount: response.rowCount,
      metadata: response.metadata,
      propertyQuota: response.propertyQuota,
      kind: response.kind,
    };

    if (response.rows.length === 0) {
      result.message = 'No data available for the specified query parameters.';
      result.data = [];
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching user activity data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
