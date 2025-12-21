"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Home/Navbar";
import { StatCard } from "@/components/ui/stat-card";
import {
    UserPlus,
    BookOpen,
    Trophy,
    TrendingUp,
    Users,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

//

const currentUser = {
    name: "أحمد منصوري",
    role: "parent",
};

const students = [
    {
        id: 1,
        name: " مصعب",
        grade: "السنة الثالثة ابتدائي",
        progress: 78,
        completedLessons: 24,
        badges: ["قارئ ممتاز", "رياضيات"],
        avatar: "/s3ab.jpg",
    },
    {
        id: 2,
        name: " عبد الصمد",
        grade: "السنة الأولى ثانوي",
        progress: 52,
        completedLessons: 14,
        badges: ["مبتدئ نشيط"],
        avatar: "/samed.jpg",
    },
];


export default function ParentDashboard() {
    const router = useRouter();

    //
    useEffect(() => {
        if (!currentUser || currentUser.role !== "parent") {
            router.replace("/auth/login");
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-secondary/30" dir="rtl">
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">
                            لوحة تحكم ولي الأمر
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            مرحباً بك، {currentUser.name}
                        </p>
                    </div>

                    <Button>
                        <UserPlus className="ml-2 h-4 w-4" />
                        إضافة طالب جديد
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="عدد الطلاب"
                        value={students.length}
                        icon={Users}
                        delay={0.1}
                    />
                    <StatCard
                        title="الدروس المكتملة"
                        value={students.reduce((a, s) => a + s.completedLessons, 0)}
                        icon={BookOpen}
                        delay={0.2}
                    />
                    <StatCard
                        title="الجوائز المحصلة"
                        value={students.reduce((a, s) => a + s.badges.length, 0)}
                        icon={Trophy}
                        delay={0.3}
                    />
                    <StatCard
                        title="معدل التقدم العام"
                        value={`${Math.round(
                            students.reduce((a, s) => a + s.progress, 0) /
                            students.length
                        )}%`}
                        icon={TrendingUp}
                        delay={0.4}
                    />
                </div>

                {/* Students */}
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Users className="text-primary" />
                    أبنائك
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {students.map((student, index) => (
                        <motion.div
                            key={student.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                        >
                            <Card className="hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <div className="relative">
                                        <Image
                                            src={student.avatar}
                                            alt={student.name}
                                            className="w-16 h-16 rounded-full bg-primary/10"
                                            width={35}
                                            height={35}
                                        />
                                        <span className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white" />
                                    </div>

                                    <div>
                                        <CardTitle className="text-lg">
                                            {student.name}
                                        </CardTitle>
                                        <p className="text-sm text-muted-foreground">
                                            {student.grade}
                                        </p>
                                    </div>

                                    <div className="mr-auto">
                                        <Button variant="outline" size="sm">
                                            التفاصيل
                                        </Button>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-muted-foreground">
                                                    التقدم العام
                                                </span>
                                                <span className="font-bold">
                                                    {student.progress}%
                                                </span>
                                            </div>
                                            <Progress value={student.progress} className="h-2" />
                                        </div>

                                        <div className="flex gap-2 flex-wrap">
                                            {student.badges.map((badge, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs bg-accent/20 text-accent-foreground px-2 py-1 rounded-full font-medium flex items-center gap-1"
                                                >
                                                    <Trophy size={10} /> {badge}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}

                    {/* Add Student */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <button className="w-full min-h-50 border-2 border-dashed border-muted-foreground/20 rounded-xl rounded-xl flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 hover:bg-primary/5 transition-all group">
                            <div className="w-12 h-12 rounded-full bg-muted group-hover:bg-primary/20 flex items-center justify-center mb-2">
                                <UserPlus className="group-hover:text-primary" />
                            </div>
                            <span className="font-medium group-hover:text-primary">
                                إضافة طالب جديد
                            </span>
                        </button>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
