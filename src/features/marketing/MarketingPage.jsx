"use client";

import { businessSchema } from "@/src/features/marketing/content";
import { AdminLoginModal } from "@/src/features/marketing/components/AdminLoginModal";
import { CoachSection } from "@/src/features/marketing/components/CoachSection";
import { ContactSection } from "@/src/features/marketing/components/ContactSection";
import { FacilitySection } from "@/src/features/marketing/components/FacilitySection";
import { FaqSection } from "@/src/features/marketing/components/FaqSection";
import { HeroSection } from "@/src/features/marketing/components/HeroSection";
import { HoursSection } from "@/src/features/marketing/components/HoursSection";
import { ReviewsSection } from "@/src/features/marketing/components/ReviewsSection";
import { ServicesSection } from "@/src/features/marketing/components/ServicesSection";
import { SiteFooter } from "@/src/features/marketing/components/SiteFooter";
import { SiteHeader } from "@/src/features/marketing/components/SiteHeader";
import { SocialSection } from "@/src/features/marketing/components/SocialSection";
import { useMarketingPage } from "@/src/features/marketing/hooks/useMarketingPage";

export function MarketingPage() {
  const {
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
  } = useMarketingPage();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <SiteHeader
        menuOpen={menuOpen}
        onAdminOpen={openAdminLogin}
        onMenuToggle={setMenuOpen}
        onNavClick={scrollToSection}
      />
      <AdminLoginModal errorCode={adminLoginError} open={adminLoginOpen} onClose={closeAdminLogin} />
      <HeroSection onServicesClick={() => scrollToSection("services")} />
      <ServicesSection
        activeService={activeService}
        selectedService={selectedService}
        onServiceSelect={setActiveService}
      />
      <SocialSection />
      <FacilitySection />
      <CoachSection />
      <HoursSection />
      <ReviewsSection />
      <ContactSection leadSubmitted={leadSubmitted} onSubmit={submitLead} />
      <FaqSection openFaq={openFaq} onFaqToggle={toggleFaq} />
      <SiteFooter />
    </main>
  );
}
