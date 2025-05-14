export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 로고 영역 */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-4">
          <div className="flex justify-center items-center gap-2">
            <img src="img/jedutools.png" alt="Logo" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-[#034287]">
              JEduTools
            </h1>
          </div>

          <a
            href="https://swuniv.jbnu.ac.kr/"
            target="_blank"
            className="flex items-center"
          >
            <img
              src="img/swuniv.png" // 로고 이미지 경로
              alt="Related Organization"
              className="h-10" // 로고 크기 조정
            />
          </a>
        </div>

        {/* <div className="flex justify-center gap-4 items-center mb-4">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            GitHub
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Docs
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Terms of Service
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Privacy Policy
          </a>
        </div> */}

        <p className="text-sm text-center text-gray-500">
          본 서비스는 2024 SW 교육 플랫폼 JEduTools 운영 프로젝트로써,
          전북대학교 SW중심대학사업단의 지원으로 제작되었습니다.
        </p>
        <p className="text-sm text-center text-gray-500 mt-1">
          ⓒ 2024 JEduTools. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
