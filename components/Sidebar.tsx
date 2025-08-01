import React, { useState } from 'react';
import {
    MessageSquarePlus,
    Search,
    FolderOpen,
    Clock,
    Users,
    ChevronDown,
    ChevronRight,
    Star,
    MoreHorizontal
} from 'lucide-react';

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        favorites: false,
        favoriteChats: false,
        recents: true
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const recentProjects = [
        'Responsive web page',
        'Exact page recreation',
        'Make this page',
        'Exact page recreation',
        'chart-area-linear',
        'chart-area-linear',
        'Create Shadcn tabs'
    ];

    return (
        <div className={`bg-zinc-950 border-r border-zinc-800 h-screen flex flex-col transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'
            }`}>
            {/* Header */}
            <div className="p-4 border-b border-zinc-800">
                <button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <MessageSquarePlus className="w-4 h-4" />
                    {!isCollapsed && <span className="text-sm font-medium">New Chat</span>}
                </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto">
                <nav className="p-2">
                    {/* Search */}
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors">
                        <Search className="w-4 h-4" />
                        {!isCollapsed && <span className="text-sm">Search</span>}
                    </button>

                    {/* Projects */}
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors">
                        <FolderOpen className="w-4 h-4" />
                        {!isCollapsed && <span className="text-sm">Projects</span>}
                    </button>

                    {/* Recents */}
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors">
                        <Clock className="w-4 h-4" />
                        {!isCollapsed && <span className="text-sm">Recents</span>}
                    </button>

                    {/* Community */}
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors">
                        <Users className="w-4 h-4" />
                        {!isCollapsed && <span className="text-sm">Community</span>}
                    </button>
                </nav>

                {!isCollapsed && (
                    <>
                        {/* Favorite Projects */}
                        <div className="px-2 py-2">
                            <button
                                onClick={() => toggleSection('favorites')}
                                className="w-full flex items-center justify-between px-3 py-2 text-zinc-400 hover:text-white text-sm font-medium"
                            >
                                <span>Favorite Projects</span>
                                {expandedSections.favorites ? (
                                    <ChevronDown className="w-4 h-4" />
                                ) : (
                                    <ChevronRight className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        {/* Favorite Chats */}
                        <div className="px-2 py-2">
                            <button
                                onClick={() => toggleSection('favoriteChats')}
                                className="w-full flex items-center justify-between px-3 py-2 text-zinc-400 hover:text-white text-sm font-medium"
                            >
                                <span>Favorite Chats</span>
                                {expandedSections.favoriteChats ? (
                                    <ChevronDown className="w-4 h-4" />
                                ) : (
                                    <ChevronRight className="w-4 h-4" />
                                )}
                            </button>
                        </div>

                        {/* Recents Section */}
                        <div className="px-2 py-2">
                            <button
                                onClick={() => toggleSection('recents')}
                                className="w-full flex items-center justify-between px-3 py-2 text-zinc-400 hover:text-white text-sm font-medium"
                            >
                                <span>Recents</span>
                                {expandedSections.recents ? (
                                    <ChevronDown className="w-4 h-4" />
                                ) : (
                                    <ChevronRight className="w-4 h-4" />
                                )}
                            </button>

                            {expandedSections.recents && (
                                <div className="mt-1 space-y-1">
                                    {recentProjects.map((project, index) => (
                                        <div key={index} className="flex items-center justify-between group">
                                            <button className="flex-1 text-left px-3 py-2 text-zinc-500 hover:text-white hover:bg-zinc-900 rounded-lg text-sm transition-colors truncate">
                                                {project}
                                            </button>
                                            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-zinc-800 rounded transition-opacity">
                                                <MoreHorizontal className="w-3 h-3 text-zinc-500" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* New Feature Banner */}
            {!isCollapsed && (
                <div className="p-4 border-t border-zinc-800">
                    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-3 relative">
                        <button className="absolute top-2 right-2 text-zinc-400 hover:text-white">
                            <span className="text-xs">×</span>
                        </button>
                        <div className="flex items-start gap-2">
                            <Star className="w-4 h-4 text-blue-400 mt-0.5" />
                            <div>
                                <p className="text-xs font-medium text-white">New Feature</p>
                                <p className="text-xs text-zinc-400 mt-1">
                                    v0 will now sync across tabs and browsers while messages
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;