import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategoryCard = ({ category }) => {
  const themeCount = category._count ? category._count.themes : (category.themes ? category.themes.length : null);

  return (
    <Link to={`/category/${category.slug}`} className="category-card">
      <div className="category-image-wrap">
        <img
          src={category.coverImage}
          alt={category.name}
          loading="lazy"
        />
        <div className="category-overlay" />
        {themeCount !== null && (
          <div className="category-badge">
            <Sparkles size={12} style={{ display: 'inline', marginRight: '4px', color: 'var(--marigold)' }} />
            {themeCount} {themeCount === 1 ? 'Theme' : 'Themes'}
          </div>
        )}
      </div>

      <div className="category-content">
        <h3 className="category-title">{category.name}</h3>
        <p className="category-desc">{category.description}</p>
        <div className="category-action">
          <span>Explore Bespoke Packages</span>
          <ArrowRight size={18} />
        </div>
      </div>
    </Link>
  );
};
