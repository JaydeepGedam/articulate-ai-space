import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const [defaultTone, setDefaultTone] = useState(
    localStorage.getItem("defaultTone") || "Friendly"
  );
  const [defaultContentType, setDefaultContentType] = useState(
    localStorage.getItem("defaultContentType") || "Blog"
  );
  const [defaultGoal, setDefaultGoal] = useState(
    localStorage.getItem("defaultGoal") || "Educate"
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleSave = () => {
    localStorage.setItem("defaultTone", defaultTone);
    localStorage.setItem("defaultContentType", defaultContentType);
    localStorage.setItem("defaultGoal", defaultGoal);
    toast.success("Settings saved successfully!");
  };

  return (
    <Layout showNav>
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground text-lg">
            Customize your default content preferences
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Default Preferences</CardTitle>
            <CardDescription>
              Set your preferred defaults for content generation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="defaultTone">Default Tone</Label>
              <Select value={defaultTone} onValueChange={setDefaultTone}>
                <SelectTrigger id="defaultTone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Friendly">Friendly</SelectItem>
                  <SelectItem value="Witty">Witty</SelectItem>
                  <SelectItem value="Persuasive">Persuasive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultContentType">Default Content Type</Label>
              <Select value={defaultContentType} onValueChange={setDefaultContentType}>
                <SelectTrigger id="defaultContentType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Blog">Blog Post</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn Post</SelectItem>
                  <SelectItem value="Product">Product Description</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultGoal">Default Goal</Label>
              <Select value={defaultGoal} onValueChange={setDefaultGoal}>
                <SelectTrigger id="defaultGoal">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Educate">Educate</SelectItem>
                  <SelectItem value="Persuade">Persuade</SelectItem>
                  <SelectItem value="Entertain">Entertain</SelectItem>
                  <SelectItem value="Sell">Sell</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSave} className="w-full gap-2">
              <Save className="w-4 h-4" />
              Save Settings
            </Button>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>Application information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account</span>
              <span className="font-medium">
                {localStorage.getItem("userName") || "User"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
