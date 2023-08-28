type AppErrorType = { code: string; message: string };

export const AppErrors: { [key: string]: AppErrorType } = {
  UnknownError: {
    code: "UNKNOWN_ERROR",
    message: "Oops, something went wrong! Sorry about that.",
  },
};

export class AppError extends Error {
  code: string;

  constructor(appError: AppErrorType) {
    super(appError.message);

    this.code = appError.code;
  }
}

export class UnknownError extends AppError {
  constructor() {
    super(AppErrors.UnknownError);
  }
}
