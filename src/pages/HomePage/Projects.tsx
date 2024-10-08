import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

import ServiceCard from "./ServiceCard";

export interface Project {
  title: string; // 서비스의 제목
  description: string; // 서비스 설명
  imgSrc: string; // 이미지 경로
  github: string | null; // GitHub 저장소 (optional)
  docs: string | null; // 문서 링크 (optional)
  action?: () => void; // link가 없을시 호출할 함수
  link?: string; // 서비스 링크
}

const projects: Project[] = [
  {
    title: "LITMUS",
    description:
      "프로그래밍 과제의 자동 채점 및 평가를 제공하는 시스템입니다. 학생들의 코드를 효율적으로 평가하고 즉각적인 피드백을 제공하여 학습 효과를 높입니다.",
    imgSrc: "img/litmus.png",
    link: "https://litmus.jbnu.ac.kr",
    github: null,
    docs: null,
  },
  {
    title: "JCODE",
    description:
      "웹 상에서 프로그램 개발 및 테스트를 수행할 수 있는 Web IDE 서비스를 제공합니다. VS-Code 기반으로 C, C++, Java, Python, .Net, PHP, Node.js 등의 다양한 언어와 extension을 지원합니다.",
    imgSrc: "img/jcode.png",
    github: null,
    docs: null,
    action: () => alert("사전 안내된 이메일을 참고하여 접속하시기 바랍니다."),
  },
  {
    title: "JCloud",
    description:
      "클라우드 상의 가상 머신, 가상 네트워크, 가상 스토리지 등의 서비스를 제공합니다. 학생들은 수업 및 개인 학습 용도로 활용할 수 있습니다.",
    imgSrc: "img/jcloud.png",
    link: "https://jcloud.jbnu.ac.kr/identity/v3/auth/OS-FEDERATION/identity_providers/jsso-keycloak/protocols/openid/websso?origin=https://jcloud.jbnu.ac.kr/dashboard/auth/websso/",
    docs: "https://jcloud-devops.github.io",
    github: null,
  },
  {
    title: "JIGSSO",
    description:
      "JIGSSO(JEduTools Intergrated Gateway for SSO)는 Keycloak을 기반으로 구축된 JEduTools의 통합 인증 시스템입니다. Single Sign-On 서버 역할을 수행하여, 하나의 계정만으로 JEduTools에서 제공하는 다양한 서비스에 원활하게 접근할 수 있도록 지원합니다.",
    imgSrc: "img/jigsso.png",
    github: null,
    docs: null,
    action: () => {},
  },
  {
    title: "SLOT",
    description:
      "교내 클라우드의 GPU 인스턴스를 간편하게 대여할 수 있는 서비스입니다. 학생과 교직원들이 필요한 컴퓨팅 자원을 효율적으로 활용할 수 있도록 지원합니다.",
    imgSrc: "img/slot.png",
    github: null,
    docs: null,
    action: ()=> alert("준비중인 서비스입니다."),
  },

  {
    title: "JEduTools PORTAL",
    description:
      "JEduTools 서비스를 효과적으로 제공하기 위한 포털 페이지 개발 및 관리를 목표로 합니다. 본 프로젝트는 JEduTools의 다양한 기능과 서비스를 사용자 친화적인 인터페이스를 통해 접근 가능하게 만듭니다.",
    imgSrc: "img/portal.png",
    github: "https://github.com/JBNU-JEduTools/portal",
    docs: null,
    action: ()=> alert('현재 페이지입니다.')
  },
  {
    title: "JHelper",
    description:
      "JEduTools의 아키텍처와 구조에 대한 상세한 문서를 제공하는 페이지입니다. 이를 통해 JEduTools의 구조를 이해하고 새로운 기능을 개발하거나 기여할 수 있도록 돕습니다.",
    imgSrc: "img/jhelper.png",
    link: "https://jhelper.jbnu.ac.kr",
    github: "https://github.com/JBNU-JEduTools/JHelper",
    docs: null,
  },
];

export default function Projects() {
  return (
    <Container sx={{ mt: 10 }}>
      <Box my={5}>
        <Typography variant="h5" align="center" fontWeight="bold">
          JEduTools 프로젝트
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary">
          프로젝트의 이미지를 클릭하면 각 서비스로 이동합니다.
        </Typography>
      </Box>
      <Grid container columnSpacing={4} rowSpacing={6}>
        {projects.map((project) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={project.title}>
            <ServiceCard {...project} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
