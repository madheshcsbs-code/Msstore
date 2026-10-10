import { X, Minus, Plus, MessageCircle, ShoppingBag } from 'lucide-react';
import { createWhatsAppCartLink, WHATSAPP_NUMBER } from '../utils/whatsapp';
import styles from './CartDrawer.module.css';

export default function CartDrawer({ isOpen, onClose, cartItems, updateQuantity, removeFromCart }) {
  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleOrderWhatsApp = (e) => {
    if (WHATSAPP_NUMBER === "REPLACE_WITH_BUSINESS_NUMBER") {
      e.preventDefault();
      alert("WhatsApp ordering is currently being configured.");
      return;
    }
  };

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={onClose} />
      <div className={`${styles.drawer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Your Bag</h2>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close cart">
            <X size={24} />
          </button>
        </div>

        <div className={styles.content}>
          {cartItems.length === 0 ? (
            <div className={styles.empty}>
              <ShoppingBag size={48} className={styles.emptyIcon} />
              <p>Your bag is empty.</p>
              <button onClick={onClose} className="btn-primary">Continue Shopping</button>
            </div>
          ) : (
            <ul className={styles.itemList}>
              {cartItems.map(item => (
                <li key={item.product.id} className={styles.item}>
                  <img src={item.product.image} alt={item.product.name} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName}>{item.product.name}</h3>
                    <p className={styles.itemPrice}>₹{item.product.price}</p>
                    <div className={styles.itemActions}>
                      <div className={styles.quantity}>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className={styles.qtyBtn}
                        >
                          <Minus size={14} />
                        </button>
                        <span className={styles.qtyValue}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className={styles.qtyBtn}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className={styles.removeBtn}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.summary}>
              <span>Total</span>
              <span className={styles.totalPrice}>₹{total}</span>
            </div>
            <a 
              href={createWhatsAppCartLink(cartItems)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              onClick={handleOrderWhatsApp}
            >
              <MessageCircle size={20} />
              Order on WhatsApp
            </a>
            <p className={styles.disclaimer}>Complete your order via WhatsApp chat.</p>
          </div>
        )}
      </div>
    </>
  );
}
