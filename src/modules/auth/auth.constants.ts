export enum AuthMessage {
  SIGN_IN_SUCCESS = 'Sign in success.',
  SIGN_UP_SUCCESS = 'Sign up success.',
  INVALID_CREDENTIALS = 'Invalid credentials.',
}

export enum AuthDescription {
  SIGN_IN_SUCCESS = 'Sign in success.',
  SIGN_UP_SUCCESS = 'Sign up success.',
  EMAIL_EXIST = 'Cannot process if already sign up with email.',
  INVALID_CREDENTIALS = 'Invalid credentials.',
}

export enum AuthSummary {
  SIGN_UP_SUMMARY = 'Sign up for users.',
  SIGN_IN_SUMMARY = 'Sign in for users.',
  GET_USER_INFO = `Get user's info.`,
  RESET_PASSWORD = 'Reset password for user.',
  CHANGE_USER_INFO = `Change user's info.`,
  CHANGE_AVATAR = `Change user's avatar`,
}
