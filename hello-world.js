const launchDarkly = require('./launch-darkly');
const express = require('express');

const app = express()
const port = 3000

app.get('/', async (_req, res) => {
  const context = {
    "kind": 'user',
    "key": 'user-key-123abc',
    "name": 'Sandy',
  };

  const sampleFeatureFlag = await launchDarkly.client.boolVariation(launchDarkly.flags.sampleFeatureFlag, context, launchDarkly.flags.sampleFeatureFlagFallback);

  res.send(`Hello World with sampleFeatureFlag sets to => ${sampleFeatureFlag}`);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
