import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import AuthShell from '../features/auth/AuthShell.jsx'
import Button from '../components/ui/Button.jsx'
import FormField from '../components/ui/FormField.jsx'
import Input from '../components/ui/Input.jsx'
import { AuthError } from '../features/auth/authErrors.js'
import { useAuth } from '../features/auth/useAuth.js'
import { emailRules, passwordRules } from '../features/auth/validation.js'

function ResetPasswordPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const { resetPassword } = useAuth()
  const [formError, setFormError] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: '', password: '', password_confirmation: '' },
  })

  const onSubmit = async (values) => {
    setFormError(null)
    try {
      await resetPassword({ ...values, token })
      setSubmitted(true)
    } catch (error) {
      if (error instanceof AuthError) {
        const fieldEntries = Object.entries(error.fieldErrors)
        fieldEntries.forEach(([field, key]) => {
          setError(field, { type: 'server', message: t(key) })
        })
        if (!fieldEntries.length) {
          setFormError(t(`auth.errors.${error.code}`))
        }
      } else {
        setFormError(t('auth.errors.unknown'))
      }
    }
  }

  return (
    <AuthShell
      titleKey="auth.reset.title"
      subtitleKey="auth.reset.subtitle"
      footer={<Link to="/login">{t('auth.reset.backToLogin')}</Link>}
    >
      {submitted ? (
        <p className="auth-success" role="status">
          {t('auth.reset.success')}
        </p>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {formError && (
            <p className="auth-form__alert" role="alert">
              {formError}
            </p>
          )}
          <FormField
            id="reset-email"
            label={t('auth.fields.email')}
            error={errors.email?.message}
            required
          >
            <Input
              id="reset-email"
              type="email"
              autoComplete="email"
              placeholder={t('auth.placeholders.email')}
              invalid={Boolean(errors.email)}
              {...register('email', emailRules(t))}
            />
          </FormField>
          <FormField
            id="reset-password"
            label={t('auth.fields.password')}
            error={errors.password?.message}
            required
          >
            <Input
              id="reset-password"
              type="password"
              autoComplete="new-password"
              placeholder={t('auth.placeholders.password')}
              invalid={Boolean(errors.password)}
              {...register('password', passwordRules(t))}
            />
          </FormField>
          <FormField
            id="reset-password-confirmation"
            label={t('auth.fields.confirmPassword')}
            error={errors.password_confirmation?.message}
            required
          >
            <Input
              id="reset-password-confirmation"
              type="password"
              autoComplete="new-password"
              placeholder={t('auth.placeholders.confirmPassword')}
              invalid={Boolean(errors.password_confirmation)}
              {...register('password_confirmation', {
                required: t('auth.errors.required'),
                validate: (value) =>
                  value === getValues('password') || t('auth.errors.passwordMismatch'),
              })}
            />
          </FormField>
          <Button type="submit" loading={isSubmitting} className="auth-form__submit">
            {t('auth.reset.submit')}
          </Button>
        </form>
      )}
    </AuthShell>
  )
}

export default ResetPasswordPage
