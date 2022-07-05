export class GET_USER_ERROR extends Error {}
export class UNCAUGHT_EXCEPTION_ERROR extends Error {}
export class UNHANDLED_REJECTION_ERROR extends Error {}
export class VALIDATION_ERROR extends Error {
  errorMessages: string[]

  constructor(messageArray: string[]) {
    super()
    this.errorMessages = messageArray
  }
}
export class IS_REGISTERED_ERROR extends Error {}
