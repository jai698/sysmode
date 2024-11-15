import { useEffect } from 'react';
import AOS from 'aos';
import { Link } from 'react-router-dom';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  const features = [
    {
      icon: "📋",
      title: "Job Listings",
      description: "Create and manage job postings with ease. Reach the right candidates."
    },
    {
      icon: "👥",
      title: "Candidate Tracking",
      description: "Track applications and manage candidate pipelines efficiently."
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "Get insights into your hiring process with detailed analytics."
    }
  ];

  const stats = [
    { number: "5000+", label: "Active Jobs" },
    { number: "10k+", label: "Companies" },
    { number: "1M+", label: "Candidates" }
  ];

  const footerSections = [
    {
      title: "Product",
      links: ["Features", "Pricing", "Integration"]
    },
    {
      title: "Company",
      links: ["About", "Careers", "Contact"]
    },
    {
      title: "Resources",
      links: ["Blog", "Documentation", "Help Center"]
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Security"]
    }
  ];

  return (
    <div className="bg-dark-primary text-dark-text">
      {/* Navigation */}
      <nav className="bg-dark-primary/95 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold gradient-text">
                <Link to="/">Sysmode</Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/dashboard" className="text-gray-300 hover:text-dark-accent transition-colors">Dashboard</Link>
              <a href="#" className="text-gray-300 hover:text-dark-accent transition-colors">Jobs</a>
              <a href="#" className="text-gray-300 hover:text-dark-accent transition-colors">Candidates</a>
              <button className="bg-dark-accent text-white px-4 py-2 rounded-md hover:bg-dark-accent/90 transition-all transform hover:scale-105">
                Post a Job
              </button>
              <button className="border border-dark-accent text-dark-accent px-4 py-2 rounded-md hover:bg-dark-accent hover:text-white transition-all">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-pattern min-h-screen flex items-center relative">
        <div className="absolute inset-0 bg-dark-primary/70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center" data-aos="fade-up">
            <h1 className="text-5xl font-bold text-white sm:text-6xl md:text-7xl">
              Streamline Your <span className="gradient-text">Hiring Process</span>
            </h1>
            <p className="mt-6 max-w-md mx-auto text-gray-300 sm:text-lg md:text-xl md:max-w-3xl">
              Manage job listings, track applications, and find the perfect candidates - all in one place.
            </p>
            <div className="mt-10 flex justify-center gap-6">
              <button className="bg-dark-accent text-white px-8 py-4 rounded-md hover:bg-dark-accent/90 text-lg transform hover:scale-105 transition-all">
                Get Started
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-md hover:bg-white/20 text-lg transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="feature-pattern py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-primary via-dark-primary/95 to-dark-secondary"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center" data-aos="fade-up">
            <h2 className="text-4xl font-bold text-white">Powerful Features</h2>
            <p className="mt-4 text-gray-300">Everything you need to manage your recruitment process</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-card p-8 rounded-xl hover:transform hover:scale-105 transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-dark-accent text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-dark-surface py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-5xl font-bold gradient-text">{stat.number}</div>
                <div className="mt-2 text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-dark-secondary py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-12" data-aos="fade-up">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white">Ready to Transform Your Hiring?</h2>
              <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                Join thousands of companies that trust Sysmode for their recruitment needs.
              </p>
              <button className="mt-8 bg-dark-accent text-white px-8 py-4 rounded-md hover:bg-dark-accent/90 text-lg transform hover:scale-105 transition-all">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark-primary">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="text-white text-lg font-semibold">{section.title}</h3>
                <ul className="mt-4 space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-gray-400 hover:text-dark-accent">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-dark-surface pt-8">
            <p className="text-center text-gray-400">
              &copy; {new Date().getFullYear()} Sysmode. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;