module.exports = {
  SERVER: { description: 'Server error occurred', status: 500, code: 'SERVER_ERROR' },
  EXTERNAL: { description: 'External service error', status: 500, code: 'EXTERNAL_ERROR' },
  INVALID_PASSWORD: { description: 'Invalid password', status: 401, code: 'INVALID_PASSWORD' },
  TOKEN_EXPIRED: { description: 'Token expired', status: 419, code: 'TOKEN_EXPIRED' },
  NOT_FOUND: { description: 'Empty response, not found', status: 404, code: 'NOT_FOUND' },
  DB: { description: 'Database error occurred', status: 500, code: 'DB_ERROR' },
  VALIDATION: { description: 'Invalid request', status: 422, code: 'VALIDATION_ERROR' },
  FORBIDDEN: { description: 'Access forbidden', status: 403, code: 'FORBIDDEN' },
  UNAUTHORIZED: { description: 'Unauthorized', status: 401, code: 'UNAUTHORIZED' },
  EMAIL_EXIST: { description: 'Email already exist', status: 401, code: 'EMAIL_EXIST' },
  NO_FILE: { description: 'File does not exist', status: 401, code: 'NO_FILE' },
  EMAIL_NOT_FOUND: { description: 'A user with this email could not be found', status: 401, code: 'EMAIL_NOT_FOUND' },
  SUCCESS: { description: 'All good', status: 200, code: 'SUCCESS' }
}
