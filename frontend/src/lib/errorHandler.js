/**
 * Extract user-friendly error message from axios error response
 * Handles Zod validation errors, API errors, and network errors
 */
export const getErrorMessage = (error) => {
  // Network error or no response
  if (!error.response) {
    return error.message || "Network error occurred";
  }

  const { data, status } = error.response;

  // Handle validation errors (Zod)
  if (status === 400 && Array.isArray(data.errors)) {
    return data.errors[0]?.message || "Validation error";
  }

  // Handle standard API error format
  if (data.message) {
    return data.message;
  }

  if (data.error) {
    return data.error;
  }

  // Fallback to status text
  return error.message || "An error occurred";
};
