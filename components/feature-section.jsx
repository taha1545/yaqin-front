"use client";

import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import {
    BookOpen,
    Shield,
    Users,
    Sparkles,
    Zap,
    Heart,
} from "lucide-react";

const features = [
    {
        title: "محتوى تعليمي متميز",
        icon: BookOpen,
        description: "دروس مصممة بعناية من قبل خبراء تربويين لتناسب جميع المستويات العمرية.",
    },
    {
        title: "بيئة آمنة تماماً",
        icon: Shield,
        description: "نضمن بيئة خالية من الإعلانات والمحتوى غير اللائق لحماية طفلك وضمان خصوصيته.",
    },
    {
        title: "متابعة الوالدين",
        icon: Users,
        description: "لوحة تحكم شاملة تتيح لك متابعة تقدم طفلك ونتائجه بشكل دوري ومفصل.",
    },
    {
        title: "تعلم تفاعلي",
        icon: Sparkles,
        description: "نستخدم أحدث التقنيات لجعل عملية التعلم ممتعة وجاذبة لانتباه الأطفال.",
    },
    {
        title: "واجهة سهلة",
        icon: Zap,
        description: "تصميم بسيط وسلس يتيح للطفل التنقل بين الأقسام دون الحاجة لمساعدة.",
    },
    {
        title: "بناء الشخصية",
        icon: Heart,
        description: "نهتم بتعزيز القيم والأخلاق وبناء الثقة بالنفس بجانب المحتوى الأكاديمي.",
    },
];

export function FeatureCard({ feature, className, ...props }) {
    return (
        <div
            className={cn("relative overflow-hidden bg-background p-6 text-right", className)}
            {...props}
        >
            <div className="-mt-2 -mr-20 mask-[radial-gradient(farthest-side_at_top,white,transparent)] pointer-events-none absolute top-0 right-1/2 size-full">
                <GridPattern
                    className="absolute inset-0 size-full stroke-foreground/20"
                    height={40}
                    width={40}
                    x={-5}
                />
            </div>
            <feature.icon aria-hidden className="size-6 text-primary" strokeWidth={1.5} />
            <h3 className="mt-10 text-base font-bold md:text-lg">{feature.title}</h3>
            <p className="relative z-20 mt-2 font-light text-muted-foreground text-sm leading-relaxed">
                {feature.description}
            </p>
        </div>
    );
}

export function FeatureSection() {
    return (
        <div dir="rtl" className="mx-auto w-full max-w-5xl space-y-12 py-16 px-4">
            <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-balance font-bold text-3xl md:text-4xl lg:text-5xl">
                    لماذا تختار يقين؟
                </h2>
                <p className="mt-4 text-balance text-muted-foreground text-lg">
                    نقدم تجربة تعليمية فريدة تركز على الجودة والتفاعل وبناء الثقة لدى الطفل.
                </p>
            </div>
            <div className="overflow-hidden rounded-xl border shadow-sm">
                <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
                    {features.map((feature) => (
                        <FeatureCard feature={feature} key={feature.title} />
                    ))}
                </div>
            </div>
        </div>
    );
}