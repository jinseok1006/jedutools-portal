import { ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

const tabItems = [
  {
    id: "jcloud",
    name: "JCloud",
    description: "클라우드 인프라 서비스 및 모니터링 시스템",
    imageSrc: "/img/hero/jcloud.png",
  },
  {
    id: "litmus",
    name: "Litmus",
    description: "프로그래밍 과제 및 대회 관리 시스템",
    imageSrc: "/img/hero/litmus.png",
  },
  {
    id: "jcode",
    name: "JCode",
    description: "웹 기반 통합 개발 환경(IDE)",
    imageSrc: "/img/hero/jcode.png",
  },
  {
    id: "jhelper",
    name: "JHelper",
    description: "JEduTools 개발 가이드 및 문서화",
    imageSrc: "/img/hero/jhelper.png",
  },
  {
    id: "jigsso",
    name: "JIGSSO",
    description: "통합 인증 시스템",
    imageSrc: "/img/hero/jigsso.png",
  },
  {
    id: "gitlab",
    name: "GitLab",
    description: "버전 관리 및 협업 플랫폼",
    imageSrc: "/img/hero/gitlab.png",
  },
  {
    id: "harbor",
    name: "Harbor",
    description: "컨테이너 이미지 레지스트리",
    imageSrc: "/img/hero/harbor.png",
  },
  {
    id: "jenkins",
    name: "Jenkins",
    description: "CI/CD 자동화 서버",
    imageSrc: "/img/hero/jenkins.png",
  },
  {
    id: "sonarqube",
    name: "SonarQube",
    description: "코드 정적 분석 플랫폼",
    imageSrc: "/img/hero/sonarqube.png",
  },
] as const

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTabItem = tabItems[activeIndex]

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + tabItems.length) % tabItems.length)
  }

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % tabItems.length)
  }

  const handleDotClick = (index: number) => {
    setActiveIndex(index)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [activeIndex])

  return (
    <div id="hero" className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white md:pb-16">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 hidden md:block"></div>
        <div className="absolute bottom-30 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 hidden md:block"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          {/* <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-4">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
             소프트웨어 교육 도구 모음
          </div> */}

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            함께 만드는 <span className="text-[#1c5492]">SW 교육 혁신</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            JEduTools는 재학생들이 직접 참여하여 개발하는 전북대학교의 SW 교육을 위한 학습 플랫폼입니다.
          </p>
        </div>

        {/* Dashboard Display */}
        <div className="relative mx-auto max-w-5xl rounded-xl shadow-2xl overflow-hidden border border-gray-200 bg-white hidden md:block">
          {/* Floating Info Cards */}
          <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 max-w-[200px] sm:max-w-[240px] border border-gray-100">
            <h3 className="font-medium text-sm text-gray-900 mb-1">{activeTabItem.name}</h3>
            <p className="text-xs text-gray-600">{activeTabItem.description}</p>
          </div>

          {/* Dashboard Images */}
          <div className="relative aspect-[16/9] w-full">
            {tabItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  index === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <img
                  src={item.imageSrc}
                  alt={`${item.name} 대시보드`}
                  className="object-cover object-top w-full h-full"
                />
              </div>
            ))}
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-10"></div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="hidden md:flex justify-between items-center mt-8 max-w-5xl mx-auto">
          <button
            onClick={handlePrev}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            aria-label="이전"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
          </button>

          <div className="flex gap-1.5">
            {tabItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-6 bg-slate-800" : "bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`${item.name} 보기`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            aria-label="다음"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
