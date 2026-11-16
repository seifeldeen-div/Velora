/**
 * Shared react-hook-form validation rules for auth forms. Messages are i18n keys
 * resolved through the provided translate function, so no copy is embedded here.
 *
 * @param {(key: string) => string} t
 */
export function emailRules(t) {
  return {
    required: t('auth.errors.required'),
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: t('auth.errors.emailInvalid'),
    },
  }
}

/** @param {(key: string) => string} t */
export function passwordRules(t) {
  return {
    required: t('auth.errors.required'),
    minLength: { value: 8, message: t('auth.errors.passwordLength') },
  }
}

/** @param {(key: string) => string} t */
export function requiredRule(t) {
  return { required: t('auth.errors.required') }
}
