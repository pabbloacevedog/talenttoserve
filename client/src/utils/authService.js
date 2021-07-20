import decode from 'jwt-decode'

export const getUserFromToken = (tokenId) => {
  const user = decode(tokenId)
  return user
}

export const isLogin = (userId) => {
  if (!userId) {
    return false
  }
  return true
}
