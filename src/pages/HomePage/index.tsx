import HeroHeader from "./Hero";
import Contact from "./Contact";
import Projects from "./Projects";
import Notice from "../../components/Notice";
export default function HomePage() {
    return (
      <>
        <HeroHeader />
        <Notice />
        <Projects />
        <Contact />
      </>
    );
  }