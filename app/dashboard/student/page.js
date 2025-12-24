"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    Trophy,
    Star,
    Clock,
    Search,
    ChevronLeft,
    Sparkles,
    LayoutDashboard,
    PlayCircle,
    CheckCircle2,
    BookMarked
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/header";

const student = {
    name: "مصعب",
    grade: "السنة الثالثة ابتدائي",
    progress: 78,
    completedLessons: 24,
    badges: ["قارئ ممتاز", "رياضيات", "بطل العلوم"],
    avatar: "/s3ab.jpg",
};

const subjects = [
    { id: 1, name: "الرياضيات", icon: "📐", color: "bg-blue-50 text-blue-600" },
    { id: 2, name: "اللغة العربية", icon: "📚", color: "bg-emerald-50 text-emerald-600" },
    { id: 3, name: "العلوم", icon: "🔬", color: "bg-purple-50 text-purple-600" },
    { id: 4, name: "التربية الإسلامية", icon: "🕌", color: "bg-amber-50 text-amber-600" },
];

const lessons = [
    { id: 1, title: "الكسور العشرية", subjectId: 1, progress: 80, duration: "15 دقيقة", tag: "مهم" },
    { id: 2, title: "قراءة النصوص العلمية", subjectId: 2, progress: 45, duration: "10 دقائق", tag: "جديد" },
    { id: 3, title: "تحولات المادة", subjectId: 3, progress: 0, duration: "12 دقيقة", tag: "تجربة" },
];

