

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}
export class AuthContextError extends AuthError {
  constructor(errorMessage: string) {
    super("Please wrap your root component with AuthProvider.");
    super(errorMessage);
    this.name = "AuthContextError";
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor(errorMessage: string) {
    super("Invalid credentials provided.");
    super(errorMessage);
    this.name = "InvalidCredentialsError";
  }
}

export class UserNotFoundError extends AuthError {
  constructor(errorMessage: string) {
    super("User not found.");
    super(errorMessage);
    this.name = "UserNotFoundError";
  }
}

export class NetworkError extends AuthError {
  constructor(errorMessage: string) {
    super("Network error occurred. Please try again later.");
    super(errorMessage);
    this.name = "NetworkError";
  }
}

export class UnauthorizedError extends AuthError {
  constructor(errorMessage: string) {
    super("You are not authorized to perform this action.");
    this.name = "UnauthorizedError";
  }
}

export class TokenExpiredError extends AuthError {
  constructor(errorMessage: string) {
    super("Authentication token has expired.");
    super(errorMessage);
    this.name = "TokenExpiredError";
  }
}

export class UnknownAuthError extends AuthError {
  constructor(errorMessage: string) {
    super("An unknown authentication error occurred.");
    super(errorMessage);
    this.name = "UnknownAuthError";
  }
}