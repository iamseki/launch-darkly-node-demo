const LaunchDarkly = require('@launchdarkly/node-server-sdk');

// Set sdkKey to your LaunchDarkly SDK key.
const sdkKey = process.env.LAUNCHDARKLY_SDK_KEY ?? 'your-sdk-key';

const ldClient = LaunchDarkly.init(sdkKey).on("ready", () => console.log('launch darkly is ready'));

const sampleFeatureFlag = 'sample-feature';

const helloWorldMigrationFlag = 'hello-world-4-stages-migration'

const legacyHelloWorld = () => ({ data1: `Hello World migration`, data2: `Hello World migration` });
const newHelloWorld = () => ({ data1: `Hello World migration`, data2: `Hello World migration` });

const helloWorldMigration = LaunchDarkly.createMigration(ldClient, {
  readNew: () => {
    const data = newHelloWorld();
    return LaunchDarkly.LDMigrationSuccess(data);
  },
  readOld: () => {
    const data = legacyHelloWorld();
    return LaunchDarkly.LDMigrationSuccess(data);
  },
  check: (oldRead, newRead) => {
    console.log('Old Read:', oldRead);
    console.log('New Read:', newRead);

    // Implement the actual check logic to compare oldRead and newRead
    const isConsistent = JSON.stringify(oldRead) === JSON.stringify(newRead);
    console.log('Consistency Check Result:', isConsistent);

    return isConsistent;
  }
});

module.exports = {
  client: ldClient,
  helloWorldMigration,
  helloWorldMigrationFallbackStage: LaunchDarkly.LDMigrationStage.Off,
  flags: {
    sampleFeatureFlag,
    sampleFeatureFlagFallback: false,
    helloWorldMigrationFlag,
  }
};
