"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusIcon } from "lucide-react";

const faqs = [
	{
		id: "item-1",
		title: "ما هي منصة يقين؟",
		content:
			"يقين هي منصة تعليمية تفاعلية مصممة خصيصاً للأطفال، تهدف إلى تقديم محتوى تعليمي وقيمي عالي الجودة في بيئة آمنة تماماً.",
	},
	{
		id: "item-2",
		title: "لمن تتوجه هذه المنصة؟",
		content:
			"تستهدف المنصة الأطفال في المراحل العمرية المختلفة، بالإضافة إلى أولياء الأمور الذين يبحثون عن محتوى تعليمي موثوق وآمن لأطفالهم.",
	},
	{
		id: "item-3",
		title: "ما الذي يميز محتوى يقين التعليمي؟",
		content:
			"يتم إعداد المحتوى من قبل خبراء تربويين لضمان الجمع بين الفائدة التعليمية والقيم الأخلاقية، مع استخدام أساليب تفاعلية تجذب الطفل.",
	},
	{
		id: "item-4",
		title: "هل المنصة آمنة لاستخدام الأطفال بمفردهم؟",
		content:
			"نعم، المنصة خالية تماماً من الإعلانات ومن أي محتوى خارجي غير مراقب. تم تصميم الواجهة لتكون سهلة الاستخدام وبسيطة للطفل.",
	},
	{
		id: "item-5",
		title: "كيف يمكنني متابعة تقدم طفلي؟",
		content:
			"توفر يقين لوحة تحكم خاصة لأولياء الأمور تتيح لك رؤية الدروس التي أكملها طفلك، والنتائج التي حققها، والوقت الذي يقضيه في التعلم.",
	},
	{
		id: "item-6",
		title: "هل يمكنني الوصول للمنصة من أي جهاز؟",
		content:
			"نعم، يمكنك تسجيل الدخول إلى حسابك من المتصفح أو عبر تطبيقاتنا على الهواتف الذكية والأجهزة اللوحية.",
	},
	{
		id: "item-7",
		title: "كيف يمكنني التواصل مع الدعم الفني؟",
		content:
			"يمكنك التواصل معنا مباشرة عبر البريد الإلكتروني أو من خلال نموذج 'تواصل معنا' المتاح في الموقع، وسيرد فريقنا عليك في أقرب وقت.",
	},
];

export function FaqsSection() {
	return (
		<section
			dir="rtl"
			className="mx-auto grid min-h-[80vh] w-full max-w-5xl grid-cols-1 md:grid-cols-2 lg:border-x"
		>
			<div className="px-6 pt-12 pb-6 text-right">
				<div className="space-y-5">
					<h2 className="text-balance font-bold text-4xl md:text-6xl lg:font-black">
						الأسئلة الشائعة
					</h2>
					<p className="text-muted-foreground text-lg">
						إجابات سريعة على الأسئلة الأكثر شيوعاً حول منصة يقين.
						اضغط على أي سؤال لمعرفة المزيد.
					</p>
					<p className="text-muted-foreground">
						لم تجد ما تبحث عنه؟{" "}
						<a className="text-primary font-bold hover:underline" href="#">
							تواصل معنا
						</a>
					</p>
				</div>
			</div>
			<div className="relative place-content-center">
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-y-0 right-3 h-full w-px bg-border"
				/>

				<Accordion collapsible type="single" className="w-full">
					{faqs.map((item) => (
						<AccordionItem
							className="group relative border-b pr-5 first:border-t last:border-b"
							key={item.id}
							value={item.id}
						>
							<PlusIcon
								aria-hidden="true"
								className="-bottom-[5.5px] translate-x-1/2 pointer-events-none absolute right-[12.5px] size-2.5 text-muted-foreground group-last:hidden"
							/>

							<AccordionTrigger className="px-4 py-6 text-right text-[16px] font-medium leading-6 hover:no-underline">
								{item.title}
							</AccordionTrigger>

							<AccordionContent className="px-4 pb-6 text-right text-muted-foreground text-base leading-relaxed">
								{item.content}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}