'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { propertyAPI } from '../../services/api';
import './Properties.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    search: '',
    propertyType: '',
    division: '',
    district: '',
    minRent: '',
    maxRent: '',
    bedrooms: ''
  });

  // --- Autocomplete state ---
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const debounceTimer = useRef(null);
  const wrapperRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    setError('');

    try {
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.propertyType) params.propertyType = filters.propertyType;
      if (filters.division) params.division = filters.division;
      if (filters.district) params.district = filters.district;
      if (filters.minRent) params.minRent = filters.minRent;
      if (filters.maxRent) params.maxRent = filters.maxRent;
      if (filters.bedrooms) params.bedrooms = filters.bedrooms;

      const response = await propertyAPI.getAllProperties(params);
      setProperties(response.data.data.properties);
    } catch (err) {
      setError('Failed to load properties. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  // Called when user types in the search box
  const handleSearchInput = (e) => {
    const value = e.target.value;
    setFilters({ ...filters, search: value });

    // Clear previous timer
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (!value || value.trim().length < 1) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // Wait 300ms before fetching
    debounceTimer.current = setTimeout(async () => {
      setSuggestionsLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/api/search-suggestions?q=${encodeURIComponent(value.trim())}`
        );
        const data = await res.json();
        setSuggestions(data.data || []);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
      } finally {
        setSuggestionsLoading(false);
      }
    }, 300);
  };

  // When user clicks a suggestion
  const handleSuggestionClick = (suggestion) => {
    setFilters({ ...filters, search: suggestion });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    fetchProperties();
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      propertyType: '',
      division: '',
      district: '',
      minRent: '',
      maxRent: '',
      bedrooms: ''
    });
    setSuggestions([]);
    setShowSuggestions(false);
    setTimeout(() => fetchProperties(), 100);
  };

  return (
    <div className="properties-page">
      <div className="container">
        <div className="page-header">
          <h1>Browse Properties</h1>
          <p>Find your perfect rental home in Bangladesh</p>
        </div>

        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-bar">

              {/* --- AUTOCOMPLETE WRAPPER --- */}
              <div
                ref={wrapperRef}
                style={{ flex: 1, position: 'relative' }}
              >
                <div className="search-input-wrapper">
                  <img src="/search.png" alt="search" className="search-icon" />
                  <input
                    type="text"
                    name="search"
                    className="form-input search-input"
                    placeholder="Search by title, location, or description..."
                    value={filters.search}
                    onChange={handleSearchInput}
                    onFocus={() => {
                      if (suggestions.length > 0) setShowSuggestions(true);
                    }}
                    autoComplete="off"
                  />
                </div>

                {/* Dropdown */}
                {showSuggestions && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '0 0 8px 8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    maxHeight: '240px',
                    overflowY: 'auto'
                  }}>
                    {suggestionsLoading ? (
                      <div style={{ padding: '12px 16px', color: '#888', fontSize: '14px' }}>
                        Loading...
                      </div>
                    ) : suggestions.length === 0 ? (
                      <div style={{ padding: '12px 16px', color: '#888', fontSize: '14px' }}>
                        No locations found
                      </div>
                    ) : (
                      suggestions.map((s, i) => (
                        <div
                          key={i}
                          onMouseDown={() => handleSuggestionClick(s)}
                          style={{
                            padding: '10px 16px',
                            cursor: 'pointer',
                            fontSize: '15px',
                            color: '#1f2937',
                            borderBottom: i < suggestions.length - 1 ? '1px solid #f3f4f6' : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#f0f4ff'}
                          onMouseLeave={e => e.currentTarget.style.background = 'white'}
                        >
                          📍 {s}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
              {/* --- END AUTOCOMPLETE --- */}

              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>

            <div className="filters-grid">
              <select
                name="propertyType"
                className="form-select"
                value={filters.propertyType}
                onChange={handleFilterChange}
              >
                <option value="">Property Types(বাসার ধরন)</option>
                <option value="apartment">Apartment(ফ্লাট)</option>
                <option value="hostel">Hostel(হোস্টেল/মেস)</option>
                <option value="sublet">Sublet(সাবলেট)</option>
                <option value="room">Room(রুম)</option>
                <option value="house">House(বাড়ি)</option>
              </select>

              <select
                name="division"
                className="form-select"
                value={filters.division}
                onChange={handleFilterChange}
              >
                <option value="">All Divisions</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Khulna">Khulna</option>
                <option value="Barishal">Barishal</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Mymensingh">Mymensingh</option>
              </select>

              <input
                type="number"
                name="minRent"
                className="form-input"
                placeholder="Min Rent (BDT)"
                value={filters.minRent}
                onChange={handleFilterChange}
              />

              <input
                type="number"
                name="maxRent"
                className="form-input"
                placeholder="Max Rent (BDT)"
                value={filters.maxRent}
                onChange={handleFilterChange}
              />

              <select
                name="bedrooms"
                className="form-select"
                value={filters.bedrooms}
                onChange={handleFilterChange}
              >
                <option value="">Any Bedrooms</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          </form>
        </div>

        <div className="results-section">
          {loading ? (
            <div className="properties-grid">
               <SkeletonCard />
               <SkeletonCard />
               <SkeletonCard />
               <SkeletonCard />
               <SkeletonCard />
               <SkeletonCard />
            </div>
          ) : error ? (
            <div className="alert alert-error">{error}</div>
          ) : properties.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <img src="/house.png" alt="house Logo" style={{ width: '120px', height: 'auto', opacity: 1 }} />
              </div>
              <h3>No properties found</h3>
              <p>Try adjusting your search filters</p>
              <button className="btn btn-primary" onClick={clearFilters}>
                View All Properties
              </button>
            </div>
          ) : (
            <>
              <div className="results-header">
                <h3>{properties.length} Properties Found</h3>
              </div>

              <div className="properties-grid">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Skeleton card shown while loading
const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-location"></div>
        <div className="skeleton-features">
          <div className="skeleton skeleton-feature"></div>
          <div className="skeleton skeleton-feature"></div>
          <div className="skeleton skeleton-feature"></div>
        </div>
        <div className="skeleton-footer">
          <div className="skeleton skeleton-price"></div>
          <div className="skeleton skeleton-badge"></div>
        </div>
      </div>
    </div>
  );
};

const PropertyCard = ({ property }) => {
  const photoUrl = property.photos && property.photos.length > 0
    ? property.photos[0].url
    : 'https://via.placeholder.com/400x300?text=No+Image';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)}m ago`;
    return date.toLocaleDateString();
  };

  return (
    <Link href={`/properties/${property._id}`} className="property-card">
      <div className="property-image">
        <img src={photoUrl} alt={property.title} />
        <div className="property-badge">
          {property.propertyType}
        </div>
        <div className="posted-date-badge">
          <img src="/calendar.png" alt="calendar" className="date-badge-icon" style={{ width: '16px', height: '16px', marginRight: '4px' }} />
          {formatDate(property.createdAt)}
        </div>
      </div>

      <div className="property-info">
        <h3 className="property-title">{property.title}</h3>

        <div className="property-location">
          <img src="/location.png" alt="location" style={{ width: '16px', height: '16px', marginRight: '4px' }} />
          {property.location.area}, {property.location.district}
        </div>

        <div className="property-features">
          {property.features.bedrooms && (
            <span>
              <img src="/bed.png" alt="bed" style={{ width: '16px', height: '16px', marginRight: '4px' }} />
              {property.features.bedrooms} Bed
            </span>
          )}
          {property.features.bathrooms && (
            <span>
              <img src="/bath.png" alt="bath" style={{ width: '16px', height: '16px', marginRight: '4px' }} />
              {property.features.bathrooms} Bath
            </span>
          )}
          {property.features.size?.value && (
            <span>
              <img src="/area.png" alt="size" style={{ width: '16px', height: '16px', marginRight: '4px' }} />
              {property.features.size.value} {property.features.size.unit}
            </span>
          )}
        </div>

        <div className="property-footer">
          <div className="property-rent">
            <span className="rent-amount">
              ৳{property.rent.amount.toLocaleString()}
            </span>
            <span className="rent-period">/{property.rent.period}</span>
          </div>

          {property.isAvailable ? (
            <span className="badge badge-success">Available</span>
          ) : (
            <span className="badge badge-danger">Not Available</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Properties;