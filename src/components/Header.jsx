import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ cartItemCount, onOpenCart }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.headerContainer}`}>
        <button 
          className={styles.mobileMenuBtn}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/" className={styles.logo}>
          MS STORE
        </Link>

        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.navOpen : ''}`}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/shop" className={styles.navLink}>Shop All</Link>
          <Link to="/shop?category=Diecast+Frames" className={styles.navLink}>Diecast Frames</Link>
          <Link to="/shop?category=F1+Racing" className={styles.navLink}>F1 Collection</Link>
        </nav>

        <div className={styles.actions}>
          <button className={styles.actionBtn} aria-label="Search">
            <Search size={20} />
          </button>
          <button className={styles.cartBtn} onClick={onOpenCart} aria-label="Shopping Bag">
            <ShoppingBag size={20} />
            {cartItemCount > 0 && <span className={styles.cartBadge}>{cartItemCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
