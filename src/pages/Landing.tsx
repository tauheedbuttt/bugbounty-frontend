import { Button } from "@/components/ui/button";
import { ROUTE_PATHS } from "@/constants/routes";
import useLanding from "@/hooks/apis/use-landing";
import { useTranslation } from "@/hooks/use-translation";
import { formatNumber } from "@/lib/utils";
import {
  Activity,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Cpu,
  Database,
  DollarSign,
  Eye,
  Gauge,
  Globe,
  GraduationCap,
  Network,
  Play,
  Radar,
  Rocket,
  Shield,
  Target,
  Triangle,
  Users,
  Users2,
} from "lucide-react";
import { Link } from "react-router-dom";
export default function Landing() {
  const { useGetLanding } = useLanding();
  const { data } = useGetLanding({});

  const { t } = useTranslation();
  const stats = [
    {
      number: `${formatNumber(data?.data?.reports)}+`,
      label: t.forms.labels.vulnerability_found,
      description: t.forms.labels.security_issues_discovered,
    },
    {
      number: `${formatNumber(data?.data?.programs)}+`,
      label: t.common.buttons.program,
      description: t.forms.labels.government_and_companies,
    },
    {
      number: `${formatNumber(data?.data?.hackers)}+`,
      label: t.common.buttons.researchers,
      description: t.forms.labels.active_security_experts,
    },
  ];
  const features = [
    {
      category: t.common.buttons.operate,
      items: [
        {
          icon: Database,
          title: t.common.buttons.bug_bounty_programs,
          description: t.common.buttons.comprehensive_vulnerability_disclosure,
          iconColor: "text-red-400",
        },
        {
          icon: Cpu,
          title: t.common.buttons.report_manager,
          description:
            t.common.buttons.streamlined_vulnerability_reporting_system,
          iconColor: "text-red-400",
        },
        {
          icon: Network,
          title: t.common.buttons.researcher_network,
          description: t.common.buttons.connect_with_top_security_researchers,
          iconColor: "text-orange-400",
        },
      ],
    },
    {
      category: t.common.buttons.monitor,
      items: [
        {
          icon: Activity,
          title: t.navigation.analytics,
          description: t.forms.labels.track_program_performance_and_metrics,
          iconColor: "text-blue-400",
        },
        {
          icon: Gauge,
          title: t.common.buttons.payouts,
          description: t.common.buttons.automated_bounty_payment_processing,
          iconColor: "text-blue-400",
        },
        {
          icon: Radar,
          title: t.common.buttons.live_monitoring,
          description: t.common.buttons.realtime_security_posture_tracking,
          iconColor: "text-cyan-400",
        },
      ],
    },
    {
      category: t.common.buttons.grow,
      items: [
        {
          icon: Rocket,
          title: t.common.buttons.reputation_system,
          description:
            t.common.buttons.build_researcher_credibility_and_rankings,
          iconColor: "text-green-400",
        },
        {
          icon: Users2,
          title: t.common.buttons.global_reach,
          description: t.common.buttons.access_worldwide_security_talent,
          iconColor: "text-green-400",
        },
        {
          icon: GraduationCap,
          title: t.common.buttons.security_training,
          description: t.common.buttons.educational_resources_for_researchers,
          iconColor: "text-yellow-400",
        },
      ],
    },
  ];
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight text-white">
              {t.common.buttons.secure_the_future}
              <br />
              <span className="text-gray-400">{t.common.buttons.together}</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-xl">
              {t.common.buttons.connect_with_researchers}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link to={ROUTE_PATHS.HACKER_SIGNUP}>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base w-full sm:w-auto rounded-full font-light flex items-center gap-3 group"
                >
                  {t.common.buttons.join_as_researcher}
                  <div className="bg-white/20 rounded-full p-2 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Button>
              </Link>
              <Link to={ROUTE_PATHS.LANDING.CONTACT_US}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-white hover:bg-gray-800 px-8 py-3 text-base w-full sm:w-auto rounded-full font-light"
                  style={{
                    backgroundColor: "#4c4c4c",
                  }}
                >
                  {t.common.buttons.start_program}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Visual Element - Thinner version */}
          <div className="relative">
            <div
              className="bg-gray-500 rounded-3xl p-8 lg:p-12 relative overflow-hidden max-w-sm mx-auto"
              style={{
                aspectRatio: "3/4",
              }}
            >
              {/* 3D Platform bases */}
              <div className="absolute bottom-8 left-8 w-16 h-8 bg-white rounded-full opacity-90 transform rotate-3 shadow-lg"></div>
              <div className="absolute bottom-12 right-12 w-20 h-10 bg-white rounded-full opacity-95 transform -rotate-2 shadow-lg"></div>
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-18 h-9 bg-white rounded-full opacity-85 rotate-1 shadow-lg"></div>

              {/* Mock device screens */}
              <div className="absolute bottom-16 left-12 w-12 h-8 bg-gray-800 rounded-sm border border-gray-700 shadow-lg transform rotate-12">
                <div className="p-1">
                  <div className="w-full h-1 bg-blue-400 rounded mb-1"></div>
                  <div className="w-3/4 h-1 bg-gray-600 rounded mb-1"></div>
                  <div className="w-1/2 h-1 bg-gray-600 rounded"></div>
                </div>
              </div>

              <div className="absolute bottom-20 right-16 w-14 h-9 bg-gray-800 rounded-sm border border-gray-700 shadow-lg transform -rotate-6">
                <div className="p-1">
                  <div className="w-full h-1 bg-green-400 rounded mb-1"></div>
                  <div className="w-2/3 h-1 bg-gray-600 rounded mb-1"></div>
                  <div className="w-full h-1 bg-gray-600 rounded"></div>
                </div>
              </div>

              <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-10 h-6 bg-gray-800 rounded-sm border border-gray-700 shadow-lg">
                <div className="p-1">
                  <div className="w-full h-0.5 bg-yellow-400 rounded mb-0.5"></div>
                  <div className="w-3/4 h-0.5 bg-gray-600 rounded mb-0.5"></div>
                  <div className="w-1/2 h-0.5 bg-gray-600 rounded"></div>
                </div>
              </div>

              {/* Central button element with triangle logo */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <button className="bg-transparent border-2 border-white/30 text-white px-6 py-3 rounded-full text-sm font-medium hover:border-white/50 transition-colors backdrop-blur-sm flex items-center gap-2">
                  <Play className="h-3 w-3 fill-white" />
                  {t.common.buttons.explore_platform}
                </button>
              </div>

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-600/20 to-transparent rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-2xl px-16 sm:px-20 py-4 sm:py-5 text-center"
              style={{
                backgroundColor: "#161616",
              }}
            >
              <div className="text-3xl sm:text-4xl font-light text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 font-light text-lg">
                {stat.label}
              </div>
              <div className="text-gray-400 text-sm mt-1 font-light">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-light mb-4 text-white">
            {t.forms.labels.complete_security_platform}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light">
            {
              t.common.buttons
                .everything_you_need_to_run_successful_security_programs
            }
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {features.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <h3 className="text-xl font-light text-white pb-4 border-b border-gray-800">
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start space-x-4">
                    <div
                      className={`p-3 rounded-lg flex-shrink-0 ${item.iconColor}`}
                      // style={{
                      //   backgroundColor: "rgba(255, 255, 255, 0.05)",
                      // }}
                    >
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-light text-white text-base mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16">
        <div
          className="rounded-2xl p-6 sm:p-8 text-center max-w-3xl mx-auto"
          style={{
            backgroundColor: "#1C1C1C",
          }}
        >
          <h2 className="text-xl sm:text-2xl font-light mb-4 text-white">
            {t.common.buttons.ready_to_get_started}
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto text-sm sm:text-base font-light">
            {t.common.buttons.join_thousands}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={ROUTE_PATHS.LANDING.CONTACT_US}>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 w-full sm:w-auto"
              >
                {t.common.buttons.launch_program}
              </Button>
            </Link>
            <Link to={ROUTE_PATHS.HACKER_SIGNUP}>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800 px-6 sm:px-8 py-3 w-full sm:w-auto"
                style={{ backgroundColor: "#4c4c4c" }}
              >
                {t.common.buttons.join_as_researcher}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
