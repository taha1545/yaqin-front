"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const navLinks = [
        { name: "الرئيسية", href: "/" },
        { name: "عن المنصة", href: "/about" },
        { name: "المميزات", href: "/features" },
        { name: "اتصل بنا", href: "/contact" },
    ];

    const logout = () => {
        setCurrentUser(null);
    };

    return (
        <nav className="sticky p-1 top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-18 h-16 overflow-hidden rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Image
                            src="/logo.jpg"
                            alt="Yaqin Logo"
                            width={80}
                            height={80}
                            className="object-cover"
                        />
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    {currentUser ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <User size={16} />
                                </div>
                                <div className="text-sm">
                                    <p className="font-medium leading-none">{currentUser.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {currentUser.role === "parent" ? "ولي أمر" : "طالب"}
                                    </p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={logout} title="تسجيل الخروج">
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Link href="/auth/login">
                                <Button variant="ghost" size="sm">تسجيل الدخول</Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button size="sm">ابدأ رحلة التعلم</Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t bg-background"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium py-2 hover:text-primary block"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="pt-4 border-t flex flex-col gap-2">
                                {currentUser ? (
                                    <>
                                        <div className="flex items-center gap-2 py-2">
                                            <User className="h-4 w-4 text-primary" />
                                            <span className="font-medium">{currentUser.name}</span>
                                        </div>
                                        <Button className="w-full" onClick={() => setIsOpen(false)}>
                                            لوحة التحكم
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={() => { logout(); setIsOpen(false); }}
                                        >
                                            تسجيل الخروج
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/auth/login">
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                تسجيل الدخول
                                            </Button>
                                        </Link>
                                        <Link href="/auth/register">
                                            <Button className="w-full" onClick={() => setIsOpen(false)}>
                                                ابدأ رحلة التعلم
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
