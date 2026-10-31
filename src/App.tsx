import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { calculateSeasonState, SeasonGaugeState } from './data/patagotitanData';
import {
  SECTION_ORDER,
  SectionDescriptor,
  resolveKeyboardSectionJump,
} from './utils/sectionNavigation';
import { Loader } from './components/Loader';
import { CustomCursor } from './components/CustomCursor';
import { Nav } from './components/Nav';
import { MenuOverlay } from './components/MenuOverlay';
import { SeasonGauge } from './components/SeasonGauge';
import { Hero } from './components/Hero';
import { Overview } from './components/Overview';
import { Timeline } from './components/Timeline';
import { AnatomyHotspots } from './components/AnatomyHotspots';
import { SizeCompare } from './components/SizeCompare';
import { DietLifeHistory } from './components/DietLifeHistory';
import { FloodplainMap } from './components/FloodplainMap';
import { Taxonomy } from './components/Taxonomy';
import { EvolutionExtinction } from './components/EvolutionExtinction';
import { MythReality } from './components/MythReality';
import { Gallery } from './components/Gallery';
import { FastFactsSources } from './components/FastFactsSources';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loadProgress, setLoadProgress] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') return 100;
    }
    return 0;
  });
  const [isLoaded, setIsLoaded] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') return true;
    }
    return false;
  });

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [seasonState, setSeasonState] = useState<SeasonGaugeState>(() =>
    calculateSeasonState(0)
  );
  const [activeSection, setActiveSection] = useState<SectionDescriptor>(
    SECTION_ORDER[0]
  );
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const lenisRef = useRef<Lenis | null>(null);
  const activeSectionRef = useRef<SectionDescriptor>(SECTION_ORDER[0]);
  activeSectionRef.current = activeSection;

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Fast Sheet-Flood Minimal Loader (0 -> 100)
  useEffect(() => {
    if (isLoaded) return;
    let current = 0;
    const interval = window.setInterval(() => {
      current += 25;
      if (current >= 100) {
        setLoadProgress(100);
        window.clearInterval(interval);
        window.setTimeout(() => {
          setIsLoaded(true);
        }, 180);
      } else {
        setLoadProgress(current);
      }
    }, 45);
    return () => window.clearInterval(interval);
  }, [isLoaded]);

  // Smooth scroll helper to any section ID
  const scrollToSection = useCallback(
    (sectionId: string) => {
      const targetDescriptor = SECTION_ORDER.find((s) => s.id === sectionId);
      if (targetDescriptor) {
        setActiveSection(targetDescriptor);
        activeSectionRef.current = targetDescriptor;
      }

      const el = document.getElementById(sectionId);
      if (!el) return;

      if (lenisRef.current && !reducedMotion) {
        lenisRef.current.scrollTo(el, {
          offset: 0,
          duration: 1.15,
        });
      } else {
        el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    },
    [reducedMotion]
  );

  // Lenis Smooth Scroll, Season Gauge Progress, & Active Section Tracking
  useEffect(() => {
    const handleScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      setSeasonState(calculateSeasonState(progress));

      // Detect which section is currently closest to the upper-third of the viewport
      const viewportAnchor = window.innerHeight * 0.35;
      let bestMatch = SECTION_ORDER[0];
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const sec of SECTION_ORDER) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - viewportAnchor);
        if (rect.top <= viewportAnchor + 140 && rect.bottom >= 120) {
          if (dist < bestDistance) {
            bestDistance = dist;
            bestMatch = sec;
          }
        }
      }

      if (bestMatch.id !== activeSectionRef.current.id) {
        setActiveSection(bestMatch);
        activeSectionRef.current = bestMatch;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (reducedMotion) {
      return () => window.removeEventListener('scroll', handleScroll);
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  // GSAP ScrollTrigger Section Reveal Animations & Transitions
  useEffect(() => {
    if (reducedMotion || !isLoaded) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(
        'main > section:not(#hero), footer#contact'
      );

      sections.forEach((sec) => {
        const headerBlock = sec.querySelector('h2');
        if (headerBlock) {
          gsap.fromTo(
            headerBlock,
            { y: 24, opacity: 0.25 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sec,
                start: 'top 84%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, [reducedMotion, isLoaded]);

  // Global Keyboard Navigation Support (Arrow keys + Space key to jump between sections)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (isMenuOpen) return;
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      const target = e.target as HTMLElement | null;
      if (target) {
        const tagName = target.tagName;
        if (
          tagName === 'INPUT' ||
          tagName === 'TEXTAREA' ||
          tagName === 'SELECT' ||
          target.isContentEditable
        ) {
          return;
        }
        // Allow Space/Enter to trigger focused buttons or links normally
        if (
          (e.key === ' ' || e.key === 'Spacebar') &&
          (tagName === 'BUTTON' || tagName === 'A' || target.getAttribute('role') === 'button')
        ) {
          return;
        }
      }

      const nextSection = resolveKeyboardSectionJump(
        activeSectionRef.current.id,
        e.key,
        e.shiftKey
      );

      if (nextSection) {
        e.preventDefault();
        scrollToSection(nextSection.id);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isMenuOpen, scrollToSection]);

  const handleBackToDrySeason = () => {
    scrollToSection('hero');
    setSeasonState(calculateSeasonState(0));
  };

  const stepSection = (direction: 'prev' | 'next') => {
    const target = resolveKeyboardSectionJump(
      activeSection.id,
      direction === 'next' ? 'ArrowDown' : 'ArrowUp'
    );
    if (target) {
      scrollToSection(target.id);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-[#08211C] text-[#FFF6EA]"
      data-season={seasonState.phase}
      data-active-section={activeSection.id}
    >
      {/* Minimal Sheet-Flood Loader */}
      <Loader loadProgress={loadProgress} isLoaded={isLoaded} />

      {/* Custom Desktop Translucent Warm-Peach Cursor Ring */}
      <CustomCursor reducedMotion={reducedMotion} />

      {/* 3-Part Reference Navigation Bar */}
      <Nav
        onOpenMenu={() => setIsMenuOpen(true)}
        onNavigateSection={scrollToSection}
      />

      {/* Full-Screen Conifer Sheet-Flood Menu Overlay */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigateSection={scrollToSection}
      />

      {/* Vertical Season Gauge (DRY -> TRANSITION -> WET), auto-hidden on Section 13 Footer */}
      <div
        className={`transition-opacity duration-300 ${
          activeSection.id === 'contact'
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100'
        }`}
      >
        <SeasonGauge seasonState={seasonState} />
      </div>

      {/* Deep-Dive Keyboard Exploration HUD (Bottom-Center, auto-hidden on Section 13 Footer) */}
      <aside
        data-testid="chapter-hud"
        data-active-section={activeSection.id}
        aria-label="Deep-Dive Keyboard Chapter Explorer"
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 z-30 hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#08211C]/95 border border-[#FFF6EA]/15 shadow-lg text-xs transition-opacity duration-300 ${
          activeSection.id === 'contact'
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100'
        }`}
      >
        <button
          type="button"
          onClick={() => stepSection('prev')}
          disabled={activeSection.id === SECTION_ORDER[0].id}
          aria-label="Previous section (Up Arrow)"
          className="px-2 py-1 rounded bg-[#123D33]/70 hover:bg-[#F6B27A] hover:text-[#14100A] disabled:opacity-35 transition-colors font-display cursor-pointer"
        >
          ↑
        </button>
        <button
          type="button"
          onClick={() => stepSection('next')}
          disabled={activeSection.id === SECTION_ORDER[SECTION_ORDER.length - 1].id}
          aria-label="Next section (Down Arrow or Space)"
          className="px-2 py-1 rounded bg-[#123D33]/70 hover:bg-[#F6B27A] hover:text-[#14100A] disabled:opacity-35 transition-colors font-display cursor-pointer"
        >
          ↓
        </button>
        <div className="flex items-center gap-2 pl-1 pr-1 font-display uppercase tracking-[0.12em]">
          <span className="text-[#F6B27A] tabular-nums">
            {activeSection.num} / 13
          </span>
          <span aria-hidden="true" className="text-[#FFF6EA]/30">
            ·
          </span>
          <span className="text-[#FFF6EA] truncate max-w-[180px]">
            {activeSection.label}
          </span>
          <span className="text-[10px] text-[#DDEBDD]/55 ml-1 hidden lg:inline">
            [↑↓ / SPACE]
          </span>
        </div>
      </aside>

      {/* Main Content */}
      <main>
        {/* 01 HERO */}
        <Hero
          seasonState={seasonState}
          reducedMotion={reducedMotion}
          isLoaded={isLoaded}
          onEnterFloodplain={() => scrollToSection('overview')}
        />

        {/* 02 OVERVIEW */}
        <Overview />

        {/* 03 DISCOVERY AND HISTORY */}
        <Timeline />

        {/* 04 ANATOMY */}
        <AnatomyHotspots />

        {/* 05 SIZE COMPARISON */}
        <SizeCompare />

        {/* 06 DIET AND LIFE HISTORY */}
        <DietLifeHistory />

        {/* 07 HABITAT AND DISTRIBUTION */}
        <FloodplainMap />

        {/* 08 CLASSIFICATION AND SPECIES */}
        <Taxonomy />

        {/* 09 EVOLUTION AND EXTINCTION */}
        <EvolutionExtinction />

        {/* 10 MYTH vs REALITY */}
        <MythReality />

        {/* 11 GALLERY */}
        <Gallery />

        {/* 12 FAST FACTS AND SOURCES */}
        <FastFactsSources />
      </main>

      {/* 13 CONTACT AND FOOTER */}
      <Footer
        onBackToDrySeason={handleBackToDrySeason}
        onNavigateSection={scrollToSection}
      />
    </div>
  );
}
