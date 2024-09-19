// app/dashboard/page.tsx
"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import ImportResume from "../resume-import/page";
import Link from "next/link";
import { motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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

const SparkleBackground = () => {
  const sparkles = Array.from({ length: 50 }).map((_, i) => (
    <MovingSparkle key={i} delay={i * 0.1} />
  ));

  return <div className="absolute inset-0 overflow-hidden pointer-events-none">{sparkles}</div>;
};

export default function Dashboard() {
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
              <FileText className="h-10 m-5 w-10 text-purple-500" />
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
                className="bg-purple-500 m-5 hover:bg-purple-600 text-white"
              >
                Log Out
              </Button>
            )}
          </motion.div>
        </nav>

        {/* Two Buttons Section */}
        <div className="bg-gray-800 py-5 mt-7">
          <div className="container mx-auto flex justify-center space-x-4">
            {[["/resume-builder", "Builder"], ["/resume-parser", "Parser"]].map(([href, text]) => (
              <Link
                key={text}
                className="rounded-md px-2 py-2 text-white hover:bg-gray-900 focus-visible:bg-gray-100 lg:px-4"
                href={href}
              >
                {text}
              </Link>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <ImportResume />
          </div>
        </section>
      </div>
    </div>
  );
}
