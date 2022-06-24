import type { JSONSchemaType } from "ajv"
import { signup } from "../../types/handlers"

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
    additionalProperties: "properties other than ... are not allowed",
    _: "validation error...",
  },
}
