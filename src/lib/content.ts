import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content');

export function getPageContent(fileName: string) {
  const fullPath = path.join(contentDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const { data } = matter(fileContents);

  return data;
}
