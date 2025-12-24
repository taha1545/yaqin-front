"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Menu, X } from "lucide-react";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

export const navLinks = [
	{ name: "الرئيسية", href: "#hero" },
	{ name: " المميزات", href: "#features" },
	{ name: "عن المنصة", href: "#faqs" },
	{ name: "اتصل بنا", href: "#contact" },
];

export function Header() {
	const scrolled = useScroll(10);
	const [isOpen, setIsOpen] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const router = useRouter();
	const pathname = usePathname();

	const logout = () => {
		setCurrentUser(null);
	};

	const handleScroll = (e, href) => {
		e.preventDefault();
		const targetId = href.replace("#", "");

		if (pathname !== "/") {
			//
			router.push(`/#${targetId}`);
			setIsOpen(false);
			return;
		}

		// 
		const elem = document.getElementById(targetId);
		if (elem) {
			elem.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
		setIsOpen(false);
	};

	return (
		<header
			className={cn(
				"sticky top-0 z-50 mx-auto w-full max-w-4xl border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out",
				{
					"border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:max-w-3xl md:shadow": scrolled,
				}
			)}
		>
			<nav
				className={cn(
					"flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
					{
						"md:px-2": scrolled,
					}
				)}
			>
				{/* Logo - Scrolls to Top */}
				<Link
					href="#hero"
					onClick={(e) => handleScroll(e, "#hero")}
					className="flex items-center gap-2 group"
				>
					<div className="relative w-10 h-10 overflow-hidden rounded-lg bg-primary/10 transition-colors">
						<Image
							src="/logo.jpg"
							alt="Logo"
							width={40}
							height={40}
							className="object-cover"
						/>
					</div>
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden items-center gap-6 md:flex">
					{navLinks.map((link, i) => (
						<a
							key={i}
							href={link.href}
							onClick={(e) => handleScroll(e, link.href)}
							className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
						>
							{link.name}
						</a>
					))}
				</div>

				{/* User Actions */}
				<div className="hidden items-center gap-2 md:flex">
					{currentUser ? (
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-2">
								<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
									<User size={16} />
								</div>
								<div className="text-right">
									<p className="text-xs font-medium leading-none">{currentUser.name}</p>
									<p className="text-[10px] text-muted-foreground">
										{currentUser.role === "parent" ? "ولي أمر" : "طالب"}
									</p>
								</div>
							</div>
							<Button variant="ghost" size="icon" onClick={logout} className="h-8 w-8">
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
				<button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? <X size={20} /> : <Menu size={20} />}
				</button>
			</nav>

			{/* Mobile Navigation Menu */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="md:hidden border-t bg-background overflow-hidden"
					>
						<div className="flex flex-col gap-2 p-4 text-right" dir="rtl">
							{navLinks.map((link) => (
								<a
									key={link.href}
									href={link.href}
									onClick={(e) => handleScroll(e, link.href)}
									className="text-sm font-medium py-3 border-b border-border/50 last:border-0 cursor-pointer"
								>
									{link.name}
								</a>
							))}

							<div className="pt-2 flex flex-col gap-2">
								{currentUser ? (
									<Button variant="outline" className="w-full" onClick={logout}>
										تسجيل الخروج
									</Button>
								) : (
									<>
										<Link href="/auth/login" className="w-full">
											<Button variant="outline" className="w-full">تسجيل الدخول</Button>
										</Link>
										<Link href="/auth/register" className="w-full">
											<Button className="w-full">ابدأ رحلة التعلم</Button>
										</Link>
									</>
								)}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}

export default Header;