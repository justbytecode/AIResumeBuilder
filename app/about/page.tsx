"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SparkleBackground = () => {
  const sparkles = Array.from({ length: 50 }).map((_, i) => (
    <Sparkle
      key={i}
      size={Math.random() * 4 + 1}
      color={`hsl(${Math.random() * 360}, 100%, 75%)`}
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}
    />
  ));

  return <div className="absolute inset-0 overflow-hidden">{sparkles}</div>;
};

const Sparkle = ({ size, color, style }: any) => (
  <motion.div
    style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      backgroundColor: color,
      ...style,
    }}
    animate={{
      y: ['0%', '100%'],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: Math.random() * 2 + 1,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

const TeamMember = ({ name, role, imageUrl }: any) => (
  <div className="flex flex-col items-center mb-8">
    <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
      <Image
        src={imageUrl}
        alt={name}
        width={128}
        height={128}
        className="object-cover"
      />
    </div>
    <h3 className="text-lg font-semibold">{name}</h3>
    <p className="text-purple-400">{role}</p>
  </div>
);

export default function AboutPage() {
  const navItems = ["Features", "Pricing", "About"];

  const listVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hover: { scale: 1.1 },
  };
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if user is authenticated
    if (session?.user) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans relative overflow-hidden">
      <SparkleBackground />
      <div className="relative z-10">
        {/* Navigation Bar */}
        <nav className="flex justify-between mt-9 items-center">
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
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-300 font-bold hover:text-purple-400 transition-colors"
                  passHref
                >
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
            {!session?.user ? (
              <Button
                onClick={() => signIn()}
                variant="outline"
                className="mr-2 border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
              >
                Log In
              </Button>
            ) : (
              <Button
                onClick={() => signOut()}
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                Log Out
              </Button>
            )}
          </motion.div>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.h1
          className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About AI Resume Builder
        </motion.h1>
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <p className="text-xl mb-6">
            AI Resume Builder is revolutionizing the way people create and manage their professional profiles. Our
            cutting-edge AI technology helps you craft the perfect resume, tailored to your unique skills and
            experiences.
          </p>
          <p className="text-xl mb-6">
            We believe that everyone deserves a chance to showcase their best self to potential employers. Our mission
            is to empower job seekers with the tools they need to stand out in today&apos;s competitive job market.
          </p>
        </motion.div>
        <motion.div
          className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl mx-auto mb-16"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">A Message from Our Founder</h2>
          <blockquote className="text-lg italic">
            &quot;In the age of AI, we&apos;re not just building resumes; we&apos;re crafting digital representations of human
            potential. Our technology doesn&apos;t replace the human touch – it amplifies it. We&apos;re here to help you tell your
            story in a way that resonates in the digital world, opening doors to opportunities you might never have
            imagined. The future of work is here, and we&apos;re excited to be your partner in navigating it.&quot;
          </blockquote>
          <p className="mt-4 text-right text-purple-400">- S.N Pal - Founder & CEO</p>
        </motion.div>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-8">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamMember
              name="SHREENIWAS PAL"
              role="Founder & CEO"
              imageUrl="/pic2.jpg"
            />
            <TeamMember
              name="MANI PAL"
              role="Web-Developers & AI Developers"
              imageUrl="/pic3.jpg"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
