import { useState, useMemo, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import '../styles/shop.css';

const ALL_CATS = ['All', 'Men', 'Women', 'Sneakers', 'Accessories', 'Luxury'];

export default function Shop({
  cart,
  onAddToCart,
  onUpdateQty,
  onToggleWishlist,
  wishlist
}) {
  const location = useLocation();
  const filterPanelRef = useRef(null);

  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch]       = useState('');
  const [maxPrice, setMaxPrice]   = useState(60000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort]           = useState('default');
  const [filterOpen, setFilterOpen] = useState(false);

  // Sync URL params → state
  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const c = p.get('cat');
    const q = p.get('q');
    if (c && c !== 'new' && ALL_CATS.includes(c)) setActiveCat(c);
    else if (c === 'new') setActiveCat('All');
    if (q) setSearch(q);
  }, [location.search]);

  // Close filter panel on outside click
  useEffect(() => {
    const handler = (e) => {
      if (filterPanelRef.current && !filterPanelRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    if (filterOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [filterOpen]);

  const filtered = useMemo(() => {
    let list = products.filter(p => {
      const matchCat    = activeCat === 'All' || p.category === activeCat;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.category.toLowerCase().includes(search.toLowerCase());
      const matchPrice  = p.price <= maxPrice;
      const matchRating = p.rating >= minRating;
      return matchCat && matchSearch && matchPrice && matchRating;
    });
    if (sort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'newest')     list = products.filter(p => p.badge === 'New')
                                       .concat(list.filter(p => p.badge !== 'New'));
    return list;
  }, [activeCat, search, maxPrice, minRating, sort]);

  const clearFilters = () => {
    setActiveCat('All');
    setSearch('');
    setMaxPrice(60000);
    setMinRating(0);
    setSort('default');
  };

  const activeFilterCount = (activeCat !== 'All' ? 1 : 0) +
    (maxPrice < 60000 ? 1 : 0) + (minRating > 0 ? 1 : 0);

  return (
    <div className="shop-page">

      {/* ── Page header ── */}
      <div className="shop-page-header">
        <div className="container">
          <span className="section-eyebrow">Our Store</span>
          <h1 className="shop-page-title">
            {activeCat === 'All' ? 'All Collections' : activeCat}
          </h1>
          <p className="shop-page-sub">
            {filtered.length} premium fashion piece{filtered.length !== 1 ? 's' : ''} curated just for you.
          </p>
        </div>
      </div>

      <div className="container">

        {/* ── Top toolbar ── */}
        <div className="shop-toolbar">

          {/* Category pills */}
          <div className="shop-cat-pills">
            {ALL_CATS.map(cat => (
              <button
                key={cat}
                className={`cat-pill${activeCat === cat ? ' active' : ''}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
                <span className="cat-pill-count">
                  {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                </span>
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="shop-toolbar-right">
            {/* Search */}
            <div className="shop-search">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button className="search-clear" onClick={() => setSearch('')}>✕</button>
              )}
            </div>

            {/* Sort */}
            <select className="shop-sort" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="default">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price ↑</option>
              <option value="price-desc">Price ↓</option>
              <option value="rating">Top Rated</option>
            </select>

            {/* Filter toggle */}
            <div className="filter-toggle-wrap" ref={filterPanelRef}>
              <button
                className={`filter-toggle-btn${filterOpen ? ' open' : ''}${activeFilterCount > 0 ? ' has-filters' : ''}`}
                onClick={() => setFilterOpen(o => !o)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="4" y1="6" x2="20" y2="6"/>
                  <line x1="8" y1="12" x2="20" y2="12"/>
                  <line x1="12" y1="18" x2="20" y2="18"/>
                </svg>
                Filters
                {activeFilterCount > 0 && (
                  <span className="filter-active-dot">{activeFilterCount}</span>
                )}
              </button>

              {/* Dropdown filter panel */}
              {filterOpen && (
                <div className="filter-panel">
                  <div className="filter-panel-header">
                    <span>Refine Results</span>
                    <button className="filter-panel-clear" onClick={clearFilters}>Clear all</button>
                  </div>

                  <div className="filter-panel-section">
                    <div className="filter-panel-label">Max Price</div>
                    <input
                      type="range"
                      className="price-range-input"
                      min={500} max={60000} step={500}
                      value={maxPrice}
                      onChange={e => setMaxPrice(Number(e.target.value))}
                    />
                    <div className="price-range-labels">
                      <span>₹500</span>
                      <span className="price-val">₹{maxPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="filter-panel-section">
                    <div className="filter-panel-label">Minimum Rating</div>
                    <div className="rating-pill-row">
                      {[0, 4, 4.5, 4.8].map(r => (
                        <button
                          key={r}
                          className={`rating-pill${minRating === r ? ' active' : ''}`}
                          onClick={() => setMinRating(r)}
                        >
                          {r === 0 ? 'All' : `${r}★+`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button className="filter-panel-apply" onClick={() => setFilterOpen(false)}>
                    Show {filtered.length} Results
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Results count ── */}
        <div className="shop-results-bar">
          <span className="results-info">
            Showing <strong>{filtered.length}</strong> of {products.length} products
            {activeCat !== 'All' && <> in <strong>{activeCat}</strong></>}
          </span>
          {activeFilterCount > 0 && (
            <button className="clear-filters-link" onClick={clearFilters}>
              ✕ Clear filters
            </button>
          )}
        </div>

        {/* ── Product grid ── */}
        <div className="shop-grid">
          {filtered.length > 0 ? (
            filtered.map(p => (
              <ProductCard
  key={p.id}
  product={p}
  cart={cart}
  onAddToCart={onAddToCart}
  onUpdateQty={onUpdateQty}
  onToggleWishlist={onToggleWishlist}
  isWishlisted={wishlist?.some(w => w.id === p.id)}
/>
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search term.</p>
              <button className="btn-pink" style={{ marginTop: 20 }} onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
