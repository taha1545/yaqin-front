"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Home/Navbar";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { StatCard } from "@/components/ui/stat-card";
import {
    BookOpen,
    Trophy,
    Star,
    Clock,
    Search,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const student = {
    name: "مصعب",
    grade: "السنة الثالثة ابتدائي",
    progress: 78,
    completedLessons: 24,
    badges: ["قارئ ممتاز", "رياضيات"],
    avatar: "/s3ab.jpg",
};

const subjects = [
    { id: 1, name: "الرياضيات" },
    { id: 2, name: "اللغة العربية" },
    { id: 3, name: "العلوم" },
    { id: 4, name: "التربية الإسلامية" },
];

const lessons = [
    {
        id: 1,
        title: "الجمع والطرح",
        subjectId: 1,
        progress: 80,
        duration: "15 دقيقة",
    },
    {
        id: 2,
        title: "قراءة الحروف",
        subjectId: 2,
        progress: 45,
        duration: "10 دقائق",
    },
    {
        id: 3,
        title: "الأشكال الهندسية",
        subjectId: 1,
        progress: 0,
        duration: "12 دقيقة",
    },
];



export default function StudentDashboard() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        if (!student) router.replace("/auth/login");
    }, [router]);

    const filteredLessons = lessons.filter((lesson) => {
        if (activeTab === "new" && lesson.progress > 0) return false;
        if (activeTab === "completed" && lesson.progress < 100) return false;

        return lesson.title.includes(search);
    });

    return (
        <div className="min-h-screen bg-secondary/30" dir="rtl">
            <Navbar />

            <main className="container mx-auto px-6 py-8 space-y-10">

                {/* Welcome */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-primary text-primary-foreground rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 shadow-lg"
                >
                    <div className="relative w-24 h-24">
                        <Image
                            src={student.avatar}
                            alt={student.name}
                            fill
                            className="rounded-full object-cover bg-white"
                        />
                    </div>

                    <div className="text-center md:text-right flex-1">
                        <h1 className="text-3xl font-bold mb-2">
                            مرحباً {student.name} 👋
                        </h1>
                        <p className="text-primary-foreground/80">
                            هيا نكمل رحلة التعلم
                        </p>

                        <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                            <div className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                                <Trophy size={16} />
                                {student.badges.length} جوائز
                            </div>
                            <div className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                                <BookOpen size={16} />
                                {student.completedLessons} دروس
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard title="التقدم" value={`${student.progress}%`} icon={Star} delay={0.1} />
                    <StatCard title="الدروس" value={student.completedLessons} icon={BookOpen} delay={0.2} />
                    <StatCard title="الجوائز" value={student.badges.length} icon={Trophy} delay={0.3} />
                </div>

                {/* Subjects */}
                <section>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Star className="text-accent" />
                        المواد الدراسية
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {subjects.map((subject, index) => (
                            <motion.div
                                key={subject.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-card hover:bg-primary/5 border hover:border-primary/50 cursor-pointer rounded-xl p-6 text-center transition-all shadow-sm hover:shadow-md"
                            >
                                <div className="w-14 h-14 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <BookOpen />
                                </div>
                                <h3 className="font-bold">{subject.name}</h3>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Lessons + Filter */}
                <Tabs defaultValue="all" onValueChange={setActiveTab} className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <TabsList>
                            <TabsTrigger value="all">الكل</TabsTrigger>
                            <TabsTrigger value="new">جديدة</TabsTrigger>
                            <TabsTrigger value="completed">مكتملة</TabsTrigger>
                        </TabsList>

                        <div className="relative w-full md:w-64">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="ابحث عن درس..."
                                className="pr-9"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <TabsContent value={activeTab}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredLessons.map((lesson, index) => (
                                <motion.div
                                    key={lesson.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>{lesson.title}</CardTitle>
                                            <p className="text-sm text-muted-foreground">
                                                {subjects.find(s => s.id === lesson.subjectId)?.name}
                                                {" • "}
                                                {lesson.duration}
                                            </p>
                                        </CardHeader>

                                        <CardContent className="space-y-3">
                                            <Progress value={lesson.progress} className="h-2" />
                                            <Button className="w-full" size="sm">
                                                {lesson.progress === 0
                                                    ? "ابدأ الدرس"
                                                    : lesson.progress === 100
                                                        ? "مراجعة"
                                                        : "متابعة"}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
