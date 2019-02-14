## 云函数

### GPL Code

云函数的构建离不开开源社区的贡献。在云函数的实现中，知晓云使用了诸多 GPL 协议的源代码并进行了修改。

知晓云团队基于以下工具构建了云函数功能：

- buildroot
- busybox
- Node.js

所有的 GPL 源代码可通过发起工单的方式获取。

### 云函数的实现

云函数是基于知晓云团队自研的轻量级容器 Iceberg 的，并非基于 docker 或类似方案实现的。每次用户云函数执行完后，容器即立即销毁。

### 云函数的临时文件存储

临时文件可存储在 /tmp 中。用户有高达 64MB 的高速临时文件存储空间可供使用。临时文件的生命周期限制在云函数的执行周期中，云函数返回后临时文件即时销毁，并将无法找回。

### 云函数的网络请求

云函数内无法对外界发起直接的网络请求。若希望发起请求，应使用 SDK 中提供的方法进行。

### 执行环境内的可用工具、资源

为方便使用，知晓云在云函数的执行环境内准备了如下工具/资源：

- gd
- ghostscript
- imagemagick

这里我们可以通过 `child_process` 模块来调用这些二进制文件

**示例代码**
```js
// 使用 convert 命令转换图片
const { spawn } = require('child_process');
const cmd = spawn('convert', ['/tmp/1.png', '-resize', '50%', '/tmp/1.jpg']);
cmd.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

cmd.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

cmd.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

以下 emoji 字体:

- /usr/share/fonts/google-material/MaterialIcons-Regular.ttf

以下西文字体:

- /usr/share/fonts/ttf-bitstream-vera/VeraBd.ttf
- /usr/share/fonts/ttf-bitstream-vera/VeraBI.ttf
- /usr/share/fonts/ttf-bitstream-vera/VeraIt.ttf
- /usr/share/fonts/ttf-bitstream-vera/VeraMoBd.ttf
- /usr/share/fonts/ttf-bitstream-vera/VeraMoBI.ttf
- /usr/share/fonts/ttf-bitstream-vera/VeraMoIt.ttf
- /usr/share/fonts/ttf-bitstream-vera/VeraMono.ttf
- /usr/share/fonts/ttf-bitstream-vera/VeraSeBd.ttf
- /usr/share/fonts/ttf-bitstream-vera/VeraSe.ttf
- /usr/share/fonts/ttf-bitstream-vera/Vera.ttf
- /usr/share/fonts/cantarell/Cantarell-Regular.otf
- /usr/share/fonts/cantarell/Cantarell-Oblique.otf
- /usr/share/fonts/cantarell/Cantarell-Bold.otf
- /usr/share/fonts/cantarell/Cantarell-BoldOblique.otf
- /usr/share/fonts/dejavu/DejaVuSansMono-BoldOblique.ttf
- /usr/share/fonts/dejavu/DejaVuSansMono-Bold.ttf
- /usr/share/fonts/dejavu/DejaVuSansMono-Oblique.ttf
- /usr/share/fonts/dejavu/DejaVuSansMono.ttf
- /usr/share/fonts/dejavu/DejaVuSans.ttf
- /usr/share/fonts/dejavu/DejaVuSans-BoldOblique.ttf
- /usr/share/fonts/dejavu/DejaVuSans-Bold.ttf
- /usr/share/fonts/dejavu/DejaVuSans-ExtraLight.ttf
- /usr/share/fonts/dejavu/DejaVuSans-Oblique.ttf
- /usr/share/fonts/dejavu/DejaVuSerif.ttf
- /usr/share/fonts/dejavu/DejaVuSerif-BoldItalic.ttf
- /usr/share/fonts/dejavu/DejaVuSerif-Bold.ttf
- /usr/share/fonts/dejavu/DejaVuSerif-Italic.ttf
- /usr/share/fonts/dejavu/DejaVuSansCondensed-BoldOblique.ttf
- /usr/share/fonts/dejavu/DejaVuSansCondensed-Bold.ttf
- /usr/share/fonts/dejavu/DejaVuSansCondensed-Oblique.ttf
- /usr/share/fonts/dejavu/DejaVuSansCondensed.ttf
- /usr/share/fonts/dejavu/DejaVuSerifCondensed-BoldItalic.ttf
- /usr/share/fonts/dejavu/DejaVuSerifCondensed-Bold.ttf
- /usr/share/fonts/dejavu/DejaVuSerifCondensed-Italic.ttf
- /usr/share/fonts/dejavu/DejaVuSerifCondensed.ttf
- /usr/share/fonts/liberation/LiberationMono-BoldItalic.ttf
- /usr/share/fonts/liberation/LiberationMono-Bold.ttf
- /usr/share/fonts/liberation/LiberationMono-Italic.ttf
- /usr/share/fonts/liberation/LiberationMono-Regular.ttf
- /usr/share/fonts/liberation/LiberationSans-BoldItalic.ttf
- /usr/share/fonts/liberation/LiberationSans-Bold.ttf
- /usr/share/fonts/liberation/LiberationSans-Italic.ttf
- /usr/share/fonts/liberation/LiberationSans-Regular.ttf
- /usr/share/fonts/liberation/LiberationSerif-BoldItalic.ttf
- /usr/share/fonts/liberation/LiberationSerif-Bold.ttf
- /usr/share/fonts/liberation/LiberationSerif-Italic.ttf
- /usr/share/fonts/liberation/LiberationSerif-Regular.ttf

以下中文字体:

- /usr/share/fonts/arphic-bkai00mp/bkai00mp.ttf
- /usr/share/fonts/arphic-bsmi00lp/bsmi00lp.ttf
- /usr/share/fonts/arphic-gbsn00lp/gbsn00lp.ttf
- /usr/share/fonts/arphic-gkai00mp/gkai00mp.ttf
- /usr/share/fonts/source-han-sans/SourceHanSans-Bold.ttc
- /usr/share/fonts/source-han-sans/SourceHanSans-ExtraLight.ttc
- /usr/share/fonts/source-han-sans/SourceHanSans-Heavy.ttc
- /usr/share/fonts/source-han-sans/SourceHanSans-Light.ttc
- /usr/share/fonts/source-han-sans/SourceHanSans-Medium.ttc
- /usr/share/fonts/source-han-sans/SourceHanSans-Normal.ttc
- /usr/share/fonts/source-han-sans/SourceHanSans-Regular.ttc
- /usr/share/fonts/source-han-serif/SourceHanSerif-Bold.ttc
- /usr/share/fonts/source-han-serif/SourceHanSerif-ExtraLight.ttc
- /usr/share/fonts/source-han-serif/SourceHanSerif-Heavy.ttc
- /usr/share/fonts/source-han-serif/SourceHanSerif-Light.ttc
- /usr/share/fonts/source-han-serif/SourceHanSerif-Medium.ttc
- /usr/share/fonts/source-han-serif/SourceHanSerif-Regular.ttc
- /usr/share/fonts/source-han-serif/SourceHanSerif-SemiBold.ttc