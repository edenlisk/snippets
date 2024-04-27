'use server';
import {db} from "@/app/db";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
interface handleSaveSnippetProps {
    id: number,
    code: string
}
export const handleSaveSnippet = async ({id, code}: handleSaveSnippetProps) => {
     await db.snippet.update({
        where: {id},
        data: {
            code
        }
    })
    revalidatePath(`/snippets/${id}`);
    redirect(`/snippets/${id}`);
}

export async function deleteSnippet (id: number) {
    await db.snippet.delete({
        where: {
            id
        }
    })
    revalidatePath('/');
    redirect("/");
}

export async function createSnippet(formState: { message: string }, formData: FormData) {
    // This function needs to be talking to server
    // 'use server';
    // Receive inputs and validate them
    try {
        const title = formData.get('title');
        const code = formData.get('code');
        if (typeof title !== 'string' || title.length < 3) {
            return {
                message: "Title should be longer!"
            }
        }
        if (typeof code !== 'string' || code.length < 10) {
            return {
                message: "Code should be longer!"
            }
        }
        // Create new snippet to the database
        await db.snippet.create({
            data: {
                title,
                code
            }
        })
    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                message: err.message
            }
        } else {
            return {
                message: "Something Went Wrong!"
            }
        }
    }
    // Redirect the user to the root route
    revalidatePath('/');
    redirect('/');
}

export async function generateStaticParams() {
    const snippets = await db.snippet.findMany();
    return snippets.map((snippet) => {
        return {
            id: snippet.id.toString()
        }
    })
}
