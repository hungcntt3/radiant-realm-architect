import { motion } from "framer-motion";
import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { useInView } from "react-intersection-observer";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { contactService } from "@/services/contact.service";

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await contactService.createMessage(formData);
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@example.com",
      href: `mailto:contact@example.com`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+1 234 567 890",
      href: `tel:+1234567890`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Your Location",
      href: "#",
    },
  ];

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
                Get In <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Have a project in mind? Let's work together to create something amazing
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section ref={ref} className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
                  <p className="text-muted-foreground">
                    I'm always open to discussing new projects, creative ideas, or
                    opportunities to be part of your visions.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, i) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover-lift hover:shadow-card group"
                    >
                      <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:shadow-glow transition-all">
                        <info.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        <p className="font-medium">{info.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Decorative Elements */}
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -left-20 -top-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10"
                  />
                  <motion.div
                    animate={{
                      scale: [1.1, 1, 1.1],
                      rotate: [360, 180, 0],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -right-20 -bottom-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10"
                  />
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
              >
                <form
                  onSubmit={handleSubmit}
                  className="p-8 rounded-2xl bg-card border border-border shadow-card space-y-6"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="transition-all focus:shadow-card"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="transition-all focus:shadow-card"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      rows={6}
                      className="transition-all focus:shadow-card resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gradient-primary hover-lift"
                    size="lg"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
