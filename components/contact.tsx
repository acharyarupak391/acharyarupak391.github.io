"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
  Send,
  Loader2,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EMAIL,
  GITHUB_PROFILE,
  LINKEDIN_PROFILE,
  TWITTER_PROFILE,
} from "@/lib/constants";
import { sendGAEvent } from "@next/third-parties/google";

const relationshipOptions = [
  { value: "friend", label: "We're Friends" },
  { value: "colleague", label: "Work Colleagues" },
  { value: "recruiter", label: "Recruiter/HR" },
  { value: "client", label: "Potential Client" },
  // { value: "admirer", label: "Secret Admirer" },
  { value: "visitor", label: "Just A Visitor" },
  { value: "other", label: "Other" },
];

const purposeOptions = [
  { value: "hi", label: "Just saying Hi" },
  { value: "hire", label: "Looking to Hire You" },
  { value: "collaborate", label: "Let's Build Something Together" },
  { value: "freelance", label: "Freelance Project" },
  { value: "coffee", label: "Virtual Coffee Chat" },
  { value: "feedback", label: "Sharing Some Feedback" },
  { value: "other", label: "Something Else..." },
];

function Toast({
  message,
  onClose,
  type = "success",
}: {
  message: string;
  onClose: () => void;
  type?: "success" | "error";
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgClass = type === "success" ? "bg-neo-green" : "bg-red-500";
  const borderClass =
    type === "success" ? "border-foreground" : "border-red-700";
  const textClass = type === "success" ? "text-foreground" : "text-white";

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-slide-up">
      <div
        className={`flex items-center gap-4 px-6 py-4 ${bgClass} border-4 ${borderClass} shadow-brutal font-bold ${textClass}`}
      >
        <span>{message}</span>
        <button
          onClick={onClose}
          className={`p-1 ${
            type === "success"
              ? "bg-foreground text-background hover:bg-neo-yellow hover:text-foreground"
              : "bg-red-700 text-white hover:bg-red-400 hover:text-red-900"
          } transition-colors`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export type ContactFormData = {
  name: string;
  email: string;
  relationship: string;
  relationshipOther?: string;
  purpose: string;
  purposeOther?: string;
  message: string;
  socialTwitter?: string;
  socialLinkedin?: string;
  socialGithub?: string;
};

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState<"success" | "error" | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    relationship: "",
    relationshipOther: "",
    purpose: "",
    purposeOther: "",
    message: "",
    socialTwitter: "",
    socialLinkedin: "",
    socialGithub: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const isFormValid = () => {
    const hasName = formData.name.trim() !== "";
    const hasEmail = formData.email.trim() !== "";
    const hasMessage = formData.message.trim() !== "";
    const hasRelationship =
      formData.relationship !== "" &&
      (formData.relationship !== "other" ||
        formData.relationshipOther.trim() !== "");
    const hasPurpose =
      formData.purpose !== "" &&
      (formData.purpose !== "other" || formData.purposeOther.trim() !== "");

    return hasName && hasEmail && hasMessage && hasRelationship && hasPurpose;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid() && !isLoading) {
      setIsLoading(true);

      try {
        const response = await fetch("/api/submit-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setShowToast("success");

          setFormData({
            name: "",
            email: "",
            relationship: "",
            relationshipOther: "",
            purpose: "",
            purposeOther: "",
            message: "",
            socialTwitter: "",
            socialLinkedin: "",
            socialGithub: "",
          });
        } else {
          setShowToast("error");

          // send error to GA
          sendGAEvent({
            event: "contact_form_error",
            value: `Status: ${response.status} - ${
              response.statusText
            }\nBody: ${await response.text()}`,
          });
        }
      } catch (error) {
        setShowToast("error");
        console.error("Error submitting form:", error);

        // send error to GA
        sendGAEvent({
          event: "contact_form_error",
          value: `Exception: ${error}`,
        });
      }

      setIsLoading(false);
    }
  };

  const inputBaseStyles =
    "w-full p-4 border-4 border-foreground font-bold placeholder:text-foreground/50 focus:outline-none focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:-translate-x-1 focus:-translate-y-1 transition-all";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 md:py-32 px-4 bg-neo-pink"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-6 py-3 bg-foreground text-background border-4 border-foreground shadow-brutal transform rotate-2">
            <span className="font-bold uppercase tracking-widest">
              Get In Touch
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black">
            LET&apos;S
            <br />
            <span className="text-neo-yellow [-webkit-text-stroke:2px_black] md:[-webkit-text-stroke:3px_black]">
              CONNECT
            </span>
          </h2>
        </div>

        <div
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <a
              href={`mailto:${EMAIL}`}
              className="flex flex-col items-center gap-4 p-8 bg-background border-4 border-foreground shadow-brutal hover-brutal text-center rotate-1 hover:rotate-0 transition-transform"
            >
              <div className="p-4 bg-neo-yellow border-4 border-foreground">
                <Mail className="w-8 h-8" />
              </div>
              <div>
                <p className="font-bold uppercase text-sm text-muted-foreground mb-1">
                  Email
                </p>
                <p className="text-base md:text-lg font-black break-all">
                  {EMAIL}
                </p>
              </div>
            </a>

            <div className="flex flex-col items-center gap-4 p-8 bg-background border-4 border-foreground shadow-brutal text-center hover-brutal rotate-1 hover:rotate-0 transition-transform">
              <div className="p-4 bg-neo-green border-4 border-foreground">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <p className="font-bold uppercase text-sm text-muted-foreground mb-1">
                  Location
                </p>
                <p className="text-lg md:text-xl font-black">
                  Kathmandu, Nepal
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-background border-4 border-foreground shadow-brutal-lg p-6 md:p-10 -rotate-1"
          >
            <h3 className="text-2xl md:text-3xl font-black mb-8 text-center uppercase">
              Send Me A Message
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="block font-bold uppercase text-sm tracking-wide">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="What should I call you?"
                  className={`${inputBaseStyles} bg-neo-yellow`}
                />
              </div>

              {/* Email - Added type="email" validation */}
              <div className="space-y-2">
                <label className="block font-bold uppercase text-sm tracking-wide">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@awesome.com"
                  required
                  className={`${inputBaseStyles} bg-neo-blue`}
                />
              </div>

              {/* Relationship - Using shadcn Select with neobrutalist styling */}
              <div className="space-y-2">
                <label className="block font-bold uppercase text-sm tracking-wide">
                  Our Relationship <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.relationship}
                  onValueChange={(value) =>
                    handleSelectChange("relationship", value)
                  }
                >
                  <SelectTrigger className="w-full px-4 bg-neo-green border-4 border-foreground font-bold rounded-none focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:-translate-x-1 focus:-translate-y-1 focus:ring-0 focus:outline-none transition-all [&>svg]:w-6 [&>svg]:h-6 [&>svg]:stroke-[3] mb-0">
                    <SelectValue placeholder="How do we know each other?" />
                  </SelectTrigger>
                  <SelectContent className="bg-neo-green border-4 border-foreground rounded-none shadow-brutal">
                    {relationshipOptions.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="font-bold cursor-pointer focus:bg-foreground focus:text-background rounded-none py-3"
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.relationship === "other" && (
                  <input
                    type="text"
                    name="relationshipOther"
                    value={formData.relationshipOther}
                    onChange={handleChange}
                    placeholder="Tell me more..."
                    className={`${inputBaseStyles} mt-2 bg-neo-green/70`}
                  />
                )}
              </div>

              {/* Purpose - Using shadcn Select with neobrutalist styling */}
              <div className="space-y-2">
                <label className="block font-bold uppercase text-sm tracking-wide">
                  Purpose <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.purpose}
                  onValueChange={(value) =>
                    handleSelectChange("purpose", value)
                  }
                >
                  <SelectTrigger className="w-full px-4 h-[70px] bg-neo-orange border-4 border-foreground font-bold rounded-none focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:-translate-x-1 focus:-translate-y-1 focus:ring-0 focus:outline-none transition-all [&>svg]:w-6 [&>svg]:h-6 [&>svg]:stroke-[3]">
                    <SelectValue placeholder="What brings you here?" />
                  </SelectTrigger>
                  <SelectContent className="bg-neo-orange border-4 border-foreground rounded-none shadow-brutal">
                    {purposeOptions.map((opt) => (
                      <SelectItem
                        key={opt.value}
                        value={opt.value}
                        className="font-bold cursor-pointer focus:bg-foreground focus:text-background rounded-none py-3"
                      >
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.purpose === "other" && (
                  <input
                    type="text"
                    name="purposeOther"
                    value={formData.purposeOther}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                    className={`${inputBaseStyles} mt-2 bg-neo-orange/70`}
                  />
                )}
              </div>

              {/* Message - Full Width */}
              <div className="space-y-2 md:col-span-2">
                <label className="block font-bold uppercase text-sm tracking-wide">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell me everything... or at least something interesting!"
                  className={`${inputBaseStyles} bg-neo-pink/50 resize-none`}
                />
              </div>

              {/* Social Media Section - Removed Facebook */}
              <div className="md:col-span-2 space-y-4">
                <label className="block font-bold uppercase text-sm tracking-wide">
                  Your Socials (If you like)
                </label>
                <div className="grid sm:grid-cols-3 gap-4">
                  {/* Twitter */}
                  <div className="flex items-center gap-0 border-4 border-foreground bg-background overflow-hidden focus-within:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus-within:-translate-x-1 focus-within:-translate-y-1 transition-all">
                    <div className="p-3 bg-foreground border-r-4 border-foreground">
                      <Twitter className="w-6 h-6 text-white" />
                    </div>
                    <input
                      type="text"
                      name="socialTwitter"
                      value={formData.socialTwitter}
                      onChange={handleChange}
                      placeholder="@handle"
                      className="flex-1 p-3 font-bold placeholder:text-foreground/50 focus:outline-none bg-transparent"
                    />
                  </div>

                  {/* LinkedIn */}
                  <div className="flex items-center gap-0 border-4 border-foreground bg-background overflow-hidden focus-within:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus-within:-translate-x-1 focus-within:-translate-y-1 transition-all">
                    <div className="p-3 bg-[#0A66C2] border-r-4 border-foreground">
                      <Linkedin className="w-6 h-6 text-white" />
                    </div>
                    <input
                      type="text"
                      name="socialLinkedin"
                      value={formData.socialLinkedin}
                      onChange={handleChange}
                      placeholder="username"
                      className="flex-1 p-3 font-bold placeholder:text-foreground/50 focus:outline-none bg-transparent"
                    />
                  </div>

                  {/* Github */}
                  <div className="flex items-center gap-0 border-4 border-foreground bg-background overflow-hidden focus-within:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus-within:-translate-x-1 focus-within:-translate-y-1 transition-all">
                    <div className="p-3 bg-[#333] border-r-4 border-foreground">
                      <Github className="w-6 h-6 text-white" />
                    </div>
                    <input
                      type="text"
                      name="socialGithub"
                      value={formData.socialGithub}
                      onChange={handleChange}
                      placeholder="username"
                      className="flex-1 p-3 font-bold placeholder:text-foreground/50 focus:outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button - Updated focus styles */}
            <div className="mt-10 flex justify-center">
              <button
                type="submit"
                disabled={!isFormValid() || isLoading}
                className={`flex items-center gap-3 px-10 py-5 border-4 border-foreground font-black uppercase tracking-wider text-lg transition-all focus:outline-none ${
                  isFormValid() && !isLoading
                    ? "bg-neo-yellow shadow-brutal hover:shadow-none hover:translate-x-1 hover:translate-y-1 focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:-translate-x-1 focus:-translate-y-1 cursor-pointer"
                    : "bg-gray-300 text-foreground/50 cursor-not-allowed shadow-none"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Social Links */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 bg-neo-yellow border-4 border-foreground shadow-brutal font-bold uppercase tracking-wide hover-brutal"
            >
              <Github className="w-6 h-6" />
              Github
            </a>
            <a
              href={LINKEDIN_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 bg-neo-blue border-4 border-foreground shadow-brutal font-bold uppercase tracking-wide hover-brutal"
            >
              <Linkedin className="w-6 h-6" />
              LinkedIn
            </a>
            <a
              href={TWITTER_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-4 bg-neo-orange border-4 border-foreground shadow-brutal font-bold uppercase tracking-wide hover-brutal"
            >
              <Twitter className="w-6 h-6" />
              Twitter
            </a>
          </div>
        </div>
      </div>

      {showToast && (
        <Toast
          // message="Message sent successfully! I'll get back to you soon."
          message={
            showToast === "success"
              ? "Message sent successfully! I'll get back to you soon."
              : "Oops! Something went wrong. Please try again later."
          }
          onClose={() => setShowToast(null)}
          type={showToast || undefined}
        />
      )}
    </section>
  );
}
