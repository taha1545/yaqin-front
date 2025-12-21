"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Home/Navbar";

export default function Login() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleParentLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            router.push("/dashboard/parent");
        }, 1000);
    };

    const handleStudentLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            router.push("/dashboard/student");
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col bg-secondary/30" dir="rtl">
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-4">
                <Card className="w-full max-w-md shadow-lg border-0 bg-background/80 backdrop-blur">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-2xl font-bold text-primary">
                            مرحباً بعودتك
                        </CardTitle>
                        <CardDescription>
                            الرجاء تسجيل الدخول للمتابعة
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Tabs defaultValue="parent" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="parent">ولي الأمر</TabsTrigger>
                                <TabsTrigger value="student">الطالب</TabsTrigger>
                            </TabsList>

                            <TabsContent value="parent">
                                <form onSubmit={handleParentLogin} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">البريد الإلكتروني</Label>
                                        <Input id="email" type="email" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password">كلمة المرور</Label>
                                        <Input id="password" type="password" />
                                    </div>

                                    <Button className="w-full" disabled={isLoading}>
                                        {isLoading ? "جاري الدخول..." : "تسجيل الدخول"}
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="student">
                                <form onSubmit={handleStudentLogin} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>كود الطالب</Label>
                                        <Input />
                                    </div>

                                    <Button className="w-full" disabled={isLoading}>
                                        {isLoading ? "جاري الدخول..." : "دخول الطالب"}
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>
                    </CardContent>

                    <CardFooter className="text-sm text-center">
                        ليس لديك حساب؟{" "}
                        <Link href="/auth/register" className="text-primary font-medium">
                            سجل الآن
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
