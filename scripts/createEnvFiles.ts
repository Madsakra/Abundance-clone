const fs = require('fs');
const path = require('path');

// Get the environment variables
const googleServicesJson = process.env.GOOGLE_SERVICES_JSON;
const googleServicesPlist = process.env.GOOGLE_SERVICES_INFO_PLIST;

// Write `google-services.json` to the Android directory
if (googleServicesJson) {
  const androidPath = path.join(__dirname, '../android/app/google-services.json');
  fs.writeFileSync(androidPath, googleServicesJson);
  console.log('✅ google-services.json has been created.');
} else {
  console.error('❌ GOOGLE_SERVICES_JSON environment variable is missing.');
  process.exit(1);
}

// Write `GoogleService-Info.plist` to the iOS directory
if (googleServicesPlist) {
  const iosPath = path.join(__dirname, '../ios/GoogleService-Info.plist');
  fs.writeFileSync(iosPath, googleServicesPlist);
  console.log('✅ GoogleService-Info.plist has been created.');
} else {
  console.error('❌ GOOGLE_SERVICES_INFO_PLIST environment variable is missing.');
  process.exit(1);
}
