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
import { emailRules, passwordRules, requiredRule } from '../features/auth/validation.js'

function RegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const showToast = useToast()
  const { register: registerUser } = useAuth()
  const [formError, setFormError] = useState(null)
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  })

  const onSubmit = async (values) => {
    setFormError(null)
    try {
      await registerUser(values)
      showToast({ message: t('auth.register.success'), tone: 'success' })
      const state = /** @type {{ from?: string } | null} */ (location.state)
      const destination = typeof state?.from === 'string' ? state.from : '/'
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
      titleKey="auth.register.title"
      subtitleKey="auth.register.subtitle"
      footer={<Link to="/login">{t('auth.links.login')}</Link>}
    >
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        {formError && (
          <p className="auth-form__alert" role="alert">
            {formError}
          </p>
        )}
        <FormField
          id="register-name"
          label={t('auth.fields.name')}
          error={errors.name?.message}
          required
        >
          <Input
            id="register-name"
            type="text"
            autoComplete="name"
            placeholder={t('auth.placeholders.name')}
            invalid={Boolean(errors.name)}
            {...register('name', requiredRule(t))}
          />
        </FormField>
        <FormField
          id="register-email"
          label={t('auth.fields.email')}
          error={errors.email?.message}
          required
        >
          <Input
            id="register-email"
            type="email"
            autoComplete="email"
            placeholder={t('auth.placeholders.email')}
            invalid={Boolean(errors.email)}
            {...register('email', emailRules(t))}
          />
        </FormField>
        <FormField
          id="register-password"
          label={t('auth.fields.password')}
          error={errors.password?.message}
          required
        >
          <Input
            id="register-password"
            type="password"
            autoComplete="new-password"
            placeholder={t('auth.placeholders.password')}
            invalid={Boolean(errors.password)}
            {...register('password', passwordRules(t))}
          />
        </FormField>
        <FormField
          id="register-password-confirmation"
          label={t('auth.fields.confirmPassword')}
          error={errors.password_confirmation?.message}
          required
        >
          <Input
            id="register-password-confirmation"
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
          {t('auth.register.submit')}
        </Button>
      </form>
    </AuthShell>
  )
}

export default RegisterPage
