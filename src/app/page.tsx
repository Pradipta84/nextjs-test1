"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import NetworkStatus from "../components/NetworkStatus";
import Search from "../components/Search";
import HeaderNav from "../components/HeaderNav";
import Destinations from "../components/Destinations";
import DateTimeBar from "../components/DateTimeBar";

export default function Home() {
  // Live countdown for Hot Deals (24h rolling timer)
  const [deadlineMs, setDeadlineMs] = useState<number>(() => Date.now() + 24 * 60 * 60 * 1000);
  const [countdown, setCountdown] = useState<{ hours: string; minutes: string; seconds: string }>(() => ({
    hours: "24",
    minutes: "00",
    seconds: "00",
  }));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      let remaining = deadlineMs - now;
      if (remaining <= 0) {
        // Restart a new 24h window automatically
        const nextDeadline = now + 24 * 60 * 60 * 1000;
        setDeadlineMs(nextDeadline);
        remaining = nextDeadline - now;
      }
      const totalSeconds = Math.floor(remaining / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setCountdown({
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [deadlineMs]);

  // Scroll to top button state
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Ensure carousel auto-plays with smooth transitions
  useEffect(() => {
    // Initialize Bootstrap carousel with custom settings
    const carousel = document.getElementById('heroCarousel');
    if (carousel) {
      // The carousel will auto-play every 3.5 seconds due to data-bs-interval="3500"
      // Bootstrap handles the rest automatically
    }

    // Header scroll effects and scroll to top button
    const handleScroll = () => {
      const header = document.querySelector('.advanced-header');
      const progressBar = document.querySelector('.progress-fill') as HTMLElement;
      
      if (header && progressBar) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Add scrolled class for background effect
        if (scrollTop > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        
        // Update progress bar
        progressBar.style.width = `${scrollPercent}%`;
      }

      // Show/hide scroll to top button
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function with smooth behavior
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Advanced Header */}
      <header className="advanced-header sticky-top">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            {/* Enhanced Brand */}
            <a className="navbar-brand advanced-brand d-flex align-items-center gap-3" href="/">
              <div className="brand-icon-wrapper">
                <span className="brand-icon">✈️</span>
                <div className="brand-glow"></div>
              </div>
              <div className="brand-text">
                <span className="brand-title">Tour</span>
                <span className="brand-subtitle">Adventures</span>
              </div>
            </a>
            
            {/* Secondary Navigation */}
            <div className="secondary-nav d-none d-lg-flex align-items-center gap-4 ms-4">
              <div className="nav-divider"></div>
              <a href="#deals" className="secondary-nav-item">
                <span className="secondary-nav-icon">🔥</span>
                <span className="secondary-nav-text">Hot Deals</span>
                <span className="secondary-nav-badge">New</span>
              </a>
              <a href="#blog" className="secondary-nav-item">
                <span className="secondary-nav-icon">📝</span>
                <span className="secondary-nav-text">Travel Blog</span>
              </a>
              <a href="#gallery" className="secondary-nav-item">
                <span className="secondary-nav-icon">🖼️</span>
                <span className="secondary-nav-text">Gallery</span>
              </a>
              <div className="nav-divider"></div>
            </div>
            
            {/* Enhanced Toggle Button */}
            <button className="navbar-toggler advanced-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="toggler-line"></span>
              <span className="toggler-line"></span>
              <span className="toggler-line"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
              <HeaderNav />
              
              <div className="d-flex align-items-center gap-3 ms-auto">
                <div className="d-none d-md-block me-3" style={{width: '220px'}}>
                  <Search />
                </div>

                <NetworkStatus />
                <ThemeToggle />

                <a href="#" className="btn btn-outline-primary advanced-btn d-none d-sm-inline-flex">
                  <span className="btn-text">Sign in</span>
                  <span className="btn-icon">→</span>
                </a>
                <a href="/get-started" className="btn btn-primary advanced-btn-primary">
                  <span className="btn-text">Get started</span>
                  <span className="btn-sparkle">✨</span>
                </a>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Progress Bar */}
        <div className="header-progress">
          <div className="progress-fill"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow-1">
        <div className="container py-4">
        <DateTimeBar />
          
          {/* Hero Section */}
          <section className="text-center py-5 my-4">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <h1 className="display-4 fw-bold mb-3 hero-heading">Find your next adventure.</h1>
                <p className="lead mb-4">Curated tours and destinations around the world. Discover beaches, cities, and safaris — plan with ease and travel beautifully.</p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <a href="/destinations" className="btn btn-primary btn-lg">Explore Destinations</a>
                  <a href="#tours" className="btn btn-outline-light btn-lg">View Tours</a>
                </div>
              </div>
            </div>
            
            {/* Hero Image Slider */}
            <div className="mt-5">
              <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3500">
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
                  <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
                  <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
                  <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="3"></button>
                </div>
                <div className="carousel-inner rounded-3 overflow-hidden shadow">
                  <div className="carousel-item active">
                    <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop" className="d-block w-100" style={{height: '400px', objectFit: 'cover'}} alt="Swiss Alps" />
                    <div className="carousel-caption custom-carousel-caption">
                      <h5 className="carousel-title">Swiss Alps</h5>
                      <p className="carousel-subtitle">Mountain Escape</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop" className="d-block w-100" style={{height: '400px', objectFit: 'cover'}} alt="Bali Beach" />
                    <div className="carousel-caption custom-carousel-caption">
                      <h5 className="carousel-title">Bali, Indonesia</h5>
                      <p className="carousel-subtitle">Beach Bliss</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1600&auto=format&fit=crop" className="d-block w-100" style={{height: '400px', objectFit: 'cover'}} alt="New York City" />
                    <div className="carousel-caption custom-carousel-caption">
                      <h5 className="carousel-title">New York, USA</h5>
                      <p className="carousel-subtitle">City Lights</p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=1600&auto=format&fit=crop" className="d-block w-100" style={{height: '400px', objectFit: 'cover'}} alt="Sahara Desert" />
                    <div className="carousel-caption custom-carousel-caption">
                      <h5 className="carousel-title">Sahara Desert</h5>
                      <p className="carousel-subtitle">Desert Safari</p>
                    </div>
                  </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon"></span>
                </button>
              </div>
            </div>
          </section>

          {/* Destinations Section */}
          <section id="destinations" className="py-5">
            <div className="row">
              <div className="col-12">
                <h2 className="h2 fw-bold mb-3">Top Destinations</h2>
                <p className="text-muted mb-4">From tropical escapes to iconic cities.</p>
                <Destinations />
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-5">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h2 className="h2 fw-bold mb-4">About Our Travel Company</h2>
                <p className="lead mb-4">We're passionate about creating unforgettable travel experiences that connect you with the world's most amazing destinations.</p>
                <div className="row g-4 mb-4">
                  <div className="col-6">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                        <i className="bi bi-award text-primary fs-4"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">15+ Years</h6>
                        <small className="text-muted">Experience</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center gap-3">
                      <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                        <i className="bi bi-people text-success fs-4"></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">50K+</h6>
                        <small className="text-muted">Happy Travelers</small>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="#contact" className="btn btn-outline-primary">Learn More</a>
              </div>
              <div className="col-lg-6">
                <div className="position-relative">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop" 
                       className="img-fluid rounded-3 shadow" alt="Travel Team" />
                  <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary bg-opacity-10 rounded-3"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-5 bg-light">
            <div className="row">
              <div className="col-12 text-center mb-5">
                <h2 className="h2 fw-bold">Our Services</h2>
                <p className="text-muted">Comprehensive travel solutions tailored to your needs</p>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm service-card">
                  <div className="card-body text-center p-4">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                      <i className="bi bi-calendar-check text-primary fs-2"></i>
                    </div>
                    <h5 className="card-title fw-bold">Travel Planning</h5>
                    <p className="card-text text-muted">Custom itineraries designed around your preferences and schedule.</p>
                    <a href="#planning" className="btn btn-sm btn-outline-primary">Learn More</a>
          </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm service-card">
                  <div className="card-body text-center p-4">
                    <div className="bg-success bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                      <i className="bi bi-star text-success fs-2"></i>
                    </div>
                    <h5 className="card-title fw-bold">Luxury Travel</h5>
                    <p className="card-text text-muted">Premium experiences with exclusive access and VIP treatment.</p>
                    <a href="#luxury" className="btn btn-sm btn-outline-success">Learn More</a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm service-card">
                  <div className="card-body text-center p-4">
                    <div className="bg-warning bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                      <i className="bi bi-tree text-warning fs-2"></i>
                    </div>
                    <h5 className="card-title fw-bold">Adventure Tours</h5>
                    <p className="card-text text-muted">Thrilling expeditions for adrenaline seekers and nature lovers.</p>
                    <a href="#adventure" className="btn btn-sm btn-outline-warning">Learn More</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section id="gallery" className="py-5">
            <div className="row">
              <div className="col-12 text-center mb-5">
                <h2 className="h2 fw-bold">Travel Gallery</h2>
                <p className="text-muted">Capturing moments from around the world</p>
              </div>
            </div>
            <div className="row g-3">
              <div className="col-md-4">
                <div className="gallery-item position-relative overflow-hidden rounded-3">
                  <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop" 
                       className="img-fluid w-100" style={{height: '250px', objectFit: 'cover'}} alt="Mountain View" />
                  <div className="gallery-overlay">
                    <h6 className="text-white fw-bold">Mountain Adventure</h6>
                    <small className="text-white-50">Swiss Alps</small>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="gallery-item position-relative overflow-hidden rounded-3">
                  <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1600&auto=format&fit=crop" 
                       className="img-fluid w-100" style={{height: '250px', objectFit: 'cover'}} alt="Beach Sunset" />
                  <div className="gallery-overlay">
                    <h6 className="text-white fw-bold">Beach Paradise</h6>
                    <small className="text-white-50">Maldives</small>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="gallery-item position-relative overflow-hidden rounded-3">
                  <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1600&auto=format&fit=crop" 
                       className="img-fluid w-100" style={{height: '250px', objectFit: 'cover'}} alt="City Lights" />
                  <div className="gallery-overlay">
                    <h6 className="text-white fw-bold">City Lights</h6>
                    <small className="text-white-50">New York</small>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Hot Deals Section */}
          <section id="deals" className="py-5 bg-gradient-to-r from-warning bg-opacity-10">
            <div className="row">
              <div className="col-12 text-center mb-5">
                <h2 className="h2 fw-bold">🔥 Hot Deals</h2>
                <p className="text-muted">Limited time offers you can't miss!</p>
                <div className="countdown-timer d-flex justify-content-center gap-3 mt-3">
                  <div className="countdown-item">
                    <span className="countdown-number">{countdown.hours}</span>
                    <span className="countdown-label">Hours</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-number">{countdown.minutes}</span>
                    <span className="countdown-label">Minutes</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-number">{countdown.seconds}</span>
                    <span className="countdown-label">Seconds</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm deal-card featured-deal">
                  <div className="card-body text-center p-4">
                    <div className="deal-badge bg-danger text-white position-absolute top-0 end-0 m-3 px-3 py-1 rounded-pill">
                      -30%
                    </div>
                    <div className="featured-label position-absolute top-0 start-0 m-3">
                      <span className="badge bg-warning text-dark">Featured</span>
                    </div>
                    <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop" 
                         className="img-fluid rounded mb-3" style={{height: '150px', objectFit: 'cover'}} alt="Mountain Deal" />
                    <h5 className="card-title fw-bold">Mountain Escape</h5>
                    <p className="card-text text-muted">Swiss Alps adventure with luxury accommodation</p>
                    <div className="deal-features mb-3">
                      <span className="badge bg-light text-dark me-1">🏔️ Mountain Views</span>
                      <span className="badge bg-light text-dark me-1">🏨 5-Star Hotel</span>
                      <span className="badge bg-light text-dark">🍽️ All Meals</span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                      <span className="text-decoration-line-through text-muted">$1,299</span>
                      <span className="h4 text-danger fw-bold mb-0">$899</span>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-danger flex-grow-1">Book Now</button>
                      <button className="btn btn-outline-secondary">Details</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm deal-card">
                  <div className="card-body text-center p-4">
                    <div className="deal-badge bg-success text-white position-absolute top-0 end-0 m-3 px-3 py-1 rounded-pill">
                      -25%
                    </div>
                    <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop" 
                         className="img-fluid rounded mb-3" style={{height: '150px', objectFit: 'cover'}} alt="Beach Deal" />
                    <h5 className="card-title fw-bold">Beach Paradise</h5>
                    <p className="card-text text-muted">Tropical getaway with all-inclusive package</p>
                    <div className="deal-features mb-3">
                      <span className="badge bg-light text-dark me-1">🏖️ Beachfront</span>
                      <span className="badge bg-light text-dark me-1">🏊 Pool Access</span>
                      <span className="badge bg-light text-dark">🍹 Free Drinks</span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                      <span className="text-decoration-line-through text-muted">$899</span>
                      <span className="h4 text-success fw-bold mb-0">$674</span>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-success flex-grow-1">Book Now</button>
                      <button className="btn btn-outline-secondary">Details</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm deal-card">
                  <div className="card-body text-center p-4">
                    <div className="deal-badge bg-primary text-white position-absolute top-0 end-0 m-3 px-3 py-1 rounded-pill">
                      -40%
                    </div>
                    <img src="https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=1600&auto=format&fit=crop" 
                         className="img-fluid rounded mb-3" style={{height: '150px', objectFit: 'cover'}} alt="City Deal" />
                    <h5 className="card-title fw-bold">City Explorer</h5>
                    <p className="card-text text-muted">Urban adventure with guided tours included</p>
                    <div className="deal-features mb-3">
                      <span className="badge bg-light text-dark me-1">🏛️ Guided Tours</span>
                      <span className="badge bg-light text-dark me-1">🚇 Metro Pass</span>
                      <span className="badge bg-light text-dark">🎭 Show Tickets</span>
                    </div>
                    <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                      <span className="text-decoration-line-through text-muted">$599</span>
                      <span className="h4 text-primary fw-bold mb-0">$359</span>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-primary flex-grow-1">Book Now</button>
                      <button className="btn btn-outline-secondary">Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12 text-center">
                <div className="deal-alert bg-info bg-opacity-10 p-4 rounded-3 border border-info border-opacity-25">
                  <h5 className="text-info mb-2">💡 Pro Tip</h5>
                  <p className="text-muted mb-0">Subscribe to our newsletter to get early access to exclusive deals and flash sales!</p>
                  <div className="mt-3">
                    <input type="email" className="form-control d-inline-block me-2" style={{width: '300px'}} placeholder="Enter your email" />
                    <button className="btn btn-info">Subscribe</button>
                  </div>
                </div>
                <div className="mt-4">
                  <a href="/destinations" className="btn btn-outline-info btn-lg">
                    <span className="me-2">🗺️</span>
                    Browse All Destinations
                  </a>
                </div>
            </div>
          </div>
        </section>

          {/* Enhanced Travel Blog Section */}
          <section id="blog" className="py-5">
            <div className="row">
              <div className="col-12 text-center mb-5">
                <h2 className="h2 fw-bold">📝 Travel Blog</h2>
                <p className="text-muted">Insights, tips, and stories from our travel experts</p>
                <div className="blog-filters d-flex justify-content-center gap-2 mt-4">
                  <button className="btn btn-outline-primary active">All</button>
                  <button className="btn btn-outline-primary">Travel Tips</button>
                  <button className="btn btn-outline-primary">Destinations</button>
                  <button className="btn btn-outline-primary">Adventures</button>
                  <button className="btn btn-outline-primary">Culture</button>
                </div>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-md-6 col-lg-4">
                <article className="card h-100 border-0 shadow-sm blog-card featured-post">
                  <div className="position-relative">
                    <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1600&auto=format&fit=crop" 
                         className="card-img-top" style={{height: '200px', objectFit: 'cover'}} alt="Travel Tips" />
                    <div className="featured-overlay">
                      <span className="badge bg-warning text-dark">Featured</span>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="badge bg-primary">Travel Tips</span>
                      <small className="text-muted">5 min read</small>
                      <div className="ms-auto">
                        <i className="bi bi-heart text-muted"></i>
                        <small className="text-muted ms-1">128</small>
                      </div>
                    </div>
                    <h5 className="card-title fw-bold">10 Essential Travel Tips for 2024</h5>
                    <p className="card-text text-muted">Discover the latest travel hacks and tips to make your next adventure unforgettable.</p>
                    <div className="blog-meta mb-3">
                      <div className="d-flex align-items-center gap-3 text-muted small">
                        <span><i className="bi bi-person me-1"></i>Travel Expert</span>
                        <span><i className="bi bi-calendar me-1"></i>2 days ago</span>
                        <span><i className="bi bi-chat me-1"></i>24 comments</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="author-info d-flex align-items-center gap-2">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" 
                             className="rounded-circle" style={{width: '30px', height: '30px'}} alt="Author" />
                        <small className="text-muted">Sarah Johnson</small>
                      </div>
                      <a href="#" className="btn btn-sm btn-outline-primary">Read More</a>
                    </div>
                  </div>
                </article>
              </div>
              <div className="col-md-6 col-lg-4">
                <article className="card h-100 border-0 shadow-sm blog-card">
                  <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1600&auto=format&fit=crop" 
                       className="card-img-top" style={{height: '200px', objectFit: 'cover'}} alt="Destination Guide" />
                  <div className="card-body">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="badge bg-success">Destination</span>
                      <small className="text-muted">8 min read</small>
                      <div className="ms-auto">
                        <i className="bi bi-heart text-muted"></i>
                        <small className="text-muted ms-1">89</small>
                      </div>
                    </div>
                    <h5 className="card-title fw-bold">Hidden Gems of Northern Europe</h5>
                    <p className="card-text text-muted">Explore the lesser-known destinations that offer authentic cultural experiences.</p>
                    <div className="blog-meta mb-3">
                      <div className="d-flex align-items-center gap-3 text-muted small">
                        <span><i className="bi bi-person me-1"></i>Local Guide</span>
                        <span><i className="bi bi-calendar me-1"></i>1 week ago</span>
                        <span><i className="bi bi-chat me-1"></i>16 comments</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="author-info d-flex align-items-center gap-2">
                        <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=100&auto=format&fit=crop" 
                             className="rounded-circle" style={{width: '30px', height: '30px'}} alt="Author" />
                        <small className="text-muted">Mike Chen</small>
                      </div>
                      <a href="#" className="btn btn-sm btn-outline-success">Read More</a>
                    </div>
                  </div>
                </article>
              </div>
              <div className="col-md-6 col-lg-4">
                <article className="card h-100 border-0 shadow-sm blog-card">
                  <img src="https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=1600&auto=format&fit=crop" 
                       className="card-img-top" style={{height: '200px', objectFit: 'cover'}} alt="Adventure" />
                  <div className="card-body">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span className="badge bg-warning">Adventure</span>
                      <small className="text-muted">6 min read</small>
                      <div className="ms-auto">
                        <i className="bi bi-heart text-muted"></i>
                        <small className="text-muted ms-1">156</small>
                      </div>
                    </div>
                    <h5 className="card-title fw-bold">Safari Adventures in Africa</h5>
                    <p className="card-text text-muted">Experience the thrill of wildlife encounters in the heart of the African wilderness.</p>
                    <div className="blog-meta mb-3">
                      <div className="d-flex align-items-center gap-3 text-muted small">
                        <span><i className="bi bi-person me-1"></i>Safari Guide</span>
                        <span><i className="bi bi-calendar me-1"></i>3 days ago</span>
                        <span><i className="bi bi-chat me-1"></i>31 comments</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="author-info d-flex align-items-center gap-2">
                        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop" 
                             className="rounded-circle" style={{width: '30px', height: '30px'}} alt="Author" />
                        <small className="text-muted">David Wilson</small>
                      </div>
                      <a href="#" className="btn btn-sm btn-outline-warning">Read More</a>
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12 text-center">
                <div className="blog-newsletter bg-light p-4 rounded-3">
                  <h5 className="mb-2">📧 Stay Updated</h5>
                  <p className="text-muted mb-3">Get the latest travel stories and tips delivered to your inbox every week!</p>
                  <div className="d-flex justify-content-center gap-2 flex-wrap">
                    <input type="email" className="form-control" style={{width: '300px'}} placeholder="Enter your email" />
                    <button className="btn btn-primary">Subscribe</button>
                  </div>
                </div>
              </div>
          </div>
        </section>

        {/* Tours Section */}
          <section id="tours" className="py-5">
            <div className="row">
              <div className="col-12">
                <h2 className="h2 fw-bold mb-3">Popular Tours</h2>
                <p className="text-muted mb-4">Handpicked itineraries for every traveler.</p>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title fw-semibold">City Explorer (5 days)</h5>
                    <p className="card-text">Museums, markets, hidden gems, and food tours.</p>
                    <p className="text-primary fw-bold mb-0">From $699</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title fw-semibold">Island Retreat (7 days)</h5>
                    <p className="card-text">Beachfront stays, snorkeling, and sunset cruises.</p>
                    <p className="text-primary fw-bold mb-0">From $1,099</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title fw-semibold">Safari Adventure (6 days)</h5>
                    <p className="card-text">Game drives, local guides, and stargazing camps.</p>
                    <p className="text-primary fw-bold mb-0">From $1,499</p>
                  </div>
                </div>
              </div>
          </div>
        </section>

        {/* Packages Section */}
          <section id="packages" className="py-5">
            <div className="row">
              <div className="col-12">
                <h2 className="h2 fw-bold mb-3">Packages</h2>
                <p className="text-muted mb-4">Curated bundles tailored to your trip style.</p>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center">
                    <span className="badge bg-secondary mb-3">Weekend</span>
                    <h5 className="card-title fw-semibold">Weekend Getaway</h5>
                    <p className="card-text">2 nights city break, breakfast included.</p>
                    <div className="display-6 fw-bold text-primary mb-3">$299</div>
                    <ul className="list-unstyled text-start">
                      <li className="mb-2">✓ Central hotel</li>
                      <li className="mb-2">✓ City walking tour</li>
                      <li className="mb-2">✓ Airport transfer</li>
                    </ul>
                    <button className="btn btn-outline-primary w-100">Book now</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 shadow-sm border-primary">
                  <div className="card-body text-center position-relative">
                    <span className="position-absolute top-0 end-0 badge bg-warning text-dark m-3">Popular</span>
                    <span className="badge bg-primary mb-3">Family</span>
                    <h5 className="card-title fw-semibold">Family Bundle</h5>
                    <p className="card-text">4 nights resort + activities for all ages.</p>
                    <div className="display-6 fw-bold text-primary mb-3">$899</div>
                    <ul className="list-unstyled text-start">
                      <li className="mb-2">✓ Resort stay</li>
                      <li className="mb-2">✓ Theme park day</li>
                      <li className="mb-2">✓ Snorkel or hike</li>
              </ul>
                    <button className="btn btn-primary w-100">Choose package</button>
                  </div>
                </div>
            </div>
              <div className="col-md-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center">
                    <span className="badge bg-danger mb-3">Romance</span>
                    <h5 className="card-title fw-semibold">Honeymoon</h5>
                    <p className="card-text">7 nights romantic escape with spa.</p>
                    <div className="display-6 fw-bold text-primary mb-3">$1,799</div>
                    <ul className="list-unstyled text-start">
                      <li className="mb-2">✓ Beachfront villa</li>
                      <li className="mb-2">✓ Couples massage</li>
                      <li className="mb-2">✓ Private dinner</li>
              </ul>
                    <button className="btn btn-outline-primary w-100">Enquire</button>
                  </div>
                </div>
              </div>
          </div>
        </section>

        {/* Contact Section */}
          <section id="contact" className="py-5">
            <div className="row">
              <div className="col-12">
                <h2 className="h2 fw-bold mb-3">Contact</h2>
                <p className="text-muted mb-4">Questions about a tour? We're here to help.</p>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-lg-8">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <form>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <input type="text" className="form-control" placeholder="Your name" required />
                        </div>
                        <div className="col-md-6">
                          <input type="email" className="form-control" placeholder="Email address" required />
                        </div>
                        <div className="col-12">
                          <textarea className="form-control" rows={5} placeholder="How can we help?" required></textarea>
                        </div>
                        <div className="col-12">
                          <button type="submit" className="btn btn-primary">Send message</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h6 className="fw-semibold mb-3">Contact Information</h6>
                    <div className="mb-3">
                      <small className="text-muted d-block">Email</small>
              <div>hello@tour.example</div>
                    </div>
                    <div>
                      <small className="text-muted d-block">Phone</small>
              <div>+1 (555) 123-4567</div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </section>
        </div>
      </main>

      {/* Advanced Animated Footer */}
      <footer className="footer footer-aurora bg-dark text-white py-5 mt-auto position-relative overflow-hidden">
        {/* Floating Particles */}
        <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        <div className="container position-relative">
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="d-flex align-items-center gap-2 mb-3">
                <span className="badge bg-primary rounded-pill p-2 text-white fw-bold brand-icon">T2</span>
                <span className="fw-semibold fs-5 brand-text">Test2 Tours</span>
              </div>
              <p className="text-white-50 mb-3">Curated experiences across the globe. Travel beautifully.</p>
              <div className="d-flex gap-3">
                <a href="#" className="footer-social text-white-50 text-decoration-none">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="footer-social text-white-50 text-decoration-none">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="footer-social text-white-50 text-decoration-none">
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <h6 className="fw-semibold mb-3">Explore</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#destinations" className="footer-link text-white-50 text-decoration-none">Destinations</a></li>
                <li className="mb-2"><a href="#tours" className="footer-link text-white-50 text-decoration-none">Tours</a></li>
                <li className="mb-2"><a href="#packages" className="footer-link text-white-50 text-decoration-none">Packages</a></li>
                <li className="mb-2"><a href="#contact" className="footer-link text-white-50 text-decoration-none">Contact</a></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6">
              <h6 className="fw-semibold mb-3">Resources</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><a href="#" className="footer-link text-white-50 text-decoration-none">Blog</a></li>
                <li className="mb-2"><a href="#" className="footer-link text-white-50 text-decoration-none">Guides</a></li>
                <li className="mb-2"><a href="#" className="footer-link text-white-50 text-decoration-none">Support</a></li>
                <li className="mb-2"><a href="#" className="footer-link text-white-50 text-decoration-none">Status</a></li>
              </ul>
              <div className="mt-3 d-flex gap-2">
                <a href="#" className="btn btn-outline-light btn-sm app-btn">App Store</a>
                <a href="#" className="btn btn-outline-light btn-sm app-btn">Google Play</a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <h6 className="fw-semibold mb-3">Subscribe</h6>
              <p className="text-white-50 mb-3">Get travel deals and inspiration straight to your inbox.</p>
              <form className="mb-3 newsletter-form">
                <div className="input-group">
                  <input type="email" className="form-control newsletter-input" placeholder="Email address" required />
                  <button className="btn btn-primary newsletter-btn" type="submit">Subscribe</button>
                </div>
              </form>
              <small className="text-white-50">By subscribing you agree to our <a href="#" className="text-white text-decoration-underline">Privacy Policy</a>.</small>
            </div>
          </div>

          <hr className="my-4 footer-divider" />
          
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0 text-white-50">© {new Date().getFullYear()} Test2. All rights reserved.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="d-flex gap-3 justify-content-md-end align-items-center">
                <select className="form-select form-select-sm footer-select" style={{width: 'auto'}}>
                <option>English</option>
                <option>Español</option>
                <option>Français</option>
              </select>
                <select className="form-select form-select-sm footer-select" style={{width: 'auto'}}>
                <option>USD</option>
                <option>EUR</option>
                <option>INR</option>
              </select>
                <nav className="d-none d-md-flex gap-3">
                  <a href="#" className="footer-link text-white-50 text-decoration-none">Privacy</a>
                  <span className="text-white-50">•</span>
                  <a href="#" className="footer-link text-white-50 text-decoration-none">Terms</a>
                  <span className="text-white-50">•</span>
                  <a href="#" className="footer-link text-white-50 text-decoration-none">Sitemap</a>
              </nav>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className="scroll-to-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <i className="bi bi-arrow-up"></i>
        </button>
      )}
    </div>
  );
}
