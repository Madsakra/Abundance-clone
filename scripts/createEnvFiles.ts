import * as fs from 'fs';
import * as path from 'path';

// Get the environment variables
const googleServicesJson = process.env.GOOGLE_SERVICES_JSON;
const googleServicesPlist = process.env.GOOGLE_SERVICES_INFO_PLIST;

// Create `android/app` directory if it doesn't exist
const androidAppPath = path.join(__dirname, '../android/app');
if (!fs.existsSync(androidAppPath)) {
  fs.mkdirSync(androidAppPath, { recursive: true });
  console.log('✅ Created android/app directory');
}

// Write `google-services.json`
if (googleServicesJson) {
  const googleServicesJsonPath = path.join(androidAppPath, 'google-services.json');
  fs.writeFileSync(googleServicesJsonPath, googleServicesJson);
  console.log('✅ google-services.json has been created.');
} else {
  console.error('❌ GOOGLE_SERVICES_JSON is missing.');
  process.exit(1);
}

// Create `ios` directory if it doesn't exist
const iosPath = path.join(__dirname, '../ios/AbundanceApp');
if (!fs.existsSync(iosPath)) {
  fs.mkdirSync(iosPath, { recursive: true });
  console.log('✅ Created ios directory');
}

// Write `GoogleService-Info.plist`
if (googleServicesPlist) {
  const googleServicesPlistPath = path.join(iosPath, 'GoogleService-Info.plist');
  fs.writeFileSync(googleServicesPlistPath, googleServicesPlist);
  console.log('✅ GoogleService-Info.plist has been created.');
} else {
  console.error('❌ GOOGLE_SERVICES_INFO_PLIST is missing.');
  process.exit(1);
}
