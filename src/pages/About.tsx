import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { useInView } from "react-intersection-observer";
import { CheckCircle2 } from "lucide-react";
import { aboutService, About as AboutType } from "@/services/about.service";

export default function About() {
  const [timelineRef, timelineInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [about, setAbout] = useState<AboutType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await aboutService.getAbout();
        setAbout(response.data.about);
      } catch (error) {
        console.error("Failed to fetch about:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

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
              {loading ? (
                <p className="text-xl text-muted-foreground">Loading...</p>
              ) : (
                <div
                  className="text-xl text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: about?.introduction || "" }}
                />
              )}
            </motion.div>
          </div>
        </section>

        {/* Highlights */}
        {!loading && about?.highlights && about.highlights.length > 0 && (
          <section ref={valuesRef} className="py-20">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                className="max-w-4xl mx-auto text-center"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-12">
                  Highlights
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {about.highlights.map((highlight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={valuesInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover-lift"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-left">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
}