export default function StudentDashboard() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const filteredLessons = lessons.filter((lesson) => {
        const matchesSearch = lesson.title.includes(search);
        if (activeTab === "new") return matchesSearch && lesson.progress === 0;
        if (activeTab === "completed") return matchesSearch && lesson.progress === 100;
        return matchesSearch;
    });

    return (
        <div className="min-h-screen bg-background" dir="rtl">
            <Header />

            <main className="container mx-auto px-6 py-10 lg:px-8 max-w-6xl">

                {/* Hero Welcome Section */}
                <header className="relative mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white overflow-hidden relative shadow-2xl shadow-slate-200"
                    >
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                            <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-primary rounded-full blur-[100px]" />
                            <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-400 rounded-full blur-[100px]" />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                            <div className="relative">
                                <div className="absolute inset-[-8px] rounded-full bg-gradient-to-tr from-primary to-blue-400 opacity-50 animate-pulse" />
                                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                                    <Image src={student.avatar} alt={student.name} fill className="object-cover" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-900 p-2 rounded-xl shadow-lg">
                                    <Trophy size={20} />
                                </div>
                            </div>

                            <div className="text-center md:text-right flex-1 space-y-3">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider">
                                    <Sparkles size={14} />
                                    <span>مستوى متميز</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                                    مرحباً <span className="text-blue-400">{student.name}</span>! 👋
                                </h1>
                                <p className="text-slate-400 text-lg font-medium max-w-md">
                                    لديك {lessons.filter(l => l.progress === 0).length} دروس جديدة بانتظارك اليوم. هل أنت مستعد؟
                                </p>
                            </div>

                            <div className="hidden lg:flex gap-4">
                                <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] text-center min-w-[120px]">
                                    <p className="text-slate-400 text-xs font-bold mb-1">الدروس</p>
                                    <p className="text-3xl font-black">{student.completedLessons}</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] text-center min-w-[120px]">
                                    <p className="text-slate-400 text-xs font-bold mb-1">الأوسمة</p>
                                    <p className="text-3xl font-black text-amber-400">{student.badges.length}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </header>

                {/* Stats Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        { title: "إجمالي التقدم", value: `${student.progress}%`, icon: Star, color: "text-blue-600", bg: "bg-blue-50" },
                        { title: "وقت التعلم", value: "12 ساعة", icon: Clock, color: "text-emerald-600", bg: "bg-emerald-50" },
                        { title: "المركز الحالي", value: "الأول", icon: Trophy, color: "text-amber-500", bg: "bg-amber-50" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-card p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                                <stat.icon size={28} />
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.title}</p>
                                <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
                            </div>
                        </div>
                    ))}
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Main Content: Lessons */}
                    <div className="lg:col-span-8 space-y-8">
                        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 px-2">
                                <h2 className="text-2xl font-black text-slate-800">رحلتي التعليمية</h2>
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <TabsList className="bg-slate-100 p-1 rounded-2xl h-12">
                                        <TabsTrigger value="all" className="rounded-xl px-6 font-bold">الكل</TabsTrigger>
                                        <TabsTrigger value="new" className="rounded-xl px-6 font-bold">جديد</TabsTrigger>
                                        <TabsTrigger value="completed" className="rounded-xl px-6 font-bold">منجز</TabsTrigger>
                                    </TabsList>
                                </div>
                            </div>

                            <div className="relative mb-8 group">
                                <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
                                <Input
                                    placeholder="ابحث عن درس معين..."
                                    className="h-16 pr-14 pl-6 rounded-3xl border-slate-200 bg-white shadow-sm text-lg focus:ring-primary/20 transition-all"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            <TabsContent value={activeTab} className="mt-0">
                                <div className="grid grid-cols-1 gap-4">
                                    <AnimatePresence mode="popLayout">
                                        {filteredLessons.map((lesson, idx) => (
                                            <motion.div
                                                key={lesson.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="group bg-card rounded-[2rem] border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-6"
                                            >
                                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${subjects.find(s => s.id === lesson.subjectId)?.color || 'bg-slate-100'}`}>
                                                    {subjects.find(s => s.id === lesson.subjectId)?.icon}
                                                </div>

                                                <div className="flex-1 text-center md:text-right space-y-1">
                                                    <div className="flex items-center justify-center md:justify-start gap-2">
                                                        <h4 className="font-black text-xl text-slate-800">{lesson.title}</h4>
                                                        {lesson.tag && (
                                                            <span className="px-2 py-0.5 rounded-lg bg-blue-200 text-blue-600 text-[10px] font-black uppercase">
                                                                {lesson.tag}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-slate-400 font-bold text-sm flex items-center justify-center md:justify-start gap-2">
                                                        <BookMarked size={14} />
                                                        {subjects.find(s => s.id === lesson.subjectId)?.name} • {lesson.duration}
                                                    </p>
                                                </div>

                                                <div className="w-full md:w-48 space-y-2">
                                                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                                                        <span>الإنجاز</span>
                                                        <span>{lesson.progress}%</span>
                                                    </div>
                                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${lesson.progress}%` }}
                                                            className="h-full bg-primary rounded-full"
                                                        />
                                                    </div>
                                                </div>

                                                <Button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        router.push(`/lesson/${lesson.id}`);
                                                    }}
                                                    className="h-12 px-8 rounded-xl bg-slate-900 hover:bg-slate-800 gap-2 font-bold w-full md:w-auto transition-transform active:scale-95">
                                                    {lesson.progress === 0 ? <PlayCircle size={18} /> : <CheckCircle2 size={18} />}
                                                    {lesson.progress === 0 ? "ابدأ الآن" : "متابعة"}
                                                </Button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar: Subjects & Achievements */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="bg-card rounded-[2.5rem] border border-slate-100 p-8 shadow-sm">
                            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-3">
                                <LayoutDashboard size={20} className="text-primary" />
                                المواد الدراسية
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {subjects.map((subject) => (
                                    <button key={subject.id} className="group p-4 rounded-3xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:border-primary/30 hover:shadow-sm transition-all text-center space-y-2">
                                        <div className="text-2xl group-hover:scale-110 transition-transform">{subject.icon}</div>
                                        <p className="text-xs font-black text-slate-700">{subject.name}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Badges/Awards Card */}
                        <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-[2.5rem] p-8 text-white shadow-xl shadow-amber-200">
                            <Trophy size={40} className="mb-6" />
                            <h4 className="text-2xl font-black mb-2">معرض الأوسمة</h4>
                            <p className="text-amber-100 text-sm leading-relaxed mb-6">
                                لقد حصلت على {student.badges.length} أوسمة هذا الشهر. استمر في التألق!
                            </p>
                            <div className="flex -space-x-3 space-x-reverse mb-8">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center backdrop-blur-sm">
                                        <Star size={16} fill="white" />
                                    </div>
                                ))}
                            </div>
                            <Button variant="secondary" className="w-full h-14 rounded-2xl font-black text-amber-600 hover:bg-white">
                                عرض كل الجوائز
                            </Button>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}