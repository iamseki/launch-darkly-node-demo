const LaunchDarkly = require('@launchdarkly/node-server-sdk');

const sdkKey = process.env.LAUNCHDARKLY_SDK_KEY ?? 'your-sdk-key';

const ldClient = LaunchDarkly.init(sdkKey).on("ready", () => console.log('launch darkly is ready'));

const helloWorldMigrationFlag = 'migration-remake';

const legacyHelloWorld = () => ({ data1: `Hello World migration`});
const newHelloWorld = () => ({ data1: `Hello World migration`});

const readConsistencyCheck = (oldSystemResponse, newSystemResponse) => {
  console.log('Old Response:', oldSystemResponse);
  console.log('New Response:', newSystemResponse);

  const isConsistent = JSON.stringify(oldSystemResponse) === JSON.stringify(newSystemResponse);
  console.log('Consistency Check Result:', isConsistent);

  return isConsistent;
}

const helloWorldMigration = LaunchDarkly.createMigration(ldClient, {
  readNew: () => {
    // call new service such as kpi-api
    const data = newHelloWorld();
    return LaunchDarkly.LDMigrationSuccess(data);
  },
  readOld: () => {
    // call legacy service such as position-service
    const data = legacyHelloWorld();
    return LaunchDarkly.LDMigrationSuccess(data);
  },
  check: readConsistencyCheck,
});

module.exports = {
  client: ldClient,
  helloWorldMigration,
  helloWorldMigrationFallbackStage: LaunchDarkly.LDMigrationStage.Off,
  flags: {
    helloWorldMigrationFlag,
  }
};
