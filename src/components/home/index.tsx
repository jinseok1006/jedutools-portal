
import Contact from "@/components/home/Contact";
import Projects from "@/components/home/Projects";
import Notice from "@/components/home/Notice";
import Hero from "@/components/home/Hero";
export default function HomePage() {
    return (
      <>
        <Hero />
        <Notice />
        <Projects />
        <Contact />
      </>
    );
  }