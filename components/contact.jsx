import { ContactCard } from "@/components/contact-card";

export default function Contact() {
    return (<>
        {/* Contact Section */}
        <section className="py-24 px-4 bg-background">
            <div className="max-w-6xl mx-auto">
                <ContactCard>
                    <form className="flex flex-col gap-4 w-full">
                        <input
                            type="text"
                            placeholder="الاسم الكامل"
                            className="w-full p-3 rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <input
                            type="email"
                            placeholder="البريد الإلكتروني"
                            className="w-full p-3 rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <textarea
                            placeholder="رسالتك"
                            rows={4}
                            className="w-full p-3 rounded-lg border bg-background outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <button className="bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:opacity-90 transition-opacity">
                            إرسال الرسالة
                        </button>
                    </form>
                </ContactCard>
            </div>
        </section>
    </>);
}