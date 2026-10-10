import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageCircle, ShoppingBag, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
import { products } from '../data/products';
import { createWhatsAppOrderLink, WHATSAPP_NUMBER } from '../utils/whatsapp';
import ProductCard from '../components/ProductCard';
import styles from './ProductDetails.module.css';

export default function ProductDetails({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product Not Found</h2>
        <button onClick={() => navigate('/shop')} className="btn-primary">Return to Shop</button>
      </div>
    );
  }

  // Related products (same category, exclude current)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Mock gallery - normally this would come from product data
  const gallery = [
    product.image,
    "https://placehold.co/600x800/1c1c1c/f5f5f5?text=Detail+View+1",
    "https://placehold.co/600x800/1c1c1c/f5f5f5?text=Detail+View+2"
  ];

  const handleOrderWhatsApp = (e) => {
    if (WHATSAPP_NUMBER === "REPLACE_WITH_BUSINESS_NUMBER") {
      e.preventDefault();
      alert("WhatsApp ordering is currently being configured.");
      return;
    }
  };

  return (
    <div className={styles.productPage}>
      <div className="container">
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          <ArrowLeft size={16} /> Back
        </button>

        <div className={styles.mainContent}>
          {/* Image Gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImageContainer}>
              <img 
                src={gallery[activeImage]} 
                alt={product.name} 
                className={styles.mainImage}
              />
              {product.originalPrice && <div className={styles.badge}>Sale</div>}
            </div>
            <div className={styles.thumbnailList}>
              {gallery.map((img, index) => (
                <button 
                  key={index} 
                  className={`${styles.thumbnail} ${activeImage === index ? styles.activeThumb : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.info}>
            <div className={styles.meta}>
              <span className={styles.category}>{product.category}</span>
            </div>
            
            <h1 className={styles.title}>{product.name}</h1>
            
            <div className={styles.pricing}>
              <span className={styles.currentPrice}>₹{product.price}</span>
              {product.originalPrice && (
                <span className={styles.originalPrice}>₹{product.originalPrice}</span>
              )}
            </div>

            <div className={styles.description}>
              <p>{product.description}</p>
            </div>

            {product.size && (
              <div className={styles.specification}>
                <strong>Size:</strong> {product.size}
              </div>
            )}

            <div className={styles.actionArea}>
              <div className={styles.quantitySelector}>
                <label>Quantity</label>
                <div className={styles.qtyControls}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <div className={styles.buttons}>
                <a 
                  href={createWhatsAppOrderLink(product, quantity)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-whatsapp ${styles.primaryAction}`}
                  onClick={handleOrderWhatsApp}
                >
                  <MessageCircle size={20} />
                  Order on WhatsApp
                </a>
                
                <button 
                  onClick={() => onAddToCart(product, quantity)}
                  className={`btn-secondary ${styles.secondaryAction}`}
                >
                  <ShoppingBag size={20} />
                  Add to Bag
                </button>
              </div>
            </div>

            <div className={styles.trustSignals}>
              <div className={styles.trustItem}>
                <ShieldCheck size={20} className={styles.trustIcon} />
                <span>Premium Quality Display</span>
              </div>
              <div className={styles.trustItem}>
                <Truck size={20} className={styles.trustIcon} />
                <span>Careful Packaging & Shipping</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className={styles.relatedSection}>
            <h2 className="h2">YOU MIGHT ALSO LIKE</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
