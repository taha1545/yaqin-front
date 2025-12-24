"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRightIcon, AtSignIcon } from "lucide-react";
import { FloatingPaths } from "@/components/floating-paths";

export function AuthPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e, destination) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            router.push(destination);
        }, 1000);
    };

    return (
        <main dir="rtl" className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
            {/* Left Side: Decorative & Branding (Visible on Desktop) */}
            <div className="relative hidden h-full flex-col border-l bg-secondary p-10 lg:flex dark:bg-secondary/20">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
                <Logo className="ml-auto h-6" />

                <div className="z-10 mt-auto text-right">
                    <blockquote className="space-y-2">
                        <p className="text-2xl font-medium leading-relaxed">
                            &ldquo;لقد ساعدتني هذه المنصة في توفير الوقت ومتابعة مستوى أطفالي التعليمي بشكل أسرع من أي وقت مضى.&rdquo;
                        </p>
                        <footer className="font-semibold text-sm">
                            ~ علي حسن (ولي أمر)
                        </footer>
                    </blockquote>
                </div>
                <div className="absolute inset-0">
                    <FloatingPaths position={1} />
                    <FloatingPaths position={-1} />
                </div>
            </div>

            {/* Right Side: Auth Form */}
            <div className="relative flex min-h-screen flex-col justify-center p-6 md:p-12">
                <div aria-hidden className="-z-10 absolute inset-0 isolate opacity-60 contain-strict">
                    <div className="absolute top-0 left-0 h-320 w-140 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,--theme(--color-foreground/.06)_0,hsla(0,0%,55%,.02)_50%,--theme(--color-foreground/.01)_80%)]" />
                </div>

                <Link href="/" className="absolute top-7 right-5 flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ChevronRightIcon className="size-4" />
                    الرئيسية
                </Link>

                <div className="mx-auto w-full max-w-sm space-y-8">
                    <div className="text-center space-y-2">
                        <Logo className="h-6 mx-auto lg:hidden" />
                        <h1 className="font-bold text-3xl tracking-tight text-primary">
                            مرحباً بك في يقين
                        </h1>
                        <p className="text-muted-foreground">
                            سجل دخولك أو أنشئ حساباً جديداً للمتابعة
                        </p>
                    </div>

                    <Tabs defaultValue="parent" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-8">
                            <TabsTrigger value="parent">ولي الأمر</TabsTrigger>
                            <TabsTrigger value="student">الطالب</TabsTrigger>
                        </TabsList>

                        <TabsContent value="parent">
                            <form onSubmit={(e) => handleLogin(e, "/dashboard/parent")} className="space-y-4">
                                <div className="space-y-2 text-right">
                                    <Label htmlFor="email">البريد الإلكتروني</Label>
                                    <div className="relative">
                                        <Input id="email" type="email" placeholder="name@example.com" className="pl-10 text-right" required />
                                        <AtSignIcon className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                                    </div>
                                </div>
                                <div className="space-y-2 text-right">
                                    <Label htmlFor="password">كلمة المرور</Label>
                                    <Input id="password" type="password" className="text-right" required />
                                </div>
                                <Button className="w-full text-lg h-11" disabled={isLoading} type="submit">
                                    {isLoading ? "جاري الدخول..." : "تسجيل الدخول"}
                                </Button>
                            </form>
                        </TabsContent>

                        <TabsContent value="student">
                            <form onSubmit={(e) => handleLogin(e, "/dashboard/student")} className="space-y-4">
                                <div className="space-y-2 text-right">
                                    <Label htmlFor="student-code">كود الطالب</Label>
                                    <Input id="student-code" placeholder="أدخل الكود الخاص بك" className="text-center text-lg tracking-[0.2em]" required />
                                </div>
                                <Button className="w-full text-lg h-11" disabled={isLoading} type="submit">
                                    {isLoading ? "جاري الدخول..." : "دخول الطالب"}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">أو المتابعة عبر</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="w-full" type="button">
                            <GoogleIcon className="ml-2 size-4" /> جوجل
                        </Button>
                        <Button variant="outline" className="w-full" type="button">
                            <GithubIcon className="ml-2 size-4" /> جيت هاب
                        </Button>
                    </div>

                    <p className="text-center text-sm text-muted-foreground">
                        ليس لديك حساب؟{" "}
                        <Link href="/auth/register" className="font-bold text-primary hover:underline underline-offset-4">
                            سجل الآن
                        </Link>
                    </p>

                    <p className="text-center text-xs text-muted-foreground leading-relaxed">
                        بضغطك على متابعة، أنت توافق على{" "}
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

const GithubIcon = (props) => (
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
);