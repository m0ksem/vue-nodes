import { ref, UnwrapRef } from 'vue'

type Cache<Key, Data> = { key: Key, value: Data }

export const useMap = <Key = string, Data extends any = any>() => {
  const createMap = () => {
    const cache = ref([] as Cache<Key, Data>[])

    return {
      get<Fallback extends Data | undefined = undefined>(key: Key, fallback?: Fallback): undefined extends Fallback ? Data | undefined : Data {
        const result = cache.value.find((c) => c.key === key)

        if (fallback === undefined) {
          return result?.value as Data
        }

        if (result) {
          return result.value as Data
        } else {
          this.set(key, fallback as Data)
          return fallback as Data
        }
      },
      
      set(key: Key, value: Data) {
        const cached = cache.value.find((c) => c.key === key)

        if (cached) { 
          cached.value = value as UnwrapRef<Data>
        } else {
          cache.value.push({ key, value } as Cache<UnwrapRef<Key>, UnwrapRef<Data>>)
        }

        return value
      }
    }
  }

  return createMap()
}