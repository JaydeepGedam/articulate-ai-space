import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sparkles, Copy, RotateCw, Save } from "lucide-react";
import { toast } from "sonner";

const Generate = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("");
  const [goal, setGoal] = useState("");
  const [tone, setTone] = useState("");
  const [mood, setMood] = useState([50]);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const getMoodEmoji = (value: number) => {
    if (value < 33) return "😐 Serious";
    if (value < 67) return "🙂 Balanced";
    return "😄 Funny";
  };

  const handleGenerate = async () => {
    if (!topic || !contentType || !goal || !tone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockContent = `# ${topic}\n\nThis is a ${tone.toLowerCase()} ${contentType.toLowerCase()} designed to ${goal.toLowerCase()}.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nKey points:\n- Engaging and well-structured content\n- Tailored to your specific needs\n- Professional tone and style\n\nThis content has been generated with a ${getMoodEmoji(mood[0])} mood to perfectly match your requirements.`;
      
      setGeneratedContent(mockContent);
      setIsGenerating(false);
      toast.success("Content generated successfully!");
    }, 2000);
  };

  const handleRegenerate = () => {
    if (!generatedContent) {
      toast.error("Generate content first");
      return;
    }
    handleGenerate();
  };

  const handleCopy = () => {
    if (!generatedContent) {
      toast.error("No content to copy");
      return;
    }
    navigator.clipboard.writeText(generatedContent);
    toast.success("Copied to clipboard!");
  };

  const handleSave = () => {
    if (!generatedContent) {
      toast.error("No content to save");
      return;
    }
    toast.success("Content saved to dashboard!");
  };

  return (
    <Layout showNav>
      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Generate Content</h1>
          <p className="text-muted-foreground text-lg">
            Create amazing AI-powered content in seconds
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>Configure your content parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic *</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Tips for productivity"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contentType">Content Type *</Label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger id="contentType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Blog">Blog Post</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn Post</SelectItem>
                    <SelectItem value="Product">Product Description</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Goal *</Label>
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger id="goal">
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Educate">Educate</SelectItem>
                    <SelectItem value="Persuade">Persuade</SelectItem>
                    <SelectItem value="Entertain">Entertain</SelectItem>
                    <SelectItem value="Sell">Sell</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone *</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Formal">Formal</SelectItem>
                    <SelectItem value="Friendly">Friendly</SelectItem>
                    <SelectItem value="Witty">Witty</SelectItem>
                    <SelectItem value="Persuasive">Persuasive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Mood: {getMoodEmoji(mood[0])}</Label>
                <Slider
                  value={mood}
                  onValueChange={setMood}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>😐 Serious</span>
                  <span>🙂 Balanced</span>
                  <span>😄 Funny</span>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                className="w-full gap-2"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle>Generated Content</CardTitle>
              <CardDescription>Your AI-generated content appears here</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {generatedContent ? (
                <>
                  <Textarea
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className="min-h-[400px] font-mono text-sm"
                  />
                  <div className="flex gap-2 flex-wrap">
                    <Button onClick={handleRegenerate} variant="outline" className="gap-2">
                      <RotateCw className="w-4 h-4" />
                      Regenerate
                    </Button>
                    <Button onClick={handleCopy} variant="outline" className="gap-2">
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                    <Button onClick={handleSave} className="gap-2">
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                  </div>
                </>
              ) : (
                <div className="min-h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg">
                  <div className="text-center p-8">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Fill in the settings and click Generate to create content
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Generate;
