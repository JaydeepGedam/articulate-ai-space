import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Copy, RotateCw, Trash2 } from "lucide-react";
import { toast } from "sonner";

const mockHistory = [
  {
    id: 1,
    title: "10 Tips for Productivity",
    type: "Blog",
    goal: "Educate",
    tone: "Friendly",
    date: "2025-10-10",
    time: "14:30",
    content: "Discover proven strategies to boost your daily productivity and achieve more with less effort...",
  },
  {
    id: 2,
    title: "New Product Launch",
    type: "LinkedIn Post",
    goal: "Sell",
    tone: "Persuasive",
    date: "2025-10-09",
    time: "10:15",
    content: "Excited to announce our revolutionary new product that will transform how you work...",
  },
  {
    id: 3,
    title: "Premium Headphones",
    type: "Product Description",
    goal: "Persuade",
    tone: "Formal",
    date: "2025-10-08",
    time: "16:45",
    content: "Experience crystal-clear audio with our state-of-the-art wireless headphones...",
  },
  {
    id: 4,
    title: "Marketing Strategy Guide",
    type: "Blog",
    goal: "Educate",
    tone: "Formal",
    date: "2025-10-07",
    time: "09:20",
    content: "Learn the essential marketing strategies that top brands use to dominate their markets...",
  },
  {
    id: 5,
    title: "Summer Sale Announcement",
    type: "LinkedIn Post",
    goal: "Sell",
    tone: "Witty",
    date: "2025-10-06",
    time: "11:00",
    content: "Hot deals are here! Don't miss our biggest summer sale yet with up to 50% off...",
  },
];

const History = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const handleDelete = (id: number) => {
    toast.success("Content deleted!");
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
          <h1 className="text-4xl font-bold mb-2">Content History</h1>
          <p className="text-muted-foreground text-lg">
            View all your previously generated content
          </p>
        </div>

        {mockHistory.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No history yet</h3>
              <p className="text-muted-foreground mb-6">
                Start generating content to build your history
              </p>
              <Button onClick={() => navigate("/generate")} className="gap-2">
                Generate Content
              </Button>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {mockHistory.map((item, index) => (
              <Card
                key={item.id}
                className="hover:shadow-md transition-shadow animate-slide-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge className={typeColors[item.type] || "bg-gray-100 text-gray-800"}>
                          {item.type}
                        </Badge>
                        <Badge variant="outline">{item.tone}</Badge>
                        <Badge variant="outline">{item.goal}</Badge>
                      </div>
                      <CardTitle className="text-xl mb-1">{item.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {item.date} at {item.time}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{item.content}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      onClick={() => handleCopy(item.content)}
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2"
                      onClick={() => navigate("/generate")}
                    >
                      <RotateCw className="w-4 h-4" />
                      Regenerate
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
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

export default History;
