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
import { User, LogOut, Loader2 } from "lucide-react"
import { useKeycloak } from "@/hooks/useKeycloak"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default function AppBar() {
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
    const element = document.getElementById(id)
    if (element) {
      const appBarHeight = 56 // AppBar의 높이를 64px에서 56px로 변경 (h-14)
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - appBarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const AuthButtons = () => {
    if (isLoading) {
      return <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
    }

    if (isAuthenticated) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "rounded-full",
              "p-2"
            )}
          >
            <User className={"h-5 w-5"} />
            <span className="sr-only">사용자 메뉴</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={"end"} className="w-56 z-[9999]">
            <DropdownMenuLabel>안녕하세요, {username || "사용자"}님!</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
              handleLogout()
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
        variant={"outline"}
        className={"border-blue-200 text-blue-700 hover:bg-blue-50"}
        onClick={() => {
          handleLogin()
        }}
      >
        로그인
      </Button>
    )
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b-0`}
      >
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8`}>
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <img src="img/jedutools.png" alt="Logo" className="h-8 w-auto mr-2" />
                <span className="text-2xl font-bold text-[#034287]">JEduTools</span>
              </a>
            </div>

            {/* Desktop Navigation - 이제 md 이상 화면에서만 보임 */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                홈
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
            <div className="flex items-center space-x-4">
              <AuthButtons />
            </div>
          </div>
        </div>
      </header>
      <div className="h-14" />
    </>
  )
}
