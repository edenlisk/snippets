import { db } from '@/app/db';

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map(snippet => {
    return (
        <div key={snippet.id}>{snippet.title}</div>
    )
  })

  return (
      <div>{renderedSnippets}</div>
  );
}
