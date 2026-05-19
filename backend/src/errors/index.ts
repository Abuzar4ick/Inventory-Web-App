import { AppError } from "./AppError";

export class NotFoundError extends AppError {
  constructor(message = "Not found", item = "Resource") {
    const normalized = item.replace(/[\s-]+/g, "_").toUpperCase();
    super(message, 404, `${normalized}_NOT_FOUND`);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, "VALIDATION_ERROR");
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403, "FORBIDDEN");
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, 409, "CONFLICT");
  }
}

export class LimitExceededError extends AppError {
  constructor(message = "Rate limit exceeded") {
    super(message, 429, "LIMIT_EXCEEDED");
  }
}
