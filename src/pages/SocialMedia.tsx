import { ArrowLeft, Send, X, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useTranslation } from "@/hooks/use-translation";
import LandingBackButton from "@/components/LandingBackButton";

const SocialMedia = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const socialMedia = t.socialMedia;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black border-b border-gray-900">
        <div className="container mx-auto px-6 py-8">
          {" "}
          <LandingBackButton />
          <h1 className="text-4xl font-light text-white mb-4">
            {socialMedia.header.title}
          </h1>
          <p className="text-gray-400 text-lg">{socialMedia.header.subtitle}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="rounded-3xl p-8" style={{ backgroundColor: "#1C1C1C" }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-white mb-6">
              {socialMedia.followUs.title}
            </h2>
            <p className="text-gray-400 leading-relaxed text-xl mb-8">
              {socialMedia.followUs.desc}
            </p>
          </div>

          {/* Social Platforms in Blue Boxes */}
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
            {/* X (Twitter) */}
            <div className="bg-blue-600 rounded-2xl p-6 text-center">
              <div className="flex justify-center mb-4">
                <X className="h-6 w-6 text-white" strokeWidth={1} />
              </div>
              <h3 className="text-white font-light text-lg mb-2">
                {socialMedia.platforms.x.title}
              </h3>
              <p className="text-blue-100 text-xs font-light mb-4">
                {socialMedia.platforms.x.desc}
              </p>
              <a
                href="https://twitter.com/bugbountysy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg text-white font-light transition-colors hover:bg-white/10 border border-white/20 text-xs"
              >
                {socialMedia.platforms.x.button}
              </a>
            </div>

            {/* YouTube */}
            <div className="bg-blue-600 rounded-2xl p-6 text-center">
              <div className="flex justify-center mb-4">
                <Youtube className="h-6 w-6 text-white" strokeWidth={1} />
              </div>
              <h3 className="text-white font-light text-lg mb-2">
                {socialMedia.platforms.youtube.title}
              </h3>
              <p className="text-blue-100 text-xs font-light mb-4">
                {socialMedia.platforms.youtube.desc}
              </p>
              <a
                href="https://youtube.com/@bugbountysy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg text-white font-light transition-colors hover:bg-white/10 border border-white/20 text-xs"
              >
                {socialMedia.platforms.youtube.button}
              </a>
            </div>

            {/* LinkedIn */}
            <div className="bg-blue-600 rounded-2xl p-6 text-center">
              <div className="flex justify-center mb-4">
                <Linkedin className="h-6 w-6 text-white" strokeWidth={1} />
              </div>
              <h3 className="text-white font-light text-lg mb-2">
                {socialMedia.platforms.linkedin.title}
              </h3>
              <p className="text-blue-100 text-xs font-light mb-4">
                {socialMedia.platforms.linkedin.desc}
              </p>
              <a
                href="https://linkedin.com/company/bugbountysy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg text-white font-light transition-colors hover:bg-white/10 border border-white/20 text-xs"
              >
                {socialMedia.platforms.linkedin.button}
              </a>
            </div>

            {/* Telegram Community */}
            <div className="bg-blue-600 rounded-2xl p-6 text-center">
              <div className="flex justify-center mb-4">
                <Send className="h-6 w-6 text-white" strokeWidth={1} />
              </div>
              <h3 className="text-white font-light text-lg mb-2">
                {socialMedia.platforms.telegram.title}
              </h3>
              <p className="text-blue-100 text-xs font-light mb-4">
                {socialMedia.platforms.telegram.desc}
              </p>
              <a
                href="https://t.me/bugbountysy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg text-white font-light transition-colors hover:bg-white/10 border border-white/20 text-xs"
              >
                {socialMedia.platforms.telegram.button}
              </a>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-gray-600 mt-8">
            <Link to="/">
              <Button
                style={{ backgroundColor: "#3283FF" }}
                className="hover:opacity-90"
              >
                {socialMedia.returnHome}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
