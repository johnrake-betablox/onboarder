import { AxiosError } from "axios";

export function getApiErrorMessage(e: any) {
  if (e instanceof AxiosError) {
    return e.response?.data.errorMessage;
  }

  return e.message;
}
