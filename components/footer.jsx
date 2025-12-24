"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
	FacebookIcon,
	InstagramIcon,
	LinkedinIcon,
	TwitterIcon,
	YoutubeIcon,
} from "lucide-react";

export function Footer() {
	const company = [
		{ title: "من نحن", href: "#" },
		{ title: "الوظائف", href: "#" },
		{ title: "الهوية البصرية", href: "#" },
		{ title: "سياسة الخصوصية", href: "#" },
		{ title: "شروط الخدمة", href: "#" },
	];

	const resources = [
		{ title: "المدونة", href: "#" },
		{ title: "مركز المساعدة", href: "#" },
		{ title: "الدعم الفني", href: "#" },
		{ title: "المجتمع", href: "#" },
		{ title: "الأمان", href: "#" },
	];

	const socialLinks = [
		{ icon: FacebookIcon, link: "#" },
		{ icon: InstagramIcon, link: "#" },
		{ icon: LinkedinIcon, link: "#" },
		{ icon: YoutubeIcon, link: "#" },
	];

	return (
		<footer dir="rtl" className="relative">
			<div
				className={cn(
					"mx-auto max-w-5xl lg:border-x",
					"dark:bg-[radial-gradient(35%_80%_at_30%_0%,--theme(--color-foreground/.1),transparent)]"
				)}
			>
				<div className="absolute inset-x-0 h-px w-full bg-border" />

				<div className="grid max-w-5xl grid-cols-6 gap-8 p-6 md:p-8">
					<div className="col-span-6 flex flex-col gap-4 pt-5 md:col-span-4 text-right">
						<a className="w-max" href="#">
							<Logo className="h-6" />
						</a>
						<p className="max-w-sm text-balance text-muted-foreground text-sm leading-relaxed">
							يقين هي منصة تعليمية تفاعلية تهدف إلى بناء مستقبل طفلك من خلال محتوى قيم وآمن تماماً.
						</p>
						<div className="flex gap-2 justify-start">
							{socialLinks.map((item, index) => (
								<Button key={`social-${index}`} size="icon" variant="outline" className="size-8">
									<a href={item.link} target="_blank" rel="noreferrer">
										<item.icon className="size-4" />
									</a>
								</Button>
							))}
						</div>
					</div>

					<div className="col-span-3 w-full md:col-span-1 text-right">
						<span className="text-foreground font-bold text-sm">المصادر</span>
						<div className="mt-4 flex flex-col gap-3">
							{resources.map(({ href, title }) => (
								<a className="w-max text-muted-foreground text-sm hover:text-primary transition-colors" href={href} key={title}>
									{title}
								</a>
							))}
						</div>
					</div>

					<div className="col-span-3 w-full md:col-span-1 text-right">
						<span className="text-foreground font-bold text-sm">الشركة</span>
						<div className="mt-4 flex flex-col gap-3">
							{company.map(({ href, title }) => (
								<a className="w-max text-muted-foreground text-sm hover:text-primary transition-colors" href={href} key={title}>
									{title}
								</a>
							))}
						</div>
					</div>
				</div>

				<div className="absolute inset-x-0 h-px w-full bg-border" />

				<div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-6">
					<p className="text-center font-light text-muted-foreground text-sm">
						&copy; {new Date().getFullYear()} يقين. جميع الحقوق محفوظة.
					</p>
				</div>
			</div>
		</footer>
	);
}