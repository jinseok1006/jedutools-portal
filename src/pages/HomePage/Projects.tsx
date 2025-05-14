// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid2";

import ServiceCard from "./ServiceCard";
import ServiceCard2 from "./ServiceCard2";
import ShadcnServiceCard from "./ShadcnServiceCard";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // Card 관련 컴포넌트가 Projects.tsx에서 직접 사용되지 않는다면 제거 가능
import { Button } from "@/components/ui/button"; // Button import 추가
import {
  ExternalLink,
  Github,
  Library,
  Lock,
  Cog,
  HomeIcon as LucideHome,
  Blocks,
  LockKeyhole,
  Construction,
  Home,
} from "lucide-react"; // 필요한 아이콘 추가
import React from "react"; // React.ReactNode 사용을 위해 import

export interface Project {
  title: string;
  description: string;
  imgSrc: string;
  github: string | null;
  docs: string | null;
  link?: string | null; // link도 null일 수 있음을 명시
  linkbtn?: React.ReactNode; // 옵셔널로 변경
  actionButtonColor?: string; // JFlow 프로젝트용 색상
}

// 링크 버튼 생성 헬퍼 함수
const createLinkButton = (
  link?: string | null,
  color?: string,
  text?: string,
  icon?: React.ElementType
): React.ReactNode => {
  const isEnabled = !!link;
  const IconComponent = icon || ExternalLink;
  return (
    <Button
      asChild
      size="sm"
      className="flex-grow"
      disabled={!isEnabled}
      style={color ? { backgroundColor: color } : {}}
    >
      <a
        href={link ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={!isEnabled ? "pointer-events-none opacity-50" : ""}
      >
        <IconComponent className="w-3.5 h-3.5 mr-1.5" />
        {text || "바로가기"}
      </a>
    </Button>
  );
};

// projectDetails를 객체에서 배열로 변경 (projectList로 이름 변경)
const projectList: Project[] = [
  {
    title: "LITMUS",
    description:
      "프로그래밍 과제의 자동 채점 및 평가를 제공하는 시스템입니다. 학생들의 코드를 효율적으로 평가하고 즉각적인 피드백을 제공하여 학습 효과를 높입니다.",
    imgSrc: "/img/litmus.png",
    link: "https://litmus.jbnu.ac.kr",
    github: "https://github.com/JBNU-JEduTools/litmus",
    docs: "https://jhelper.jbnu.ac.kr/Litmus",
  },
  {
    title: "JCode",
    description:
      "쿠버네티스 기반의 code-server환경에서 동작하는 웹 IDE 서비스로, 실시간 코드 변경 이력 추적 및 시각화 기능을 통해 투명하고 공정한 교육 환경을 제공합니다.",
    imgSrc: "/img/jcode.png",
    link: "https://jcode.jbnu.ac.kr",
    github: null,
    docs: "https://jhelper.jbnu.ac.kr/JCode",
  },
  {
    title: "JCloud",
    description:
      "클라우드 상의 가상 머신, 가상 네트워크, 가상 스토리지 등의 서비스를 제공합니다. 학생들은 수업 및 개인 학습 용도로 활용할 수 있습니다.",
    imgSrc: "/img/jcloud.png",
    link: "https://jcloud.jbnu.ac.kr/identity/v3/auth/OS-FEDERATION/identity_providers/jsso-keycloak/protocols/openid/websso?origin=https://jcloud.jbnu.ac.kr/dashboard/auth/websso/",
    github: null,
    docs: "https://jhelper.jbnu.ac.kr/JCloud",
  },
  {
    title: "JHelper",
    description:
      "JEduTools의 아키텍처와 구조에 대한 상세한 문서를 제공하는 페이지입니다. 이를 통해 JEduTools의 구조를 이해하고 새로운 기능을 개발하거나 기여할 수 있도록 돕습니다.",
    imgSrc: "/img/jhelper.png",
    link: "https://jhelper.jbnu.ac.kr",
    github: "https://github.com/JBNU-JEduTools/JHelper",
    docs: "https://jhelper.jbnu.ac.kr/JHelper",
  },
  {
    title: "JIGSSO",
    description:
      "JIGSSO는 Keycloak을 기반으로 구축된 JEduTools의 통합 인증 시스템입니다. 하나의 계정만으로 JEduTools에서 제공하는 다양한 서비스에 원활하게 접근할 수 있도록 지원합니다.",
    imgSrc: "/img/jigsso.png",
    link: null,
    github: null,
    docs: "https://jhelper.jbnu.ac.kr/JIGSSO",
    linkbtn: createLinkButton(null, undefined, "로그인 서비스", LockKeyhole),
  },
  {
    title: "SLOT",
    description:
      "교내 클라우드의 GPU 인스턴스를 간편하게 대여할 수 있는 서비스입니다. 학생과 교직원들이 필요한 컴퓨팅 자원을 효율적으로 활용할 수 있도록 지원합니다.",
    imgSrc: "/img/slot.png",
    link: null,
    github: null,
    docs: null,
    linkbtn: createLinkButton(null, undefined, "서비스 준비중", Construction),
  },
  {
    title: "JEduTools Portal",
    description:
      "JEduTools 서비스를 효과적으로 제공하기 위한 포털 페이지 개발 및 관리를 목표로 합니다. 본 프로젝트는 JEduTools의 다양한 기능과 서비스를 사용자 친화적인 인터페이스를 통해 접근 가능하게 만듭니다.",
    imgSrc: "/img/portal.png",
    link: null,
    github: "https://github.com/JBNU-JEduTools/portal",
    docs: "https://jhelper.jbnu.ac.kr/Portal",
    linkbtn: createLinkButton(null, undefined, "현재 페이지", Home),
  },
];

const jflowProjects: Project[] = [
  {
    title: "Gitlab",
    description:
      "GitLab은 소스 코드 관리, 이슈 추적 등 프로젝트 라이프사이클을 관리하는 통합 개발 플랫폼입니다. 코드 협업과 프로젝트 관리를 원활하게 수행할  수 있습니다.",
    imgSrc: "img/gitlab.png",
    github: null,
    docs: "https://jhelper.jbnu.ac.kr/JFlow/1GitlabGuide",
    link: "https://gitlab.jbnu.ac.kr",
    actionButtonColor: "#8A5ED8",
  },
  {
    title: "Jenkins",
    description:
      "Jenkins는 지속적 통합 및 배포(CI/CD)를 자동화하는 플랫폼입니다. 코드 변경사항을 자동으로 빌드, 테스트하고 배포 파이프라인을 구축하여 개발 프로세스를 효율화할 수 있습니다.",
    imgSrc: "img/jenkins.png",
    github: null,
    docs: "https://jhelper.jbnu.ac.kr/JFlow/2JenkinsGuide",
    link: "https://jenkins.jbnu.ac.kr",
    actionButtonColor: "#8A5ED8",
  },
  {
    title: "Harbor",
    description:
      "Harbor는 컨테이너 이미지를 안전하게 저장, 관리 할 수 있는 컨테이너 레지스트리입니다. 취약점 스캐닝과 접근 제어 기능을 통해 컨테이너 이미지의 보안을 강화할 수 있습니다.",
    imgSrc: "img/harbor.png",
    github: null,
    docs: "https://jhelper.jbnu.ac.kr/JFlow/3HarborGuide",
    link: "https://harbor.jbnu.ac.kr",
    actionButtonColor: "#8A5ED8",
  },
  {
    title: "Sonarqube",
    description:
      "Sonarqube는 코드 품질과 취약점을 자동으로 검사하는 정적 코드 분석 도구입니다. 지속적인 코드 품질 모니터링을 통해 더 안정적이고 유지보수가 용이한 코드를 작성할 수 있습니다.",
    imgSrc: "img/sonarqube.png",
    github: null,
    docs: "https://jhelper.jbnu.ac.kr/JFlow/4SonarQubeGuide",
    link: "https://sonarqube.jbnu.ac.kr",
    actionButtonColor: "#8A5ED8",
  },
  {
    title: "Grafana",
    description:
      "Grafana는 다양한 데이터 소스로부터 수집된 정보를 시각화하는 분석 및 모니터링 플랫폼입니다. 직관적인 대시보드를 통해 시스템 성능과 애플리케이션 상태를 실시간으로 모니터링 할 수 있습니다.",
    imgSrc: "img/grafana.png",
    github: null,
    docs: "https://jhelper.jbnu.ac.kr/JFlow/5Grafana",
    link: "https://grafana.jbnu.ac.kr",
    actionButtonColor: "#8A5ED8",
  },
];

export default function Projects() {
  return (
    <div id="projects" className="container mx-auto px-4 mt-10 max-w-screen-xl">
      {/* JEduTools 프로젝트 소개 */}
      <div className="flex items-center mb-3">
        <Blocks className="h-5 w-5 text-blue-800 mr-2" />
        <h2 className="font-medium text-gray-800">JEduTools 프로젝트</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        JBNU JEduTools에서 제공하는 다양한 학습 및 개발 지원 도구들을
        소개합니다.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-4">
        {projectList.map((project) => (
          <div key={project.title} className="flex justify-center">
            <ShadcnServiceCard
              title={project.title}
              description={project.description}
              imgSrc={project.imgSrc}
              linkbtn={project.linkbtn || createLinkButton(project.link)}
              github={project.github}
              docs={project.docs}
            />
          </div>
        ))}
      </div>

      {/* JFlow 프로젝트 소개 */}
      <div className="flex items-center mb-3 mt-16">
        <Blocks className="h-5 w-5 text-purple-600 mr-2" />
        <h2 className="font-medium text-gray-800">JFlow 프로젝트</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        JFlow는 실제 배포 프로세스에서 활용되는 여러 오픈소스들을 별도의 설치
        없이 즉시 사용가능한 형태로 제공하는 플랫폼입니다.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {jflowProjects.map((project) => (
          <div key={project.title} className="flex justify-center">
            <ShadcnServiceCard
              title={project.title}
              description={project.description}
              imgSrc={project.imgSrc}
              linkbtn={createLinkButton(
                project.link,
                project.actionButtonColor
              )}
              github={project.github}
              docs={project.docs}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
