#Custom Component Service Sample - samples-service

##Import Dispute Instant App as needed

In this sample, there is an instant app  [Dispute Instant App Import File](/source/custom-components/samples-service/banking/instant-apps/Bank-Transaction-Interactive-With-Verify.json).  The Dispute Instant App file is invoked during the Dispute flow and needs to be imported into your collection of Instant Apps if it’s not already present.

## SDK version: 1.1 (Conversation Message Model)

This custom component service serves the custom components needed by the pre-installed Bots including FinancialBot.

## Upgrade Steps
This sample uses JS SDK v1.1 (Conversation Message Model).  For a custom component service based on v1.0 JS SDK, the general steps to adopt v1.1 SDK are as follows:

### (Bots Custom Components) Replace the v1.0 SDK and supporting files with the v1.1 SDK.
1. Replace the following files from the v1.1 distribution:
    - sdk.js
    - shell.js
    - component.js
1. Add the following file from the v1.1 distribution:
MessageModel.js
1. Compare the package.json with the one in the v1.1 distribution and make changes as necessary.

### (Mobile Cloud Enterprise Custom Components) Replace the v1.0 SDK and supporting files with the v1.1 SDK:
1. Replace the following files from the v1.1 distribution:
    - sdk.js
    - shell.js
    - mcebots.js
1. Add the following file from the v1.1 distribution:
MessageModel.js
1. Compare the package.json with the one in the v1.1 distribution and make changes as necessary.

### Restart the Bots Custom Components Service or redeploy MCe Custom Code
All the methods in v1.0 sdk are compatible with v1.1 sdk, so custom component code using the v1.0 methods should work with sdk v1.1.  However, if the custom component code uses message structure directly, they may change between product versions.  
