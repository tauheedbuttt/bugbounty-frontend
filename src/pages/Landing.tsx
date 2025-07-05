import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Target,
  Users,
  TrendingUp,
  Award,
  Globe,
  Lock,
  Zap,
  BarChart3,
  DollarSign,
  Eye,
  Briefcase,
  Search,
  BookOpen,
  Trophy,
  Medal,
  Star,
  Clock,
  Triangle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
export default function Landing() {
  const stats = [
    {
      number: "1K+",
      label: "Vulnerability Found",
      description: "Security issues discovered",
    },
    {
      number: "170+",
      label: "Program",
      description: "Government and companies",
    },
    {
      number: "4K+",
      label: "Researchers",
      description: "Active security experts",
    },
  ];
  const features = [
    {
      category: "Operate",
      items: [
        {
          icon: Shield,
          title: "Bug Bounty Programs",
          description: "Comprehensive vulnerability disclosure programs",
          iconColor: "text-red-400",
        },
        {
          icon: Target,
          title: "Report Manager",
          description: "Streamlined vulnerability reporting system",
          iconColor: "text-red-400",
        },
        {
          icon: Users,
          title: "Researcher Network",
          description: "Connect with top security researchers",
          iconColor: "text-orange-400",
        },
      ],
    },
    {
      category: "Monitor",
      items: [
        {
          icon: BarChart3,
          title: "Analytics",
          description: "Track program performance and metrics",
          iconColor: "text-blue-400",
        },
        {
          icon: DollarSign,
          title: "Payouts",
          description: "Automated bounty payment processing",
          iconColor: "text-blue-400",
        },
        {
          icon: Eye,
          title: "Live Monitoring",
          description: "Real-time security posture tracking",
          iconColor: "text-cyan-400",
        },
      ],
    },
    {
      category: "Grow",
      items: [
        {
          icon: Award,
          title: "Reputation System",
          description: "Build researcher credibility and rankings",
          iconColor: "text-green-400",
        },
        {
          icon: Globe,
          title: "Global Reach",
          description: "Access worldwide security talent",
          iconColor: "text-green-400",
        },
        {
          icon: BookOpen,
          title: "Security Training",
          description: "Educational resources for researchers",
          iconColor: "text-yellow-400",
        },
      ],
    },
  ];
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav
        className="border-b border-gray-800"
        style={{
          backgroundColor: "#1C1C1C",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between">
          <div className="flex items-center space-x-4 sm:space-x-8">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img
                src="/lovable-uploads/dd13495d-882c-427e-b730-432eff1e26aa.png"
                alt="Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              />
              <span className="text-lg sm:text-xl font-light text-white">
                BugBounty
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm">
              <Link
                to="/programs"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Bug Bounty Programs
              </Link>
              <Link
                to="/leaderboard"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Leaderboard
              </Link>
              <Link
                to="/hall-of-fame"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Hall of Fame
              </Link>
              <a
                href="/blog"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/hacker/login"
              className="text-gray-300 hover:text-white text-sm px-2 sm:px-4 py-1.5 sm:py-2"
            >
              Login
            </Link>
            <Link to="/hacker/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-md transition-colors">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Secure the Future
              <br />
              <span className="text-gray-400">Together</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-xl">
              Connect with top security researchers and build stronger defenses
              through our comprehensive bug bounty platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to="/hacker/signup">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base w-full sm:w-auto rounded-full"
                >
                  Join as Researcher
                </Button>
              </Link>
              <Link to="/hacker/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-white hover:bg-gray-800 px-8 py-3 text-base w-full sm:w-auto rounded-full"
                >
                  Start Program
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Visual Element - Thinner version */}
          <div className="relative">
            <div
              className="bg-gray-500 rounded-3xl p-8 lg:p-12 relative overflow-hidden max-w-sm mx-auto"
              style={{
                aspectRatio: "3/4",
              }}
            >
              {/* 3D Platform bases */}
              <div className="absolute bottom-8 left-8 w-16 h-8 bg-white rounded-full opacity-90 transform rotate-3 shadow-lg"></div>
              <div className="absolute bottom-12 right-12 w-20 h-10 bg-white rounded-full opacity-95 transform -rotate-2 shadow-lg"></div>
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-18 h-9 bg-white rounded-full opacity-85 rotate-1 shadow-lg"></div>

              {/* Mock device screens */}
              <div className="absolute bottom-16 left-12 w-12 h-8 bg-gray-800 rounded-sm border border-gray-700 shadow-lg transform rotate-12">
                <div className="p-1">
                  <div className="w-full h-1 bg-blue-400 rounded mb-1"></div>
                  <div className="w-3/4 h-1 bg-gray-600 rounded mb-1"></div>
                  <div className="w-1/2 h-1 bg-gray-600 rounded"></div>
                </div>
              </div>

              <div className="absolute bottom-20 right-16 w-14 h-9 bg-gray-800 rounded-sm border border-gray-700 shadow-lg transform -rotate-6">
                <div className="p-1">
                  <div className="w-full h-1 bg-green-400 rounded mb-1"></div>
                  <div className="w-2/3 h-1 bg-gray-600 rounded mb-1"></div>
                  <div className="w-full h-1 bg-gray-600 rounded"></div>
                </div>
              </div>

              <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-10 h-6 bg-gray-800 rounded-sm border border-gray-700 shadow-lg">
                <div className="p-1">
                  <div className="w-full h-0.5 bg-yellow-400 rounded mb-0.5"></div>
                  <div className="w-3/4 h-0.5 bg-gray-600 rounded mb-0.5"></div>
                  <div className="w-1/2 h-0.5 bg-gray-600 rounded"></div>
                </div>
              </div>

              {/* Central button element with triangle logo */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <button className="bg-transparent border-2 border-white/30 text-white px-6 py-3 rounded-full text-sm font-medium hover:border-white/50 transition-colors backdrop-blur-sm flex items-center gap-2">
                  <Triangle className="h-3 w-3" />
                  Explore Platform
                </button>
              </div>

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-600/20 to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl px-16 sm:px-20 py-4 sm:py-5 text-center"
              style={{
                backgroundColor: "#161616",
              }}
            >
              <div className="text-3xl sm:text-4xl font-light text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 font-light text-lg">
                {stat.label}
              </div>
              <div className="text-gray-400 text-sm mt-1 font-light">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-light mb-4 text-white">
            Complete Security Platform
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light">
            Everything you need to run successful security programs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {features.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <h3 className="text-xl font-light text-white pb-4 border-b border-gray-800">
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-lg flex-shrink-0 ${item.iconColor}`}
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-light text-white text-base mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div
          className="rounded-2xl p-6 sm:p-8 text-center max-w-3xl mx-auto"
          style={{
            backgroundColor: "#1C1C1C",
          }}
        >
          <h2 className="text-xl sm:text-2xl font-light mb-4 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto text-sm sm:text-base font-light">
            Join thousands of organizations and researchers building a more
            secure digital world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/hacker/login">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 w-full sm:w-auto"
              >
                Launch Program
              </Button>
            </Link>
            <Link to="/hacker/signup">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800 px-6 sm:px-8 py-3 w-full sm:w-auto"
              >
                Join Research Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-black">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          {/* Outer rectangle with #1C1C1C */}
          <div
            className="rounded-2xl p-8"
            style={{
              backgroundColor: "#1C1C1C",
            }}
          >
            {/* Inner rectangle with #525252 */}
            <div
              className="rounded-xl p-8"
              style={{
                backgroundColor: "#525252",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
                {/* Platform Section */}
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <h4 className="font-light text-white text-lg">Platform</h4>
                  </div>
                  <div className="space-y-3 text-sm font-light text-gray-300 ml-5">
                    <Link
                      to="/programs"
                      className="block hover:text-white cursor-pointer"
                    >
                      Bug Bounty Programs
                    </Link>
                    <Link
                      to="/leaderboard"
                      className="block hover:text-white cursor-pointer"
                    >
                      Leaderboard
                    </Link>
                    <Link
                      to="/hall-of-fame"
                      className="block hover:text-white cursor-pointer"
                    >
                      Hall of Fame
                    </Link>
                  </div>
                </div>

                {/* Operations Section */}
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <h4 className="font-light text-white text-lg">Company</h4>
                  </div>
                  <div className="space-y-3 text-sm font-light text-gray-300 ml-5">
                    <div className="hover:text-white cursor-pointer">
                      Report Manager
                    </div>
                    <div className="hover:text-white cursor-pointer">
                      Analytics Dashboard
                    </div>
                    <div className="hover:text-white cursor-pointer">
                      Live Monitoring
                    </div>
                  </div>
                </div>

                {/* Company & Support Section */}
                <div>
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <h4 className="font-light text-white text-lg">Legal</h4>
                  </div>
                  <div className="space-y-3 text-sm font-light text-gray-300 ml-5">
                    <div className="hover:text-white cursor-pointer">
                      About Us
                    </div>

                    <div className="hover:text-white cursor-pointer">
                      Privacy Policy
                    </div>
                    <div className="hover:text-white cursor-pointer">
                      Terms of Service
                    </div>
                  </div>
                </div>
              </div>

              {/* Logo and Company Info */}
              <div className="border-t border-gray-600 mt-8 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex items-center space-x-3 mb-4 md:mb-0">
                    <img
                      src="/lovable-uploads/dd13495d-882c-427e-b730-432eff1e26aa.png"
                      alt="Logo"
                      className="w-8 h-8 object-contain"
                    />
                    <span className="text-xl font-light text-white">
                      BugBounty
                    </span>
                  </div>
                  <p className="text-sm font-light text-gray-400 max-w-md">
                    The leading platform for security research and vulnerability
                    disclosure.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-500 mt-6 font-light">
            © 2024 BugBounty Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
