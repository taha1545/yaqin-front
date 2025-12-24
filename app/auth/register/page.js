"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRightIcon, AtSignIcon } from "lucide-react";
import { FloatingPaths } from "@/components/floating-paths";

export default function Register() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulating API call
        setTimeout(() => {
            setIsLoading(false);
            router.push("/dashboard/parent");
        }, 1500);
    };

    return (
        <main dir="rtl" className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
            {/* Left Side: Decorative (Visible on Desktop) */}
            <div className="relative hidden h-full flex-col border-l bg-secondary p-10 lg:flex dark:bg-secondary/20">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
                <div className="relative z-10">
                    <Logo className="h-8" />
                </div>

                <div className="z-10 mt-auto text-right">
                    <blockquote className="space-y-2">
                        <p className="text-2xl font-medium leading-relaxed text-foreground">
                            &ldquo;انضم إلينا اليوم وكن جزءاً من مجتمع تعليمي يهدف إلى بناء مستقبل مشرق لأطفالنا بأحدث الوسائل التقنية.&rdquo;
                        </p>
                        <footer className="font-semibold text-sm text-muted-foreground">
                            ~ فريق يقين
                        </footer>
                    </blockquote>
                </div>

                <div className="absolute inset-0 z-0">
                    <FloatingPaths position={1} />
                    <FloatingPaths position={-1} />
                </div>
            </div>

            {/* Right Side: Register Form */}
            <div className="relative flex min-h-screen flex-col justify-center p-6 md:p-12 bg-background">
                {/* Decorative background for mobile */}
                <div aria-hidden className="lg:hidden -z-10 absolute inset-0 isolate opacity-50">
                    <div className="absolute top-0 left-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
                </div>

                {/* Home Link */}
                <Link href="/" className="absolute top-7 right-5 flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    <ChevronRightIcon className="size-4" />
                    الرئيسية
                </Link>

                <div className="mx-auto w-full max-w-sm space-y-8">
                    {/* Centered Logo */}
                    <div className="flex flex-col items-center text-center space-y-4">
                        <Logo className="h-10" />
                        <div className="space-y-2">
                            <h1 className="font-bold text-3xl tracking-tight text-primary">
                                إنشاء حساب جديد
                            </h1>
                            <p className="text-muted-foreground">
                                ابدأ رحلة طفلك التعليمية معنا اليوم
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 text-right">
                                <Label htmlFor="firstName">الاسم الأول</Label>
                                <Input id="firstName" placeholder="أحمد" className="text-right h-11" required />
                            </div>
                            <div className="space-y-2 text-right">
                                <Label htmlFor="lastName">العائلة</Label>
                                <Input id="lastName" placeholder="محمد" className="text-right h-11" required />
                            </div>
                        </div>

                        <div className="space-y-2 text-right">
                            <Label htmlFor="email">البريد الإلكتروني</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-10 text-right h-11"
                                    required
                                />
                                <AtSignIcon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                            </div>
                        </div>

                        <div className="space-y-2 text-right">
                            <Label htmlFor="password">كلمة المرور</Label>
                            <Input
                                id="password"
                                type="password"
                                className="text-right h-11"
                                required
                            />
                        </div>

                        <Button className="w-full text-lg h-12 mt-2" disabled={isLoading} type="submit">
                            {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-4 text-muted-foreground">أو</span>
                        </div>
                    </div>

                    <Button variant="outline" className="w-full h-11" type="button">
                        <GoogleIcon className="ml-2 size-5" />
                        التسجيل باستخدام جوجل
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        لديك حساب بالفعل؟{" "}
                        <Link href="/auth/login" className="font-bold text-primary hover:underline underline-offset-4">
                            تسجيل الدخول
                        </Link>
                    </p>

                    <p className="text-center text-[10px] text-muted-foreground leading-relaxed px-6">
                        بإنشائك للحساب، أنت توافق على{" "}
                        <a className="underline hover:text-primary" href="#">شروط الخدمة</a>
                        {" "}و{" "}
                        <a className="underline hover:text-primary" href="#">سياسة الخصوصية</a>.
                    </p>
                </div>
            </div>
        </main>
    );
}

const GoogleIcon = (props) => (
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669 C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62 c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401 c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
    </svg>
);