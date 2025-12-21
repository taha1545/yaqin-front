"use client";

import { motion } from "framer-motion";
import { BookOpen, Shield, Users } from "lucide-react";

export default function About() {
    return (
        <section className="py-24 bg-secondary/30">
            <div className="container px-4 mx-auto">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">لماذا تختار يقين؟</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        نقدم تجربة تعليمية فريدة تركز على الجودة والتفاعل وبناء الثقة لدى الطفل.
                    </p>
                </div>


                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={BookOpen}
                        title="محتوى تعليمي متميز"
                        description="دروس مصممة بعناية من قبل خبراء تربويين لتناسب جميع المستويات."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={Shield}
                        title="بيئة آمنة تماماً"
                        description="نضمن بيئة خالية من الإعلانات والمحتوى غير اللائق لحماية طفلك."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={Users}
                        title="متابعة الوالدين"
                        description="لوحة تحكم شاملة تتيح لك متابعة تقدم طفلك ودرجاته أولاً بأول."
                        delay={0.3}
                    />
                </div>
            </div>
        </section>
    );
}

function FeatureCard({ icon: Icon, title, description, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
        >
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 mx-auto md:mx-0">
                <Icon size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </motion.div>
    );
}
