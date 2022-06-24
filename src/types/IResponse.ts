interface FailedResponse {
    success: false
    message: string
  }
  
  interface SuccessResponse<T = any> {
    success: true
    message?: string
    data: T
  }
  
  export type IResponse<T> = FailedResponse | SuccessResponse<T>  