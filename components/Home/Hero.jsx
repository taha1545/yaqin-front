"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative overflow-hidden  from-primary/5 to-transparent pt-20 pb-32 px-5">
            <div className="container px-4 mx-auto flex flex-col md:flex-row items-center gap-12">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex-1 text-center md:text-right"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        نبني المعرفة <span className="text-primary">بيقين</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
                        منصة تعليمية متكاملة مصممة خصيصاً لتعزيز مهارات الأطفال بأسلوب ممتع وآمن.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Link href="/auth/register">
                            <Button size="lg" className="text-lg px-8 py-6 rounded-xl">
                                ابدأ رحلة التعلم
                                <ArrowRight className="mr-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="/auth/login">
                            <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl">
                                تسجيل الدخول
                            </Button>
                        </Link>
                    </div>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1"
                >
                    <div className="rounded-2xl overflow-hidden shadow-2xl border">
                        <Image
                            src="/hero-img.jpg"
                            alt="Students learning"
                            className="w-full"
                            width={600}
                            height={400}
                        />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
