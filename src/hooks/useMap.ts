type A = Number
type test = undefined extends A ? Number | undefined : Number

const isUndef = (o: any): o is undefined => o === undefined

export const useMap = <Key = string, Data extends any = any>() => {
  const createMap = () => {
    const cache: {
      key: Key,
      value: Data
    }[] = []

    return {
      cache,
      get<Fallback extends Data | undefined = undefined>(key: Key, fallback?: Fallback): undefined extends Fallback ? Data | undefined : Data {
        const result = cache.find((c) => c.key === key)

        if (isUndef(fallback)) {
          return result?.value as Data
        }

        if (result) {
          return result.value
        } else {
          this.set(key, fallback as Data)
          return fallback as Data
        }
      },
      
      set(key: Key, value: Data) {
        const cached = cache.find((c) => c.key === key)

        if (cached) { 
          cached.value = value
        } else {
          cache.push({ key, value })
        }

        return value
      }
    }
  }

  return createMap()
}