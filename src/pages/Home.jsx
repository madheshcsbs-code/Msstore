import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import styles from './Home.module.css';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroImageContainer}>
          {/* Replace with an actual premium hero image from assets */}
          <img 
            src="https://placehold.co/1920x1080/0a0a0a/252525?text=Cinematic+Automotive+Hero" 
            alt="Premium Automotive Frames" 
            className={styles.heroImage} 
          />
          <div className={styles.heroOverlay}></div>
        </div>
        
        <div className={`container ${styles.heroContent}`}>
          <h1 className={`h1 ${styles.heroTitle}`}>
            YOUR PASSION.<br />
            FRAMED TO PERFECTION.
          </h1>
          <p className={styles.heroSubtitle}>
            Premium automotive frames and diecast displays crafted for those who live and breathe cars.
          </p>
          <div className={styles.heroActions}>
            <Link to="/shop" className="btn-primary">Explore Collection</Link>
            <Link to="/shop?sort=featured" className="btn-secondary">Discover Bestsellers</Link>
          </div>
        </div>
      </section>

      {/* Collection Discovery Section */}
      <section className={`section-spacing container`}>
        <div className={styles.sectionHeader}>
          <h2 className="h2">FIND YOUR MACHINE.</h2>
          <p className="text-secondary">Explore frames inspired by legendary cars and motorsport.</p>
        </div>
        
        <div className={styles.collectionGrid}>
          <Link to="/shop?category=F1+Racing" className={styles.collectionCard}>
            <img src="https://placehold.co/800x600/1c1c1c/f5f5f5?text=F1+Racing" alt="F1 Racing" />
            <div className={styles.collectionInfo}>
              <h3>F1 Racing</h3>
              <span className={styles.exploreLink}>Explore</span>
            </div>
          </Link>
          
          <Link to="/shop?category=Diecast+Frames" className={styles.collectionCard}>
            <img src="https://placehold.co/800x600/1c1c1c/f5f5f5?text=Diecast+Frames" alt="Diecast Frames" />
            <div className={styles.collectionInfo}>
              <h3>Diecast Box Frames</h3>
              <span className={styles.exploreLink}>Explore</span>
            </div>
          </Link>
          
          <Link to="/shop?category=Premium+Frames" className={`${styles.collectionCard} ${styles.collectionWide}`}>
            <img src="https://placehold.co/1200x600/1c1c1c/f5f5f5?text=Supercar+Collection" alt="Supercar Collection" />
            <div className={styles.collectionInfo}>
              <h3>Supercar Collection</h3>
              <span className={styles.exploreLink}>Explore</span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className={`section-spacing container`}>
        <div className={styles.sectionHeader}>
          <h2 className="h2">BUILT FOR COLLECTORS.</h2>
          <p className="text-secondary">Find the perfect frame for your favourite automotive icons.</p>
        </div>
        
        <div className={styles.productGrid}>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className={styles.centerAction}>
          <Link to="/shop" className="btn-secondary">View All Products</Link>
        </div>
      </section>

      {/* Brand Story */}
      <section className={styles.brandStory}>
        <div className={`container ${styles.storyContainer}`}>
          <div className={styles.storyContent}>
            <h2 className="h2">MORE THAN A FRAME.<br/>A PASSION ON YOUR WALL.</h2>
            <p>
              From iconic supercars to legendary racing machines, discover automotive-inspired displays created for collectors and enthusiasts.
            </p>
            <Link to="/shop" className="btn-primary">View Collection</Link>
          </div>
          <div className={styles.storyImage}>
            <img src="https://placehold.co/800x800/1c1c1c/f5f5f5?text=Brand+Story+Image" alt="Gallery Wall" />
          </div>
        </div>
      </section>
    </div>
  );
}
