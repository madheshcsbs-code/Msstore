import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { createWhatsAppOrderLink, WHATSAPP_NUMBER } from '../utils/whatsapp';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const handleOrderWhatsApp = (e) => {
    if (WHATSAPP_NUMBER === "REPLACE_WITH_BUSINESS_NUMBER") {
      e.preventDefault();
      alert("WhatsApp ordering is currently being configured.");
      return;
    }
  };

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.image} loading="lazy" />
        {product.originalPrice && (
          <div className={styles.badge}>Sale</div>
        )}
      </Link>
      
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.category}>{product.category}</span>
          {product.size && <span className={styles.size}>{product.size}</span>}
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>
        
        <div className={styles.pricing}>
          <span className={styles.currentPrice}>₹{product.price}</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>₹{product.originalPrice}</span>
          )}
        </div>

        <div className={styles.actions}>
          <Link to={`/product/${product.id}`} className={`btn-secondary ${styles.viewBtn}`}>
            View
          </Link>
          <a 
            href={createWhatsAppOrderLink(product)} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`btn-whatsapp ${styles.waBtn}`}
            onClick={handleOrderWhatsApp}
          >
            <MessageCircle size={18} />
            Order
          </a>
        </div>
      </div>
    </div>
  );
}
