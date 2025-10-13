import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { useInView } from "react-intersection-observer";
import { CheckCircle2 } from "lucide-react";

const timeline = [
  {
    year: "2024",
    title: "Senior Developer",
    company: "Tech Company",
    description: "Leading development of cutting-edge web applications",
  },
  {
    year: "2022",
    title: "Full Stack Developer",
    company: "Startup Inc",
    description: "Built scalable solutions for various clients",
  },
  {
    year: "2020",
    title: "Junior Developer",
    company: "Digital Agency",
    description: "Started my journey in web development",
  },
  {
    year: "2019",
    title: "Graduated",
    company: "University",
    description: "Computer Science degree with honors",
  },
];

const values = [
  "Clean, maintainable code",
  "User-centered design",
  "Continuous learning",
  "Open source contribution",
  "Team collaboration",
  "Performance optimization",
];

export default function About() {
  const [timelineRef, timelineInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <PageTransition>
      <div className="min-h-screen pt-20">
        {/* Hero */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                About <span className="text-gradient">Me</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                I'm a passionate developer with a love for creating beautiful, functional,
                and user-friendly digital experiences. With years of experience in web
                development, I've worked on projects ranging from small business websites
                to large-scale enterprise applications.
              </p>
              <p className="text-lg text-muted-foreground">
                When I'm not coding, you can find me exploring new technologies, contributing
                to open source, or sharing my knowledge through blog posts and tutorials.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section ref={timelineRef} className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={timelineInView ? { opacity: 1, y: 0 } : {}}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
                My Journey
              </h2>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20" />

                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                    animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.2 }}
                    className={`relative mb-12 md:mb-8 ${
                      i % 2 === 0 ? "md:pr-1/2 md:text-right" : "md:pl-1/2 md:ml-1/2"
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 bg-primary rounded-full border-4 border-background shadow-glow" />

                    <div className="ml-16 md:ml-0">
                      <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
                        <span className="text-sm font-medium text-primary">{item.year}</span>
                      </div>
                      <div className="p-6 rounded-2xl bg-card border border-border hover-lift hover:shadow-card">
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-primary font-medium mb-3">{item.company}</p>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section ref={valuesRef} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-12">
                What I Value
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {values.map((value, i) => (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={valuesInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover-lift"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-left">{value}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
