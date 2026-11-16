import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Badge from './Badge.jsx'
import PriceDisplay from './PriceDisplay.jsx'
import RatingDisplay from './RatingDisplay.jsx'

/**
 * @typedef {{
 *   id: string | number,
 *   name: string,
 *   price: number,
 *   imageUrl?: string,
 *   category?: string,
 *   badge?: string,
 *   rating?: number,
 *   reviewCount?: number
 * }} ProductCardProduct
 */

/** @param {{ product: ProductCardProduct }} props */
function ProductCard({ product }) {
  const { t } = useTranslation()

  return (
    <article className="product-card">
      <Link
        className="product-card__image-link"
        to={`/products/${product.id}`}
        aria-label={t('product.viewDetailsFor', { name: product.name })}
      >
        {product.imageUrl ? (
          <img
            className="product-card__image"
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
          />
        ) : (
          <span className="product-card__image-placeholder" aria-hidden="true" />
        )}
      </Link>
      <div className="product-card__body">
        {product.badge && <Badge tone="accent">{product.badge}</Badge>}
        {product.category && (
          <p className="product-card__category">{product.category}</p>
        )}
        <h2 className="product-card__title">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h2>
        {typeof product.rating === 'number' && (
          <RatingDisplay
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        )}
        <PriceDisplay amount={product.price} className="product-card__price" />
        <Link
          className="ui-button ui-button--secondary product-card__details"
          to={`/products/${product.id}`}
        >
          {t('product.viewDetails')}
        </Link>
      </div>
    </article>
  )
}

export default ProductCard
