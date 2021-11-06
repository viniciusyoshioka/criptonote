# CriptoNote
Notepad app that stores encrypted notes to increase security

## Platform
Currently, only Android is supported

## Prepare to develop
Install dependencies
```
yarn install
```

Compile app's debug version
```
yarn android
```

Start server for development
```
yarn start
```

## Build
If you want to create a release build, open `src/service/constant.ts`, and change 
```ts
// Development
export const appInDevelopment = true
```
for this 
```ts
// Development
export const appInDevelopment = false
```
to disable some developer tools.

Then build the release version with
```
yarn android --variant release
```
