"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import AdvancedRating from '../../components/AdvancedRating';

export default function DestinationsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('popularity');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [details, setDetails] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);
  const [bookedIds, setBookedIds] = useState<number[]>([]);
  const [toast, setToast] = useState<{ message: string; visible: boolean } | null>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    try {
      const saved = localStorage.getItem('bookedDestinations');
      if (saved) setBookedIds(JSON.parse(saved));
    } catch {}
  }, []);

  function isBooked(id: number) {
    return bookedIds.includes(id);
  }

  function bookDestination(dest: any) {
    if (isBooked(dest.id)) return;
    const next = [...bookedIds, dest.id];
    setBookedIds(next);
    try { localStorage.setItem('bookedDestinations', JSON.stringify(next)); } catch {}
    setToast({ message: `Booked ${dest.name} successfully!`, visible: true });
    setTimeout(() => setToast(null), 2500);
  }

  function cancelBooking(destId: number) {
    const next = bookedIds.filter(id => id !== destId);
    setBookedIds(next);
    try { localStorage.setItem('bookedDestinations', JSON.stringify(next)); } catch {}
    const dest = destinations.find(d => d.id === destId);
    setToast({ message: `Cancelled booking${dest ? ` for ${dest.name}` : ''}.`, visible: true });
    setTimeout(() => setToast(null), 2000);
  }

  const destinations = [
    {
      id: 1,
      name: "Swiss Alps",
      category: "mountain",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop",
      description: "Experience the breathtaking beauty of the Swiss Alps with world-class skiing, hiking, and luxury mountain resorts.",
      rating: 4.9,
      reviews: 1247,
      price: 1299,
      duration: "7 days",
      highlights: ["Mountain Views", "Skiing", "Luxury Hotels", "Swiss Cuisine"],
      bestTime: "December - March",
      difficulty: "Moderate",
      location: "Switzerland",
      featured: true,
      discount: 15
    },
    {
      id: 2,
      name: "Maldives",
      category: "beach",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1600&auto=format&fit=crop",
      description: "Discover paradise in the Maldives with crystal clear waters, pristine beaches, and overwater bungalows.",
      rating: 4.8,
      reviews: 2156,
      price: 2499,
      duration: "10 days",
      highlights: ["Beachfront", "Water Sports", "Luxury Resorts", "Island Hopping"],
      bestTime: "November - April",
      difficulty: "Easy",
      location: "Maldives",
      featured: true,
      discount: 20
    },
    {
      id: 3,
      name: "Tokyo, Japan",
      category: "city",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1600&auto=format&fit=crop",
      description: "Immerse yourself in the vibrant culture of Tokyo, from traditional temples to cutting-edge technology.",
      rating: 4.7,
      reviews: 1893,
      price: 899,
      duration: "6 days",
      highlights: ["Cultural Sites", "Modern Technology", "Shopping", "Japanese Cuisine"],
      bestTime: "March - May",
      difficulty: "Easy",
      location: "Japan",
      featured: false,
      discount: 0
    },
    {
      id: 4,
      name: "Safari Kenya",
      category: "adventure",
      image: "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=1600&auto=format&fit=crop",
      description: "Embark on an unforgettable safari adventure in Kenya's Masai Mara, home to the Big Five.",
      rating: 4.9,
      reviews: 892,
      price: 1899,
      duration: "8 days",
      highlights: ["Wildlife Viewing", "Luxury Lodges", "Cultural Experience", "Photography"],
      bestTime: "July - October",
      difficulty: "Moderate",
      location: "Kenya",
      featured: true,
      discount: 25
    },
    {
      id: 5,
      name: "Santorini, Greece",
      category: "island",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1600&auto=format&fit=crop",
      description: "Experience the magic of Santorini with its iconic white buildings, stunning sunsets, and Mediterranean charm.",
      rating: 4.8,
      reviews: 1678,
      price: 1599,
      duration: "7 days",
      highlights: ["Sunset Views", "Greek Islands", "Mediterranean Cuisine", "Beach Relaxation"],
      bestTime: "June - September",
      difficulty: "Easy",
      location: "Greece",
      featured: false,
      discount: 10
    },
    {
      id: 6,
      name: "Machu Picchu, Peru",
      category: "adventure",
      image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=1600&auto=format&fit=crop",
      description: "Journey to the ancient Incan citadel of Machu Picchu, one of the world's most mysterious archaeological sites.",
      rating: 4.9,
      reviews: 1345,
      price: 1299,
      duration: "9 days",
      highlights: ["Ancient Ruins", "Mountain Trekking", "Cultural History", "Scenic Views"],
      bestTime: "May - October",
      difficulty: "Challenging",
      location: "Peru",
      featured: false,
      discount: 0
    },
    {
      id: 7,
      name: "Bali, Indonesia",
      category: "island",
      image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=1600&auto=format&fit=crop",
      description: "Discover the spiritual and natural beauty of Bali with its temples, rice terraces, and pristine beaches.",
      rating: 4.6,
      reviews: 2341,
      price: 799,
      duration: "8 days",
      highlights: ["Temples", "Rice Terraces", "Beaches", "Spiritual Retreats"],
      bestTime: "April - October",
      difficulty: "Easy",
      location: "Indonesia",
      featured: false,
      discount: 15
    },
    {
      id: 8,
      name: "New York City, USA",
      category: "city",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1600&auto=format&fit=crop",
      description: "Experience the energy of the Big Apple with world-famous landmarks, Broadway shows, and diverse cuisine.",
      rating: 4.5,
      reviews: 3124,
      price: 1299,
      duration: "7 days",
      highlights: ["Landmarks", "Broadway", "Shopping", "Cultural Diversity"],
      bestTime: "September - November",
      difficulty: "Easy",
      location: "USA",
      featured: false,
      discount: 0
    },
    {
      id: 9,
      name: "Dubai, UAE",
      category: "city",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
      description: "Experience the luxury and grandeur of Dubai with its iconic skyscrapers, desert adventures, and world-class shopping.",
      rating: 4.7,
      reviews: 1892,
      price: 1499,
      duration: "7 days",
      highlights: ["Burj Khalifa", "Desert Safari", "Luxury Shopping", "Modern Architecture"],
      bestTime: "November - March",
      difficulty: "Easy",
      location: "UAE",
      featured: false,
      discount: 0
    }
  ];

  const categories = [
    { id: 'all', name: 'All Destinations', icon: '🌍', count: destinations.length },
    { id: 'mountain', name: 'Mountains', icon: '🏔️', count: destinations.filter(d => d.category === 'mountain').length },
    { id: 'beach', name: 'Beaches', icon: '🏖️', count: destinations.filter(d => d.category === 'beach').length },
    { id: 'city', name: 'Cities', icon: '🏙️', count: destinations.filter(d => d.category === 'city').length },
    { id: 'adventure', name: 'Adventure', icon: '🗺️', count: destinations.filter(d => d.category === 'adventure').length },
    { id: 'island', name: 'Islands', icon: '🏝️', count: destinations.filter(d => d.category === 'island').length }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Swiss Alps",
      rating: 5,
      comment: "Absolutely breathtaking! The Swiss Alps exceeded all expectations. Perfect for both adventure and relaxation.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=100&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Maldives",
      rating: 5,
      comment: "Paradise found! The overwater bungalows and crystal clear waters made this the trip of a lifetime.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Emma Wilson",
      location: "Tokyo",
      rating: 4,
      comment: "Fascinating blend of tradition and modernity. The food scene alone is worth the trip!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop"
    }
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = dest.price >= priceRange[0] && dest.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popularity':
      default:
        return b.reviews - a.reviews;
    }
  });

  const bookedDestinations = destinations.filter(d => bookedIds.includes(d.id));

  return (
    <div className="destinations-page">
      {/* Hero Section */}
      <section className="hero-section position-relative">
        <div className="hero-background position-absolute w-100 h-100">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop" 
            alt="Travel Destinations"
            className="w-100 h-100"
            style={{objectFit: 'cover'}}
          />
          <div className="hero-overlay position-absolute w-100 h-100"></div>
        </div>
        <div className="container position-relative">
          <div className="row min-vh-75 align-items-center">
            <div className="col-lg-8 text-white">
              <h1 className="display-4 fw-bold mb-4">Discover Amazing Destinations</h1>
              <p className="lead mb-4">Explore the world's most beautiful places, from pristine beaches to majestic mountains, vibrant cities to remote adventures.</p>
              <div className="hero-stats d-flex gap-4 mb-4">
                <div className="stat-item text-center">
                  <div className="stat-number h3 fw-bold">50+</div>
                  <div className="stat-label">Destinations</div>
                </div>
                <div className="stat-item text-center">
                  <div className="stat-number h3 fw-bold">10K+</div>
                  <div className="stat-label">Happy Travelers</div>
                </div>
                <div className="stat-item text-center">
                  <div className="stat-number h3 fw-bold">4.9</div>
                  <div className="stat-label">Average Rating</div>
                </div>
              </div>
              <div className="hero-actions">
                <a href="#destinations-grid" className="btn btn-light btn-lg me-3">
                  <span className="me-2">🗺️</span>
                  Explore Now
                </a>
                <a href="#testimonials" className="btn btn-outline-light btn-lg">
                  <span className="me-2">💬</span>
                  Read Reviews
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Modal (rendered in portal) */}
      {mounted && details && createPortal(
        (
          <div className="app-modal-overlay" role="dialog" aria-modal="true" onClick={() => setDetails(null)}>
            <div className="app-modal" onClick={(e) => e.stopPropagation()}>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="mb-0">{details.name}</h5>
                <button className="btn btn-ghost" onClick={() => setDetails(null)} aria-label="Close">✕</button>
              </div>

              <div className="mb-3">
                <img src={details.image} alt={details.name} style={{width: '100%', height: '240px', objectFit: 'cover', borderRadius: '12px'}} />
              </div>

              <div className="row g-3">
                <div className="col-md-7">
                  <p className="text-muted">{details.description}</p>
                  <div className="mb-3">
                    <AdvancedRating 
                      rating={details.rating} 
                      reviews={details.reviews} 
                      size="md"
                      showBreakdown={true}
                      animated={true}
                    />
                  </div>
                  <div className="mb-2">
                    {details.highlights?.map((h: string, i: number) => (
                      <span key={i} className="badge bg-light text-dark border me-1 mb-1">{h}</span>
                    ))}
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="bg-light rounded-3 p-3 border">
                    <div className="d-flex justify-content-between mb-2"><small className="text-muted">Location</small><span className="fw-semibold">{details.location}</span></div>
                    <div className="d-flex justify-content-between mb-2"><small className="text-muted">Best Time</small><span className="fw-semibold">{details.bestTime}</span></div>
                    <div className="d-flex justify-content-between mb-2"><small className="text-muted">Duration</small><span className="fw-semibold">{details.duration}</span></div>
                    <div className="d-flex justify-content-between mb-2"><small className="text-muted">Difficulty</small><span className="fw-semibold">{details.difficulty}</span></div>
                    <div className="d-flex justify-content-between align-items-center pt-2 mt-2 border-top">
                      <small className="text-muted">Price</small>
                      <div className="d-flex align-items-center gap-2">
                        {details.discount > 0 && (
                          <span className="text-muted text-decoration-line-through">${details.price}</span>
                        )}
                        <span className="fw-bold text-primary">${details.discount > 0 ? Math.round(details.price * (1 - details.discount / 100)) : details.price}</span>
                      </div>
                    </div>
                    <div className="d-flex gap-2 mt-3">
                      <button className="btn btn-outline-primary w-50">Add to Wishlist</button>
                      <button 
                        className="btn btn-primary w-50"
                        onClick={() => bookDestination(details)}
                        disabled={isBooked(details.id)}
                      >
                        {isBooked(details.id) ? 'Booked' : 'Book Now'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ),
        document.body
      )}

      {/* Enhanced Search and Filter Section */}
      <section className="search-section py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="search-box bg-white p-4 rounded-3 shadow-sm">
                <div className="row g-3">
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="🔍 Search destinations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <select 
                      className="form-select form-select-lg"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.icon} {cat.name} ({cat.count})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select 
                      className="form-select form-select-lg"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="popularity">📊 Most Popular</option>
                      <option value="rating">⭐ Highest Rated</option>
                      <option value="price-low">💰 Price: Low to High</option>
                      <option value="price-high">💰 Price: High to Low</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-primary btn-lg w-100">
                      <span className="me-2">🔍</span>
                      Search
                    </button>
                  </div>
                </div>
                
                {/* Price Range Slider */}
                <div className="row mt-3">
                  <div className="col-12">
                    <label className="form-label fw-semibold">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
                    <div className="d-flex align-items-center gap-3">
                      <input
                        type="range"
                        className="form-range flex-grow-1"
                        min="0"
                        max="5000"
                        step="100"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      />
                      <input
                        type="range"
                        className="form-range flex-grow-1"
                        min="0"
                        max="5000"
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Category Pills */}
      <section className="categories-section py-4">
        <div className="container">
          <div className="d-flex justify-content-center gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-outline-primary'} rounded-pill position-relative`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span className="me-2">{cat.icon}</span>
                {cat.name}
                <span className="badge bg-secondary ms-2">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Summary */}
      <section className="results-summary py-3 bg-primary bg-opacity-10">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h6 className="mb-0">
                <span className="text-primary fw-bold">{sortedDestinations.length}</span> destinations found
                {selectedCategory !== 'all' && (
                  <span className="text-muted"> in {categories.find(c => c.id === selectedCategory)?.name}</span>
                )}
              </h6>
            </div>
            <div className="col-md-6 text-md-end">
              <small className="text-muted">
                Showing {Math.min(sortedDestinations.length, 9)} of {destinations.length} destinations
              </small>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section id="destinations-grid" className="destinations-grid py-5">
        <div className="container">
          {bookedDestinations.length > 0 && (
            <>
              <div className="row mb-3 align-items-center">
                <div className="col-12 d-flex justify-content-between align-items-center">
                  <h3 className="h4 fw-bold mb-0">Your Booked Tours</h3>
                  <span className="badge bg-success bg-opacity-10 text-success border border-success">
                    {bookedDestinations.length} booked
                  </span>
                </div>
              </div>
              <div className="row g-4 mb-4">
                {bookedDestinations.map(dest => (
                  <div key={dest.id} className="col-lg-6">
                    <div className={`destination-card card h-100 border-0 shadow-sm`}> 
                      <div className="position-relative">
                        <img 
                          src={dest.image} 
                          className="card-img-top" 
                          style={{height: '220px', objectFit: 'cover'}} 
                          alt={dest.name} 
                        />
                        <div className="position-absolute top-0 start-0 m-3">
                          <span className="badge bg-success">Booked</span>
                        </div>
                        <div className="position-absolute bottom-0 start-0 m-3">
                          <div className="bg-white rounded-pill px-3 py-2 shadow-sm">
                            <AdvancedRating rating={dest.rating} reviews={dest.reviews} size="sm" animated={true} />
                          </div>
                        </div>
                      </div>
                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h5 className="card-title fw-bold mb-0">{dest.name}</h5>
                          <small className="text-muted">📍 {dest.location}</small>
                        </div>
                        <p className="card-text text-muted mb-3">{dest.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="price-info">
                            <small className="text-muted d-block">Paid</small>
                            <span className="h5 text-success fw-bold mb-0">${dest.discount > 0 ? Math.round(dest.price * (1 - dest.discount / 100)) : dest.price}</span>
                          </div>
                          <div className="action-buttons">
                            <button className="btn btn-primary me-2" onClick={() => setDetails(dest)}>View Details</button>
                            <button className="btn btn-outline-danger" onClick={() => cancelBooking(dest.id)}>Cancel Booking</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="my-4" />
            </>
          )}
          <div className="row g-4">
            {sortedDestinations.slice(0, 9).map(dest => (
              <div key={dest.id} className="col-lg-6 col-xl-4">
                <div className={`destination-card card h-100 border-0 shadow-sm ${dest.featured ? 'featured-destination' : ''}`}>
                  <div className="position-relative">
                    <img 
                      src={dest.image} 
                      className="card-img-top" 
                      style={{height: '250px', objectFit: 'cover'}} 
                      alt={dest.name} 
                    />
                    <div className="destination-badge position-absolute top-0 end-0 m-3">
                      <span className="badge bg-primary fs-6">{dest.category.toUpperCase()}</span>
                    </div>
                    {dest.featured && (
                      <div className="featured-badge position-absolute top-0 start-0 m-3">
                        <span className="badge bg-warning text-dark">⭐ Featured</span>
                      </div>
                    )}
                    {dest.discount > 0 && (
                      <div className="discount-badge position-absolute top-50 start-0 m-3">
                        <span className="badge bg-danger fs-6">-{dest.discount}%</span>
                      </div>
                    )}
                    <div className="destination-rating position-absolute bottom-0 start-0 m-3">
                      <div className="bg-white rounded-pill px-3 py-2 shadow-sm">
                        <AdvancedRating 
                          rating={dest.rating} 
                          reviews={dest.reviews} 
                          size="sm"
                          animated={true}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title fw-bold mb-0">{dest.name}</h5>
                      <small className="text-muted">📍 {dest.location}</small>
                    </div>
                    <p className="card-text text-muted mb-3">{dest.description}</p>
                    
                    <div className="destination-highlights mb-3">
                      {dest.highlights.slice(0, 3).map((highlight, index) => (
                        <span key={index} className="badge bg-light text-dark me-1 mb-1">
                          {highlight}
                        </span>
                      ))}
                      {dest.highlights.length > 3 && (
                        <span className="badge bg-secondary text-white">+{dest.highlights.length - 3} more</span>
                      )}
                    </div>

                    <div className="destination-meta d-flex justify-content-between align-items-center mb-3">
                      <div className="meta-item">
                        <small className="text-muted d-block">Best Time</small>
                        <span className="fw-semibold">{dest.bestTime}</span>
                      </div>
                      <div className="meta-item">
                        <small className="text-muted d-block">Duration</small>
                        <span className="fw-semibold">{dest.duration}</span>
                      </div>
                      <div className="meta-item">
                        <small className="text-muted d-block">Difficulty</small>
                        <span className="fw-semibold">{dest.difficulty}</span>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="price-info">
                        <small className="text-muted d-block">Starting from</small>
                        <div className="d-flex align-items-center gap-2">
                          {dest.discount > 0 && (
                            <span className="text-decoration-line-through text-muted">${dest.price}</span>
                          )}
                          <span className="h5 text-primary fw-bold mb-0">
                            ${dest.discount > 0 ? Math.round(dest.price * (1 - dest.discount / 100)) : dest.price}
                          </span>
                        </div>
                      </div>
                      <div className="action-buttons">
                        <button
                          className="btn btn-primary me-2"
                          onClick={() => setDetails(dest)}
                        >
                          View Details
                        </button>
                        <button 
                          className="btn btn-outline-primary"
                          onClick={() => bookDestination(dest)}
                          disabled={isBooked(dest.id)}
                        >
                          {isBooked(dest.id) ? 'Booked' : 'Book Now'}
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Details shown via modal; no in-card expand */}
                </div>
              </div>
            ))}
          </div>
          
          {/* Load More Button */}
          {sortedDestinations.length > 9 && (
            <div className="row mt-5">
              <div className="col-12 text-center">
                <button className="btn btn-outline-primary btn-lg">
                  <span className="me-2">📄</span>
                  Load More Destinations
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="h2 fw-bold">What Our Travelers Say</h2>
              <p className="text-muted">Real experiences from real travelers</p>
            </div>
          </div>
          <div className="row g-4">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="col-md-4">
                <div className="testimonial-card bg-white p-4 rounded-3 shadow-sm h-100">
                  <div className="d-flex align-items-center mb-3">
                    <img 
                      src={testimonial.avatar} 
                      className="rounded-circle me-3" 
                      style={{width: '50px', height: '50px', objectFit: 'cover'}} 
                      alt={testimonial.name} 
                    />
                    <div>
                      <h6 className="fw-bold mb-1">{testimonial.name}</h6>
                      <small className="text-muted">📍 {testimonial.location}</small>
                    </div>
                  </div>
                  <div className="mb-3">
                    <AdvancedRating 
                      rating={testimonial.rating} 
                      reviews={1} 
                      size="sm"
                      animated={true}
                    />
                  </div>
                  <p className="text-muted mb-0">"{testimonial.comment}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="h2 fw-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="lead mb-4">Join thousands of travelers who have discovered the world with us.</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button className="btn btn-light btn-lg">Browse All Destinations</button>
            <button className="btn btn-outline-light btn-lg">Get Travel Tips</button>
            <button className="btn btn-outline-light btn-lg">Contact Our Experts</button>
          </div>
        </div>
      </section>
      {toast?.visible && (
        <div 
          className="position-fixed bottom-0 end-0 m-4 bg-success text-white rounded-3 shadow-lg p-3"
          style={{ zIndex: 1080, animation: 'fadeIn 0.3s ease' }}
        >
          <div className="d-flex align-items-center gap-2">
            <span>✅</span>
            <span className="fw-semibold">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

