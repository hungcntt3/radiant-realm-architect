import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { useInView } from "react-intersection-observer";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { skillService, Skill } from "@/services/skill.service";

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await skillService.getSkills();
        setSkills(response.data.skills);
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const categories = ["All", ...Array.from(new Set(skills.map((s) => s.category)))];

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <PageTransition>
      <div className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                My <span className="text-gradient">Skills</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Technologies and tools I work with to bring ideas to life
              </p>
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section ref={ref} className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Category Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                className="flex flex-wrap justify-center gap-3 mb-12"
              >
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    variant={activeCategory === category ? "default" : "outline"}
                    className={cn(
                      "hover-scale",
                      activeCategory === category && "gradient-primary"
                    )}
                  >
                    {category}
                  </Button>
                ))}
              </motion.div>

              {/* Skills Grid */}
              {loading ? (
                <div className="text-center py-20">Loading skills...</div>
              ) : filteredSkills.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  No skills found for this category
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredSkills.map((skill, i) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: i * 0.05 }}
                      className="p-6 rounded-2xl bg-card border border-border hover-lift hover:shadow-card"
                    >
                      <div className="mb-3">
                        <h3 className="text-lg font-semibold">{skill.name}</h3>
                      </div>

                      {/* Progress Bar (without percentage text) */}
                      <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ delay: i * 0.05 + 0.2, duration: 1, ease: "easeOut" }}
                          className="absolute left-0 top-0 bottom-0 gradient-primary rounded-full shadow-glow"
                        />
                      </div>

                      {/* Category Badge */}
                      <div className="mt-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                          {skill.category}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
