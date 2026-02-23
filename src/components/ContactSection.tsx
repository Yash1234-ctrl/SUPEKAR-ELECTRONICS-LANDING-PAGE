"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { FaEnvelope, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  inputStyle,
  buttonStyle,
  socialLinkStyle,
} from "../styles";

export default function ContactSection() {
  // form state
  const [user, setUser] = useState<User | null>(null);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const shouldReduce = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ name: string; mobile: string; requirement: string }>({
    defaultValues: {
      name: "",
      mobile: "",
      requirement: "",
    },
  });

  // Contact info read from env so it can be changed per deployment
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const insta = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "";

  // Prefill Name if logged in
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.displayName) {
        reset({ name: currentUser.displayName });
      }
    });
    return () => unsubscribe();
  }, [reset]);

  // Send email using EmailJS
  const sendEmail = async (data: {
    name: string;
    mobile: string;
    requirement: string;
  }) => {
    if (!user) {
      toast.error("Please login first.");
      return;
    }

    setSending(true);
    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          title: "New Requirement",
          name: data.name,
          mobile: data.mobile,
          message: data.requirement,
          email: user?.email ?? "no-reply@example.com",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      console.log("EmailJS response:", response);
      reset();
      setSuccess(true);
      toast.success("Message sent!");
      setTimeout(() => setSuccess(false), 2500);
    } catch (error: any) {
      console.error("EmailJS ERROR:", error);
      if (error && error.status === 412) {
        toast.error(
          `Email service configuration issue: ${
            error.text || "please check your EmailJS dashboard"
          }`
        );
      } else {
        toast.error("Failed to send message. Check console for details.");
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        minHeight: "100vh",
        padding: "80px 5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Background Zoom */}
      <motion.div
        initial={{ scale: 1 }}
        animate={shouldReduce ? {} : { scale: 1.05 }}
        transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/contactbackground.png')", // fixed typo
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -2,
        }}
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.75)",
          zIndex: -1,
        }}
      />

      {/* Main Content */}
      <motion.div
        initial={shouldReduce ? {} : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{ width: "100%", maxWidth: "700px" }}
      >
        <h2 style={{ fontSize: "42px", marginBottom: "20px", fontWeight: 600 }}>
          Contact Us
        </h2>

        {/* Accent Line */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          transition={{ duration: 0.8 }}
          style={{
            height: "3px",
            background: "#00ff88",
            margin: "0 auto 40px",
            borderRadius: "2px",
          }}
        />

        {/* Social Links */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
            marginBottom: "40px",
            flexWrap: "wrap",
          }}
        >
          <a
            href={`mailto:${email}?subject=Business Inquiry`}
            style={socialLinkStyle("#00c3ff")}
          >
            <FaEnvelope /> Email
          </a>
          <a
            href={`https://wa.me/${whatsapp}?text=Hello%20Supekar%20Electronics`}
            target="_blank"
            rel="noreferrer"
            style={socialLinkStyle("#00ff88")}
          >
            <FaWhatsapp /> WhatsApp
          </a>
          <a
            href={insta}
            target="_blank"
            rel="noreferrer"
            style={socialLinkStyle("#ff4dd2")}
          >
            <FaInstagram /> Instagram
          </a>
        </div>

        {/* Form */}
        <motion.div
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="Your Name"
            style={inputStyle}
          />
          {errors.name && (
            <span style={{ color: "#ff6b6b" }}>{errors.name.message}</span>
          )}

          <input
            {...register("mobile", {
              required: "Mobile number required",
              pattern: {
                value: /^[0-9]{10,15}$/, // simple validation
                message: "Invalid mobile number",
              },
            })}
            type="tel"
            placeholder="Mobile Number"
            style={inputStyle}
          />
          {errors.mobile && (
            <span style={{ color: "#ff6b6b" }}>{errors.mobile.message}</span>
          )}

          <textarea
            {...register("requirement", { required: "Please specify your need" })}
            placeholder="Enter your requirement..."
            style={{ ...inputStyle, height: "140px", resize: "none" }}
          />
          {errors.requirement && (
            <span style={{ color: "#ff6b6b" }}>
              {errors.requirement.message}
            </span>
          )}

          <motion.button
            onClick={handleSubmit(sendEmail)}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 20px rgba(0,255,136,0.35)",
            }}
            disabled={sending}
            style={{
              ...buttonStyle,
              opacity: sending ? 0.6 : 1,
              cursor: sending ? "not-allowed" : "pointer",
            }}
          >
            {sending ? "Sending..." : "Send Requirement"}
          </motion.button>
        </motion.div>

        {/* Success Animation */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "#00ff88",
                color: "#012",
                padding: "18px 30px",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "18px",
                zIndex: 100,
              }}
            >
              ✅ Message Sent!
            </motion.div>
          )}
        </AnimatePresence>
        {/* Toast container */}
        <ToastContainer position="top-right" autoClose={3000} />
      </motion.div>
    </section>
  );
}

