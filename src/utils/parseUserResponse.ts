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
      avatar_url: !!avatar_url
        ? new URL(`http://localhost:3333/uploads/${avatar_url}`)
        : null
    },
    credentials: {
      provider: "Express-Server"
    },
    locale
  }
}
