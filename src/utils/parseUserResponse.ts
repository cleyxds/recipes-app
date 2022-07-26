export function parseUserResponse(user) {
  const { entityId, profile, status, locale } = user
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
      phone: profile[4]
    },
    credentials: {
      provider: "Express-Server"
    },
    locale
  }
}
