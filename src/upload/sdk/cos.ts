import type { CosUploadConfig } from '../types'
import { consola } from 'consola'
import COS from 'cos-nodejs-sdk-v5'

function checkConfig(config: CosUploadConfig) {
  if (
    !config.region
    || !config.bucket
    || !config.secretId
    || !config.secretKey
  ) {
    consola.error(new Error('upload.config.ts 没有正确配置'))
    process.exit(1)
  }
}

function createClient(config: CosUploadConfig) {
  return new COS({
    SecretId: config.secretId,
    SecretKey: config.secretKey,
  })
}

async function upload({
  client,
  config,
  fileKey,
  filePath,
  // sourcePath,
  // targetPath,
}: {
  client: COS
  config: CosUploadConfig
  fileKey: string
  filePath: string
  sourcePath: string
  targetPath: string
}) {
  try {
    await new Promise<void>((resolve, reject) => {
      client.uploadFile(
        {
          Bucket: config.bucket,
          Region: config.region,
          Key: fileKey,
          FilePath: filePath,
        // SliceSize: 1024 * 1024 * 5, // 触发分块上传的阈值，超过5MB使用分块上传，非必须
        },
        (err, _data) => {
          if (err) {
            reject(err)
          }
          else {
            resolve()
          }
        },
      )
    })

    consola.success(
      'Put object(%s) under the bucket(%s) successful!!',
      fileKey,
      config.bucket,
    )
  }
  catch (error: any) {
    consola.error(`upload failed, fileKey: ${fileKey}, filePath: ${filePath}`)
    consola.error(error)
    throw new Error('上传失败')
  }
}

export const cos = { checkConfig, createClient, upload }
