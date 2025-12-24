import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import { Compass, Home } from "lucide-react";

export function NotFoundPage() {
	return (
		<div className="flex w-full items-center justify-center" dir="rtl">
			<div className="flex h-screen items-center border-x">
				<div>
					<div className="absolute inset-x-0 h-px bg-border" />
					<Empty>
						<EmptyHeader>
							<EmptyTitle className="font-black font-mono text-8xl">
								404
							</EmptyTitle>
							<EmptyDescription className="text-nowrap">
								عذراً، الصفحة التي تحاول الوصول إليها <br />
								غير موجودة أو تم نقلها.
							</EmptyDescription>
						</EmptyHeader>
						<EmptyContent>
							<div className="flex gap-2">
								<Button asChild>
									<a href="/">
										<Home className="ml-2 h-4 w-4" /> الرئيسية
									</a>
								</Button>

								<Button asChild variant="outline">
									<a href="/dashboard/student">
										<Compass className="ml-2 h-4 w-4" /> استكشف الدروس
									</a>
								</Button>
							</div>
						</EmptyContent>
					</Empty>
					<div className="absolute inset-x-0 h-px bg-border" />
				</div>
			</div>
		</div>
	);
}