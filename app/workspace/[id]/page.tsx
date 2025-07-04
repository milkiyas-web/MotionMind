// app/workspace/[id]/page.tsx
import { db } from "@/db/drizzle";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function WorkspaceView({ params }: { params: { id: string } }) {
    const [project] = await db
        .select()
        .from(projects)
        .where(eq(projects.id, params.id));

    if (!project) return <div>Not found</div>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">📝 Prompt:</h2>
            <p className="bg-gray-100 p-4 rounded">{project.prompt}</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">🧠 Generated Manim Code:</h2>
            <pre className="bg-black text-green-400 p-4 rounded overflow-auto max-h-96">
                <code>{project.code}</code>
            </pre>
        </div>
    );
}
