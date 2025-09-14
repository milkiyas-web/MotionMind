import React, { useState } from 'react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button onClick={toggleSidebar} className="collapse-btn">
        {isCollapsed ? '>' : '<'}
      </button>
      <div className="sidebar-content">
        {/* Original sidebar content goes here */}
      </div>
    </div>
  );
};

export default Sidebar;