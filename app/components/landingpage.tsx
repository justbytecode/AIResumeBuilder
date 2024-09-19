"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Zap, Users, Star } from "lucide-react";
import Link from "next/link";
import { SignInButton, SignOutButton, useAuth, UserButton } from "@clerk/nextjs";

export default function LandingPage() {
  const navItems = ["Features", "Pricing", "About"];

  const listVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hover: { scale: 1.1 },
  };

  const { isSignedIn } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href={"/"}>
              <FileText className="h-10 w-10 text-purple-500" />
            </Link>
          </motion.div>
          <motion.ul
            className="flex space-x-6"
            initial="hidden"
            animate="visible"
            variants={listVariants}
          >
            {navItems.map((item) => (
              <motion.li key={item} variants={itemVariants} whileHover="hover">
                <Link href={`/${item.toLowerCase()}`} className="text-gray-300 text-2xl font-bold hover:text-purple-400 transition-colors" passHref>
                  {item}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {!isSignedIn ? (
              <SignInButton>
                <Button
                  variant="outline"
                  className="mr-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
                >
                  Log In
                </Button>
              </SignInButton>
            ) : (
              <>
                <UserButton />
                <SignOutButton>
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                    Log Out
                  </Button>
                </SignOutButton>
              </>
            )}
          </motion.div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center mb-20 relative overflow-hidden">
          <motion.div
            className="absolute inset-0 z-0"
            animate={{
              background: [
                "linear-gradient(45deg, #ff00ff, #00ffff)",
                "linear-gradient(45deg, #ff8a00, #e52e71)",
                "linear-gradient(45deg, #7928ca, #ff0080)",
                "linear-gradient(45deg, #ff00ff, #00ffff)",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="relative z-10 backdrop-blur-sm bg-gray-900 bg-opacity-70 p-8 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Create Stunning Resumes in Minutes
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Stand out from the crowd with professionally designed resumes
              tailored to your industry
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href={"/dashboard"}>
                <Button
                  size="lg"
                  className="mr-4 bg-purple-500 hover:bg-purple-600 text-white"
                >
                  Get Started for Free
                </Button>
              </Link>
              <Link href={"/features"}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
                >
                  View Features
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-purple-900 rounded-lg transform -rotate-3"></div>
            <div className="relative bg-gray-800 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">
                How It Works
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: FileText,
                    title: "Choose a Template",
                    description:
                      "Select from our wide range of professional templates",
                  },
                  {
                    icon: Zap,
                    title: "Fill in Your Details",
                    description:
                      "Our AI-powered system helps you input your information quickly",
                  },
                  {
                    icon: Users,
                    title: "Download and Share",
                    description:
                      "Get your polished resume ready to impress employers",
                  },
                ].map((step) => (
                  <motion.div
                    key={step.title}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <step.icon className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                    <h3 className="text-xl font-semibold mb-2 text-purple-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-400">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <section id="features" className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center text-purple-400">
            Why Choose Our Platform
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "AI-Powered Suggestions",
                description:
                  "Get smart content recommendations tailored to your industry",
              },
              {
                title: "100+ Templates",
                description:
                  "Find the perfect design for your career and style",
              },
              {
                title: "ATS-Friendly Formats",
                description:
                  "Ensure your resume passes Applicant Tracking Systems",
              },
              {
                title: "Real-Time Preview",
                description: "See changes instantly as you build your resume",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-gray-800 p-6 rounded-lg shadow-md border border-purple-500"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-2 text-purple-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 px-8 rounded-lg mb-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Create Your Standout Resume?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of job seekers who have successfully landed their
              dream jobs using our platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-xs bg-white text-gray-900"
              />
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-gray-200"
              >
                Start Building for Free
              </Button>
            </div>
          </div>
        </motion.section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center text-purple-400">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Johnson",
                role: "Software Engineer",
                quote:
                  "This platform made creating a professional resume so easy. I landed my dream job within weeks!",
              },
              {
                name: "Sarah Lee",
                role: "Marketing Specialist",
                quote:
                  "The AI suggestions were spot-on for my industry. It saved me hours of work!",
              },
              {
                name: "Michael Chen",
                role: "Recent Graduate",
                quote:
                  "As a new grad, I was worried about my resume. This tool gave me the confidence I needed.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-gray-800 p-6 rounded-lg shadow-md border border-purple-500"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Star className="h-6 w-6 text-yellow-400 mb-4" />
                <p className="text-gray-300 mb-4">&quot;{testimonial.quote}&quot;</p>
                <p className="font-semibold text-purple-300">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Resume Builder SaaS. All rights
            reserved.
          </p>
          <div className="mt-4">
            <a href="#" className="text-purple-400 hover:underline mx-2">
              Privacy Policy
            </a>
            <a href="#" className="text-purple-400 hover:underline mx-2">
              Terms of Service
            </a>
            <a href="#" className="text-purple-400 hover:underline mx-2">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
