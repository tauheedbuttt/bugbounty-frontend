
import ProgramTriagersManagement from "@/components/ProgramTriagersManagement";

export default function ProgramTriagersManagementPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-foreground mb-6">Team Management</h1>
        <ProgramTriagersManagement />
      </div>
    </div>
  );
}
