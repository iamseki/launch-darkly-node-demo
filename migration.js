const launchDarkly = require('./launch-darkly');
const express = require('express');

const app = express()

app.use(express.json());

const port = 3000

app.post('/hello-world', async (req, res) => {
  const user = req.body;
  const context = {
    "kind": 'user', // this can be anything we want, such as userId or orgId depends on how we want to segregate
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
