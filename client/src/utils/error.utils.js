// Error types
export const ErrorTypes = {
  VALIDATION: "VALIDATION",
  AUTHENTICATION: "AUTHENTICATION",
  AUTHORIZATION: "AUTHORIZATION",
  NETWORK: "NETWORK",
  SERVER: "SERVER",
  UNKNOWN: "UNKNOWN",
};

// Error messages
export const ErrorMessages = {
  [ErrorTypes.VALIDATION]: {
    INVALID_EMAIL: "Please enter a valid email address",
    INVALID_PASSWORD:
      "Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number",
    PASSWORDS_DONT_MATCH: "Passwords do not match",
    REQUIRED_FIELD: "This field is required",
  },
  [ErrorTypes.AUTHENTICATION]: {
    INVALID_CREDENTIALS: "Invalid email or password",
    SESSION_EXPIRED: "Your session has expired. Please log in again",
    UNAUTHORIZED: "You are not authorized to perform this action",
  },
  [ErrorTypes.NETWORK]: {
    CONNECTION_ERROR:
      "Unable to connect to the server. Please check your internet connection",
    TIMEOUT: "The request timed out. Please try again",
  },
  [ErrorTypes.SERVER]: {
    INTERNAL_ERROR: "An unexpected error occurred. Please try again later",
    SERVICE_UNAVAILABLE:
      "The service is temporarily unavailable. Please try again later",
  },
};

// Parse API error
export const parseApiError = (error) => {
  if (!error) {
    return {
      type: ErrorTypes.UNKNOWN,
      message: "An unexpected error occurred",
    };
  }

  // Network errors
  if (error.message === "Network Error") {
    return {
      type: ErrorTypes.NETWORK,
      message: ErrorMessages[ErrorTypes.NETWORK].CONNECTION_ERROR,
    };
  }

  // API errors
  if (error.response) {
    const { status, data } = error.response;

    // Authentication errors
    if (status === 401) {
      return {
        type: ErrorTypes.AUTHENTICATION,
        message:
          data.error ||
          ErrorMessages[ErrorTypes.AUTHENTICATION].INVALID_CREDENTIALS,
      };
    }

    // Validation errors
    if (status === 400) {
      return {
        type: ErrorTypes.VALIDATION,
        message:
          data.error || ErrorMessages[ErrorTypes.VALIDATION].REQUIRED_FIELD,
      };
    }

    // Server errors
    if (status >= 500) {
      return {
        type: ErrorTypes.SERVER,
        message: ErrorMessages[ErrorTypes.SERVER].INTERNAL_ERROR,
      };
    }

    // Other API errors
    return {
      type: ErrorTypes.UNKNOWN,
      message: data.error || "An unexpected error occurred",
    };
  }

  // Default error
  return {
    type: ErrorTypes.UNKNOWN,
    message: error.message || "An unexpected error occurred",
  };
};
