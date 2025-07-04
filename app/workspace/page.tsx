"use client"
import Sidebar from '@/components/Sidebar'
import { BarChart3, Paperclip, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const router = useRouter()
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [prompt, setPrompt] = useState('')
    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }
    const handleSend = async () => {
        const response = await fetch('/api/generate-manim', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });
        const { id } = await response.json();
        router.push(`/workspace/${id}`)
        // setGeneratedCode(data.text);
    }
    return (
        <div className='h-screen bg-zinc-950 flex flex-col items-center justify-center min-h-screen'>
            {/* <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} /> */}
            <h1 className='mx-auto text-white text-5xl font-bold'>What can i help you build?</h1>
            <div className="bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden mt-10">
                <div className="flex items-center gap-3 p-4 ">
                    <div className="flex-1">
                        <div className="w-full max-w-3xl mx-auto">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Ask v0 to build..."
                                className="w-[600px] min-h-[60px] bg-transparent text-white placeholder-zinc-500 resize-none outline-none"
                                rows={2}
                            />
                        </div>
                    </div>
                    <button className="text-zinc-400 hover:text-white p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                        <Paperclip className="w-5 h-5" />
                    </button>
                    <button className="bg-white text-black p-2 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer" onClick={handleSend}>
                        <Send className="w-5 h-5" />
                    </button>
                </div>

                {/* <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-700">
                    <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-zinc-400" />
                        <button className="flex items-center gap-1 text-zinc-400 hover:text-white text-sm transition-colors">
                            <span>{selectedModel}</span>
                            <ChevronDown className="w-3 h-3" />
                        </button>
                    </div>
                    <div className="text-xs text-zinc-500">
                        Press Enter to send, Shift+Enter for new line
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default page