import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Copy, RotateCw, Eye, Plus } from "lucide-react";
import { toast } from "sonner";

// Mock data for saved content
const mockContent = [
  {
    id: 1,
    title: "10 Tips for Productivity",
    type: "Blog",
    goal: "Educate",
    date: "2025-10-10",
    preview: "Discover proven strategies to boost your daily productivity and achieve more...",
  },
  {
    id: 2,
    title: "New Product Launch",
    type: "LinkedIn Post",
    goal: "Sell",
    date: "2025-10-09",
    preview: "Excited to announce our revolutionary new product that will transform...",
  },
  {
    id: 3,
    title: "Premium Headphones",
    type: "Product Description",
    goal: "Persuade",
    date: "2025-10-08",
    preview: "Experience crystal-clear audio with our state-of-the-art wireless headphones...",
  },
  {
    id: 4,
    title: "Marketing Strategy Guide",
    type: "Blog",
    goal: "Educate",
    date: "2025-10-07",
    preview: "Learn the essential marketing strategies that top brands use to dominate...",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userName = localStorage.getItem("userName") || "User";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const handleRegenerate = () => {
    toast.info("Regenerating content...");
  };

  const typeColors: Record<string, string> = {
    Blog: "bg-blue-100 text-blue-800 border-blue-200",
    "LinkedIn Post": "bg-purple-100 text-purple-800 border-purple-200",
    "Product Description": "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <Layout showNav>
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {userName}! 👋</h1>
          <p className="text-muted-foreground text-lg">
            Here's your content dashboard. Ready to create more?
          </p>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Your Content</h2>
          <Button onClick={() => navigate("/generate")} className="gap-2">
            <Plus className="w-4 h-4" />
            New Content
          </Button>
        </div>

        {mockContent.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No content yet</h3>
              <p className="text-muted-foreground mb-6">
                Start generating your first piece of content to see it here
              </p>
              <Button onClick={() => navigate("/generate")} className="gap-2">
                <Plus className="w-4 h-4" />
                Generate Content
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {mockContent.map((item, index) => (
              <Card
                key={item.id}
                className="hover:shadow-md transition-shadow animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={typeColors[item.type] || "bg-gray-100 text-gray-800"}>
                      {item.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <CardDescription className="text-sm">Goal: {item.goal}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{item.preview}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      onClick={() => navigate("/generate")}
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      onClick={handleRegenerate}
                    >
                      <RotateCw className="w-4 h-4" />
                      Regenerate
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      onClick={() => handleCopy(item.preview)}
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
