'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { FileText, Zap, Users, Star, Sparkles, BarChart, Lock, Globe, ChevronDown } from 'lucide-react'
import Link from 'next/link'

const FeatureCard = ({ icon: Icon, title, description }:any) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg shadow-lg border border-purple-500 cursor-pointer"
      whileHover={{ scale: 1.05, borderColor: "#f0f" }}
      transition={{ type: "spring", stiffness: 300 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Icon className="h-12 w-12 mb-4 text-purple-400" />
      </motion.div>
      <h3 className="text-xl font-semibold mb-2 text-purple-300">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  )
}

const MovingSparkle = ({ delay = 0 }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-purple-400 rounded-full"
      initial={{ opacity: 0, scale: 0, x: Math.random() * 100 - 50, y: Math.random() * 100 - 50 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: delay,
      }}
    />
  )
}

const SparklesBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <MovingSparkle key={i} delay={i * 0.1} />
      ))}
    </div>
  )
}

export default function FeaturePage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="container mx-auto px-4 py-8 sticky top-0 z-50 bg-gray-900 bg-opacity-90 backdrop-blur-sm">
        <nav className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/">
            <FileText className="h-10 w-10 text-purple-500" />
            </Link>
          </motion.div>
          <motion.ul
            className="flex space-x-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {['Features', 'Pricing', 'About'].map((item) => (
              <motion.li key={item} whileHover={{ scale: 1.1 }}>
                <Link href={`/${item.toLowerCase()}`} className="text-gray-300 hover:text-purple-400 transition-colors">
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
            <Link href={'/dashboard'}>
               <Button className="bg-purple-600 hover:bg-purple-700 text-white">Try for Free</Button>
            </Link>
          </motion.div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <motion.section className="text-center mb-20 relative" style={{ opacity }}>
          <SparklesBackground />
          <div className="relative z-10">
            <motion.h1
              className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              AI-Powered Resume Builder
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Create professional, ATS-friendly resumes in minutes with our cutting-edge AI technology.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
                whileHover={{ scale: 1.05 }}   // Ask In the Meeting (Meeting Problem)
                whileTap={{ scale: 0.95 }}
              >
                Start Building Now
              </Button>
            </motion.div>
          </div>
        </motion.section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center text-purple-400">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Sparkles}
              title="AI-Powered Content Suggestions"
              description="Get tailored content suggestions based on your industry and experience level."
            />
            <FeatureCard
              icon={Zap}
              title="Instant Resume Generation"
              description="Create a professional resume in minutes with our easy-to-use builder."
            />
            <FeatureCard
              icon={BarChart}
              title="ATS Optimization"
              description="Ensure your resume passes Applicant Tracking Systems with our optimized formats."
            />
            <FeatureCard
              icon={Users}
              title="100+ Templates"
              description="Choose from a wide range of professionally designed templates for any job or industry."
            />
            <FeatureCard
              icon={Lock}
              title="Privacy Protection"
              description="Your data is secure with our advanced encryption and privacy measures."
            />
            <FeatureCard
              icon={Globe}
              title="Multi-Language Support"
              description="Create resumes in multiple languages to apply for international positions."
            />
          </div>
        </section>

        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-to-r from-purple-800 to-pink-800 rounded-lg p-8 relative overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                backgroundImage: [
                  'radial-gradient(circle, #ff00ff 0%, transparent 50%)',
                  'radial-gradient(circle, #00ffff 0%, transparent 50%)',
                  'radial-gradient(circle, #ff00ff 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6 text-center text-white">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: FileText, title: "Choose a Template", description: "Select from our wide range of professional templates" },
                  { icon: Zap, title: "Fill in Your Details", description: "Our AI assists you in completing your resume with relevant information" },
                  { icon: Star, title: "Download and Apply", description: "Get your polished, ATS-optimized resume ready to impress employers" }
                ].map((step, index) => (
                  <motion.div
                    key={step.title}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <step.icon className="h-12 w-12 mx-auto mb-4 text-purple-300" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                    <p className="text-gray-200">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center text-purple-400">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Alex Johnson", role: "Software Engineer", quote: "The AI suggestions were spot-on! I landed interviews at top tech companies." },
              { name: "Sarah Lee", role: "Marketing Specialist", quote: "Creating a standout resume was a breeze. Highly recommend for fellow marketers!" },
              { name: "Michael Chen", role: "Recent Graduate", quote: "As a new grad, this tool gave me the confidence to apply for my dream jobs." }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-gray-800 p-6 rounded-lg shadow-md border border-purple-500"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <Star className="h-6 w-6 text-yellow-400 mb-4" />
                <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-purple-300">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.section
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-purple-400">Ready to Build Your Perfect Resume?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have successfully landed their dream jobs using our AI-powered platform.
          </p>
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
            whileHover={{ scale: 1.05 }} // Ask In the Meeting 
            whileTap={{ scale: 0.95 }}
          >
            Get Started for Free
          </Button>
        </motion.section>
      </main>

      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} AI Resume Builder SaaS. All rights reserved.</p>
          <div className="mt-4">
            <a href="#" className="text-purple-400 hover:underline mx-2">Privacy Policy</a>
            <a href="#" className="text-purple-400 hover:underline mx-2">Terms of Service</a>
            <a href="#" className="text-purple-400 hover:underline mx-2">Contact Us</a>
          </div>
        </div>
      </footer>

      <motion.div
        className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </div>
  )
}