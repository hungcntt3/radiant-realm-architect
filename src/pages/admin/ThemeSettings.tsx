import { motion } from "framer-motion";
import { useState } from "react";
import { Palette, Type, Layout, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AdminLayout } from "./AdminLayout";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeSettings() {
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [primaryColor, setPrimaryColor] = useState("#8B5CF6");
  const [accentColor, setAccentColor] = useState("#3B82F6");

  const handleSave = () => {
    toast({
      title: "Theme saved!",
      description: "Your theme preferences have been updated.",
    });
  };

  const colorPresets = [
    { name: "Purple", primary: "#8B5CF6", accent: "#3B82F6" },
    { name: "Blue", primary: "#3B82F6", accent: "#06B6D4" },
    { name: "Green", primary: "#10B981", accent: "#059669" },
    { name: "Orange", primary: "#F59E0B", accent: "#EF4444" },
    { name: "Pink", primary: "#EC4899", accent: "#8B5CF6" },
  ];

  const fontOptions = [
    "Inter",
    "Roboto",
    "Poppins",
    "Montserrat",
    "Open Sans",
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Theme Settings</h1>
          <p className="text-muted-foreground">
            Customize the look and feel of your portfolio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Theme Mode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="hover-lift hover:shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Theme Mode
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    onClick={theme === "dark" ? toggleTheme : undefined}
                    className="flex-1"
                  >
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    onClick={theme === "light" ? toggleTheme : undefined}
                    className="flex-1"
                  >
                    Dark
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Current theme: <span className="font-medium capitalize">{theme}</span>
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Color Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="hover-lift hover:shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Colors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Primary Color</label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-16 h-10 cursor-pointer"
                    />
                    <Input
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Accent Color</label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-16 h-10 cursor-pointer"
                    />
                    <Input
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="hover-lift hover:shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  Typography
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Font Family</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-border bg-background">
                    {fontOptions.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Base Font Size</label>
                  <Input type="number" defaultValue={16} min={14} max={20} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Color Presets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="hover-lift hover:shadow-card">
              <CardHeader>
                <CardTitle>Color Presets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        setPrimaryColor(preset.primary);
                        setAccentColor(preset.accent);
                      }}
                      className="p-4 rounded-xl border border-border hover:border-primary transition-colors group"
                    >
                      <div className="flex gap-2 mb-2">
                        <div
                          className="w-8 h-8 rounded-lg"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <div
                          className="w-8 h-8 rounded-lg"
                          style={{ backgroundColor: preset.accent }}
                        />
                      </div>
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">
                        {preset.name}
                      </p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Layout Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="hover-lift hover:shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="w-5 h-5" />
                  Layout
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Border Radius</label>
                  <Input type="number" defaultValue={12} min={0} max={24} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Container Width</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-border bg-background">
                    <option value="1280">1280px (Default)</option>
                    <option value="1536">1536px (Wide)</option>
                    <option value="1024">1024px (Narrow)</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Button onClick={handleSave} className="w-full md:w-auto gradient-primary hover-lift" size="lg">
            Save Theme Settings
          </Button>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
