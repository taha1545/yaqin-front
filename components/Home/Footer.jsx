"use client";

import Link from "next/link";
import { Facebook, Mail, Phone, Smartphone, Download } from "lucide-react";

const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "فيسبوك" },
    { icon: Mail, href: "mailto:contact@yaqin.com", label: "البريد الإلكتروني" },
    { icon: Phone, href: "tel:+123456789", label: "الهاتف" },
];
const appLinks = [
    {
        icon: Smartphone,
        href: "https://play.google.com/store/apps/details?id=com.yourapp",
        label: "تحميل من جوجل بلاي",
    },
    {
        icon: Download,
        href: "https://apps.apple.com/app/idYOUR_APP_ID",
        label: "تحميل من آب ستور",
    },
];

const copyrightText = "يقين. جميع الحقوق محفوظة.";

export default function Footer() {
    return (
        <footer className="bg-background py-12 border-t mt-auto" dir="rtl">
            <div className="container mx-auto px-4 text-center text-muted-foreground space-y-6">


                <div className="flex justify-center gap-6 rtl:flex-row-reverse">
                    {socialLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.label}
                            >
                                <Icon className="w-6 h-6 hover:text-primary transition-colors" />
                            </Link>
                        );
                    })}
                </div>


                <div className="flex justify-center gap-6 rtl:flex-row-reverse">
                    {appLinks.map((app) => {
                        const Icon = app.icon;
                        return (
                            <Link
                                key={app.label}
                                href={app.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={app.label}
                            >
                                <div className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors">
                                    <Icon className="w-6 h-6 text-primary" />
                                    <span className="text-sm font-medium">{app.label}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>


                <p className="text-sm">
                    © {new Date().getFullYear()} {copyrightText}
                </p>
            </div>
        </footer>
    );
}
