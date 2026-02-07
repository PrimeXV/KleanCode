import React, { useState, FormEvent } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  LucideIcon,
  RefreshCcw,
} from "lucide-react";
import { Button } from "../components/Button";

interface ContactInfo {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
}

interface SubmitStatus {
  type: "success" | "error" | null;
  message: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: "Email",
    value: "Hassan@kleanCode.tech",
    href: "mailto:Hassan@kleanCode.tech",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 (814) 329-9726",
    href: "tel:+2348143299726",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Lagos, Nigeria",
    href: "#",
  },
];

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({
    type: null,
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbxm9B5N6yef1mx8JBVyC_EQj-ErNDQ8gXddE5tj6-9r8obbFTbDHCoyW4PuUKR_MIiw7w/exec";

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setSubmitStatus({
        type: "success",
        message:
          "Thank you for reaching out! Your details are in my records. Expect a response from me soon—let's build something great.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Let's build{" "}
            <span className="font-serif italic font-normal text-white">
              something great.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            Have a project in mind? I'd love to hear about it. Send me a message
            and let's discuss how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form Card */}
          <div className="glass p-8 rounded-3xl border border-primary/30 animate-fade-in animation-delay-300 min-h-[480px] flex flex-col items-center justify-center relative overflow-hidden">
            {submitStatus.type === "success" ? (
              /* SUCCESS STATE */
              <div className="text-center space-y-6 animate-scale-in flex flex-col items-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  </div>
                  <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-xl animate-pulse" />
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">
                    Message Received!
                  </h3>
                  <p className="text-green-400/90 font-medium max-w-[320px] mx-auto leading-relaxed">
                    {submitStatus.message}
                  </p>
                </div>

                <div className="bg-surface/50 border border-border p-5 rounded-2xl max-w-[320px] shadow-inner">
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] mb-2 font-semibold">
                    Important Note
                  </p>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Keep an eye on your inbox for a message from
                    <span className="text-primary font-bold block mt-1 text-base">
                      hassan@yourdomain.com
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => setSubmitStatus({ type: null, message: "" })}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors pt-4 group"
                >
                  <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  Send another message
                </button>
              </div>
            ) : (
              /* FORM STATE */
              <form className="w-full space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Your name..."
                       autocomplete="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/30"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                       autocomplete="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground/30"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="How can I help you?"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-muted-foreground/30"
                    />
                  </div>
                </div>

                <Button
                  className="w-full group"
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </Button>

                {submitStatus.type === "error" && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 animate-fade-in">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <p className="text-sm">{submitStatus.message}</p>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Info Card */}
          <div className="space-y-6 animate-fade-in animation-delay-400">
            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-semibold mb-6 text-white">
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-surface transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="font-medium text-white/90">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass rounded-3xl p-8 border border-primary/30 relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                <span className="font-medium text-white">
                  Currently Available
                </span>
              </div>
              <p className="text-muted-foreground text-sm relative z-10 leading-relaxed">
                I'm currently open to new opportunities in software development
                and engineering. Let's discuss your next project.
              </p>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
