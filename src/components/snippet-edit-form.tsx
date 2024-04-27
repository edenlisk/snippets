
"use client";
import type { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react"
import {startTransition, useState} from "react";
import {handleSaveSnippet} from "@/actions";

interface SnippetEditFormProps {
    snippet: Snippet
}
export default function SnippetEditForm({snippet}: SnippetEditFormProps) {
    const [code, setCode] = useState(snippet.code);
    const handleValueChange = (value: string = '') => {
        setCode(value);
    }

    const editSnippetAction = handleSaveSnippet.bind(null, {id: snippet.id, code})

    // Alternative option --> use for button event handler
    // const handleSubmit = () => {
    //     startTransition(async () => {
    //         await handleSaveSnippet({id: snippet.id, code});
    //     })
    // }

    return (
        <div>
            <Editor
                height="40vh"
                defaultLanguage={"javascript"}
                theme={"vs-dark"}
                defaultValue={code}
                onChange={handleValueChange}
                options={{minimap: {enabled: false}}}
            />
            <form action={editSnippetAction}>
                <button type="submit" className="p-2 border rounded">Save</button>
            </form>
        </div>
    )
}