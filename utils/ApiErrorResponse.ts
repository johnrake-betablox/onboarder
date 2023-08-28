import { AppError, AppErrors } from "@/config/errors";
import { isString } from "./is-string";
import { NextResponse } from "next/server";

export function ApiErrorResponse(e: any) {
  const errorJson = errorToJSON(e);
  const status = errorJson.errorStatus || 500;

  console.error(e);

  return NextResponse.json(errorJson, { status });
}

function errorToJSON(e: any) {
  if (e instanceof AppError) {
    return {
      errorCode: e.code,
      errorMessage: e.message,
      errorStatus: 400,
    };
  }

  // Message shorthand
  if (isString(e)) {
    return {
      errorCode: AppErrors.UnknownError.code,
      errorMessage: e,
      errorStatus: 400,
    };
  }

  // Generic fallback for unsupported app errors
  return {
    errorCode: AppErrors.UnknownError.code,
    errorMessage: AppErrors.UnknownError.message,
    errorStatus: 500,
  };
}
