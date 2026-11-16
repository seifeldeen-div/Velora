import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import AuthShell from '../features/auth/AuthShell.jsx'
import Button from '../components/ui/Button.jsx'
import FormField from '../components/ui/FormField.jsx'
import Input from '../components/ui/Input.jsx'
import { AuthError } from '../features/auth/authErrors.js'
import { useAuth } from '../features/auth/useAuth.js'
import { emailRules } from '../features/auth/validation.js'

function ForgotPasswordPage() {
  const { t } = useTranslation()
  const { requestPasswordReset } = useAuth()
  const [formError, setFormError] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '' } })

  const onSubmit = async (values) => {
    setFormError(null)
    try {
      await requestPasswordReset(values.email)
      setSubmitted(true)
    } catch (error) {
      setFormError(
        error instanceof AuthError
          ? t(`auth.errors.${error.code}`)
          : t('auth.errors.unknown'),
      )
    }
  }

  return (
    <AuthShell
      titleKey="auth.forgot.title"
      subtitleKey="auth.forgot.subtitle"
      footer={<Link to="/login">{t('auth.forgot.backToLogin')}</Link>}
    >
      {submitted ? (
        <p className="auth-success" role="status">
          {t('auth.forgot.success')}
        </p>
      ) : (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {formError && (
            <p className="auth-form__alert" role="alert">
              {formError}
            </p>
          )}
          <FormField
            id="forgot-email"
            label={t('auth.fields.email')}
            error={errors.email?.message}
            required
          >
            <Input
              id="forgot-email"
              type="email"
              autoComplete="email"
              placeholder={t('auth.placeholders.email')}
              invalid={Boolean(errors.email)}
              {...register('email', emailRules(t))}
            />
          </FormField>
          <Button type="submit" loading={isSubmitting} className="auth-form__submit">
            {t('auth.forgot.submit')}
          </Button>
        </form>
      )}
    </AuthShell>
  )
}

export default ForgotPasswordPage
