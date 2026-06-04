"use client";

import { useMemo, useState } from "react";

import { services } from "@/src/features/marketing/content";

export function useMarketingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const selectedService = useMemo(() => services[activeService], [activeService]);

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

  return {
    activeService,
    leadSubmitted,
    menuOpen,
    openFaq,
    selectedService,
    scrollToSection,
    setActiveService,
    setMenuOpen,
    submitLead,
    toggleFaq
  };
}
