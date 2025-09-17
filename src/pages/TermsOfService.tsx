import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useTranslation } from "@/hooks/use-translation";
import LandingBackButton from "@/components/LandingBackButton";

const TermsOfService = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const terms = t.terms;

  terms.sections.eligibility.list = Object.values(
    terms.sections.eligibility.list
  );
  terms.sections.accounts.accountSecurity.list = Object.values(
    terms.sections.accounts.accountSecurity.list
  );
  terms.sections.accounts.prohibited.list = Object.values(
    terms.sections.accounts.prohibited.list
  );
  terms.sections.programRules.disclosure.list = Object.values(
    terms.sections.programRules.disclosure.list
  );
  terms.sections.programRules.rewards.list = Object.values(
    terms.sections.programRules.rewards.list
  );
  terms.sections.ip.list = Object.values(terms.sections.ip.list);
  terms.sections.payment.list = Object.values(terms.sections.payment.list);
  terms.sections.termination.list = Object.values(
    terms.sections.termination.list
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black border-b border-gray-900">
        <div className="container mx-auto px-6 py-8">
          {" "}
          <LandingBackButton />
          <h1 className="text-4xl font-light text-white mb-4">
            {terms.header.title}
          </h1>
          <p className="text-gray-400 text-lg">{terms.header.subtitle}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="rounded-3xl p-8" style={{ backgroundColor: "#1C1C1C" }}>
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-400">{terms.effectiveDate}</p>
            </div>
            <div className="space-y-6">
              <p className="text-gray-400 leading-relaxed">
                {terms.sections.intro}
              </p>

              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {terms.sections.acceptance.title}
                </h2>
                <p className="text-gray-400">
                  {terms.sections.acceptance.desc}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {terms.sections.eligibility.title}
                </h2>
                <div className="text-gray-400 space-y-2">
                  <p>{terms.sections.eligibility.desc}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    {terms.sections.eligibility.list.map(
                      (item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {terms.sections.accounts.title}
                </h2>
                <div className="text-gray-400 space-y-4">
                  <div>
                    <h3 className="text-lg font-light text-white mb-2">
                      {terms.sections.accounts.accountSecurity.title}
                    </h3>
                    <ul className="list-disc pl-6 space-y-1">
                      {terms.sections.accounts.accountSecurity.list.map(
                        (item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-light text-white mb-2">
                      {terms.sections.accounts.prohibited.title}
                    </h3>
                    <p>{terms.sections.accounts.prohibited.desc}</p>
                    <ul className="list-disc pl-6 space-y-1">
                      {terms.sections.accounts.prohibited.list.map(
                        (item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {terms.sections.programRules.title}
                </h2>
                <div className="text-gray-400 space-y-4">
                  <div>
                    <h3 className="text-lg font-light text-white mb-2">
                      {terms.sections.programRules.disclosure.title}
                    </h3>
                    <ul className="list-disc pl-6 space-y-1">
                      {terms.sections.programRules.disclosure.list.map(
                        (item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-light text-white mb-2">
                      {terms.sections.programRules.rewards.title}
                    </h3>
                    <ul className="list-disc pl-6 space-y-1">
                      {terms.sections.programRules.rewards.list.map(
                        (item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {terms.sections.ip.title}
                </h2>
                <div className="text-gray-400 space-y-2">
                  <p>{terms.sections.ip.desc}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    {terms.sections.ip.list.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {terms.sections.payment.title}
                </h2>
                <div className="text-gray-400 space-y-2">
                  <p>{terms.sections.payment.desc}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    {terms.sections.payment.list.map(
                      (item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {terms.sections.privacy.title}
                </h2>
                <p className="text-gray-400">{terms.sections.privacy.desc}</p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {terms.sections.liability.title}
                </h2>
                <p className="text-gray-400">{terms.sections.liability.desc}</p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {terms.sections.indemnification.title}
                </h2>
                <p className="text-gray-400">
                  {terms.sections.indemnification.desc}
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {terms.sections.termination.title}
                </h2>
                <div className="text-gray-400 space-y-2">
                  <p>{terms.sections.termination.desc}</p>
                  <ul className="list-disc pl-6 space-y-1">
                    {terms.sections.termination.list.map(
                      (item: string, idx: number) => (
                        <li key={idx}>{item}</li>
                      )
                    )}
                  </ul>
                  <p>{terms.sections.termination.note}</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {terms.sections.law.title}
                </h2>
                <p className="text-gray-400">{terms.sections.law.desc}</p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {terms.sections.changes.title}
                </h2>
                <p className="text-gray-400">{terms.sections.changes.desc}</p>
              </section>

              <section>
                <h2 className="text-2xl font-light text-white mb-3">
                  {terms.sections.contact.title}
                </h2>
                <div className="text-gray-400">
                  <p>{terms.sections.contact.desc}</p>
                  <ul className="list-none mt-2 space-y-1">
                    <li>Email: {terms.sections.contact.email}</li>
                    <li>Address: {terms.sections.contact.address}</li>
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
                  {terms.returnHome}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
