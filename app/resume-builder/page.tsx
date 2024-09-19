"use client";

import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
import { ResumeForm } from "../components/ResumeForm";
import { Resume } from "../components/Resume";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const MovingSparkle = ({ delay = 0 }) => {
  return (
    <motion.div
      className="absolute w-1 h-1 bg-purple-400 rounded-full"
      initial={{
        opacity: 0,
        scale: 0,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
      }}
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
  );
};

const Sparkle = ({ size, color, style }: any) => (
  <motion.div
    style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      backgroundColor: color,
      ...style,
    }}
    animate={{
      y: ["0%", "100%"],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: Math.random() * 2 + 1,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

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

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{sparkles}</div>;
};

export default function Create() {
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
              <FileText className="h-10 w-10 m-5 text-purple-500" />
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
                  className="text-gray-300 text-2xl font-bold hover:text-purple-400 transition-colors"
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
                className="mr-2 border-purple-500 m-5 text-purple-500 hover:bg-purple-500 hover:text-white"
              >
                Log In
              </Button>
            ) : (
              <Button
                onClick={() => signOut()}
                className="bg-purple-500 hover:bg-purple-600 m-5 text-white"
              >
                Log Out
              </Button>
            )}
          </motion.div>
        </nav>

        <Provider store={store}>
          <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                AI Resume Builder
              </h1>
              <div className="grid grid-cols-3 md:grid-cols-6">
                <div className="col-span-3 bg-gray-900 text-gray-100">
                  <ResumeForm />
                </div>
                <div className="col-span-3 bg-gray-900 text-gray-100">
                  <Resume />
                </div>
              </div>
            </div>
          </div>
        </Provider>
      </div>
    </div>
  );
}
