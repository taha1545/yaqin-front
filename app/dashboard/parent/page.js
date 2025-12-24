"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    UserPlus,
    BookOpen,
    Trophy,
    TrendingUp,
    Users,
    Bell,
    ArrowLeft,
    Calendar,
    Clock,
    Sparkles,
    ChevronLeft,
    LayoutDashboard
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/header";

const currentUser = { name: "أحمد منصوري", role: "parent" };

const students = [
    {
        id: 1,
        name: "مصعب",
        grade: "السنة الثالثة ابتدائي",
        progress: 78,
        nextLesson: "الكسور العشرية",
        accent: "bg-blue-600",
        lightAccent: "bg-blue-50",
        avatar: "/s3ab.jpg",
    },
    {
        id: 2,
        name: "عبد الصمد",
        grade: "السنة الأولى ثانوي",
        progress: 52,
        nextLesson: "الفيزياء النووية",
        accent: "bg-orange-500",
        lightAccent: "bg-orange-50",
        avatar: "/samed.jpg",
    },
];

export default function ParentDashboard() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (currentUser.role !== "parent") router.replace("/auth/login");
    }, [router]);

    if (!mounted) return null;

    return (
        <div className="min-h-screen " dir="rtl">
            <Header />
            <main className="container mx-auto px-6 py-10 lg:px-8 max-w-6xl ">

                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-wide">
                            <LayoutDashboard size={18} />
                            <span>لوحة التحكم الأساسية</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-slate-800">
                            أهلاً بك، <span className="text-primary">{currentUser.name.split(' ')[0]}</span>
                        </h1>
                        <p className="text-slate-500 text-lg font-medium">
                            نظرة عامة على أداء أبنائك التعليمي اليوم.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors relative shadow-sm">
                            <Bell size={22} />
                            <span className="absolute top-3 left-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
                        <Button className="gap-2 px-8 h-14 rounded-2xl shadow-lg shadow-primary/20 text-md font-bold transition-transform hover:scale-[1.02]">
                            <UserPlus size={20} />
                            إضافة طالب
                        </Button>
                    </div>
                </header>

                {/* Stats Section - New Style, Old Colors */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { title: "الطلاب", value: "2", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
                        { title: "الدروس", value: "38", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
                        { title: "الأوسمة", value: "12", icon: Trophy, color: "text-amber-500", bg: "bg-amber-50" },
                        { title: "النمو", value: "+14%", icon: TrendingUp, color: "text-primary", bg: "bg-blue-50" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-card p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col gap-4">
                            <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.title}</p>
                                <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Main Content: Student List */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="flex items-center justify-between px-2">
                            <h2 className="text-2xl font-black text-slate-800">الأبناء المسجلون</h2>
                            <button className="text-primary font-bold text-sm hover:underline">عرض الكل</button>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            <AnimatePresence>
                                {students.map((student, index) => (
                                    <motion.div
                                        key={student.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative bg-card rounded-[2.5rem] border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all"
                                    >
                                        <div className="flex flex-col md:flex-row items-center gap-8">
                                            {/* Avatar with dynamic old-color ring */}
                                            <div className="relative shrink-0">
                                                <div className={`absolute inset-[-6px] rounded-full ${student.accent} opacity-10`} />
                                                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md">
                                                    <Image src={student.avatar} alt={student.name} fill className="object-cover" />
                                                </div>
                                            </div>

                                            {/* Student Details */}
                                            <div className="flex-1 space-y-4 text-center md:text-right">
                                                <div>
                                                    <h3 className="text-2xl font-black text-slate-800">{student.name}</h3>
                                                    <p className="text-slate-400 font-bold text-sm">{student.grade}</p>
                                                </div>

                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-xs font-bold">
                                                        <span className="text-slate-400">معدل الإنجاز</span>
                                                        <span className="text-slate-800">{student.progress}%</span>
                                                    </div>
                                                    <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${student.progress}%` }}
                                                            className={`h-full ${student.accent} rounded-full`}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quick Actions */}
                                            <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
                                                <button className="h-12 px-6 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
                                                    دخول الملف
                                                    <ChevronLeft size={16} />
                                                </button>
                                                <div className={`h-12 px-4 ${student.lightAccent} rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold text-slate-600`}>
                                                    <Clock size={14} className="text-slate-400" />
                                                    {student.nextLesson}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Add New Student - Premium Style */}
                            <button className="group h-32 flex items-center justify-center gap-4 rounded-[2.5rem] border-2 border-dashed border-slate-200 bg-white/50 hover:bg-white hover:border-primary transition-all">
                                <div className="p-3 rounded-full bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <UserPlus size={24} />
                                </div>
                                <span className="font-bold text-slate-500 group-hover:text-primary">إضافة طالب جديد للمجموعة</span>
                            </button>
                        </div>
                    </div>

                    {/* Sidebar: Activity & Reports */}
                    <aside className="lg:col-span-4 space-y-8">

                        {/* Activity Timeline */}
                        <div className="bg-card rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                            <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-3">
                                <Calendar size={20} className="text-primary" />
                                التحديثات الأخيرة
                            </h3>
                            <div className="space-y-8 relative pr-4">
                                <div className="absolute right-0 top-0 bottom-2 w-[1px] bg-slate-100" />
                                {[0, 1].map((i) => (
                                    <div key={i} className="relative">
                                        <div className="absolute -right-[21px] top-1.5 w-2 h-2 rounded-full bg-white border-2 border-primary" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-bold text-slate-700 leading-relaxed">
                                                أكمل <span className="text-primary font-black">عبد الصمد</span> اختبار الفيزياء بنجاح.
                                            </p>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">منذ 3 ساعات</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Report Card - Using Original Blue/Amber feel */}
                        <div className="bg-primary rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-primary/20">
                            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                            <Trophy size={40} className="mb-6 opacity-80" />
                            <h4 className="text-2xl font-black mb-2">تقارير الذكاء الاصطناعي</h4>
                            <p className="text-blue-100 text-sm leading-relaxed mb-8">
                                اكتشف نقاط القوة والضعف لدى أبنائك من خلال تحليلنا المتقدم للأداء.
                            </p>
                            <button className="w-full h-14 bg-white text-primary rounded-2xl font-black text-sm hover:bg-blue-50 transition-colors shadow-lg">
                                عرض التقرير الكامل
                            </button>
                        </div>

                    </aside>
                </div>
            </main>
        </div>
    );
}