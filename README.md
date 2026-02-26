# 这是一个 对象存储上传工具

# 环境

vite

# 目前支持的对象存储

- 华为云 obs
- 阿里云 oss
- 七牛云


cli命令上传
`oss-upload [source] [target]`
- 命令行上有命令优先读取命令行的参数，没有就读取config文件

```json
// package.json
{
  "scripts": {
    "oss-upload": "oss-upload",
    "oss-upload:h5": "oss-upload dist/build/h5 h5",
  }
}
```

```ts
// upload.config.ts

// 华为云obs
import { defineConfig } from '@bmjs/obs-utils/vite/obs'

export default defineConfig({
  url: 'https://obs.cn-north-4.myhuaweicloud.com',
  userName: 'admin',
  accessKeyId: 'admin',
  secretAccessKey: 'admin',
  // { 本地要上传的文件路径 : obs 上的文件路径 }
  entry: {
    './dist/build/h5': 'h5',
  },
})


// 阿里云oss
import { defineConfig } from '@bmjs/obs-utils/vite/oss'

export default defineConfig({
  region: 'oss-<region-id>',
  bucket: 'xxx',
  accessKeyId: 'admin',
  accessKeySecret: 'admin',
  // { 本地要上传的文件路径 : obs 上的文件路径 }
  entry: {
    './dist/build/h5': 'h5',
  },
})


// 七牛云
import { defineConfig } from '@bmjs/obs-utils/vite/oss'

export default defineConfig({
  bucket: 'xxx',
  accessKey: 'admin',
  secretKey: 'admin',
  // { 本地要上传的文件路径 : obs 上的文件路径 }
  entry: {
    './dist/build/h5': 'h5',
  },
  // 区域， 可选
  zonesProvider: qiniu.zone.Zone_z0,
})
```
