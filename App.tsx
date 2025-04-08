import React, { Suspense, useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useScroll, useTransform } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { GraduationCap, Rocket, Users, ArrowRight, Github, Linkedin, Twitter, Instagram, Calendar, MapPin, Clock, Menu, X } from 'lucide-react';
import { MSCLogo, MLSALogo } from './components/Logos';
import bhashaImage from '../../assets/images/bhasha_1.png';

function App() {
  const [splineError, setSplineError] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const events = [
    {
      title: "Bhasha Bandhu Ideathon",
      date: "March 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Main Auditorium, Amity University Bengaluru",
      description: "Join us for an exciting ideathon focused on language technology and cultural preservation. Learn about the latest innovations in language processing and how technology can help preserve and promote linguistic diversity.",
      registerLink: "https://forms.office.com/r/52MnuCTBiF",
      image: "https://www.bhashabandhu.com/landing/bhashabhandu.svg",
      alt: "Bhasha Bandhu Ideathon",
      className: "w-full h-auto"
    },
   /* {
      title: "Cloud Computing Workshop",
      date: "March 25, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Virtual Event",
      description: "Learn about Microsoft Azure and cloud computing fundamentals in this hands-on workshop.",
      registerLink: "#",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
    },
    {
      title: "Hackathon 2024",
      date: "April 5-6, 2024",
      time: "24 Hours",
      location: "Innovation Hub, Amity University",
      description: "A 24-hour coding marathon to build innovative solutions using Microsoft technologies.",
      registerLink: "#",
      image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&q=80"
    }*/
  ];

  const splineScene = isMobile 
    ? "https://prod.spline.design/NeRgPb6tAGFyAe8r/scene.splinecode"
    : "https://prod.spline.design/jLw2d85Q0UBZLqZB/scene.splinecode";

  return (
    <div className="min-h-screen bg-black text-white">
      <header id="home" className="relative min-h-screen flex flex-col">
        <nav className="fixed top-0 left-0 right-0 z-50 py-6 px-4 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <MLSALogo className="w-20 h-20" />
              <h1 className="text-2xl font-bold cursor-pointer" onClick={() => scrollToSection('home')}>
                MSC Amity
              </h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-colors">About</button>
              <button onClick={() => scrollToSection('events')} className="hover:text-blue-400 transition-colors">Events</button>
              <button onClick={() => scrollToSection('resources')} className="hover:text-blue-400 transition-colors">Resources</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-blue-400 transition-colors">Contact</button>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                Join Now
              </button>
              <button 
                className="md:hidden text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg py-4"
            >
              <div className="flex flex-col space-y-4 px-4">
                <button onClick={() => scrollToSection('about')} className="text-left py-2 hover:text-blue-400 transition-colors">About</button>
                <button onClick={() => scrollToSection('events')} className="text-left py-2 hover:text-blue-400 transition-colors">Events</button>
                <button onClick={() => scrollToSection('resources')} className="text-left py-2 hover:text-blue-400 transition-colors">Resources</button>
                <button onClick={() => scrollToSection('contact')} className="text-left py-2 hover:text-blue-400 transition-colors">Contact</button>
              </div>
            </motion.div>
          )}
        </nav>

        <motion.div 
          className="absolute inset-0 z-0"
          style={{ opacity }}
        >
          {!splineError ? (
            <Suspense fallback={
              <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-black flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <MSCLogo className="w-16 h-16 animate-pulse" />
                  <div className="text-blue-400">Loading 3D Scene...</div>
                </div>
              </div>
            }>
              <Spline 
                className="w-full h-full fixed top-0 left-0"
                scene={splineScene}
                onError={(error) => {
                  console.error("Spline scene failed to load:", error);
                  setSplineError(true);
                }}
              />
            </Suspense>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-900/20 to-black" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />
        </motion.div>

        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h2 className="text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Microsoft Student Club
              </h2>
              <p className="text-xl mb-8 text-gray-300">
                Join Microsoft Students Club at Amity University Bengaluru and be part of a community that's
                shaping the next generation of technology leaders.
              </p>
              <div className="flex gap-4">
                <button onClick={() => scrollToSection('events')} className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all flex items-center gap-2">
                  Get Started <ArrowRight className="w-5 h-5" />
                </button>
                <button onClick={() => scrollToSection('about')} className="border border-white/20 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 pb-20 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border border-white/10 rounded-2xl p-8 bg-white/5 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">20</div>
                <div className="text-gray-400">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">5</div>
                <div className="text-gray-400">Events Per Year</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pink-400 mb-2">100%</div>
                <div className="text-gray-400">Learning Growth</div>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* About Section */}
      <section id="about" className="py-32 px-4 bg-gradient-to-b from-black to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">What We Offer</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Access exclusive resources, join exciting events, and connect with industry professionals.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<GraduationCap className="w-8 h-8" />}
              title="Learning Programs"
              description="Access exclusive Microsoft learning resources and certification paths"
            />
            <FeatureCard
              icon={<Rocket className="w-8 h-8" />}
              title="Hackathons"
              description="Participate in exciting hackathons and coding competitions"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Networking"
              description="Connect with industry professionals and like-minded students"
            />
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-32 px-4 bg-gradient-to-b from-blue-900/20 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">Upcoming Events</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join our exciting events and be part of the tech revolution
            </p>
          </motion.div>

          <VerticalTimeline lineColor="rgba(59, 130, 246, 0.2)">
            {events.map((event, index) => (
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  color: '#fff'
                }}
                contentArrowStyle={{ borderRight: '7px solid rgba(255, 255, 255, 0.05)' }}
                date={event.date}
                iconStyle={{ background: 'rgb(59, 130, 246)', color: '#fff' }}
                icon={<Calendar />}
              >
                <div className="relative rounded-xl overflow-hidden mb-4 aspect-video">
                  <img 
                    src={event.image}
                    alt={event.title}
                    className="w-1000 h-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                <div className="space-y-2 mb-4 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{event.description}</p>
                <a 
                  href={event.registerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Register Now
                </a>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-32 px-4 bg-gradient-to-b from-black to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold mb-6">Resources</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Access a wealth of learning materials and development tools
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ResourceCard
              title="Microsoft Learn"
              description="Access free, high-quality learning paths and modules"
              link="#"
            />
            <ResourceCard
              title="Azure for Students"
              description="Get free Azure credits and developer tools"
              link="#"
            />
            <ResourceCard
              title="GitHub Student Pack"
              description="Access developer tools and learning resources"
              link="#"
            />
          </div>
        </div>
      </section>

      {/* Footer / Contact Section */}
      <footer id="contact" className="border-t border-white/10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Microsoft Students Club</h3>
              <p className="text-gray-400">Amity University Bengaluru</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">About Us</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('events')} className="hover:text-white transition-colors">Events</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('resources')} className="hover:text-white transition-colors">Resources</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Contact</button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <p className="text-gray-400">mlsa.aub.club@outlook.com</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Github className="w-6 h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                <Linkedin className="w-6 h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                <Twitter className="w-6 h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Microsoft Students Club - Amity University Bengaluru. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="border border-white/10 bg-white/5 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/10 transition-all"
    >
      <div className="text-blue-400 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

function ResourceCard({ title, description, link }: { title: string; description: string; link: string }) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="block border border-white/10 bg-white/5 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/10 transition-all"
    >
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <span className="text-blue-400 flex items-center gap-2">
        Learn More <ArrowRight className="w-4 h-4" />
      </span>
    </motion.a>
  );
}

export default App;