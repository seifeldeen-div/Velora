import { useTranslation } from 'react-i18next'
import Icon from '../Icon.jsx'

/** @param {{ value: number, onChange: (value: number) => void, min?: number, max?: number, disabled?: boolean }} props */
function QuantitySelector({ value, onChange, min = 1, max = Infinity, disabled = false }) {
  const { t } = useTranslation()

  return (
    <div className="quantity-selector">
      <button
        type="button"
        className="ui-icon-button"
        aria-label={t('quantity.decrease')}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || value <= min}
      >
        <Icon name="minus" />
      </button>
      <output className="quantity-selector__value" aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        className="ui-icon-button"
        aria-label={t('quantity.increase')}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || value >= max}
      >
        <Icon name="plus" />
      </button>
    </div>
  )
}

export default QuantitySelector
