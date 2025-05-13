import { useState, useEffect, useCallback } from 'react';

// Notice 타입을 export 하여 다른 파일(예: Notice/index.tsx)에서도 사용할 수 있도록 합니다.
export type Notice = {
  id: string; // filename을 id로 사용
  title: string;
  content: string; // 요약된 내용
  date: string;
  fullContent?: string; // 전체 마크다운 원문
  filename: string; // index.json에서 가져온 파일명
};

// index.json 파일의 각 항목에 대한 타입 수정
type IndexJsonEntry = {
  filename: string;
  date: string;
  title: string; // title 필드 추가
  summary: string; // summary 필드 추가
};

const INITIAL_VISIBLE_COUNT = 5;
const LOAD_COUNT_INCREMENT = 5;

export function useNotices() {
  const [allNotices, setAllNotices] = useState<Notice[]>([]);
  const [visibleNotices, setVisibleNotices] = useState<Notice[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNoticeData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const indexResponse = await fetch('/content/index.json');
        if (!indexResponse.ok) {
          throw new Error(`HTTP error! status: ${indexResponse.status} while fetching index.json`);
        }
        const indexEntries: IndexJsonEntry[] = await indexResponse.json();

        const initialNotices: Notice[] = indexEntries.map((entry) => ({
          id: entry.filename,
          filename: entry.filename,
          date: entry.date,
          title: entry.title, // index.json에서 직접 가져옴
          content: entry.summary, // index.json에서 직접 가져옴
          fullContent: undefined, 
        }));

        setAllNotices(initialNotices);
        setVisibleNotices(initialNotices.slice(0, INITIAL_VISIBLE_COUNT));
        
        // 만약 indexEntries가 비어있다면, 마크다운을 가져올 필요가 없으므로 로딩 상태를 false로 설정
        if (indexEntries.length === 0) {
          setIsLoading(false);
        }

      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred while fetching notice list.');
        }
        console.error("Failed to fetch notice data:", e);
        setIsLoading(false); // 오류 발생 시에도 로딩 상태 해제
      }
    };

    fetchNoticeData();
  }, []);

  useEffect(() => {
    // allNotices가 비어있거나(index.json 로드 실패 또는 빈 파일), 이미 모든 fullContent가 채워졌거나, 로딩 중이 아니거나, 에러 상태면 실행 안함
    if (!allNotices.length || allNotices.every(notice => notice.fullContent !== undefined) || !isLoading || error) {
      // 모든 내용이 로드되었거나 더 이상 로드할 내용이 없으면 isLoading을 false로 설정할 수 있지만,
      // fetchNoticeData에서 index.json 로드 실패 시 isLoading이 false가 되므로, 여기서는 중복 처리될 수 있음.
      // 단, index.json은 성공했지만 md파일이 없는 경우를 위해 마지막에 setIsLoading(false)는 필요.
      if (isLoading && allNotices.length > 0 && allNotices.every(notice => notice.fullContent !== undefined)) {
        setIsLoading(false);
      }
      return;
    }

    const fetchMarkdownContents = async () => {
      try {
        const noticesToFetch = allNotices.filter(notice => notice.fullContent === undefined);
        
        // 가져올 마크다운이 없으면 (모두 정의되어 있거나, 애초에 allNotices가 비어있었다면 위의 조건문에서 걸러짐)
        // 이 경우는 noticesToFetch가 비어있게 됨.
        if (noticesToFetch.length === 0) {
          setIsLoading(false); // 더 이상 가져올 것이 없으므로 로딩 완료
          return;
        }

        const updatedNoticesData = await Promise.all(
          noticesToFetch.map(async (notice) => {
              try {
                const mdResponse = await fetch(`/content/${notice.filename}`);
                if (!mdResponse.ok) {
                  console.error(`Failed to fetch ${notice.filename}: ${mdResponse.status}`);
                  return {
                    ...notice,
                    fullContent: `Error loading ${notice.filename}. Status: ${mdResponse.status}`,
                  };
                }
                const markdownTextWithFrontmatter = await mdResponse.text();
                let actualMarkdownContent = markdownTextWithFrontmatter;

                // 프론트매터 제거 로직
                if (actualMarkdownContent.startsWith("---")) {
                  // 정규 표현식을 사용하여 프론트매터와 그 뒤의 공백(줄바꿈 포함)을 찾음
                  const match = actualMarkdownContent.match(/^---[\s\S]*?---[\r\n]*/);
                  if (match) {
                    actualMarkdownContent = actualMarkdownContent.substring(match[0].length);
                  }
                  // 만약 두 번째 '---'가 없는 잘못된 프론트매터 형식일 경우, 원본을 그대로 둘 수 있으나,
                  // 여기서는 시작 '---'가 있다면 제거 시도를 함.
                  // 더 견고한 방법은 gray-matter와 같은 라이브러리 사용입니다.
                }

                return {
                  ...notice,
                  fullContent: actualMarkdownContent.trimStart(), // 프론트매터 제거 후 앞쪽 공백 제거
                };
              } catch (err) {
                console.error(`Error fetching or processing ${notice.filename}:`, err);
                return {
                  ...notice,
                  fullContent: `Error processing ${notice.filename}.`,
                };
              }
            })
        );

        setAllNotices(prevNotices => {
          const newNotices = prevNotices.map(prevNotice => {
            const updated = updatedNoticesData.find(un => un.id === prevNotice.id);
            return updated || prevNotice;
          });
          setVisibleNotices(newNotices.slice(0, visibleCount));
          return newNotices;
        });

      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred while fetching markdown contents.');
        }
        console.error("Failed to fetch markdown contents:", e);
      } finally {
        // 이 fetchMarkdownContents 작업이 끝나면 로딩 상태를 false로 설정
        setIsLoading(false);
      }
    };
    
    // allNotices가 존재하고, fullContent가 없는 항목이 있을 때만 실행
    if (allNotices.length > 0 && allNotices.some(n => n.fullContent === undefined)) {
        fetchMarkdownContents();
    }
    // 만약 allNotices는 있지만 (index.json 로드 성공), fullContent가 없는 항목이 처음부터 없었다면 (모든 md파일이 존재하지 않거나 index.json만 있고 md는 없는 경우)
    // 이 경우 fetchMarkdownContents는 호출되지 않고 isLoading은 계속 true일 수 있으므로 false로 설정.
    else if (isLoading && allNotices.length > 0 && !allNotices.some(n => n.fullContent === undefined)) {
        setIsLoading(false);
    }

  }, [allNotices, visibleCount, isLoading, error]);

  const loadMoreNotices = useCallback(() => {
    const newVisibleCount = Math.min(allNotices.length, visibleCount + LOAD_COUNT_INCREMENT);
    setVisibleCount(newVisibleCount);
    setVisibleNotices(allNotices.slice(0, newVisibleCount));
  }, [allNotices, visibleCount]);

  const foldNotices = useCallback(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
    setVisibleNotices(allNotices.slice(0, INITIAL_VISIBLE_COUNT));
  }, [allNotices]);

  const canLoadMore = visibleCount < allNotices.length;
  // INITIAL_VISIBLE_COUNT 보다 전체 공지사항 수가 많고, 현재 보이는 공지사항 수가 전체 공지사항 수와 같을 때 true
  const isShowingAll = allNotices.length > 0 && visibleCount === allNotices.length && allNotices.length > INITIAL_VISIBLE_COUNT;


  return {
    visibleNotices,
    loadMoreNotices,
    foldNotices,
    canLoadMore,
    isShowingAll,
    isLoading,
    error,
    totalNoticeCount: allNotices.length,
  };
} 