import { motion } from "framer-motion";
import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { skills } from "@/data/fakeData";

const categories = ["All", "Frontend", "Backend", "Tools", "Design"];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSkills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.05 }}
                    className="p-6 rounded-2xl bg-card border border-border hover-lift hover:shadow-card"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold">{skill.name}</h3>
                      <span className="text-sm font-medium text-primary">
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
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

              {/* Empty State */}
              {filteredSkills.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <p className="text-xl text-muted-foreground">
                    No skills found in this category
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
