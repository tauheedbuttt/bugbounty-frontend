import { ArrowLeft, AtSign, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useTranslation } from "@/hooks/use-translation";
import LandingBackButton from "@/components/LandingBackButton";

const ContactUs = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const contactUs = t.contactUs;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black border-b border-gray-900">
        <div className="container mx-auto px-6 py-8">
          <LandingBackButton />
          <h1 className="text-4xl font-light text-white mb-4">
            {contactUs.header.title}
          </h1>
          <p className="text-gray-400 text-lg">{contactUs.header.subtitle}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="rounded-3xl p-8" style={{ backgroundColor: "#1C1C1C" }}>
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <div className="space-y-8">
              <section className="text-center">
                <h2 className="text-3xl font-light text-white mb-6">
                  {contactUs.sections.help.title}
                </h2>
                <p className="text-gray-400 leading-relaxed text-xl mb-8">
                  {contactUs.sections.help.desc}
                </p>
              </section>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Email Contact */}
                <div
                  className="p-8 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors text-center"
                  style={{ backgroundColor: "#2563eb" }}
                >
                  <div className="flex justify-center mb-6">
                    <AtSign className="h-10 w-10 text-white" strokeWidth={1} />
                  </div>
                  <h3 className="font-light text-white mb-4 text-2xl">
                    {contactUs.sections.email.title}
                  </h3>
                  <p
                    className="text-lg leading-relaxed mb-6"
                    style={{ color: "#e5e7eb" }}
                  >
                    {contactUs.sections.email.desc}
                  </p>
                  <a
                    href={`mailto:${contactUs.sections.email.button}`}
                    className="inline-flex items-center px-8 py-4 rounded-lg text-white font-light transition-colors hover:bg-white/10 border border-white/20 text-lg"
                  >
                    {contactUs.sections.email.button}
                  </a>
                </div>

                {/* WhatsApp Contact */}
                <div
                  className="p-8 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors text-center"
                  style={{ backgroundColor: "#2563eb" }}
                >
                  <div className="flex justify-center mb-6">
                    <Phone className="h-8 w-8 text-white" strokeWidth={1} />
                  </div>
                  <h3 className="font-light text-white mb-4 text-2xl">
                    {contactUs.sections.whatsapp.title}
                  </h3>
                  <p
                    className="text-lg leading-relaxed mb-6"
                    style={{ color: "#e5e7eb" }}
                  >
                    {contactUs.sections.whatsapp.desc}
                  </p>
                  <a
                    href="https://wa.me/963939466222"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 rounded-lg text-white font-light transition-colors hover:bg-white/10 border border-white/20 text-lg"
                  >
                    {contactUs.sections.whatsapp.button}
                  </a>
                </div>
              </div>

              <section className="text-center">
                <h2 className="text-2xl font-light text-white mb-4">
                  {contactUs.sections.whatHelp.title}
                </h2>
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  <div className="p-6 rounded-xl border border-gray-700">
                    <h3 className="font-light text-white mb-3 text-lg">
                      {contactUs.sections.whatHelp.general.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {contactUs.sections.whatHelp.general.desc}
                    </p>
                  </div>
                  <div className="p-6 rounded-xl border border-gray-700">
                    <h3 className="font-light text-white mb-3 text-lg">
                      {contactUs.sections.whatHelp.program.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {contactUs.sections.whatHelp.program.desc}
                    </p>
                  </div>
                  <div className="p-6 rounded-xl border border-gray-700">
                    <h3 className="font-light text-white mb-3 text-lg">
                      {contactUs.sections.whatHelp.support.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {contactUs.sections.whatHelp.support.desc}
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <div className="text-center pt-6 border-t border-gray-600">
              <Link to="/">
                <Button
                  style={{ backgroundColor: "#3283FF" }}
                  className="hover:opacity-90"
                >
                  {contactUs.returnHome}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
