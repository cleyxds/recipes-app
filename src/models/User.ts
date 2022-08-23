import { Entity, Schema } from "redis-om"

class User extends Entity {}

/**
 * credentials array schema
 * [password]
 */

/**
 * Profile array schema
 * [firstName, lastName, email, login, mobilePhone]
 */

export let UserSchema = new Schema(
  User,
  {
    credentials: { type: "string[]", indexed: false },
    profile: { type: "string[]" },
    createdAt: { type: "date", indexed: false },
    activatedAt: { type: "date", indexed: false },
    statusChanged: { type: "date", indexed: false },
    lastLogin: { type: "date", indexed: false },
    lastUpdated: { type: "date", indexed: false },
    passwordChangedAt: { type: "date", indexed: false },
    locale: { type: "string", indexed: false },
    status: { type: "string", indexed: false },
    avatar_url: { type: "string" }
  },
  {
    dataStructure: "JSON"
  }
)
