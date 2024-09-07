'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FileText, Check, CreditCard } from 'lucide-react'
import Link from 'next/link'

const PricingTier = ({ name, price, features, recommended = false }:any) => (
  <motion.div
    className={`bg-gray-800 p-6 rounded-lg shadow-lg ${recommended ? 'border-2 border-purple-500' : 'border border-gray-700'}`}
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {recommended && (
      <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
        Recommended
      </span>
    )}
    <h3 className="text-2xl font-bold mb-4 text-purple-300">{name}</h3>
    <p className="text-4xl font-bold mb-6 text-white">${price}<span className="text-xl text-gray-400">/month</span></p>
    <ul className="mb-6 space-y-2">
      {features.map((feature :any, index:any) => (
        <li key={index} className="flex items-center text-gray-300">
          <Check className="h-5 w-5 mr-2 text-green-400" />
          {feature}
        </li>
      ))}
    </ul>
    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Choose Plan</Button>
  </motion.div>
)

export default function PricingPage() {
  const [paymentMethod, setPaymentMethod] = useState('credit-card')

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
           <Link href="/" >
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
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16">
        <motion.section
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Select the perfect plan to boost your career with our AI-powered resume builder.
          </p>
        </motion.section>

        <section className="mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            <PricingTier
              name="Basic"
              price={5.99}
              features={[
                "5 resume templates",
                "AI content suggestions",
                "ATS-friendly formats",
                "Download as PDF"
              ]}
            />
            <PricingTier
              name="Pro"
              price={12.99}
              features={[
                "20 resume templates",
                "Advanced AI content suggestions",
                "ATS-friendly formats",
                "Download as PDF & Word",
                "Cover letter builder",
                "LinkedIn profile optimization"
              ]}
              recommended={true}
            />
            <PricingTier
              name="Enterprise"
              price={39.99}
              features={[
                "Unlimited resume templates",
                "Premium AI content suggestions",
                "ATS-friendly formats",
                "Download in all formats",
                "Cover letter builder",
                "LinkedIn profile optimization",
                "Personal career coach",
                "Priority support"
              ]}
            />
          </div>
        </section>

        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">Payment Information</h2>
            <form>
              <div className="mb-6">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" className="bg-gray-700 text-white border-gray-600" />
              </div>
              <div className="mb-6">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="bg-gray-700 text-white border-gray-600" />
              </div>
              <div className="mb-6">
                <Label>Payment Method</Label>
                <RadioGroup defaultValue="credit-card" onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card">Credit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                </RadioGroup>
              </div>
              {paymentMethod === 'credit-card' && (
                <>
                  <div className="mb-6">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" className="bg-gray-700 text-white border-gray-600" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" className="bg-gray-700 text-white border-gray-600" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" className="bg-gray-700 text-white border-gray-600" />
                    </div>
                  </div>
                </>
              )}
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" size="lg">
                <CreditCard className="mr-2 h-4 w-4" /> Pay Now
              </Button>
            </form>
          </div>
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
    </div>
  )
}