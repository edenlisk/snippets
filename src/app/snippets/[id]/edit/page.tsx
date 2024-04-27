import { db } from "@/app/db";
import {notFound} from "next/navigation";
import SnippetEditForm from "@/components/snippet-edit-form";

interface SnippetEditPageProps {
    params: {
        id: string
    }
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
    const id = props.params.id;
    const snippet = await db.snippet.findFirst({
        where: {
            id: parseInt(id)
        }
    })
    if (!snippet) return notFound();
    return (
        <div>
            <SnippetEditForm snippet={snippet}/>
        </div>
    )
}