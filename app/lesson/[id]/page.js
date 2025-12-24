"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
    ArrowRight,
    PlayCircle,
    FileText,
    CheckCircle2,
    XCircle,
    ChevronLeft,
    RotateCcw,
    Trophy,
    Star,
    BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Image from "next/image";
import Header from "@/components/header";

const lessons = [
    {
        id: "1",
        title: "الجمع والطرح",
        content: "في هذا الدرس سنتعلم أساسيات الجمع والطرح باستخدام أمثلة بسيطة وشيقة تساعدك على فهم الحساب بسرعة.",
        imageUrl: "/math.jpg",
        duration: "15 دقيقة",
    },
    {
        id: "2",
        title: "قراءة الحروف",
        content: "تعلم كيفية نطق وقراءة الحروف العربية بطريقة سهلة وممتعة مع أمثلة من الكلمات اليومية.",
        imageUrl: "/arabic.jpg",
        duration: "10 دقائق",
    },
];

const quiz = {
    questions: [
        {
            text: "ما ناتج 2 + 3 ؟",
            options: ["4", "5", "6"],
            correctIndex: 1,
        },
        {
            text: "ما ناتج 5 - 2 ؟",
            options: ["1", "3", "4"],
            correctIndex: 1,
        },
    ],
};

export default function LessonPage() {
    const params = useParams();
    const router = useRouter();
    const lesson = lessons.find((l) => l.id === params.id);

    const [activeTab, setActiveTab] = useState("content");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    if (!lesson) return <div className="p-10 text-center">الدرس غير موجود</div>;

    const currentQuizData = quiz.questions[currentQuestion];
    const progressValue = ((currentQuestion + (showResult ? 1 : 0)) / quiz.questions.length) * 100;

    const handleAnswerSubmit = () => {
        if (selectedAnswer === null) return;
        const isCorrect = selectedAnswer === currentQuizData.correctIndex;
        if (isCorrect) {
            setScore((s) => s + 1);
            confetti({
                particleCount: 80,
                spread: 60,
                origin: { y: 0.7 },
            });
        }
        setShowResult(true);
    };

    const handleNext = () => {
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion((q) => q + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            setQuizFinished(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setQuizFinished(false);
    };

    return (
        <div className="min-h-screen bg-background text-foreground" dir="rtl">
            <Header />

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    className="mb-6 group text-muted-foreground hover:text-primary"
                    onClick={() => router.push("/dashboard/student")}
                >
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    العودة للمغامرة التعلّمية
                </Button>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                            {lesson.title}
                        </h1>
                        <div className="flex items-center gap-3 mt-3">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-secondary text-secondary-foreground border">
                                <Star className="size-3 fill-primary text-primary" /> {lesson.duration}
                            </span>
                            <span className="text-sm text-muted-foreground font-medium">الوحدة الأولى • رياضيات</span>
                        </div>
                    </div>

                    {/* Tab Switcher - shadcn like toggle */}
                    <div className="inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                        <button
                            onClick={() => setActiveTab("content")}
                            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-6 py-2 text-sm font-bold transition-all ${activeTab === "content" ? "bg-background text-foreground shadow-sm" : "hover:text-foreground"
                                }`}
                        >
                            <PlayCircle className="ml-2 h-4 w-4" />
                            شرح الدرس
                        </button>
                        <button
                            onClick={() => setActiveTab("quiz")}
                            className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-6 py-2 text-sm font-bold transition-all ${activeTab === "quiz" ? "bg-background text-foreground shadow-sm" : "hover:text-foreground"
                                }`}
                        >
                            <FileText className="ml-2 h-4 w-4" />
                            اختبر ذكاءك
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            {activeTab === "content" ? (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <Card className="overflow-hidden border-2">
                                        <div className="aspect-video relative">
                                            <Image
                                                src={lesson.imageUrl}
                                                alt={lesson.title}
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                            <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
                                        </div>
                                        <CardHeader className="space-y-4 p-8">
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-1 bg-primary rounded-full" />
                                                <CardTitle className="text-2xl font-bold">ماذا سنتعلم اليوم؟</CardTitle>
                                            </div>
                                            <p className="text-xl text-muted-foreground leading-relaxed italic">
                                                "{lesson.content}"
                                            </p>
                                        </CardHeader>
                                    </Card>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="quiz"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                >
                                    <Card className="border-2 overflow-hidden">
                                        {!quizFinished ? (
                                            <div className="p-8 lg:p-12">
                                                <div className="mb-10 space-y-4">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm font-bold uppercase tracking-wider text-primary">السؤال {currentQuestion + 1} من {quiz.questions.length}</span>
                                                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black">
                                                            النقاط: {score * 10}
                                                        </span>
                                                    </div>
                                                    <Progress value={progressValue} className="h-2" />
                                                </div>

                                                <h2 className="text-3xl font-bold mb-10 text-center leading-tight">
                                                    {currentQuizData.text}
                                                </h2>

                                                <RadioGroup
                                                    value={selectedAnswer?.toString()}
                                                    onValueChange={(v) => !showResult && setSelectedAnswer(Number(v))}
                                                    className="grid gap-4"
                                                >
                                                    {currentQuizData.options.map((opt, i) => {
                                                        const isCorrect = i === currentQuizData.correctIndex;
                                                        const isSelected = selectedAnswer === i;

                                                        let variantStyle = "flex items-center justify-between p-5 rounded-xl border-2 transition-all cursor-pointer ";

                                                        if (!showResult) {
                                                            variantStyle += isSelected
                                                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                                                : "border-muted hover:border-primary/50 hover:bg-muted/50";
                                                        } else {
                                                            if (isCorrect) variantStyle += "border-green-500 bg-green-500/10";
                                                            else if (isSelected) variantStyle += "border-destructive bg-destructive/10";
                                                            else variantStyle += "opacity-50 border-muted";
                                                        }

                                                        return (
                                                            <div key={i} className={variantStyle} onClick={() => !showResult && setSelectedAnswer(i)}>
                                                                <div className="flex items-center gap-4 flex-1">
                                                                    <RadioGroupItem value={i.toString()} id={`opt-${i}`} disabled={showResult} />
                                                                    <Label htmlFor={`opt-${i}`} className="text-lg font-bold cursor-pointer flex-1">
                                                                        {opt}
                                                                    </Label>
                                                                </div>
                                                                {showResult && isCorrect && <CheckCircle2 className="text-green-500 h-6 w-6" />}
                                                                {showResult && isSelected && !isCorrect && <XCircle className="text-destructive h-6 w-6" />}
                                                            </div>
                                                        );
                                                    })}
                                                </RadioGroup>

                                                <div className="mt-12 flex justify-center">
                                                    <Button
                                                        onClick={showResult ? handleNext : handleAnswerSubmit}
                                                        disabled={selectedAnswer === null}
                                                        size="lg"
                                                        className="min-w-[240px] h-14 text-lg font-bold shadow-xl shadow-primary/20"
                                                    >
                                                        {showResult ? (currentQuestion === quiz.questions.length - 1 ? "مشاهدة النتيجة" : "السؤال التالي") : "تحقق من إجابتي!"}
                                                        {showResult && <ChevronLeft className="mr-2 h-5 w-5" />}
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-16 px-8">
                                                <div className="relative inline-block mb-8">
                                                    <div className="absolute inset-0 animate-ping bg-primary/20 rounded-full" />
                                                    <Trophy size={100} className="text-primary relative" />
                                                </div>
                                                <h2 className="text-4xl font-black mb-4">عمل رائع يا بطل! 🎉</h2>
                                                <p className="text-xl text-muted-foreground mb-10">
                                                    لقد نجحت في الإجابة على {score} من أصل {quiz.questions.length} أسئلة
                                                </p>
                                                <div className="flex flex-col sm:flex-row justify-center gap-4">
                                                    <Button variant="outline" size="lg" className="h-12 font-bold px-8" onClick={restartQuiz}>
                                                        <RotateCcw className="ml-2 h-4 w-4" /> إعادة المحاولة
                                                    </Button>
                                                    <Button size="lg" className="h-12 font-bold px-8 shadow-lg" onClick={() => router.push("/dashboard/student")}>
                                                        استكشف دروساً أخرى
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Sidebar Area */}
                    <aside className="lg:col-span-4 space-y-6">
                        <Card className="bg-primary text-primary-foreground border-none shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl font-black">
                                    <BookOpen className="h-5 w-5" />
                                    أهداف التعلم
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {[
                                        "فهم المفاهيم الأساسية بوضوح",
                                        "القدرة على حل المسائل التطبيقية",
                                        "تطوير مهارات التفكير المنطقي"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 font-medium text-sm">
                                            <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 opacity-80" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-bold">تحديات قد تعجبك</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 px-2">
                                {lessons.filter((l) => l.id !== lesson.id).map((l) => (
                                    <Button
                                        key={l.id}
                                        variant="ghost"
                                        className="w-full justify-start h-auto py-4 px-4 hover:bg-muted border border-transparent hover:border-border transition-all"
                                        onClick={() => router.push(`/lesson/${l.id}`)}
                                    >
                                        <div className="text-right">
                                            <p className="font-bold">{l.title}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{l.duration} • مغامرة جديدة</p>
                                        </div>
                                    </Button>
                                ))}
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </main>
        </div>
    );
}