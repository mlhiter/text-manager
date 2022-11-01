// [{}] 转 csv，omits 表示剔除的字段
export function transformCSV<T extends object>(data: T[], omits: string[]) {
  const keys = Object.keys(data?.[0]).filter(
    (key) => !omits.includes(key)
  ) as (keyof T)[]
  // 表头
  let transformed = keys.join('\t') + '\n'
  // 表项
  data.forEach((item) => {
    transformed += keys.map((key) => item?.[key]).join('\t') + '\n'
  })
  return transformed
}
