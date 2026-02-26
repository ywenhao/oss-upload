import type { CosUploadConfig } from '../upload/types'

export function defineConfig(options: CosUploadConfig): CosUploadConfig {
  return { ...options, __type: 'cos' } as CosUploadConfig
}
