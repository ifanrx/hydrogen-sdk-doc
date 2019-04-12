# 知晓云 Android SDK 接入指南

```gradle
// 根模块加入 jcenter 仓库
buildscript {
    repositories {
        jcenter()   
    }
}

// app 模块引入依赖，目前最新版本为 0.1.2
implementation "com.minapp.android:sdk:xxx"

// 需要 java 8 的支持
android {

    compileOptions {
        sourceCompatibility 1.8
        targetCompatibility 1.8
    }

    defaultConfig {
        minSdkVersion 21        // sdk 最低支持 21，所以这里必须 >= 21
    }
}
```


