import { db } from '@/app/db';
import Link from "next/link";
export default async function Home() {
  const snippets = await db.snippet.findMany();
  const renderedSnippets = snippets.map(snippet => {
    return (
        <Link
            className={"flex justify-between items-center p-2 border rounded"}
            href={`/snippets/${snippet.id}`}
            key={snippet.id}
        >
            <div>{snippet.title}</div>
            <div>View</div>
        </Link>
    )
  })

  return (
      <div>
          <div className="flex m-2 justify-between items-center">
              <h1 className="text-xl font-bold">Snippets</h1>
              <Link
                  className="w-fit border rounded p-2"
                  href={"/snippets/new"}
              >
                  New
              </Link>
          </div>
          <div className="flex flex-col gap-1">
              {renderedSnippets}
          </div>
      </div>
  );
}
