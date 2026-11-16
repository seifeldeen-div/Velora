import { useMemo, useState } from 'react'
import { I18nextProvider, useTranslation } from 'react-i18next'
import i18n from '../i18n.js'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import ConfirmDialog from '../components/ui/ConfirmDialog.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import ErrorMessage from '../components/ui/ErrorMessage.jsx'
import FormField from '../components/ui/FormField.jsx'
import Header from '../components/layout/Header.jsx'
import Input from '../components/ui/Input.jsx'
import Modal from '../components/ui/Modal.jsx'
import PriceDisplay from '../components/ui/PriceDisplay.jsx'
import ProductCard from '../components/ui/ProductCard.jsx'
import QuantitySelector from '../components/ui/QuantitySelector.jsx'
import RatingDisplay from '../components/ui/RatingDisplay.jsx'
import Select from '../components/ui/Select.jsx'
import Skeleton from '../components/ui/Skeleton.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import Footer from '../components/layout/Footer.jsx'
import { ScrollReveal, ShinyText } from '../components/effects/Effects.jsx'
import { useToast } from '../components/ui/ToastProvider.jsx'

/** @param {{ language: 'en' | 'ar', viewport: 'desktop' | 'mobile' }} props */
function ShowcasePanel({ language, viewport }) {
  const { t } = useTranslation()
  const showToast = useToast()
  const [quantity, setQuantity] = useState(2)
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const product = {
    id: 'preview',
    name: t('showcase.sampleProduct'),
    category: t('showcase.sampleCategory'),
    price: 1790,
    rating: 4.8,
    reviewCount: 16,
  }

  return (
    <section
      className={`showcase-preview showcase-preview--${viewport}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      lang={language}
      data-viewport={viewport}
    >
      <p className="showcase-preview__label">
        {t('showcase.locale', {
          language: t(`showcase.${language === 'ar' ? 'arabic' : 'english'}`),
          viewport: t(`showcase.${viewport}`),
        })}
      </p>
      <Header
        forceMobile={viewport === 'mobile'}
        mainId={`showcase-content-${language}-${viewport}`}
      />
      <div
        className="showcase-preview__content"
        id={`showcase-content-${language}-${viewport}`}
      >
        <h2>{t('showcase.title')}</h2>
        <div className="showcase-section">
          <h3>{t('showcase.buttons')}</h3>
          <div className="showcase-row">
            <Button>{t('common.confirm')}</Button>
            <Button variant="secondary">{t('common.cancel')}</Button>
            <Button variant="ghost">{t('showcase.buttons')}</Button>
            <Button loading>{t('common.loading')}</Button>
          </div>
        </div>

        <div className="showcase-section">
          <h3>{t('showcase.formControls')}</h3>
          <div className="showcase-form">
            <FormField
              id={`${language}-${viewport}-email`}
              label={t('forms.email')}
              error={t('forms.emailError')}
              required
            >
              <Input
                id={`${language}-${viewport}-email`}
                type="email"
                placeholder={t('forms.emailPlaceholder')}
                invalid
              />
            </FormField>
            <FormField
              id={`${language}-${viewport}-size`}
              label={t('showcase.selectLabel')}
            >
              <Select
                id={`${language}-${viewport}-size`}
                defaultValue=""
                options={[
                  { value: '', label: t('showcase.selectOption') },
                  { value: 'small', label: t('showcase.selectSmall') },
                  { value: 'medium', label: t('showcase.selectMedium') },
                ]}
              />
            </FormField>
          </div>
        </div>

        <div className="showcase-section">
          <h3>{t('showcase.badges')}</h3>
          <div className="showcase-row">
            <Badge>{t('showcase.badges')}</Badge>
            <Badge tone="accent">{t('product.viewDetails')}</Badge>
            <Badge tone="success">{t('common.confirm')}</Badge>
            <Badge tone="warning">{t('showcase.selectLabel')}</Badge>
            <Badge tone="danger">{t('feedback.errorTitle')}</Badge>
          </div>
        </div>

        <div className="showcase-section">
          <h3>{t('showcase.card')}</h3>
          <Card className="showcase-surface">
            <p>{t('showcase.description')}</p>
            <PriceDisplay amount={1790} />
          </Card>
        </div>

        <div className="showcase-section">
          <h3>{t('showcase.spinner')}</h3>
          <div className="showcase-row">
            <Spinner size="sm" />
            <Spinner />
            <Spinner size="lg" />
          </div>
        </div>

        <div className="showcase-section">
          <h3>{t('showcase.modal')}</h3>
          <div className="showcase-row">
            <Button variant="secondary" onClick={() => setModalOpen(true)}>
              {t('showcase.openModal')}
            </Button>
            <Button variant="secondary" onClick={() => setConfirmOpen(true)}>
              {t('showcase.openConfirm')}
            </Button>
          </div>
          <Modal
            open={modalOpen}
            title={t('showcase.modalTitle')}
            onClose={() => setModalOpen(false)}
          >
            <p>{t('showcase.modalMessage')}</p>
          </Modal>
          <ConfirmDialog
            open={confirmOpen}
            title={t('showcase.confirmTitle')}
            message={t('showcase.confirmMessage')}
            confirmLabel={t('showcase.confirmAction')}
            cancelLabel={t('showcase.confirmCancel')}
            onConfirm={() => setConfirmOpen(false)}
            onCancel={() => setConfirmOpen(false)}
          />
        </div>

        <div className="showcase-section">
          <h3>{t('showcase.toast')}</h3>
          <Button
            variant="secondary"
            onClick={() =>
              showToast({ message: t('showcase.toastMessage'), tone: 'success' })
            }
          >
            {t('showcase.showToast')}
          </Button>
        </div>

        <div className="showcase-section">
          <h3>{t('showcase.product')}</h3>
          <div className="showcase-product">
            <ProductCard product={product} />
            <div className="showcase-product__details">
              <PriceDisplay amount={1790} />
              <RatingDisplay rating={product.rating} reviewCount={product.reviewCount} />
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                max={8}
              />
            </div>
          </div>
        </div>

        <div className="showcase-section">
          <h3>{t('showcase.empty')}</h3>
          <EmptyState
            title={t('feedback.emptyTitle')}
            description={t('feedback.emptyDescription')}
          />
        </div>

        <div className="showcase-section">
          <h3>{t('showcase.error')}</h3>
          <ErrorMessage
            message={t('feedback.errorDescription')}
            onRetry={() =>
              showToast({ message: t('feedback.retry'), tone: 'info' })
            }
          />
        </div>

        <div className="showcase-section">
          <h3>{t('showcase.skeleton')}</h3>
          <Skeleton lines={3} />
          <div className="showcase-row">
            <Skeleton variant="circle" />
            <Skeleton variant="media" className="showcase-skeleton-media" />
            <Skeleton variant="card" className="showcase-skeleton-card" />
          </div>
        </div>

        <div className="showcase-section">
          <h3>{t('showcase.effects')}</h3>
          <Card>
            <ShinyText>{t('showcase.effectText')}</ShinyText>
          </Card>
          <ScrollReveal>
            <Card>{t('showcase.footerNote')}</Card>
          </ScrollReveal>
        </div>
      </div>
      <Footer />
    </section>
  )
}

/** Render the shared UI across both locales and responsive preview widths. */
function ComponentsShowcase() {
  const { t } = useTranslation()
  const localeInstances = useMemo(
    () => ({
      en: i18n.cloneInstance({ lng: 'en' }),
      ar: i18n.cloneInstance({ lng: 'ar' }),
    }),
    [],
  )

  return (
    <main className="components-showcase">
      <header className="components-showcase__intro">
        <h1>{t('showcase.title')}</h1>
        <p>{t('showcase.description')}</p>
      </header>
      <div className="components-showcase__grid">
        {['en', 'ar'].flatMap((language) =>
          ['desktop', 'mobile'].map((viewport) => (
            <I18nextProvider
              key={`${language}-${viewport}`}
              i18n={localeInstances[language]}
            >
              <ShowcasePanel language={language} viewport={viewport} />
            </I18nextProvider>
          )),
        )}
      </div>
    </main>
  )
}

export default ComponentsShowcase
