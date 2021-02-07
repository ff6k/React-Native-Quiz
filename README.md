# Maths Practice
 
## When creating apk/ipa, if there is changes in ReactNative, you need first to run `npm run bundle-android` or `npm run bundle-ios`.

### Package App
* android
  1. clean: Android Studio -> Build -> Clean Project
  3. bundle: run command under vscode
   ```
   npm run bundle-android
   ```
  4. Delete dumplicated resources: app➜res下的drawable、raw
  5. Change appName(if needed): res➜values➜string.xml 
  6. Change applicationId(if needed): app-->build.gradle➜defaultConfig➜applicationId
  7. Change versionCode(if needed): for android playstore to see if new version uploaded
  8. Change versionName: for android playstore，version shoule be same with page
  9. Start creating Apk: Click: build➜ Generate Signed Bundle or APK➜APK➜NEXT➜Choose Key Store
  10. Export: Click `locate` to release folder，file app-release.apk is the last file(/android/app/release/)
   
  If errors, clean cache. Follow there steps below
  1. Delete android/app/build and android/build

* ios
  1. Go to ios folder
  2. XCode: Double-click [YOUR PROJECT NAME].xcworkspace
  3. Choose device: 在XCode中模拟器选择 [YOUR PROJECT NAME]>Any ios Device
  4. clean: Product -> Clean Build Folder
  5. bundle: Switch to vscode command line
   ```
   npm run bundle-ios
   ```
  6. Change `Display Name`(if needed): TARGETS -> [YOUR PROJECT NAME] -> General
  7. Config cert: TARGETS -> [YOUR PROJECT NAME] -> Signing & Capabilities -> Release -> Signing，Bundle Indentifier com.**
  8. Start creating ipa: Product➜Archive
  9. Export to App connect: Popup window Click Distribute App➜Applee Connect➜Next➜Next➜Select Profile➜Next➜Export

  If error occurs clean cache. when creating, follow these steps:
  1. Delete the build folder: ios/build
  2. clear native cache in /Users/mohammedyasar/Library/Developer/Xcode/DerivedData


* ios:
1. Clear xcode derive data in [File]-> [WorkSpace]-> Click the right arrow top of [Anvanced]
   Open [DerivedData]-> Remove the Questionaires.. folder.
2. Remove node_modules. run `rf -rf node_modules`.
3. npx pod-install