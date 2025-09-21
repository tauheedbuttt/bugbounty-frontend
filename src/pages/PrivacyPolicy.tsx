import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useTranslation } from "@/hooks/use-translation";
import LandingBackButton from "@/components/LandingBackButton";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const policy = t.policy;

  policy.sections.informationWeCollect.personalList = Object.values(
    policy.sections.informationWeCollect.personalList
  );
  policy.sections.informationWeCollect.technicalList = Object.values(
    policy.sections.informationWeCollect.technicalList
  );
  policy.sections.howWeUse.list = Object.values(policy.sections.howWeUse.list);
  policy.sections.cookies.list = Object.values(policy.sections.cookies.list);
  policy.sections.storage.list = Object.values(policy.sections.storage.list);
  policy.sections.sharing.list = Object.values(policy.sections.sharing.list);
  policy.sections.rights.list = Object.values(policy.sections.rights.list);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black border-b border-gray-900">
        <div className="container mx-auto px-6 py-8">
          {" "}
          <LandingBackButton />
          <h1 className="text-4xl font-light text-white mb-4">
            {policy.header.title}
          </h1>
          <p className="text-gray-400 text-lg">{policy.header.subtitle}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="rounded-3xl p-8" style={{ backgroundColor: "#1C1C1C" }}>
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-400">{policy.effectiveDate}</p>
            </div>
            <div className="space-y-6">
              {/* 1. Information We Collect */}
              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {policy.sections.informationWeCollect.title}
                </h2>
                <div className="space-y-4 text-gray-400">
                  <h3 className="text-lg font-light text-white">
                    {policy.sections.informationWeCollect.personalTitle}
                  </h3>
                  <p>{policy.sections.informationWeCollect.personalDesc}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    {policy.sections.informationWeCollect.personalList.map(
                      (item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>
                  <h3 className="text-lg font-light text-white">
                    {policy.sections.informationWeCollect.technicalTitle}
                  </h3>
                  <p>{policy.sections.informationWeCollect.technicalDesc}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    {policy.sections.informationWeCollect.technicalList.map(
                      (item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </section>

              {/* 2. How We Use Your Information */}
              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {policy.sections.howWeUse.title}
                </h2>
                <div className="text-gray-400 space-y-2">
                  <p>{policy.sections.howWeUse.desc}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    {policy.sections.howWeUse.list.map(
                      (item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </section>

              {/* 3. Cookies and Tracking */}
              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {policy.sections.cookies.title}
                </h2>
                <div className="text-gray-400 space-y-2">
                  <p>{policy.sections.cookies.desc}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    {policy.sections.cookies.list.map(
                      (item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>
                  <p>{policy.sections.cookies.note}</p>
                </div>
              </section>

              {/* 4. Data Storage and Security */}
              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {policy.sections.storage.title}
                </h2>
                <div className="text-gray-400 space-y-2">
                  <p>{policy.sections.storage.desc}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    {policy.sections.storage.list.map(
                      (item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </section>

              {/* 5. Information Sharing */}
              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {policy.sections.sharing.title}
                </h2>
                <div className="text-gray-400 space-y-2">
                  <p>{policy.sections.sharing.desc}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    {policy.sections.sharing.list.map(
                      (item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </section>

              {/* 6. Your Rights */}
              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {policy.sections.rights.title}
                </h2>
                <div className="text-gray-400 space-y-2">
                  <p>{policy.sections.rights.desc}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    {policy.sections.rights.list.map(
                      (item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </section>

              {/* 7. Children's Privacy */}
              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {policy.sections.children.title}
                </h2>
                <p className="text-gray-400">{policy.sections.children.desc}</p>
              </section>

              {/* 8. Changes to This Policy */}
              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {policy.sections.changes.title}
                </h2>
                <p className="text-gray-400">{policy.sections.changes.desc}</p>
              </section>

              {/* 9. Contact Us */}
              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {policy.sections.contact.title}
                </h2>
                <div className="text-gray-400">
                  <p>{policy.sections.contact.desc}</p>
                  <ul className="list-none mt-2 space-y-1">
                    <li>Email: {policy.sections.contact.email}</li>
                    <li>Address: {policy.sections.contact.address}</li>
                  </ul>
                </div>
              </section>
            </div>

            <div className="text-center pt-6 border-t border-gray-600">
              <Link to="/">
                <Button
                  style={{ backgroundColor: "#3283FF" }}
                  className="hover:opacity-90"
                >
                  {policy.returnHome}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
