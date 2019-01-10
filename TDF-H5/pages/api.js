export const xx = async ({ $axios }) => {
  const ip = await $axios.$get('http://icanhazip.com')
  console.log(11111 + ip)
}
