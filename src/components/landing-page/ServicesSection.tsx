"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { motion } from "motion/react";
import { Sparkles, Zap, Target } from "lucide-react";
import { services } from "./data";

export function ServicesSection() {
  return (
    <section className="py-20 px-6 bg-white/50 relative">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h3
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Dịch vụ chuyên khoa
          </motion.h3>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Chúng tôi cung cấp đầy đủ các dịch vụ y tế chuyên khoa với đội ngũ
            bác sĩ giàu kinh nghiệm
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                y: -15,
                scale: 1.08,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <Card
                className={`relative overflow-hidden bg-white/90 backdrop-blur-sm ${service.colors.border} ${service.colors.hover} hover:shadow-2xl transition-all duration-500`}
              >
                {/* Gradient overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  initial={{ scale: 0, rotate: 45 }}
                  whileHover={{ scale: 1.5, rotate: 0 }}
                  transition={{ duration: 0.6 }}
                />

                <CardHeader className="text-center relative z-10">
                  <motion.div
                    className={`relative p-4 ${service.colors.bg} rounded-full w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 overflow-hidden`}
                    whileHover={{
                      rotate: 360,
                      transition: { duration: 0.6 },
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    />
                    <service.icon
                      className={`h-8 w-8 ${service.colors.icon} relative z-10`}
                    />
                    <motion.div
                      className="absolute top-1 right-1"
                      animate={{
                        scale: [0.8, 1.2, 0.8],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    >
                      <Sparkles className="h-3 w-3 text-yellow-400" />
                    </motion.div>
                  </motion.div>

                  <CardTitle className="group-hover:text-blue-600 transition-colors duration-300 relative">
                    {service.title}
                    <motion.div
                      className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      animate={{
                        scale: [0.8, 1.1, 0.8],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    >
                      <Zap className="h-4 w-4 text-yellow-500" />
                    </motion.div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-center relative z-10 space-y-4">
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {service.description}
                  </p>

                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    whileHover={{
                      opacity: 1,
                      height: "auto",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Target className="h-4 w-4 text-blue-500" />
                      <span className="font-medium text-gray-700">
                        Dịch vụ nổi bật:
                      </span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1">
                      {service.features.map((feature, idx) => (
                        <motion.span
                          key={idx}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{
                            scale: 1,
                            opacity: 1,
                          }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
