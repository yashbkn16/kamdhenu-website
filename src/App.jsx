import { useState, useEffect, useRef } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Factory,
  Shield,
  Award,
  Menu,
  X,
  Star,
  ArrowRight,
  CheckCircle,
  Truck,
  Users,
  Globe,
  SearchCheck,
} from "lucide-react";
import "./App.css";
import herobackground from "./images/herobackground.jpg";
import constructionImage from "./images/construction.jpg";
import jcb from "./images/jcb.jpg";
import foundryImage from "./images/foundry.jpg";
import pesticidesImage from "./images/pesticides.jpg";
import glassImage from "./images/glass.jpg";
import filterMedia from "./images/filter-media.jpg";
import unwashedSilica from "./images/unwashed-silica.jpg";
import factoryImage from "./images/factory.jpg";
import qaImage from "./images/qa.jpg";
import kamdhenuLogo from "./images/kamdhenulogo.png";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isMenuOpen) return;

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill all required fields.");
      return;
    }

    const scriptURL = "https://script.google.com/macros/s/AKfycbzFBnUZy6BMreVOCE-aIHOltQpuFbmDqjSmvPk_Ci5gsvkhg_xC1zyy_iNrWTJMrrz2/exec";

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("message", formData.message);

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: formDataToSend,
      });
      
      if (response.ok) {
        alert("Thank you for your enquiry! We will get back to you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Submission failed on Google's side:", errorData);
        alert("Submission failed. Please try again later.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting the form. Please check your network connection.");
    }
  };

  const products = [
    {
      title: "Glass Industries",
      description:
        "Clay & Iron free washed natural silica of highest quality in the industry.",
      icon: <Shield className="w-8 h-8 text-amber-700" />,
      features: ["Clay-free", "Iron-free", "30-120 mesh", "Export quality"],
      image: glassImage,
      imageAlt: "High quality washed silica sand for glass industries",
    },
    {
      title: "Foundry Industries",
      description:
        "Clay-free washed & unwashed silica for high integrity casting and moulding applications in cast iron, ferrous and non-ferrous foundries.",
      icon: <Factory className="w-8 h-8 text-amber-700" />,
      features: [
        "AFS range from 25 to 75",
        "High fusion point",
        "Consistent grain size distribution",
      ],
      image: foundryImage,
      imageAlt: "Premium filter media for industrial use",
    },
    {
      title: "Pesticides Industries",
      description:
        "Precipitated high-quality silica enhances the stability and performance of various pesticide formulations.",
      icon: <Award className="w-8 h-8 text-amber-700" />,
      features: [
        "16-32 Mesh",
        "Amorphous form",
        "Excellent absorption",
        "PH value ranging from 6-7",
      ],
      image: pesticidesImage,
      imageAlt: "Natural silica sand for pesticides industries",
    },
    {
      title: "Filter Media",
      description:
        "High quality washed and unwashed silica sand for water filtration and other industrial applications. We offer bulk supply at competitive prices.",
      icon: <Truck className="w-8 h-8 text-amber-700" />,
      features: [
        "04-16 mesh",
        "Washed & Unwashed",
        "Bulk supply available",
        "Cost effective",
      ],
      image: filterMedia,
      imageAlt: "Filter Media",
    },
    {
      title: "Construction & Civil Engineering",
      description: "Silica sand for effective tiles adhesive solutions.",
      icon: <Users className="w-8 h-8 text-amber-700" />,
      features: [
        "30-120 mesh",
        "Washed & Unwashed",
        "High effeciency",
        "Bulk supply available",
        "Cost effective",
      ],
      image: constructionImage,
      imageAlt:
        "High quality silica sand for construction and civil engineering",
    },
    {
      title: "Unwashed Silica",
      description:
        "Natural silica sand various mesh sizes for multiple applications.",
      icon: <Globe className="w-8 h-8 text-amber-700" />,
      features: [
        "16-32 mesh",
        "High density",
        "Natural quality",
        "Bulk supply",
        "Cost effective",
      ],
      image: unwashedSilica,
      imageAlt: "Natural unwashed silica sand various mesh sizes",
    },
  ];

  const stats = [
    {
      number: "12+",
      label: "Years Experience",
      icon: <Star className="w-8 h-8" />,
    },
    {
      number: "75+",
      label: "Happy Clients",
      icon: <Users className="w-8 h-8" />,
    },
    {
      number: "8+",
      label: "States Served",
      icon: <Globe className="w-8 h-8" />,
    },
    {
      number: "99%",
      label: "Quality Assured",
      icon: <CheckCircle className="w-8 h-8" />,
    },
  ];

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const navLinks = ["Home", "About", "Products", "Contact"];

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-gray-800">
      {/* NAVIGATION SECTION */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white/60 backdrop-blur-sm"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <img
                src={kamdhenuLogo}
                alt="Kamdhenu Industries"
                className="h-12 w-auto mr-3"
              />
              <div className="text-2xl md:text-3xl font-bold text-amber-800">
                Kamdhenu Industries
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={(e) => handleLinkClick(e, item.toLowerCase())}
                    className="text-gray-700 hover:text-amber-700 px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-amber-100 rounded-lg relative group"
                  >
                    {item}
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                ref={buttonRef}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-amber-800 hover:text-amber-900 p-2 rounded-lg hover:bg-amber-100 transition-colors duration-300"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div
            ref={menuRef}
            className="md:hidden bg-yellow-100 backdrop-blur-md border-t border-amber-200"
          >
            <div className="px-4 pt-3 pb-4 space-y-2">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => handleLinkClick(e, item.toLowerCase())}
                  className="block text-center px-3 py-3 text-base font-medium text-gray-800 hover:text-amber-800 hover:bg-amber-100 rounded-lg transition-all duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={herobackground}
            alt="Kamdhenu Industries Factory"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100/0 to-orange-100/40"></div>
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-10 shadow-xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-amber-900">
              QUALITY SILICA SOLUTIONS
            </h1>
            <p className="text-2xl md:text-4xl text-amber-900 mb-6 font-light">
              Your Trusted Sand Supplier
            </p>

            {/* Company description */}
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-xl text-gray-900 leading-relaxed mb-8">
                Kamdhenu Industries is a leading producer of Premium Natural
                Silica Sand based in Bikaner, India. Our advanced facility in
                Udhyog Vihar, Gajner, is dedicated to processing high-purity
                sand for use in glass manufacturing, foundries, water
                filtration, pesticides, and a wide range of industrial
                applications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                className="text-white group bg-amber-700 hover:bg-amber-800 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:scale-105 visited:!text-white"
                onClick={() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                className="group border-2 border-amber-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-700 hover:text-white transition-all duration-300 hover:scale-105 visited:!text-amber-900"
                onClick={() => {
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-110 transition-transform duration-300"
              >
                <div className="text-amber-700 mb-4 flex justify-center group-hover:animate-bounce">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-2 text-amber-900">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-900">
              About Kamdhenu Industries
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Established in 2013 and based in Gajner, Bikaner (Rajasthan).
                Kamdhenu Industries is a trusted manufacturer and supplier of
                washed and unwashed silica sand. Our products are widely used in
                industries such as glass, foundries, pesticides, water
                filteration, construction etc.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We are known for delivering high purity, consistent grade sand,
                processed at our advanced facility. Our commitment to quality,
                timely delivery, and customer satisfaction has helped us build
                long-standing relationships across multiple states in India.
                With over a decade of experience and a dedicated team, Kamdhenu
                Industries ensures that every batch of material meets rigorous
                standards of cleanliness, reliability, and industrial
                performance.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Factory className="w-16 h-16 text-amber-700" />,
                title: "State-of-the-art Factory",
                description:
                  "Equipped with high-capacity crushers, magnetic separators, and automated sieving systems, our plant ensures consistent production of industrial-grade silica sand. Continuous upgrades and process automation help us meet large-scale demands efficiently.",
                image: factoryImage,
              },
              {
                icon: <SearchCheck className="w-16 h-16 text-amber-700" />,
                title: "Quality Assurance",
                description:
                  "Each batch undergoes rigorous testing in our in-house lab for grain fineness (AFS), moisture, silt content, and chemical purity. We ensure zero deviation from technical specs — trusted by foundries, pesticide manufacturers, and glass industries alike.",
                image: qaImage,
              },
              {
                icon: <Truck className="w-16 h-16 text-amber-700" />,
                title: "Trusted Supplier",
                description:
                  "With decades of market presence, we are a preferred partner for bulk silica sand needs. Our robust logistics and timely delivery make us a reliable vendor for clients from Punjab to Tamil Nadu — and expanding globally.",
                image: jcb,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                <div className="h-48 bg-amber-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="p-8">
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section
        id="products"
        className="py-20 bg-gradient-to-r from-amber-50 to-orange-50"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-900">
              QUALITY SILICA SANDS
            </h2>
            <p className="text-2xl text-amber-800 font-light">
              Refined for Industrial Excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                <div className="h-64 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Product label overlay */}
                  <div className="absolute top-4 left-4 bg-amber-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Premium Quality
                  </div>
                </div>

                {/* Product Information */}
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    {product.icon}
                    <h3 className="text-2xl font-bold text-gray-900 ml-3">
                      {product.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Product features list */}
                  <div className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button
                    className="mt-6 w-full bg-amber-100 hover:bg-amber-200 text-amber-800 py-3 px-4 rounded-lg font-semibold transition-colors duration-300"
                    onClick={() => {
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Enquire About This Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 bg-yellow-100">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-900">
              GET IN TOUCH
            </h2>
            <p className="text-2xl text-amber-800 font-light">
              We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 transition-all duration-300"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 transition-all duration-300"
                    placeholder="+91-XXXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 transition-all duration-300"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                {/* <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    I allow this website to store my submission so they can
                    respond to my enquiry. *
                  </label>
                </div> */}

                <button
                  onClick={handleSubmit}
                  className="w-full bg-amber-700 hover:bg-amber-800 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  SUBMIT ENQUIRY
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8">
                  Contact Information
                </h3>
                <p className="text-gray-600 mb-8">
                  Get in touch with us for all your natural silica sand
                  requirements. We're here to help you find the perfect solution
                  for your industrial needs.
                </p>
              </div>
              <div className="space-y-6">
                {[
                  {
                    icon: <MapPin className="w-8 h-8 text-amber-700" />,
                    title: "Our Location",
                    content: (
                      <span className="block text-gray-700">
                        26, Udhyog Vihar, Gajner,
                        <br />
                        Bikaner, Rajasthan-334302, India
                      </span>
                    ),
                  },
                  {
                    icon: <Phone className="w-8 h-8 text-green-600" />,
                    title: "Anil Kr. Jain",
                    content: (
                      <a
                        href="tel:+919414088409"
                        className="block text-gray-700 hover:underline"
                      >
                        +91-9414088409
                      </a>
                    ),
                  },
                  {
                    icon: <Mail className="w-8 h-8 text-blue-600" />,
                    title: "Email Us",
                    content: (
                      <a
                        href="mailto:kamdhenugbr@gmail.com"
                        className="text-gray-700 hover:underline"
                      >
                        kamdhenugbr@gmail.com
                      </a>
                    ),
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="mb-4">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-lg">
                        {item.title}
                      </h4>
                      <div className="text-gray-600">{item.content}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3523.65213374939!2d73.08511307638715!3d27.97393797603076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393f95b6ad53f7b5%3A0xf4ea31bf979448fa!2sKamdhenu%20Industries!5e0!3m2!1sen!2sin!4v1748869975322!5m2!1sen!2sin"
                  className="w-full h-full rounded-2xl"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-amber-900 text-white py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Kamdhenu Industries</h3>
            <p className="text-amber-200 mb-6 text-lg">
              Natural Silica Sand - Premium Quality Solutions
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-amber-200 mb-8">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                26, Udhyog Vihar, Gajner, Bikaner, Rajasthan 334302
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="font-bold">Anil Kr. Jain</span> +91-9414088409
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                kamdhenugbr@gmail.com
              </span>
            </div>

            {/* CUSTOMIZATION: Add social media links */}
            {/* <div className="flex justify-center space-x-6 mb-8">
              <a href="#" className="text-amber-200 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-amber-200 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-amber-200 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div> */}

            <div className="pt-8 border-t border-amber-800 text-amber-200 text-sm">
              © 2025 Kamdhenu Industries. All rights reserved. | Designed for
              Excellence by <b>Yash Jain</b>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
      `}</style>
    </div>
  );
};

export default App;
