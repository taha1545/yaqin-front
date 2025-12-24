"use client";

import { cn } from "@/lib/utils";
import { PlusIcon, Mail, Phone, MapPin } from "lucide-react";

export function ContactCard({
    title = "تواصل معنا",
    description = "إذا كان لديك أي استفسار حول خدماتنا أو تحتاج إلى مساعدة، يرجى ملء النموذج. نبذل قصارى جهدنا للرد خلال يوم عمل واحد.",
    contactInfo = [
        { icon: Mail, label: "البريد الإلكتروني", value: "yaqeen@email.com" },
        { icon: Phone, label: "الهاتف", value: "0673442786" },
        { icon: MapPin, label: "المقر الرئيسي", value: "Ahmed El Rahim EL Bayadh" },
    ],
    className,
    formSectionClassName,
    children,
    ...props
}) {
    return (
        <div
            dir="rtl"
            className={cn(
                "relative grid h-full w-full border md:grid-cols-2 lg:grid-cols-3 overflow-visible",
                className
            )}
            {...props}
        >
            <PlusIcon className="-top-[12.5px] -right-[12.5px] absolute h-6 w-6 z-10 bg-background" strokeWidth={1} />
            <PlusIcon className="-top-[12.5px] -left-[12.5px] absolute h-6 w-6 z-10 bg-background" strokeWidth={1} />
            <PlusIcon className="-bottom-[12.5px] -right-[12.5px] absolute h-6 w-6 z-10 bg-background" strokeWidth={1} />
            <PlusIcon className="-left-[12.5px] -bottom-[12.5px] absolute h-6 w-6 z-10 bg-background" strokeWidth={1} />

            <div className="col-span-1 flex flex-col justify-between bg-secondary/50 lg:col-span-2 dark:bg-background">
                <div className="relative h-full space-y-6 px-6 py-12 md:p-12 text-right">
                    <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl">
                        {title}
                    </h1>
                    <p className="max-w-xl text-muted-foreground text-base md:text-lg leading-relaxed">
                        {description}
                    </p>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-4">
                        {contactInfo?.map((info) => (
                            <ContactInfo key={info.label} {...info} />
                        ))}
                    </div>
                </div>
            </div>

            <div
                className={cn(
                    "col-span-1 flex h-full w-full items-center border-t bg-card px-6 py-12 md:border-t-0 md:border-r dark:bg-card/50",
                    formSectionClassName
                )}
            >
                {children}
            </div>
        </div>
    );
}

function ContactInfo({ icon: Icon, label, value, className, ...props }) {
    return (
        <div className={cn("flex items-center gap-4 py-2 text-right", className)} {...props}>
            <div className="rounded-xl border bg-background p-3 shadow-sm text-primary">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className="font-bold text-sm">{label}</p>
                <p className="text-muted-foreground text-xs mt-0.5" dir="ltr">{value}</p>
            </div>
        </div>
    );
}