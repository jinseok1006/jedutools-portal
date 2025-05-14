"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Cloud, BookOpen } from "lucide-react"
// import Image from "next/image" // next/image 대신 일반 img 태그 사용
import { useState } from "react"

export default function Hero() {
  const [activeTab, setActiveTab] = useState<"jcloud" | "litmus" | "jcode">("jcloud")

  return (
    <div id="hero" className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white pb-16">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
        <div className="absolute bottom-30 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          {/* <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium mb-4">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
            함께 성장하는 교육 플랫폼
          </div> */}

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            함께 만드는 <span className="text-blue-600">SW 교육 혁신</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            JEduTools는 재학생들이 직접 참여하여 개발하는 전북대학교의 SW 교육을 위한 학습 플랫폼입니다.
          </p>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                activeTab === "jcloud" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("jcloud")}
            >
              <Cloud className="inline-block mr-2 h-4 w-4" />
              JCloud
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "litmus" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("litmus")}
            >
              <BookOpen className="inline-block mr-2 h-4 w-4" />
              Litmus
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                activeTab === "jcode" ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("jcode")}
            >
              <Code className="inline-block mr-2 h-4 w-4" />
              JCode
            </button>
          </div>
        </div>

        {/* Dashboard Display */}
        <div className="relative mx-auto max-w-5xl rounded-xl shadow-2xl overflow-hidden border border-gray-200 bg-white">
          {/* Floating Info Cards */}
          <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 max-w-[200px] border border-gray-100">
            <h3 className="font-medium text-sm text-gray-900 mb-1">
              {activeTab === "jcloud" && "JCloud"}
              {activeTab === "litmus" && "Litmus"}
              {activeTab === "jcode" && "JCode"}
            </h3>
            <p className="text-xs text-gray-600">
              {activeTab === "jcloud" && "클라우드 인프라 관리 및 모니터링 시스템"}
              {activeTab === "litmus" && "프로그래밍 과제 및 대회 관리 시스템"}
              {activeTab === "jcode" && "웹 기반 통합 개발 환경(IDE)"}
            </p>
          </div>

          {/* Dashboard Images */}
          <div className="relative aspect-[16/9] w-full">
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${activeTab === "jcloud" ? "opacity-100" : "opacity-0"}`}
            >
              <img // Image 컴포넌트 대신 img 태그 사용
                src="/img/hero/jcloud.png" // public 디렉토리 기준 경로
                alt="JCloud 대시보드"
                // fill // img 태그에는 fill 속성이 없습니다. className으로 대체합니다.
                className="object-cover object-top w-full h-full" // w-full, h-full 추가
              />
            </div>
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${activeTab === "litmus" ? "opacity-100" : "opacity-0"}`}
            >
              <img // Image 컴포넌트 대신 img 태그 사용
                src="/img/hero/litmus.png" // public 디렉토리 기준 경로
                alt="Litmus 대시보드"
                // fill
                className="object-cover object-top w-full h-full" // w-full, h-full 추가
              />
            </div>
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${activeTab === "jcode" ? "opacity-100" : "opacity-0"}`}
            >
              <img // Image 컴포넌트 대신 img 태그 사용
                src="/img/hero/jcode.png" // public 디렉토리 기준 경로
                alt="JCode 대시보드"
                // fill
                className="object-cover object-top w-full h-full" // w-full, h-full 추가
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-10"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
