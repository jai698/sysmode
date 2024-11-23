import { useEffect } from 'react';
import AOS from 'aos';
import { Link } from 'react-router-dom';
import 'aos/dist/aos.css';
import { UserOutlined, LoginOutlined } from '@ant-design/icons';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 50,
      delay: 0,
      easing: 'ease-out'
    });
  }, []);

  const features = [
    {
      icon: "📝",
      title: "Assignments",
      description: "Create and manage assignments efficiently with automated tracking."
    },
    {
      icon: "💬",
      title: "Messaging",
      description: "Seamless communication with integrated messaging system."
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "Get insights into your processes with detailed analytics."
    }
  ];

  const stats = [
    { number: "1000+", label: "Active Users" },
    { number: "5k+", label: "Organizations" },
    { number: "100k+", label: "Daily Updates" }
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
                <Link to="/">Swissmote</Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/dashboard" className="text-gray-300 hover:text-dark-accent transition-colors duration-200">
                Dashboard
              </Link>
              <Link 
                to="/signup" 
                className="text-gray-300 hover:text-white px-4 py-2 rounded-md 
                          flex items-center gap-2 hover:bg-gray-800 transition-colors duration-150"
              >
                <UserOutlined />
                Sign Up
              </Link>
              <Link 
                to="/login" 
                className="text-gray-300 hover:text-white px-4 py-2 rounded-md 
                          flex items-center gap-2 hover:bg-gray-800 transition-colors duration-150"
              >
                <LoginOutlined />
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-pattern min-h-screen flex items-center relative">
        <div className="absolute inset-0 bg-dark-primary/70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center" data-aos="fade-up" data-aos-duration="400">
            <h1 className="text-5xl font-bold text-white sm:text-6xl md:text-7xl">
              Streamline Your <span className="gradient-text">Workflow</span>
            </h1>
            <p className="mt-6 max-w-md mx-auto text-gray-300 sm:text-lg md:text-xl md:max-w-3xl">
              Manage assignments, track progress, and communicate effectively - all in one place.
            </p>
            <div className="mt-10 flex justify-center gap-6">
              <button className="bg-dark-accent text-white px-8 py-4 rounded-md hover:bg-dark-accent/90 text-lg transform hover:scale-105 transition-all duration-200">
                Get Started
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-md hover:bg-white/20 text-lg transition-all duration-200">
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
          <div className="text-center" data-aos="fade-up" data-aos-duration="400">
            <h2 className="text-4xl font-bold text-white">Powerful Features</h2>
            <p className="mt-4 text-gray-300">Everything you need to manage your workflow efficiently</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-card p-8 rounded-xl hover:transform hover:scale-105 transition-all duration-200"
                data-aos="fade-up"
                data-aos-delay={index * 50}
                data-aos-duration="400"
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
                data-aos-delay={index * 50}
                data-aos-duration="400"
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
          <div 
            className="glass-card rounded-2xl p-12" 
            data-aos="fade-up" 
            data-aos-duration="400"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white">Ready to Transform Your Workflow?</h2>
              <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
                Join thousands of organizations that trust Swissmote for their management needs.
              </p>
              <button className="mt-8 bg-dark-accent text-white px-8 py-4 rounded-md hover:bg-dark-accent/90 text-lg transform hover:scale-105 transition-all duration-200">
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
                      <a href="#" className="text-gray-400 hover:text-dark-accent transition-colors duration-200">
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
              &copy; {new Date().getFullYear()} Swissmote. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;