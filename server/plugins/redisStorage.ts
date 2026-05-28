import redisDriver from 'unstorage/drivers/redis'

export default defineNitroPlugin(() => {
  const storage = useStorage()
  const config = useRuntimeConfig()

  const driver = redisDriver({
    host: 'redis',
    port: 6379,
    password: config.redisPassword,
  })

  storage.mount('redis', driver)
})
