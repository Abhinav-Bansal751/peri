<p align="center">
    <img src="./public/assets/icon/favicon.ico" alt="Logo" width="80" height="80">
  <h3 align="center">Peri</h3>
  <p align="center">
    The Period Tracker App
  </p>
  <p align="center">
    <a href="https://irasoro.github.io/peri/">View Demo</a>
  </p>
</p>

### About The Project

Peri is period tracker application. The application has the necessary features that help you track your cycle. The app shows:

- number of days before period,
- current cycle day,
- chance of getting pregnant,
- number of days before ovulation,
- possible next period date,
- history of previous cycles,
- the average value of the cycle length and the average value of the period length.

It also tracks the current phase of the cycle. And displays information about this phase and the symptoms that a woman may feel during this phase.

See the [open issues](https://github.com/IraSoro/peri/issues) and [project](https://github.com/users/IraSoro/projects/4/views/1) for a full list of known issues.

### Usage

<table>
  <tr>
    <td><img width="300" src="./demonstration/welcome.jpg" alt="Welcome"></td>
    <td><img width="300" src="./demonstration/home.jpg" alt="Home"></td>
    <td><img width="300" src="./demonstration/details.jpg" alt="Details"></td>
  </tr>
  <tr>
    <td align="center">Welcome page</td>
    <td align="center">Home</td>
    <td align="center">Details</td>
  </tr>
    <tr>
    <td><img width="300" src="./demonstration/info.jpg" alt="Info"></td>
    <td><img width="300" src="./demonstration/menu.jpg" alt="Menu"></td>
  </tr>
  <tr>
    <td align="center">Additional Info</td>
    <td align="center">Menu</td>
  </tr>
 </table>

### How to build

Install dependencies:

```shell
npm install
```

After that, you can start development server, which will be useful for quickly testing your changes:

```shell
npm start
```

To build the native `peri` you need `Android Studio` installed and all necessary JDK/SDK. To install, follow the instruction <https://developer.android.com/studio/install>.

After installing Android Studio, you need to run the following command:

```shell
npm run build # this command builds production-optimized Peri's code
npm install -g @ionic/cli@7.1.1 # this package will be installed globally to use capacitor
ionic cap build android # generates Android project
```

An `android` directory will be generated and you can open it with `Android Studio` and build the project based on this instruction <https://capacitorjs.com/docs/android>

You can also create a development version of native `peri` using the following `Dockerfile`, just create it in the root of the `peri` project:

```dockerfile
FROM node:latest

WORKDIR /home/

RUN apt-get update && \
  apt-get install -y android-sdk openjdk-17-jdk && \
  wget -q https://redirector.gvt1.com/edgedl/android/studio/ide-zips/2022.2.1.20/android-studio-2022.2.1.20-linux.tar.gz && \
  tar -C /usr/local -xzf android-studio-2022.2.1.20-linux.tar.gz && \
  rm android-studio-2022.2.1.20-linux.tar.gz && \
  wget -q https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip && \
  unzip -q commandlinetools-linux-9477386_latest.zip && \
  mkdir -p /usr/lib/android-sdk/cmdline-tools/latest && \
  mv cmdline-tools/* /usr/lib/android-sdk/cmdline-tools/latest/ && \
  rm commandlinetools-linux-9477386_latest.zip && \
  yes | /usr/lib/android-sdk/cmdline-tools/latest/bin/sdkmanager --licenses && \
  npm -g install @ionic/cli@7.1.1

ENV ANDROID_HOME=/usr/lib/android-sdk/
ENV PATH=$PATH:${ANDROID_HOME}tools/:${ANDROID_HOME}platform-tools/

WORKDIR /home/app

ENTRYPOINT [ "bash" ]
```

And run:

```shell
docker build -t peri-android-env:latest .
```

After that, you can start the container with:

```shell
docker run -it --rm -v $(pwd):/home/app peri-android-env
```

This Docker image already has `@ionic/cli`, `Android Studio` and all necessary JDK/SDK installed. You can just run the following commands to build the `apk` file:

```shell
npm run build # this command builds production-optimized Peri's code
ionic cap build android # generates Android project
cd android
./gradlew assembleDebug
```

The `apk` file will be created at `peri/android/app/build/outputs/apk/debug/`. You can install it on your smartphone. During the installation phase, `Android` will show you a warning that you are trying to install a potentially harmful application, because your app is not signed. To get rid of this warning, you should build the application through `Android Studio` following the instructions above, the `Dockerfile`-based method is only suitable for building a test application so far.
