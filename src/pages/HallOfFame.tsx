import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "@/hooks/use-translation";
import jsPDF from "jspdf";
import { ArrowLeft, Download, Trophy } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const hallOfFameResearchers = [
  {
    name: "john_doe",
    avatar: "/placeholder.svg",
    points: 95000,
    country: "United States",
    firstBugYear: 2019,
    verified: true,
  },
  {
    name: "sarah_chen",
    avatar: "/placeholder.svg",
    points: 87500,
    country: "Singapore",
    firstBugYear: 2020,
    verified: true,
  },
  {
    name: "alex_petrov",
    avatar: "/placeholder.svg",
    points: 82000,
    country: "Russia",
    firstBugYear: 2018,
    verified: true,
  },
  {
    name: "maria_gonzalez",
    avatar: "/placeholder.svg",
    points: 78500,
    country: "Spain",
    firstBugYear: 2021,
    verified: true,
  },
  {
    name: "david_kim",
    avatar: "/placeholder.svg",
    points: 75000,
    country: "South Korea",
    firstBugYear: 2019,
    verified: true,
  },
  {
    name: "emma_wilson",
    avatar: "/placeholder.svg",
    points: 72000,
    country: "Canada",
    firstBugYear: 2020,
    verified: true,
  },
  {
    name: "mohammed_ali",
    avatar: "/placeholder.svg",
    points: 69500,
    country: "Egypt",
    firstBugYear: 2022,
    verified: true,
  },
  {
    name: "lucas_silva",
    avatar: "/placeholder.svg",
    points: 67000,
    country: "Brazil",
    firstBugYear: 2017,
    verified: true,
  },
];

export default function HallOfFame() {
  const { t } = useTranslation();
  const [selectedResearcher, setSelectedResearcher] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const currentYear = new Date().getFullYear();

  const generatePDF = (researcher) => {
    const doc = new jsPDF();

    // Set font and add content
    doc.setFontSize(20);
    doc.text("Bug Bounty Syria Platform", 105, 30, { align: "center" });

    doc.setFontSize(16);
    doc.text("Certificate of Appreciation", 105, 50, { align: "center" });

    doc.setFontSize(12);
    doc.text("This certificate is awarded to:", 105, 80, { align: "center" });

    doc.setFontSize(18);
    doc.text(researcher.name, 105, 100, { align: "center" });

    doc.setFontSize(12);
    doc.text(`From: ${researcher.country}`, 105, 120, { align: "center" });

    doc.text(
      "For outstanding contributions to cybersecurity research",
      105,
      140,
      { align: "center" }
    );
    doc.text(
      `and being a valued member of our Hall of Fame since ${researcher.firstBugYear}.`,
      105,
      155,
      { align: "center" }
    );

    doc.text(`Total Points: ${researcher.points.toLocaleString()}`, 105, 180, {
      align: "center",
    });

    doc.text("Thank you for making the digital world safer!", 105, 210, {
      align: "center",
    });

    doc.setFontSize(10);
    doc.text("Bug Bounty Syria Team", 105, 250, { align: "center" });

    // Save the PDF
    doc.save(`${researcher.name}_certificate.pdf`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="container mx-auto px-6 py-12 sm:py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white p-0"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.common.buttons.back}
            </Button>
          </Link>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-light text-white mb-2">
            {t.common.buttons.bug_bounty_syria_hall_of_fame}
          </h1>
          <p className="text-gray-400 text-lg font-light">
            {t.common.buttons.exceptional_security_researchers}
          </p>
        </div>

        {/* Researchers Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-8">
            {hallOfFameResearchers
              .slice(0, visibleCount)
              .map((researcher, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedResearcher(researcher)}
                  className="rounded-lg p-8 transition-all hover:bg-gray-900/50 cursor-pointer group"
                  style={{ backgroundColor: "#161616", minHeight: "280px" }}
                >
                  <div className="text-center h-full flex flex-col justify-between">
                    <div>
                      <Avatar className="h-24 w-24 mx-auto mb-4">
                        <AvatarImage src={researcher.avatar} />
                        <AvatarFallback className="bg-gray-700 text-white font-medium text-xl">
                          {researcher.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-white font-medium text-xl group-hover:text-gray-300 transition-colors mb-2">
                        {researcher.name}
                      </h3>
                      <p className="text-gray-400 text-base mb-4">
                        {researcher.country}
                      </p>
                      <Badge
                        variant="secondary"
                        className="text-sm bg-gray-800 text-gray-300 border-gray-700 mb-4"
                      >
                        {t.common.buttons.hall_of_fame}{" "}
                        {researcher.firstBugYear}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-4">
                      <span className="text-gray-400 text-base">
                        {researcher.points.toLocaleString()}{" "}
                        {t.common.buttons.points.toLocaleLowerCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Load More Button */}
          {visibleCount < hallOfFameResearchers.length && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={() =>
                  setVisibleCount((prev) =>
                    Math.min(prev + 4, hallOfFameResearchers.length)
                  )
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Researcher Details Modal */}
      <Dialog
        open={!!selectedResearcher}
        onOpenChange={() => setSelectedResearcher(null)}
      >
        <DialogContent className="bg-black border-gray-800 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-light text-white mb-6">
              {t.common.buttons.thank_you}
            </DialogTitle>
          </DialogHeader>
          {selectedResearcher && (
            <div className="text-center space-y-6">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage src={selectedResearcher.avatar} />
                <AvatarFallback className="bg-gray-700 text-white text-2xl font-medium">
                  {selectedResearcher.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-4">
                <h3 className="text-2xl font-medium text-white">
                  {selectedResearcher.name}
                </h3>
                <p className="text-gray-400 text-lg">
                  {selectedResearcher.country}
                </p>

                <p className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto">
                  {t.common.buttons.bug_bounty_syria_thanks}
                </p>

                <div className="flex justify-center items-center gap-2 py-2">
                  <Trophy className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">
                    {selectedResearcher.points.toLocaleString()}{" "}
                    {t.common.buttons.points.toLocaleLowerCase()}
                  </span>
                </div>

                <div className="flex justify-center">
                  <Badge
                    variant="secondary"
                    className="text-sm bg-gray-800 text-gray-300 border-gray-700"
                  >
                    {t.common.buttons.hall_of_fame}{" "}
                    {selectedResearcher.firstBugYear}
                  </Badge>
                </div>

                <div className="pt-4">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                    onClick={() => generatePDF(selectedResearcher)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {t.common.buttons.download_certificate}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
