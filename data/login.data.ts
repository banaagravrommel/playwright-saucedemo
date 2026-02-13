/**
 * Data-driven test data for login scenarios.
 */

export const VALID_PASSWORD = 'secret_sauce';

/** Users that should successfully login and see the inventory. */
export const validLoginUsers = [
  { username: 'standard_user', description: 'standard user' },
  { username: 'problem_user', description: 'problem user' },
  { username: 'performance_glitch_user', description: 'performance glitch user' },
  { username: 'error_user', description: 'error user' },
] as const;

/** Invalid login cases: credentials that must show an error and stay on login page. */
export const invalidLoginCases = [
  {
    username: 'locked_out_user',
    password: VALID_PASSWORD,
    expectedError: 'Sorry, this user has been locked out',
    description: 'locked out user',
  },
  {
    username: 'standard_user',
    password: 'wrong_password',
    expectedError: 'Username and password do not match',
    description: 'wrong password',
  },
  {
    username: '',
    password: VALID_PASSWORD,
    expectedError: 'Username is required',
    description: 'empty username',
  },
  {
    username: 'standard_user',
    password: '',
    expectedError: 'Password is required',
    description: 'empty password',
  },
  {
    username: 'invalid_user',
    password: VALID_PASSWORD,
    expectedError: 'Username and password do not match',
    description: 'non-existent user',
  },
] as const;
