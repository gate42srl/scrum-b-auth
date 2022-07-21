import type { JSONSchemaType } from "ajv"
import { signup, signin, recovery, refresh } from "../../types/handlers"

export const BodySignupSchema: JSONSchemaType<signup> = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
      pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    },
    firstName: { type: "string" },
    lastName: { type: "string" },
  },
  required: ["email", "password", "firstName", "lastName"],
  additionalProperties: false,
  errorMessage: {
    type: "type should be an object",
    properties: {
      email: "email key must be a valid email string",
      password: "password does not respect requirements",
      firstName: "firstName key is required",
      lastName: "lastName key is required",
    },
    required: "email, password, firstName and lastName are required...",
    additionalProperties: "properties other than the required ones are not allowed",
    _: "unknown validation error...",
  },
}

export const BodySigninSchema: JSONSchemaType<signin> = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
  errorMessage: {
    type: "type should be an object",
    properties: {
      email: "email key must be a valid email string",
      password: "password must be a string",
    },
    required: "email and password are required...",
    additionalProperties: "properties other than email and password is not allowed",
    _: "unknown validation error...",
  },
}

export const BodyRecoverySchema: JSONSchemaType<recovery> = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
    },
  },
  required: ["email"],
  additionalProperties: false,
  errorMessage: {
    type: "type should be an object",
    properties: {
      email: "email key must be a valid email string",
    },
    required: "email is required...",
    additionalProperties: "properties other than email key is not allowed",
    _: "unknown validation error...",
  },
}

export const BodyRefreshSchema: JSONSchemaType<refresh> = {
  type: "object",
  properties: {
    refreshToken: {
      type: "string",
    },
  },
  required: ["refreshToken"],
  additionalProperties: false,
  errorMessage: {
    type: "type should be an object",
    properties: {
      email: "refreshToken must be a string",
    },
    required: "refreshToken is required...",
    additionalProperties: "properties other than refreshToken key is not allowed",
    _: "unknown validation error...",
  },
}
