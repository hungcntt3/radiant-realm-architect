import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { useInView } from "react-intersection-observer";
import { Award, ExternalLink, Calendar, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { certificateService, Certificate } from "@/services/certificate.service";

export default function Certificates() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await certificateService.getCertificates();
        setCertificates(response.data.certificates);
      } catch (error) {
        console.error("Failed to fetch certificates:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertificates();
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
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Professional Certifications</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                My <span className="text-gradient">Certificates</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Professional certifications and achievements that validate my expertise
              </p>
            </motion.div>
          </div>
        </section>

        {/* Certificates Grid */}
        <section ref={ref} className="py-20">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-20">Loading certificates...</div>
            ) : certificates.length === 0 ? (
              <div className="text-center py-20">No certificates found</div>
            ) : (
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {certificates.map((cert, i) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="h-full rounded-2xl overflow-hidden bg-card border border-border hover-lift hover:shadow-elevated">
                    {/* Certificate Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={cert.icon || "https://via.placeholder.com/400x300"}
                        alt={cert.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                      
                      {/* Floating Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : {}}
                        transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
                        className="absolute top-4 right-4 p-3 rounded-full bg-primary/90 backdrop-blur-sm shadow-glow"
                      >
                        <Award className="w-6 h-6 text-primary-foreground" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {cert.title}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building2 className="w-4 h-4" />
                          <span>{cert.issuer}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(cert.issue_date).toLocaleDateString("en-US", {
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      {cert.credential_url && (
                        <Button
                          className="w-full group/btn gradient-primary hover-lift"
                          size="sm"
                          onClick={() => window.open(cert.credential_url, "_blank")}
                        >
                          Verify Certificate
                          <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                {[
                  { label: "Total Certificates", value: certificates.length },
                  { label: "Cloud Platforms", value: "3+" },
                  { label: "Years Experience", value: "5+" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl bg-card border border-border hover-lift hover:shadow-card"
                  >
                    <div className="text-4xl font-bold text-gradient mb-2">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground">{stat.label}</div>
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
