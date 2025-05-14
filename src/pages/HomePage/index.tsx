
import Contact from "./Contact";
import Projects from "./Projects";
import Notice from "../../components/Notice";
import Hero from "@/components/Hero";
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