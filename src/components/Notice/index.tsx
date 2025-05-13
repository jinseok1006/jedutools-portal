"use client"

import { useState } from "react"
import { Bell, ChevronDown, ChevronUp, Calendar } from "lucide-react"
import { useNotices, Notice } from "@/hooks/useNotices"
import ReactMarkdown from 'react-markdown'

export default function ExpandableNoticeSection() {
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(null)

  const {
    visibleNotices,
    loadMoreNotices,
    foldNotices,
    canLoadMore,
    isShowingAll,
    isLoading,
    error,
    totalNoticeCount,
  } = useNotices()

  const toggleNoticeExpand = (id: string) => {
    if (expandedNoticeId === id) {
      setExpandedNoticeId(null)
    } else {
      setExpandedNoticeId(id)
    }
  }

  if (isLoading && totalNoticeCount === 0) {
    return (
      <div className="max-w-screen-xl mx-auto w-full bg-white border-y border-gray-200 py-3 px-4 text-center">
        <p>공지사항을 불러오는 중입니다...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-screen-xl mx-auto w-full bg-white border-y border-gray-200 py-3 px-4 text-center">
        <p className="text-red-500">공지사항을 불러오는데 실패했습니다: {error}</p>
      </div>
    )
  }

  if (!isLoading && totalNoticeCount === 0 && !error) {
    return (
      <div className="max-w-screen-xl mx-auto w-full bg-white border-y border-gray-200 py-3 px-4 text-center">
        <p>등록된 공지사항이 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto w-full bg-white border-y border-gray-200 py-3 px-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Bell className="h-5 w-5 text-blue-800 mr-2" />
          <h2 className="font-medium text-gray-800">공지사항</h2>
          {totalNoticeCount > 0 && (
            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              {totalNoticeCount}
            </span>
          )}
        </div>
      </div>

      {isLoading && visibleNotices.length === 0 && totalNoticeCount > 0 && (
        <div className="text-center py-4">
            <p>공지사항 세부 내용을 불러오는 중입니다...</p>
        </div>
      )}

      <div className="space-y-3">
        {visibleNotices.map((notice) => (
          <div
            key={notice.id}
            onClick={() => toggleNoticeExpand(notice.id)}
            className={`border border-gray-100 rounded-lg overflow-hidden transition-all duration-200 cursor-pointer ${
              expandedNoticeId === notice.id
                ? "bg-gray-100 shadow-sm"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <div className="p-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-gray-800 flex-1 mr-2">{notice.title}</h3>
                <span className="text-xs text-gray-500 flex items-center flex-shrink-0">
                  <Calendar className="h-3 w-3 mr-1" />
                  {notice.date}
                </span>
              </div>

              {expandedNoticeId === notice.id && notice.fullContent ? (
                <div className="mt-2 text-sm text-gray-700 prose prose-sm max-w-none">
                  <ReactMarkdown>
                    {notice.fullContent}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="mt-1 text-sm text-gray-600 truncate">{notice.content}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {(canLoadMore || isShowingAll) && (
        <div className="mt-3 text-center">
          <button
            onClick={isShowingAll ? foldNotices : loadMoreNotices}
            className="inline-flex items-center text-sm text-blue-800 hover:text-blue-900 font-medium"
            disabled={isLoading}
          >
            {isLoading && !isShowingAll ? '불러오는 중...' : 
              isShowingAll ? (
              <>
                접기
                <ChevronUp className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                더 보기
                <ChevronDown className="h-4 w-4 ml-1" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
