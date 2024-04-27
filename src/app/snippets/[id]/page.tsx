import { notFound } from "next/navigation";
import { db } from '@/app/db';
import Link from "next/link";
import { deleteSnippet } from "@/actions";

interface SnippetShowPageProps {
    params: {
        id: string
    }
}
export default async function SnippetShowPage(props: SnippetShowPageProps) {
    await new Promise((r) => setTimeout(r, 2000));
    const snippet = await db.snippet.findFirst({
        where: { id: parseInt(props.params.id) }
    })
    if (!snippet) return notFound();
    const deleteSnippetAction = deleteSnippet.bind(null, snippet.id);

    return (
        <div>
            <div className="flex m-4 justify-between items-center">
                <h1 className="text-xl font-bold">{snippet.title}</h1>
                <div className="flex gap-3">
                    <Link href={`${snippet.id}/edit`} className="p-2 border rounded">Edit</Link>
                    <form action={deleteSnippetAction}>
                        <button type="submit" className="p-2 border rounded">Delete</button>
                    </form>
                </div>
            </div>
            <pre className="p-3 bg-gray-200 border-gray-200 rounded">
                <code>{snippet.code}</code>
            </pre>
        </div>
    )
}