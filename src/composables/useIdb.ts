import { get, set, del, keys } from 'idb-keyval'

export async function idbGet<T>(key: string): Promise<T | undefined> {
  return await get(key)
}

export async function idbSet(key: string, value: unknown): Promise<void> {
  await set(key, value)
}

export async function idbDel(key: string): Promise<void> {
  await del(key)
}

export async function idbKeys(): Promise<string[]> {
  return await keys() as string[]
}

export async function idbEstimate(): Promise<{ usage: number; quota: number }> {
  if (!navigator.storage?.estimate) return { usage: 0, quota: 25 * 1024 * 1024 }
  const est = await navigator.storage.estimate()
  return { usage: est.usage || 0, quota: est.quota || 25 * 1024 * 1024 }
}