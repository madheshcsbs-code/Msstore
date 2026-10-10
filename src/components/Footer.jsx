import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../utils/whatsapp';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.brandSection}>
          <h2 className={styles.brandLogo}>MS STORE</h2>
          <p className={styles.brandDescription}>
            Premium Automotive Frames, Diecast Displays and Motorsport Wall Art. 
            Crafted for those who live and breathe cars.
          </p>
        </div>
        
        <div className={styles.linksSection}>
          <h3 className={styles.linksHeading}>Shop</h3>
          <ul className={styles.linkList}>
            <li><Link to="/shop">All Products</Link></li>
            <li><Link to="/shop?category=Diecast+Frames">Diecast Frames</Link></li>
            <li><Link to="/shop?category=F1+Racing">F1 Collection</Link></li>
            <li><Link to="/shop?category=Premium+Frames">Premium Frames</Link></li>
          </ul>
        </div>

        <div className={styles.linksSection}>
          <h3 className={styles.linksHeading}>Information</h3>
          <ul className={styles.linkList}>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/shipping">Shipping Info</Link></li>
            <li><Link to="/returns">Returns Policy</Link></li>
          </ul>
        </div>

        <div className={styles.contactSection}>
          <h3 className={styles.linksHeading}>Contact</h3>
          {WHATSAPP_NUMBER !== "REPLACE_WITH_BUSINESS_NUMBER" ? (
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
          ) : (
            <div className={styles.devNotice}>
              WhatsApp ordering temporarily disabled. (Developer notice: Please configure WHATSAPP_NUMBER)
            </div>
          )}
        </div>
      </div>
      <div className={styles.copyright}>
        <p>&copy; {new Date().getFullYear()} MS Store. All rights reserved.</p>
      </div>
    </footer>
  );
}
