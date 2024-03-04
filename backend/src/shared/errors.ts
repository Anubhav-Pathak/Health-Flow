export const ERRORS = {
  SERVER_ERROR: {
    code: 500,
    message: {
      error: 'Internal Server Error',
      error_description: 'Something bad happened at the server',
    },
  },
  MALFORMED_BODY: {
    code: 400,
    message: {
      error: 'Bad Request',
      error_description: 'Malformed body passed',
    },
  },
  DATA_OPERATION_FAILURE: {
    code: 400,
    message: {
      error: 'Bad Request',
      error_description: 'Data operation failed',
    },
  },
  RESOURCE_NOT_FOUND: {
    code: 404,
    message: {
      error: 'Resource Not Found',
      error_description: 'Resource was not found',
    },
  },
  ENDPOINT_NOT_FOUND: {
    code: 404,
    message: {
      error: 'Endpoint Not Found',
      error_description: 'Endpoint not found',
    },
  },
  RESOURCE_CONFLICT: {
    code: 409,
    message: {
      error: 'Resource Conflict',
      error_description: 'Resource already exists',
    },
  },
};
