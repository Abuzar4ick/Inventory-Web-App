import { AppError } from "./AppError";

export class NotFoundError extends AppError {
  constructor(message = "Not found", item = "Resource") {
    const normalized = item.replace(/[\s-]+/g, "_").toUpperCase();
    super(message, 404, true, `${normalized}_NOT_FOUND`);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, true, "VALIDATION_ERROR");
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, true, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403, true, "FORBIDDEN");
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, 409, true, "CONFLICT");
  }
}
