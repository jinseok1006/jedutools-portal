"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, User, LogOut, Loader2 } from "lucide-react"
import { useKeycloak } from "@/hooks/useKeycloak"

export default function AppBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const {
    isLoading,
    isAuthenticated,
    handleLogin,
    handleLogout,
    user,
  } = useKeycloak()
  const username = user?.profile.preferred_username

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const appBarHeight = 64 // AppBar의 높이 (h-16 클래스는 4rem = 64px)
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - appBarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const AuthButtons = ({ isMobile = false }: { isMobile?: boolean }) => {
    if (isLoading) {
      return <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
    }

    if (isAuthenticated) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className={`rounded-full ${isMobile ? "w-full justify-start px-3 py-2 text-base" : "p-2"}`}>
              <User className={`h-5 w-5 ${isMobile ? "mr-2" : ""}`} />
              <span className={isMobile ? "" : "sr-only"}>사용자 메뉴</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={isMobile ? "start" : "end"} className="w-56">
            <DropdownMenuLabel>안녕하세요, {username || "사용자"}님!</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
              handleLogout()
              if (isMobile) setIsOpen(false)
            }}>
              <LogOut className="mr-2 h-4 w-4" />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
      <Button
        variant={isMobile ? "ghost" : "outline"}
        className={isMobile ? "block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50" : "border-blue-200 text-blue-700 hover:bg-blue-50"}
        onClick={() => {
          handleLogin()
          if (isMobile) setIsOpen(false)
        }}
      >
        로그인
      </Button>
    )
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <img src="img/jedutools.png" alt="Logo" className="h-8 w-auto mr-2" />
                <span className="text-2xl font-bold text-[#034287]">JEduTools</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                홈
              </button>
              <button
                onClick={() => scrollToSection("announcements")}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                공지사항
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                프로젝트
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                문의하기
              </button>
            </nav>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <AuthButtons />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">메뉴 열기</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="h-16" />
    </>
  )
}
