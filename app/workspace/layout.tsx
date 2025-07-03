"use client"
import Sidebar from '@/components/Sidebar'
import React, { useState } from 'react'

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed)
    }
    return (
        <div className='workspace-layout'>
            <aside className="hidden lg:flex flex-col w-64 h-full bg-sidebar">
                <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
            </aside>
            <main className='flex-1'>{children}</main>
        </div>
    )
}

export default WorkspaceLayout