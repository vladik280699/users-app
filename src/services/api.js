const apiBase = 'https://randomuser.me/api/'

const getData = async (url) => {
  const res = await fetch(url)
  return await res.json()
}

export const fetchUsers = () => {
  const api = `${apiBase}?results=20`
  return getData(api)
}