# Setting up Cordova with Webpack

1. Open Registry Editor (Run -> regedit).
1. Navigate to HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Android SDK Tools in the folder tree on the left.
1. Modify the **Path** registry variable to match the path to your Android SDK.
1. Run the following to install the necessary packages using the _sdkmanager_ in the _android-sdk_ installation folder:
    ```powershell
    sdkmanager "build-tools;25.0.3" "extras;android;m2repository" "platform-tools" "platforms;android-25" "tools"
    ```
1. Download the [Visual Studio Emulator for Android](https://www.visualstudio.com/vs/msft-android-emulator/)
1. Install [Gradle](https://docs.gradle.org/current/userguide/installation.html)
1. Add environment variables after finishing installations:
    * `ANDROID_HOME = C:\dev\android`
    * `tools`
    * `tools\bin`
    * `platform-tools`
    * `gradle-3.5\bin`
1. Run `npm install`
1. Run `npm start`
