import { Alert, AlertDescription } from "@/components/ui/alert"
import { TriangleAlert } from "lucide-react"
import { useState, useEffect } from "react"

export default function NoticeBanner() {
  const [noticeText, setNoticeText] = useState("")
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await fetch('/notice.md')
        if (!response.ok) {
          throw new Error('공지사항 파일을 찾을 수 없습니다.')
        }

        let content = await response.text()

        // frontmatter 파싱
        let frontmatter: { [key: string]: string } = {}
        if (content.startsWith('---')) {
          const endIndex = content.indexOf('---', 3)
          if (endIndex !== -1) {
            const frontmatterText = content.slice(3, endIndex).trim()

            // 간단한 YAML 파싱
            frontmatterText.split('\n').forEach(line => {
              const [key, ...valueParts] = line.split(':')
              if (key && valueParts.length > 0) {
                const value = valueParts.join(':').trim().replace(/['"]/g, '')
                frontmatter[key.trim()] = value
              }
            })

            content = content.slice(endIndex + 3).trim()
          }
        }

        // 만료 날짜 체크
        if (frontmatter.expiry) {
          const expiryDate = new Date(frontmatter.expiry)
          const today = new Date()
          today.setHours(0, 0, 0, 0) // 시간 제거

          if (expiryDate < today) {
            setIsExpired(true)
            setNoticeText("")
            return
          }
        }

        setIsExpired(false)
        setNoticeText(content)
      } catch (error) {
        console.error("공지사항을 불러오는데 실패했습니다:", error)
        setNoticeText("")
      }
    }

    fetchNotice()
  }, [])

  if (!noticeText) {
    return null
  }

  return (
    <div className="w-full px-4 py-2">
      <div className="max-w-screen-xl mx-auto">
        <Alert className="bg-orange-50/90 backdrop-blur-sm border-0 text-orange-800 shadow-xs max-w-5xl mx-auto">
          <TriangleAlert className="h-4 w-4" />
          <AlertDescription className="text-orange-800">
            {noticeText}
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}