import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brain, Sparkles, BarChart3, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const features = [
  {
    icon: Brain,
    title: "AI Insights",
    description:
      "Smart analysis of your spending patterns with intelligent recommendations",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Sparkles,
    title: "Auto Categories",
    description:
      "Intelligent expense categorization powered by machine learning",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: BarChart3,
    title: "Smart Dashboard",
    description:
      "Beautiful, intuitive financial overview with real-time analytics",
    color: "from-emerald-500 to-teal-500",
  },
];

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] opacity-30 sm:opacity-50" />

      {/* Gradient Orbs */}
      <div className="absolute top-10 left-5 w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-emerald-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-5 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-blue-400/20 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000" />

      <motion.div
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <Badge
            variant="secondary"
            className="mb-6 sm:mb-8 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-md sm:shadow-lg"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
            AI-Powered Financial Management
          </Badge>
        </motion.div>

        {/* Main Heading */}
        <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
            <span className="text-slate-900 dark:text-white">Welcome to</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              FinSense AI
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-10">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 max-w-xl sm:max-w-2xl lg:max-w-3xl leading-relaxed mx-auto">
            Track your expenses, manage your budget, and get AI-powered insights
            to take control of your finances with intelligent automation.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="mb-12 sm:mb-16 lg:mb-20">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              size="lg"
              className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 group"
              onClick={() => navigate("/dashboard")}
            >
              Get Started Free
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold border-2 border-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-[90%] sm:max-w-4xl lg:max-w-6xl w-full"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              custom={index}
            >
              <Card className="group relative overflow-hidden border-0 shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-500 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm hover:scale-102 sm:hover:scale-105">
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="relative">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1 sm:mb-2">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>

                {/* Hover Effect Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;