import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import { fileURLToPath } from 'url';

// ES module scope에서 __dirname을 사용하기 위한 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '..', 'public', 'content');
const outputFilePath = path.join(contentDir, 'index.json');

try {
  // public/content 디렉토리가 없으면 생성
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
    console.log(`Created directory: ${contentDir}`);
  }

  const files = fs.readdirSync(contentDir);
  const mdFiles = files.filter(file => file.endsWith('.md'));

  const results = [];

  for (const mdFile of mdFiles) {
    const filePath = path.join(contentDir, mdFile);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const stats = fs.statSync(filePath);
    const { data: frontmatter } = matter(fileContent);

    let dateToFormat;
    if (frontmatter.date) {
      // frontmatter에 date가 있으면 해당 날짜 사용
      dateToFormat = new Date(frontmatter.date);
    } else {
      // date 필드가 없으면 파일의 mtime 사용
      dateToFormat = stats.mtime;
    }
    // date-fns를 사용하여 날짜 포맷팅
    const date = format(dateToFormat, 'yyyy-MM-dd');

    const filename = mdFile;
    results.push({ filename, date, ...frontmatter });
  }

  // 날짜 기준으로 내림차순 정렬 (최신 날짜가 먼저 오도록)
  results.sort((a, b) => new Date(b.date) - new Date(a.date));

  fs.writeFileSync(outputFilePath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`Successfully generated ${outputFilePath}`);

} catch (error) {
  console.error('Error during prebuild process:', error);
  process.exit(1); // 오류 발생 시 비정상 종료
} 