const launchDarkly = require('./launch-darkly');
const express = require('express');

const app = express()

app.use(express.json());

const port = 3000

app.post('/migration', async (req, res) => {
  const user = req.body;
  const context = {
    "kind": 'user',
    "key": `${user.id}`, // must be a string
    ...user, // custom properties such as orgId, portfolioId
  };

  console.log(context);
  
  const data = await launchDarkly.helloWorldMigration.read(launchDarkly.flags.helloWorldMigrationFlag, context, launchDarkly.helloWorldMigrationFallbackStage);

  res.send(data);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
