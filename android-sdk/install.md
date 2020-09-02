# 知晓云 Android SDK 接入指南

#### 在根模块的 build.gradle 加入 jcenter 仓库

```gradle
buildscript {
    repositories {
        jcenter()   
    }
}

allprojects {
    repositories {
        google()
        jcenter()
        mavenCentral()
        maven { url "https://dl.bintray.com/thelasterstar/maven/" }
    }
}
```

#### 在 app 模块的 build.gradle 里加入以下配置

```gradle
android {

    // 需要 java 8 的支持
    compileOptions {
        sourceCompatibility 1.8
        targetCompatibility 1.8
    }

    defaultConfig {
        minSdkVersion 21        // sdk 最低支持 21，所以这里必须 >= 21
    }
}

// app 模块引入依赖，目前最新版本为 1.2.0
dependencies {
    implementation "com.minapp.android:sdk:xxx"
}
```

#### sdk 需要用到网络请求，所以在使用 sdk 前去 AndroidManifest.xml 检查下有没申请网络权限

```xml
<manifest>
    <uses-permission android:name="android.permission.INTERNET" />
</manifest>
```

#### 在使用 sdk 前先初始化

```java
public class App extends Application {
    @Override
    public void onCreate() {
        super.onCreate();
        BaaS.init("[[client_id]]", this);
        // ...
    }
}
```