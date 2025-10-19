"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Badge } from "../ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useAuth } from "./AuthContext";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart,
  AlertCircle,
  Shield,
  Users,
  Calendar,
  Activity,
  Stethoscope,
  Monitor,
  Clock,
  Zap,
  ArrowLeft,
  Eye,
  EyeOff,
  Sparkles,
  Lock,
  Mail,
} from "lucide-react";

export function LoginForm({
  onBackToLanding,
}: {
  onBackToLanding?: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [loadingAccountEmail, setLoadingAccountEmail] = useState<string | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { login } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError("Email hoặc mật khẩu không đúng");
      }
    } catch (err) {
      setError("Đã xảy ra lỗi khi đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    {
      role: "ADMIN",
      email: "admin@hospital.com",
      password: "admin123",
      color: "bg-red-500",
      icon: Shield,
    },
    {
      role: "DOCTOR",
      email: "doctor@hospital.com",
      password: "doctor123",
      color: "bg-blue-500",
      icon: Stethoscope,
    },
    {
      role: "PATIENT",
      email: "patient@hospital.com",
      password: "patient123",
      color: "bg-green-500",
      icon: Users,
    },
    {
      role: "RECEPTIONIST",
      email: "receptionist@hospital.com",
      password: "receptionist123",
      color: "bg-purple-500",
      icon: Calendar,
    },
    {
      role: "STAFF",
      email: "staff@hospital.com",
      password: "staff123",
      color: "bg-orange-500",
      icon: Activity,
    },
    {
      role: "SUPERADMIN",
      email: "superadmin@hospital.com",
      password: "superadmin123",
      color: "bg-gray-800",
      icon: Monitor,
    },
  ];

  const quickLogin = async (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
    setError("");
    setLoading(true);
    setLoadingAccountEmail(email);

    try {
      // Thêm một chút delay để user thấy loading state
      await new Promise((resolve) => setTimeout(resolve, 800));

      const success = await login(email, password);
      if (!success) {
        setError("Đăng nhập không thành công");
        setLoading(false);
        setLoadingAccountEmail(null);
        setIsPopoverOpen(false); // Đóng collapsible khi có lỗi
      }
      // Nếu thành công thì sẽ redirect, không cần setLoading(false)
    } catch (err) {
      setError("Đã xảy ra lỗi khi đăng nhập");
      setLoading(false);
      setLoadingAccountEmail(null);
      setIsPopoverOpen(false); // Đóng collapsible khi có lỗi
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Multi-layered Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700"
        animate={{
          background: [
            "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0f766e 100%)",
            "linear-gradient(135deg, #1e40af 0%, #0ea5e9 50%, #0d9488 100%)",
            "linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0f766e 100%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-cyan-600/30 via-blue-600/20 to-teal-500/40"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-500/10 to-cyan-400/30" />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent"
        animate={{
          background: [
            "radial-gradient(ellipse at top right, rgba(96, 165, 250, 0.2) 0%, transparent 60%)",
            "radial-gradient(ellipse at top right, rgba(34, 211, 238, 0.25) 0%, transparent 70%)",
            "radial-gradient(ellipse at top right, rgba(96, 165, 250, 0.2) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-teal-400/20 via-transparent to-transparent"
        animate={{
          background: [
            "radial-gradient(ellipse at bottom left, rgba(45, 212, 191, 0.2) 0%, transparent 60%)",
            "radial-gradient(ellipse at bottom left, rgba(6, 182, 212, 0.25) 0%, transparent 70%)",
            "radial-gradient(ellipse at bottom left, rgba(45, 212, 191, 0.2) 0%, transparent 60%)",
          ],
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
      />

      {/* Enhanced Animated Particles */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-300/30 via-cyan-200/20 to-teal-200/30 rounded-full blur-2xl shadow-2xl"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.2, 0.8, 1],
          opacity: [0.3, 0.7, 0.4, 0.3],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-40 h-40 bg-gradient-to-tr from-teal-300/25 via-blue-200/20 to-cyan-300/25 rounded-full blur-3xl shadow-xl"
        animate={{
          x: [0, -25, 40, 0],
          y: [0, 30, -50, 0],
          scale: [1, 0.9, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-20 w-24 h-24 bg-gradient-to-bl from-cyan-400/30 via-blue-300/20 to-teal-300/25 rounded-full blur-xl shadow-lg"
        animate={{
          x: [0, 15, -25, 0],
          y: [0, -20, 35, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-32 right-32 w-28 h-28 bg-gradient-to-br from-white/15 via-blue-200/20 to-cyan-200/15 rounded-full blur-2xl shadow-xl"
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 25, -15, 0],
          scale: [1, 0.8, 1.2, 1],
          opacity: [0.15, 0.4, 0.2, 0.15],
        }}
        transition={{ duration: 14, repeat: Infinity, delay: 3 }}
      />

      {/* Medium floating elements with enhanced animations */}
      <motion.div
        className="absolute top-64 left-1/4 w-20 h-20 bg-gradient-to-tr from-teal-300/20 via-cyan-300/15 to-blue-300/20 rounded-full blur-lg shadow-lg"
        animate={{
          x: [0, 20, -15, 0],
          y: [0, -25, 30, 0],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-48 left-32 w-36 h-36 bg-gradient-to-bl from-blue-300/15 via-teal-200/20 to-cyan-200/15 rounded-full blur-2xl shadow-2xl"
        animate={{
          scale: [1, 1.3, 0.7, 1],
          opacity: [0.15, 0.4, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Interactive sparkles */}
      <motion.div
        className="absolute top-60 right-1/3 w-4 h-4 bg-gradient-to-br from-white/40 to-cyan-200/30 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.8, 0.2],
          rotate: [0, 360],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-60 left-2/3 w-3 h-3 bg-gradient-to-tr from-blue-300/40 to-teal-200/35 rounded-full"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.25, 0.7, 0.25],
          y: [0, -20, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute top-3/4 left-1/5 w-5 h-5 bg-gradient-to-bl from-cyan-400/30 to-blue-300/25 rounded-full"
        animate={{
          x: [0, 15, -10, 0],
          scale: [1, 1.2, 0.8, 1],
          opacity: [0.2, 0.6, 0.3, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 2 }}
      />

      {/* Additional floating sparkle effects */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
            y: [0, -30, -60],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut",
          }}
        />
      ))}

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Enhanced Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12">
          <motion.div
            className="max-w-md"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="flex items-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl mr-4 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(255, 255, 255, 0.1)",
                    "0 0 30px rgba(255, 255, 255, 0.2)",
                    "0 0 20px rgba(255, 255, 255, 0.1)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Heart className="h-12 w-12 text-white" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </motion.div>
              <div>
                <motion.h1
                  className="text-4xl font-bold text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  MediCare
                </motion.h1>
                <motion.p
                  className="text-blue-100 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Hệ thống Quản lý Bệnh viện
                </motion.p>
              </div>
            </motion.div>

            <motion.h2
              className="text-3xl font-semibold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Chăm sóc sức khỏe
              <br />
              <motion.span
                className="text-teal-300"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(94, 234, 212, 0.5)",
                    "0 0 20px rgba(94, 234, 212, 0.8)",
                    "0 0 10px rgba(94, 234, 212, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Hiện đại & Thông minh
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-blue-100 text-lg mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Nền tảng quản lý bệnh viện toàn diện với công nghệ tiên tiến, giúp
              tối ưu hóa quy trình chăm sóc bệnh nhân và quản lý y tế.
            </motion.p>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                {
                  icon: Users,
                  number: "2,500+",
                  label: "Bệnh nhân",
                  color: "teal",
                },
                {
                  icon: Stethoscope,
                  number: "150+",
                  label: "Bác sĩ",
                  color: "blue",
                },
                {
                  icon: Calendar,
                  number: "98%",
                  label: "Hiệu quả",
                  color: "purple",
                },
                {
                  icon: Clock,
                  number: "24/7",
                  label: "Hỗ trợ",
                  color: "green",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <motion.div
                    className={`p-2 bg-${stat.color}-400/20 rounded-lg relative overflow-hidden`}
                    whileHover={{
                      boxShadow: `0 0 20px rgba(${
                        stat.color === "teal"
                          ? "45, 212, 191"
                          : stat.color === "blue"
                          ? "59, 130, 246"
                          : stat.color === "purple"
                          ? "168, 85, 247"
                          : "34, 197, 94"
                      }, 0.4)`,
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    >
                      <stat.icon className={`h-5 w-5 text-${stat.color}-300`} />
                    </motion.div>
                    <motion.div
                      className="absolute top-0 right-0"
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 0.6, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3 + 1,
                      }}
                    >
                      <Sparkles className="h-3 w-3 text-white" />
                    </motion.div>
                  </motion.div>
                  <div>
                    <motion.p
                      className="text-white font-medium"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    >
                      {stat.number}
                    </motion.p>
                    <p className="text-blue-200 text-sm">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side - Enhanced Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Enhanced Mobile Header */}
            <motion.div
              className="lg:hidden text-center mb-8"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div
                className="flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl relative overflow-hidden"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(255, 255, 255, 0.1)",
                      "0 0 30px rgba(255, 255, 255, 0.2)",
                      "0 0 20px rgba(255, 255, 255, 0.1)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="h-8 w-8 text-white" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: [-50, 50] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />
                </motion.div>
              </motion.div>
              <motion.h1
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Hệ thống Bệnh viện
              </motion.h1>
              <motion.p
                className="text-blue-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Đăng nhập để tiếp tục
              </motion.p>
            </motion.div>

            {/* Enhanced Back to Landing Button */}
            {onBackToLanding && (
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    onClick={onBackToLanding}
                    className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm transition-all duration-300 group"
                  >
                    <motion.div
                      className="flex items-center justify-center space-x-2"
                      whileHover={{ x: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowLeft className="h-4 w-4 group-hover:text-teal-300 transition-colors" />
                      <span>Quay lại trang chủ</span>
                    </motion.div>
                  </Button>
                </motion.div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 30,
                scale: isVisible ? 1 : 0.95,
              }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="backdrop-blur-2xl bg-white/90 border-white/30 shadow-2xl ring-1 ring-white/20 relative overflow-hidden">
                {/* Card glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-teal-500/5 to-cyan-500/5"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(59, 130, 246, 0.05) 0%, rgba(20, 184, 166, 0.05) 50%, rgba(6, 182, 212, 0.05) 100%)",
                      "linear-gradient(45deg, rgba(6, 182, 212, 0.05) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(20, 184, 166, 0.05) 100%)",
                      "linear-gradient(45deg, rgba(59, 130, 246, 0.05) 0%, rgba(20, 184, 166, 0.05) 50%, rgba(6, 182, 212, 0.05) 100%)",
                    ],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />

                <CardHeader className="space-y-1 pb-6 relative">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-center"
                  >
                    <CardTitle className="text-2xl font-semibold text-gray-900 flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Lock className="h-6 w-6 text-blue-600" />
                      </motion.div>
                      Đăng nhập
                    </CardTitle>
                    <CardDescription className="text-gray-600 mt-2">
                      Truy cập vào hệ thống quản lý bệnh viện
                    </CardDescription>
                  </motion.div>
                </CardHeader>

                <CardContent className="space-y-6 relative">
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      <Label
                        htmlFor="email"
                        className="text-gray-700 font-medium flex items-center gap-2"
                      >
                        <Mail className="h-4 w-4 text-blue-600" />
                        Địa chỉ Email
                      </Label>
                      <motion.div
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Input
                          id="email"
                          type="email"
                          placeholder="Nhập email của bạn"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                          required
                        />
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      <Label
                        htmlFor="password"
                        className="text-gray-700 font-medium flex items-center gap-2"
                      >
                        <Lock className="h-4 w-4 text-blue-600" />
                        Mật khẩu
                      </Label>
                      <motion.div
                        className="relative"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Nhập mật khẩu"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 pr-10 transition-all duration-300"
                          required
                        />
                        <motion.button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </motion.button>
                      </motion.div>
                    </motion.div>

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Alert className="border-red-200 bg-red-50">
                            <motion.div
                              animate={{ rotate: [0, 5, -5, 0] }}
                              transition={{ duration: 0.5 }}
                            >
                              <AlertCircle className="h-4 w-4 text-red-600" />
                            </motion.div>
                            <AlertDescription className="text-red-700">
                              {error}
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          className="w-full h-11 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-medium shadow-lg transition-all duration-300 hover:shadow-xl relative overflow-hidden group"
                          disabled={loading}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{
                              x: loading ? ["-100%", "100%"] : "-100%",
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: loading ? Infinity : 0,
                              ease: "linear",
                            }}
                          />
                          {loading ? (
                            <motion.div
                              className="flex items-center space-x-2"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <motion.div
                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              />
                              <span>Đang đăng nhập...</span>
                            </motion.div>
                          ) : (
                            <motion.span className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300">
                              Đăng nhập
                              <motion.div
                                animate={{ x: [0, 3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <ArrowLeft className="h-4 w-4 rotate-180" />
                              </motion.div>
                            </motion.span>
                          )}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </motion.form>

                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                    >
                      <div className="absolute inset-0 flex items-center">
                        <motion.div
                          className="w-full border-t border-gray-300"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 1.5, duration: 0.5 }}
                        />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <motion.span
                          className="px-3 bg-white text-gray-500"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.6, duration: 0.3 }}
                        >
                          Hoặc
                        </motion.span>
                      </div>
                    </motion.div>

                    <Collapsible
                      open={isPopoverOpen}
                      onOpenChange={setIsPopoverOpen}
                    >
                      <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.7 }}
                      >
                        <CollapsibleTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              variant="outline"
                              className="h-11 px-6 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:shadow-md group relative overflow-hidden"
                              disabled={loading}
                            >
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/50 to-transparent"
                                animate={{ x: [-100, 100] }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatDelay: 3,
                                }}
                                style={{
                                  display: isPopoverOpen ? "none" : "block",
                                }}
                              />
                              <div className="flex items-center space-x-2 relative">
                                <motion.div
                                  className="p-1 rounded-md transition-all duration-200 relative overflow-hidden"
                                  style={{
                                    background: loading
                                      ? "linear-gradient(45deg, #6b7280, #9ca3af)"
                                      : "linear-gradient(45deg, #3b82f6, #14b8a6)",
                                  }}
                                  whileHover={{
                                    background:
                                      "linear-gradient(45deg, #2563eb, #0d9488)",
                                    boxShadow:
                                      "0 0 15px rgba(59, 130, 246, 0.4)",
                                  }}
                                  animate={{
                                    boxShadow: isPopoverOpen
                                      ? [
                                          "0 0 10px rgba(59, 130, 246, 0.3)",
                                          "0 0 20px rgba(59, 130, 246, 0.5)",
                                          "0 0 10px rgba(59, 130, 246, 0.3)",
                                        ]
                                      : "0 0 10px rgba(59, 130, 246, 0.2)",
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: isPopoverOpen ? Infinity : 0,
                                  }}
                                >
                                  {loading ? (
                                    <motion.div
                                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                      animate={{ rotate: 360 }}
                                      transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: "linear",
                                      }}
                                    />
                                  ) : (
                                    <motion.div
                                      animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: isPopoverOpen ? [0, 180] : 0,
                                      }}
                                      transition={{
                                        duration: isPopoverOpen ? 0.3 : 1.5,
                                        repeat: isPopoverOpen ? 0 : Infinity,
                                      }}
                                    >
                                      <Zap className="h-4 w-4 text-white" />
                                    </motion.div>
                                  )}
                                </motion.div>
                                <motion.span
                                  className="font-medium text-gray-700 group-hover:text-blue-700 transition-colors duration-200"
                                  animate={{
                                    scale: loading ? [1, 1.05, 1] : 1,
                                  }}
                                  transition={{
                                    duration: 1,
                                    repeat: loading ? Infinity : 0,
                                  }}
                                >
                                  {loading
                                    ? "Đang xử lý..."
                                    : "Đăng nhập nhanh"}
                                </motion.span>
                              </div>
                            </Button>
                          </motion.div>
                        </CollapsibleTrigger>
                      </motion.div>

                      <CollapsibleContent className="mt-4">
                        <motion.div
                          className="bg-gradient-to-br from-gray-50 to-blue-50/30 border border-gray-200 rounded-lg p-4 space-y-4 relative overflow-hidden"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Background pattern */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-transparent to-teal-100/20"
                            animate={{ x: [-100, 100] }}
                            transition={{
                              duration: 8,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />

                          <motion.div
                            className="text-center relative"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                          >
                            <h3 className="font-semibold text-gray-900 mb-1 flex items-center justify-center gap-2">
                              <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <Sparkles className="h-4 w-4 text-blue-600" />
                              </motion.div>
                              Chọn vai trò đăng nhập
                            </h3>
                            <p className="text-sm text-gray-500">
                              Nhấp để đăng nhập nhanh với tài khoản demo
                            </p>
                          </motion.div>

                          <motion.div
                            className="grid grid-cols-2 gap-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {demoAccounts.map((account, index) => {
                              const Icon = account.icon;
                              return (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  transition={{
                                    delay: 0.3 + index * 0.1,
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 20,
                                  }}
                                  whileHover={{
                                    scale: 1.05,
                                    y: -3,
                                    transition: { duration: 0.2 },
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-auto p-4 bg-white/80 backdrop-blur-sm border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:bg-white/90 disabled:opacity-50 relative overflow-hidden group"
                                    onClick={() =>
                                      quickLogin(
                                        account.email,
                                        account.password
                                      )
                                    }
                                    disabled={loading}
                                  >
                                    {/* Button shine effect */}
                                    <motion.div
                                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                      animate={{ x: [-100, 100] }}
                                      transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 4,
                                        delay: index * 0.5,
                                      }}
                                    />

                                    <div className="flex flex-col items-center space-y-2 w-full relative">
                                      <motion.div
                                        className={`p-2 rounded-lg ${account.color} text-white shadow-sm relative overflow-hidden`}
                                        whileHover={{
                                          scale: 1.1,
                                          boxShadow: `0 0 20px ${
                                            account.color.includes("red")
                                              ? "rgba(239, 68, 68, 0.4)"
                                              : account.color.includes("blue")
                                              ? "rgba(59, 130, 246, 0.4)"
                                              : account.color.includes("green")
                                              ? "rgba(34, 197, 94, 0.4)"
                                              : account.color.includes("purple")
                                              ? "rgba(168, 85, 247, 0.4)"
                                              : account.color.includes("orange")
                                              ? "rgba(249, 115, 22, 0.4)"
                                              : "rgba(107, 114, 128, 0.4)"
                                          }`,
                                        }}
                                        animate={{
                                          boxShadow:
                                            loadingAccountEmail ===
                                            account.email
                                              ? [
                                                  `0 0 10px ${
                                                    account.color.includes(
                                                      "red"
                                                    )
                                                      ? "rgba(239, 68, 68, 0.3)"
                                                      : account.color.includes(
                                                          "blue"
                                                        )
                                                      ? "rgba(59, 130, 246, 0.3)"
                                                      : account.color.includes(
                                                          "green"
                                                        )
                                                      ? "rgba(34, 197, 94, 0.3)"
                                                      : account.color.includes(
                                                          "purple"
                                                        )
                                                      ? "rgba(168, 85, 247, 0.3)"
                                                      : account.color.includes(
                                                          "orange"
                                                        )
                                                      ? "rgba(249, 115, 22, 0.3)"
                                                      : "rgba(107, 114, 128, 0.3)"
                                                  }`,
                                                  `0 0 20px ${
                                                    account.color.includes(
                                                      "red"
                                                    )
                                                      ? "rgba(239, 68, 68, 0.5)"
                                                      : account.color.includes(
                                                          "blue"
                                                        )
                                                      ? "rgba(59, 130, 246, 0.5)"
                                                      : account.color.includes(
                                                          "green"
                                                        )
                                                      ? "rgba(34, 197, 94, 0.5)"
                                                      : account.color.includes(
                                                          "purple"
                                                        )
                                                      ? "rgba(168, 85, 247, 0.5)"
                                                      : account.color.includes(
                                                          "orange"
                                                        )
                                                      ? "rgba(249, 115, 22, 0.5)"
                                                      : "rgba(107, 114, 128, 0.5)"
                                                  }`,
                                                  `0 0 10px ${
                                                    account.color.includes(
                                                      "red"
                                                    )
                                                      ? "rgba(239, 68, 68, 0.3)"
                                                      : account.color.includes(
                                                          "blue"
                                                        )
                                                      ? "rgba(59, 130, 246, 0.3)"
                                                      : account.color.includes(
                                                          "green"
                                                        )
                                                      ? "rgba(34, 197, 94, 0.3)"
                                                      : account.color.includes(
                                                          "purple"
                                                        )
                                                      ? "rgba(168, 85, 247, 0.3)"
                                                      : account.color.includes(
                                                          "orange"
                                                        )
                                                      ? "rgba(249, 115, 22, 0.3)"
                                                      : "rgba(107, 114, 128, 0.3)"
                                                  }`,
                                                ]
                                              : "none",
                                        }}
                                        transition={{
                                          duration: 1,
                                          repeat:
                                            loadingAccountEmail ===
                                            account.email
                                              ? Infinity
                                              : 0,
                                        }}
                                      >
                                        {loadingAccountEmail ===
                                        account.email ? (
                                          <motion.div
                                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{
                                              duration: 1,
                                              repeat: Infinity,
                                              ease: "linear",
                                            }}
                                          />
                                        ) : (
                                          <motion.div
                                            animate={{
                                              rotate: [0, 5, -5, 0],
                                              scale: [1, 1.1, 1],
                                            }}
                                            transition={{
                                              duration: 2,
                                              repeat: Infinity,
                                              delay: index * 0.3,
                                            }}
                                          >
                                            <Icon className="h-4 w-4" />
                                          </motion.div>
                                        )}
                                      </motion.div>
                                      <div className="text-center">
                                        <motion.div
                                          className="text-xs font-semibold text-gray-900"
                                          animate={{
                                            scale:
                                              loadingAccountEmail ===
                                              account.email
                                                ? [1, 1.05, 1]
                                                : 1,
                                          }}
                                          transition={{
                                            duration: 0.8,
                                            repeat:
                                              loadingAccountEmail ===
                                              account.email
                                                ? Infinity
                                                : 0,
                                          }}
                                        >
                                          {account.role === "SUPERADMIN"
                                            ? "SUPER ADMIN"
                                            : account.role === "RECEPTIONIST"
                                            ? "LỄ TÂN"
                                            : account.role === "DOCTOR"
                                            ? "BÁC SĨ"
                                            : account.role === "PATIENT"
                                            ? "BỆNH NHÂN"
                                            : account.role === "STAFF"
                                            ? "NHÂN VIÊN"
                                            : account.role}
                                        </motion.div>
                                        <div className="text-xs text-gray-500 mt-1">
                                          {loadingAccountEmail === account.email
                                            ? "Đang đăng nhập..."
                                            : account.email.split("@")[0]}
                                        </div>
                                      </div>
                                    </div>
                                  </Button>
                                </motion.div>
                              );
                            })}
                          </motion.div>

                          <motion.div
                            className="text-center pt-2 border-t border-gray-200 relative"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                          >
                            <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                              <Shield className="h-3 w-3" />
                              Tài khoản demo - Mật khẩu tự động điền
                            </p>
                          </motion.div>
                        </motion.div>
                      </CollapsibleContent>
                    </Collapsible>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Security Badge */}
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant="secondary"
                  className="bg-white/15 text-white border-white/30 backdrop-blur-lg shadow-lg relative overflow-hidden group cursor-pointer"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: [-100, 100] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Shield className="h-3 w-3 mr-1 relative" />
                  </motion.div>
                  <span className="relative">Bảo mật SSL 256-bit</span>
                  <motion.div
                    className="absolute top-0 right-0"
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 1,
                    }}
                  >
                    <Sparkles className="h-2 w-2 text-green-300" />
                  </motion.div>
                </Badge>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
