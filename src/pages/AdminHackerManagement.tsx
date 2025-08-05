
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, UserX, Eye, Ban, Clock } from "lucide-react";

const mockHackers = [
  {
    id: "1",
    username: "elite_hacker",
    email: "hacker1@example.com",
    reputation: 850,
    reportsSubmitted: 23,
    reportsAccepted: 18,
    totalEarnings: "$2,500",
    status: "active",
    joinDate: "2024-01-15"
  },
  {
    id: "2",
    username: "security_ninja",
    email: "ninja@example.com",
    reputation: 1200,
    reportsSubmitted: 45,
    reportsAccepted: 38,
    totalEarnings: "$5,800",
    status: "active",
    joinDate: "2023-11-20"
  },
  {
    id: "3",
    username: "bug_hunter",
    email: "hunter@example.com",
    reputation: 450,
    reportsSubmitted: 12,
    reportsAccepted: 8,
    totalEarnings: "$800",
    status: "temp_banned",
    joinDate: "2024-03-10"
  }
];

export default function AdminHackerManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [hackers] = useState(mockHackers);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "secondary";
      case "temp_banned": return "destructive";
      case "perm_banned": return "destructive";
      default: return "secondary";
    }
  };

  const handleBanUser = (hackerId: string, banType: "temp" | "perm") => {
    console.log(`Banning user ${hackerId} - ${banType}`);
    // Handle ban logic
  };

  const filteredHackers = hackers.filter(hacker => {
    const matchesSearch = hacker.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hacker.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || hacker.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Hacker Management</h1>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by username or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="temp_banned">Temp Banned</SelectItem>
                  <SelectItem value="perm_banned">Perm Banned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Hackers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Registered Hackers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Reputation</TableHead>
                  <TableHead>Reports</TableHead>
                  <TableHead>Earnings</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHackers.map((hacker) => (
                  <TableRow key={hacker.id}>
                    <TableCell className="font-medium">{hacker.username}</TableCell>
                    <TableCell>{hacker.email}</TableCell>
                    <TableCell>{hacker.reputation}</TableCell>
                    <TableCell>
                      {hacker.reportsAccepted}/{hacker.reportsSubmitted}
                    </TableCell>
                    <TableCell>{hacker.totalEarnings}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(hacker.status)}>
                        {hacker.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {hacker.status === "active" && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleBanUser(hacker.id, "temp")}
                            >
                              <Clock className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleBanUser(hacker.id, "perm")}
                            >
                              <Ban className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
