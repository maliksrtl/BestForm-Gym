"use client";

import { useEffect, useMemo, useState } from "react";

import { services } from "@/src/features/marketing/content";

export function useMarketingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminLoginError, setAdminLoginError] = useState("");

  const selectedService = useMemo(() => services[activeService], [activeService]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("adminLogin") !== "1") {
      return;
    }

    setAdminLoginError(params.get("error") || "");
    setAdminLoginOpen(true);

    const cleanUrl = `${window.location.pathname}${window.location.hash || ""}`;
    window.history.replaceState(null, "", cleanUrl);
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const submitLead = (event) => {
    event.preventDefault();
    setLeadSubmitted(true);
  };

  const toggleFaq = (index) => {
    setOpenFaq((currentIndex) => (currentIndex === index ? -1 : index));
  };

  const openAdminLogin = () => {
    setMenuOpen(false);
    setAdminLoginError("");
    setAdminLoginOpen(true);
  };

  const closeAdminLogin = () => {
    setAdminLoginError("");
    setAdminLoginOpen(false);
  };

  return {
    activeService,
    adminLoginError,
    adminLoginOpen,
    closeAdminLogin,
    leadSubmitted,
    menuOpen,
    openFaq,
    openAdminLogin,
    selectedService,
    scrollToSection,
    setActiveService,
    setMenuOpen,
    submitLead,
    toggleFaq
  };
}
