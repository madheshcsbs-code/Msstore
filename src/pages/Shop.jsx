import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import { Search, SlidersHorizontal } from 'lucide-react';
import styles from './Shop.module.css';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All Products';
  const initialSort = searchParams.get('sort') || 'featured';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState(initialSort);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSearchParams(category === 'All Products' ? {} : { category });
    setIsMobileFiltersOpen(false);
  };

  // Filter and sort products
  let filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All Products' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className={styles.shop}>
      <div className={styles.shopHeader}>
        <div className="container">
          <h1 className="h1">THE COLLECTION</h1>
        </div>
      </div>

      <div className={`container ${styles.shopContainer}`}>
        {/* Mobile Filter Toggle */}
        <div className={styles.mobileToolbar}>
          <button 
            className={styles.filterToggleBtn}
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          >
            <SlidersHorizontal size={20} />
            Filters & Sorting
          </button>
        </div>

        {/* Sidebar Filters */}
        <aside className={`${styles.sidebar} ${isMobileFiltersOpen ? styles.sidebarOpen : ''}`}>
          <div className={styles.filterSection}>
            <div className={styles.searchBox}>
              <Search size={18} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Categories</h3>
            <ul className={styles.filterList}>
              {categories.map(category => (
                <li key={category}>
                  <button 
                    className={`${styles.filterBtn} ${activeCategory === category ? styles.activeFilter : ''}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Sort By</h3>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.sortSelect}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </aside>

        {/* Product Grid */}
        <main className={styles.mainContent}>
          <div className={styles.resultsMeta}>
            <span>Showing {filteredProducts.length} results {activeCategory !== 'All Products' && `for ${activeCategory}`}</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className={styles.productGrid}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3 className="h3">No products found</h3>
              <p className="text-secondary">Try adjusting your filters or search query.</p>
              <button 
                className="btn-secondary" 
                onClick={() => {
                  setSearchQuery('');
                  handleCategoryChange('All Products');
                }}
                style={{ marginTop: '1rem' }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
