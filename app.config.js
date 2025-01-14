export default {
  "expo": {
    "name": "Abundance-App",
    "slug": "Abundance-App",
    "version": "1.0.0",
    "scheme": "Abundance App",
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-dev-launcher",
        {
          "launchMode": "most-recent"
        }
      ],
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      "expo-secure-store",
      "expo-font",
      [
        "react-native-vision-camera",
        {
          "cameraPermissionText": "$(PRODUCT_NAME) needs access to your Camera."
        }
      ],
      [
        "expo-build-properties",{
          "ios":{
              "useFrameworks":"static"
  
          } 
        }

      ]

    ],
    "experiments": {
      "typedRoutes": true,
      "tsconfigPaths": true
    },
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "width": "100%",
      "height": "100%"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.axmen.AbundanceApp",
       googleServicesFile: process.env.GOOGLE_SERVICES_INFO_PLIST ?? './GoogleService-Info.plist',
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.axmen.AbundanceApp",
       googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? './google-services.json',
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "21dde433-7fc3-41d2-8488-5e8c020ba05a"
      }
    },
    "owner": "axmen"
  }
}
