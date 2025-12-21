"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/Home/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
    ArrowRight,
    PlayCircle,
    FileText,
    CheckCircle2,
    ChevronLeft,
    RotateCcw,
    Trophy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Image from "next/image";



const lessons = [
    {
        id: "1",
        title: "الجمع والطرح",
        content:
            "في هذا الدرس سنتعلم أساسيات الجمع والطرح باستخدام أمثلة بسيطة.",
        imageUrl: "/math.jpg",
        duration: "15 دقيقة",
    },
    {
        id: "2",
        title: "قراءة الحروف",
        content:
            "تعلم كيفية نطق وقراءة الحروف العربية بطريقة سهلة وممتعة.",
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

    if (!lesson) return <div className="p-10 text-center">الدرس غير موجود</div>;

    const handleAnswerSubmit = () => {
        if (selectedAnswer === null) return;

        const isCorrect = selectedAnswer === quiz.questions[currentQuestion].correctIndex;
        if (isCorrect) {
            setScore((s) => s + 1);
            confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        }
        setShowResult(true);
    };

    const handleNext = () => {
        if (currentQuestion < quiz.questions.length - 1) {
            setCurrentQuestion((q) => q + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        }
    };

    const quizFinished = showResult && currentQuestion === quiz.questions.length - 1;

    return (
        <div className="min-h-screen bg-secondary/30" dir="rtl">
            <Navbar />

            <main className="container mx-auto px-4 py-8">
                {/* Back */}
                <Button
                    variant="ghost"
                    className="mb-6 gap-2"
                    onClick={() => router.push("/dashboard/student")}
                >
                    <ArrowRight size={16} />
                    العودة
                </Button>

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">{lesson.title}</h1>

                    <div className="flex gap-2">
                        <Button
                            variant={activeTab === "content" ? "default" : "outline"}
                            onClick={() => setActiveTab("content")}
                        >
                            <PlayCircle className="ml-2 h-4 w-4" />
                            الدرس
                        </Button>
                        <Button
                            variant={activeTab === "quiz" ? "default" : "outline"}
                            onClick={() => setActiveTab("quiz")}
                        >
                            <FileText className="ml-2 h-4 w-4" />
                            الاختبار
                        </Button>
                    </div>
                </div>

                <div className=" grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main */}
                    <div className="  lg:col-span-2 ">
                        <AnimatePresence mode="wait">
                            {activeTab === "content" ? (
                                <motion.div
                                    key="content "
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <Card className="overflow-hidden">
                                        <div className="aspect-video relative bg-black">
                                            <Image
                                                src={lesson.imageUrl}
                                                alt={lesson.title}
                                                className="w-full h-full object-cover opacity-80"
                                                width={400}
                                                height={35}
                                            />
                                        </div>

                                        <div className="p-8">
                                            <h2 className="text-xl font-bold mb-4">محتوى الدرس</h2>
                                            <p className="text-lg text-muted-foreground leading-relaxed">
                                                {lesson.content}
                                            </p>
                                        </div>
                                    </Card>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="quiz"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <Card className="p-8">
                                        {!quizFinished ? (
                                            <>
                                                <div className="flex justify-between text-sm text-muted-foreground mb-4">
                                                    <span>
                                                        السؤال {currentQuestion + 1} / {quiz.questions.length}
                                                    </span>
                                                    <span>النقاط: {score}</span>
                                                </div>

                                                <h2 className="text-2xl font-bold mb-6">
                                                    {quiz.questions[currentQuestion].text}
                                                </h2>

                                                <RadioGroup
                                                    value={selectedAnswer?.toString()}
                                                    onValueChange={(v) =>
                                                        !showResult && setSelectedAnswer(Number(v))
                                                    }
                                                    className="space-y-4"
                                                >
                                                    {quiz.questions[currentQuestion].options.map((opt, i) => (
                                                        <div
                                                            key={i}
                                                            onClick={() => !showResult && setSelectedAnswer(i)}
                                                            className={`p-4 border rounded-xl cursor-pointer transition
                                ${selectedAnswer === i ? "border-primary bg-primary/5" : "bg-secondary/30"}`}
                                                        >
                                                            <RadioGroupItem value={i.toString()} id={`opt-${i}`} className="ml-3" />
                                                            <Label htmlFor={`opt-${i}`} className="text-lg font-medium">
                                                                {opt}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </RadioGroup>

                                                <div className="mt-6 text-end">
                                                    {!showResult ? (
                                                        <Button onClick={handleAnswerSubmit} disabled={selectedAnswer === null}>
                                                            تحقق من الإجابة
                                                        </Button>
                                                    ) : (
                                                        <Button onClick={handleNext}>
                                                            التالي
                                                            <ChevronLeft className="mr-2" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center py-8">
                                                <Trophy size={64} className="text-yellow-500 mx-auto mb-4" />
                                                <h2 className="text-3xl font-bold mb-2">أحسنت 🎉</h2>
                                                <p className="text-lg text-muted-foreground mb-6">
                                                    نتيجتك {score} / {quiz.questions.length}
                                                </p>

                                                <div className="flex justify-center gap-4">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => {
                                                            setCurrentQuestion(0);
                                                            setScore(0);
                                                            setSelectedAnswer(null);
                                                            setShowResult(false);
                                                        }}
                                                    >
                                                        <RotateCcw className="ml-2 h-4 w-4" />
                                                        إعادة
                                                    </Button>

                                                    <Button onClick={() => router.push("/dashboard/student")}>العودة</Button>
                                                </div>
                                            </div>
                                        )}
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <h3 className="font-bold mb-4">أهداف الدرس</h3>
                            <ul className="space-y-2 text-muted-foreground text-sm">
                                <li>• فهم المفاهيم الأساسية</li>
                                <li>• التطبيق العملي</li>
                                <li>• اجتياز الاختبار</li>
                            </ul>
                        </Card>

                        <Card className="p-6">
                            <h3 className="font-bold mb-4">دروس مقترحة</h3>
                            {lessons.filter((l) => l.id !== lesson.id).map((l) => (
                                <Button
                                    key={l.id}
                                    variant="ghost"
                                    className="w-full justify-start"
                                    onClick={() => router.push(`/lesson/${l.id}`)}
                                >
                                    {l.title}
                                </Button>
                            ))}
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
