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
import Navbar from "@/components/Home/Navbar";

export default function Register() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            router.push("/dashboard/parent");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col bg-secondary/30" dir="rtl">
            <Navbar />

            <div className="flex-1 flex items-center justify-center p-4">
                <Card className="w-full max-w-md shadow-lg border-0 bg-background/80 backdrop-blur">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-2xl font-bold text-primary">
                            إنشاء حساب جديد
                        </CardTitle>
                        <CardDescription>
                            انضم إلينا وابدأ رحلة طفلك التعليمية
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">الاسم الأول</Label>
                                    <Input id="firstName" placeholder="أحمد" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lastName">اسم العائلة</Label>
                                    <Input id="lastName" placeholder="محمد" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">البريد الإلكتروني</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">كلمة المرور</Label>
                                <Input id="password" type="password" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                                <Input id="confirm-password" type="password" required />
                            </div>

                            <Button className="w-full mt-2" disabled={isLoading}>
                                {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="text-sm text-center">
                        لديك حساب بالفعل؟{" "}
                        <Link
                            href="/auth/login"
                            className="text-primary hover:underline font-medium"
                        >
                            تسجيل الدخول
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
