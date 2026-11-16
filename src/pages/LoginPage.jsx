import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import AuthShell from '../features/auth/AuthShell.jsx'
import Button from '../components/ui/Button.jsx'
import FormField from '../components/ui/FormField.jsx'
import Input from '../components/ui/Input.jsx'
import { useToast } from '../components/ui/ToastProvider.jsx'
import { AuthError } from '../features/auth/authErrors.js'
import { useAuth } from '../features/auth/useAuth.js'
import { emailRules, passwordRules } from '../features/auth/validation.js'

function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const showToast = useToast()
  const { login } = useAuth()
  const [formError, setFormError] = useState(null)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '', password: '' } })

  const onSubmit = async (values) => {
    setFormError(null)
    try {
      await login(values)
      showToast({ message: t('auth.login.success'), tone: 'success' })
      const state = /** @type {{ from?: string, sessionExpired?: boolean } | null} */ (
        location.state
      )
      const destination = state?.sessionExpired || !state?.from ? '/' : state.from
      navigate(destination, { replace: true })
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
      titleKey="auth.login.title"
      subtitleKey="auth.login.subtitle"
      footer={
        <>
          <Link to="/forgot-password">{t('auth.links.forgot')}</Link>
          <Link to="/register">{t('auth.links.register')}</Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {formError && (
          <p className="auth-form__alert" role="alert">
            {formError}
          </p>
        )}
        <FormField
          id="login-email"
          label={t('auth.fields.email')}
          error={errors.email?.message}
          required
        >
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder={t('auth.placeholders.email')}
            invalid={Boolean(errors.email)}
            {...register('email', emailRules(t))}
          />
        </FormField>
        <FormField
          id="login-password"
          label={t('auth.fields.password')}
          error={errors.password?.message}
          required
        >
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder={t('auth.placeholders.password')}
            invalid={Boolean(errors.password)}
            {...register('password', passwordRules(t))}
          />
        </FormField>
        <Button type="submit" loading={isSubmitting} className="auth-form__submit">
          {t('auth.login.submit')}
        </Button>
      </form>
    </AuthShell>
  )
}

export default LoginPage
