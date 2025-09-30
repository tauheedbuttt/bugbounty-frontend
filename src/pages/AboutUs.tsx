import LandingBackButton from "@/components/LandingBackButton";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const aboutUs = t.aboutUs;

  aboutUs.whatWeDo.list = Object.values(aboutUs.whatWeDo.list);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black border-b border-gray-900">
        <div className="container mx-auto px-6 py-8">
          {" "}
          <LandingBackButton />
          <h1 className="text-4xl font-light text-white mb-4">
            {aboutUs.header.title}
          </h1>
          <p className="text-gray-400 text-lg">{aboutUs.header.subtitle}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div
          className="rounded-3xl p-8"
          style={{
            backgroundColor: "#1C1C1C",
          }}
        >
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {aboutUs.mission.title}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  {aboutUs.mission.desc}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {aboutUs.whatWeDo.title}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  {aboutUs.whatWeDo.desc}
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-400">
                  {aboutUs.whatWeDo.list?.map((item: string, idx: number) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {aboutUs.vision.title}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  {aboutUs.vision.desc}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {aboutUs.coreValues.title}
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div
                    className="p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
                    style={{
                      backgroundColor: "#3b82f6",
                    }}
                  >
                    <h3 className="font-light text-white mb-3 text-lg">
                      {aboutUs.coreValues.ethicalSecurity.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: "#e5e7eb",
                      }}
                    >
                      {aboutUs.coreValues.ethicalSecurity.desc}
                    </p>
                  </div>
                  <div
                    className="p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
                    style={{
                      backgroundColor: "#3b82f6",
                    }}
                  >
                    <h3 className="font-light text-white mb-3 text-lg">
                      {aboutUs.coreValues.transparency.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: "#e5e7eb",
                      }}
                    >
                      {aboutUs.coreValues.transparency.desc}
                    </p>
                  </div>
                  <div
                    className="p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
                    style={{
                      backgroundColor: "#3b82f6",
                    }}
                  >
                    <h3 className="font-light text-white mb-3 text-lg">
                      {aboutUs.coreValues.community.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: "#e5e7eb",
                      }}
                    >
                      {aboutUs.coreValues.community.desc}
                    </p>
                  </div>
                  <div
                    className="p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
                    style={{
                      backgroundColor: "#3b82f6",
                    }}
                  >
                    <h3 className="font-light text-white mb-3 text-lg">
                      {aboutUs.coreValues.innovation.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: "#e5e7eb",
                      }}
                    >
                      {aboutUs.coreValues.innovation.desc}
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {aboutUs.knowMore.title}
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  {aboutUs.knowMore.desc}
                </p>
                <div className="text-center p-6 rounded-lg border border-gray-600">
                  <h3
                    className="font-light mb-3 text-lg"
                    style={{
                      color: "white",
                    }}
                  >
                    {aboutUs.knowMore.contactTitle}
                  </h3>
                  <p
                    className="mb-4"
                    style={{
                      color: "white",
                    }}
                  >
                    {aboutUs.knowMore.contactDesc}
                  </p>
                  <a
                    href={`mailto:${aboutUs.knowMore.contactEmail}`}
                    className="inline-flex items-center px-6 py-3 rounded-lg text-white font-light transition-colors hover:opacity-80"
                    style={{
                      backgroundColor: "#4c4c4c",
                    }}
                  >
                    {aboutUs.knowMore.contactEmail}
                  </a>
                </div>
              </section>
            </div>

            <div className="text-center pt-6 border-t border-gray-600">
              <Link to="/">
                <Button
                  style={{ backgroundColor: "#3283FF" }}
                  className="hover:opacity-90"
                >
                  {aboutUs.returnHome}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
