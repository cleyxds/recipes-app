import { isDevelopment } from "./constants"

function getAvatarUrl(avatar_url) {
  if (avatar_url) {
    return isDevelopment
      ? new URL(`http://192.168.1.106:3333/uploads/${avatar_url}`)
      : avatar_url
  }

  return null
}

export function parseUserResponse(user) {
  const { entityId, profile, status, locale, avatar_url } = user
  return {
    id: entityId,
    status: status,
    createdAt: user.createdAt,
    activatedAt: user.activatedAt,
    statusChanged: user.statusChanged,
    lastLogin: user.lastLogin,
    lastUpdated: user.lastUpdated,
    passwordChangedAt: user.passwordChangedAt,
    profile: {
      firstName: profile[0],
      lastName: profile[1],
      email: profile[2],
      login: profile[3],
      phone: profile[4],
      avatar_url: getAvatarUrl(avatar_url)
    },
    credentials: {
      provider: "Express-Server"
    },
    locale
  }
}
