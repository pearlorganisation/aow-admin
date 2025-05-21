// src/components/admin/Sidebar.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt, FaListAlt, FaCar, FaStore, FaCalendarDay, FaTools, FaStar,
  FaUsers, FaUserShield, FaUserTie, FaDatabase,
  FaBlog, FaImage, FaQuestionCircle, FaEnvelopeOpenText, FaBullseye,
  FaDollarSign, FaFileInvoiceDollar, FaTags, FaCreditCard, FaHistory,
  FaChartLine, FaMailBulk, FaSearchDollar, FaCog, FaHdd, FaHome, FaBullhorn,
  FaChevronDown, FaChevronRight, FaTimes,
  FaAngleDoubleLeft, FaAngleDoubleRight
} from 'react-icons/fa';
import { MdCategory, MdSettings, MdOutlineAnalytics, MdSecurity, MdRateReview } from 'react-icons/md';

// --- 1. Admin Sidebar Menu Configuration ---
// (Using your provided commented-out version for brevity in this example)
export const adminSidebarMenuItems = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: <FaTachometerAlt />,
    path: '/admin/dashboard',
  },
  {
    id: 'listings',
    name: 'Listings Management',
    icon: <FaListAlt />,
    subItems: [
      { name: 'Vehicle Listings', path: '/admin/listings/vehicles', icon: <FaCar /> },
      { name: 'Directory (Business)', path: '/admin/listings/directory', icon: <FaStore /> },
      { name: 'Event Listings', path: '/admin/listings/events', icon: <FaCalendarDay /> },
    ],
  },
  {
    id: 'users',
    name: 'User Management',
    icon: <FaUsers />,
    subItems: [
      { name: 'All Users', path: '/admin/users/all', icon: <FaUsers /> },
    ],
  },
  // Example of item with subSubItems (if needed)
  // {
  //   id: 'siteContent',
  //   name: 'Site Content & Masters',
  //   icon: <MdSettings />,
  //   subItems: [
  //     { name: 'Master Data', path: '/admin/content/master-data', icon: <FaDatabase />,
  //       subSubItems: [
  //           { name: 'Vehicle Types', path: '/admin/content/master-data/vehicle-types', icon: <FaCar /> },
  //       ]
  //     },
  //     { name: 'Blog Management', path: '/admin/content/blog', icon: <FaBlog /> },
  //   ],
  // },
  {
    id: 'enquiries',
    name: 'Enquiries & Leads',
    icon: <FaQuestionCircle />,
    subItems: [
      { name: 'View Enquiries', path: '/admin/enquiries/view', icon: <FaEnvelopeOpenText /> },
      { name: 'Lead Management', path: '/admin/enquiries/leads', icon: <FaBullseye /> },
    ],
  },
  {
    id: 'reviews',
    name: 'Reviews & Ratings',
    icon: <MdRateReview />,
    path: '/admin/reviews',
  },
  {
    id: 'reports',
    name: 'Analytics & Reporting',
    icon: <MdOutlineAnalytics />,
    subItems: [
      { name: 'Listing Performance', path: '/admin/reports/listings', icon: <FaChartLine /> },
      { name: 'User Engagement', path: '/admin/reports/users', icon: <FaChartLine /> },
    ],
  },
];

// --- Helper Function to Check Active State ---
const isUrlActive = (location, path) => {
  if (!path) return false;
  return location.pathname === path || location.pathname.startsWith(path + '/');
};

const isChildActive = (location, childItems) => {
  if (!childItems) return false;
  return childItems.some(child =>
    isUrlActive(location, child.path) || isChildActive(location, child.subItems || child.subSubItems)
  );
};


// --- 2. SidebarItem Helper Component ---
const SidebarItem = ({ item, toggleSidebarOnMobile, level = 0, isSidebarCollapsed }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const location = useLocation();

  const hasChildren = (item.subItems && item.subItems.length > 0) || (item.subSubItems && item.subSubItems.length > 0);

  // Effect to auto-open submenu if a child is active and sidebar is expanded
  useEffect(() => {
    if (!isSidebarCollapsed && hasChildren && isChildActive(location, item.subItems || item.subSubItems)) {
      setIsSubmenuOpen(true);
    } else {
      setIsSubmenuOpen(false); // Close if sidebar collapses or no child is active
    }
  }, [location.pathname, isSidebarCollapsed, hasChildren, item.subItems, item.subSubItems, location]);


  const handleToggleSubmenu = (e) => {
    e.stopPropagation();
    if (isSidebarCollapsed && hasChildren) { // Prevent opening submenu in collapsed mode by clicking the item itself
      return;
    }
    if (hasChildren) {
      setIsSubmenuOpen(!isSubmenuOpen);
    } else if (toggleSidebarOnMobile) { // For direct links in mobile overlay
      toggleSidebarOnMobile();
    }
  };

  // Determine if the item itself or one of its children is active for highlighting
  const isActive = isUrlActive(location, item.path) || (!item.path && hasChildren && isChildActive(location, item.subItems || item.subSubItems));

  // Styling
  const paddingLeft = `${(isSidebarCollapsed ? 0.75 : 1) + level * (isSidebarCollapsed ? 0 : 1.25)}rem`; // No indent for children in collapsed
  const itemHeightClass = "py-2.5"; // Consistent height
  const iconContainerClass = `flex-shrink-0 ${isSidebarCollapsed ? 'w-full justify-center' : 'mr-3'}`;
  const iconSizeClass = isSidebarCollapsed ? 'text-xl' : 'text-lg';
  const commonItemClasses = `w-full flex items-center ${itemHeightClass} px-3 text-sm font-medium rounded-lg transition-all duration-150`;
  const activeClasses = 'bg-sky-600 text-white';
  const inactiveClasses = 'text-gray-300 hover:bg-gray-700 hover:text-white';


  // Render logic for items with children (subItems or subSubItems)
  if (hasChildren) {
    return (
      <li className=''>
        <button
          onClick={handleToggleSubmenu}
          style={{ paddingLeft: isSidebarCollapsed && level > 0 ? `${(0.75 + (level-1) * 0)}rem` : paddingLeft }} // No extra indent for sub-items in collapsed
          title={isSidebarCollapsed ? item.name : ""}
          className={`${commonItemClasses} ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} ${isActive ? activeClasses : inactiveClasses}`}
          aria-expanded={isSubmenuOpen}
        >
          <span className={`flex items-center ${isSidebarCollapsed ? 'w-full justify-center' : ''}`}>
            {item.icon && <span className={`${iconContainerClass} ${iconSizeClass}`}>{item.icon}</span>}
            {!isSidebarCollapsed && <span className="truncate">{item.name}</span>}
          </span>
          {!isSidebarCollapsed && (isSubmenuOpen ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />)}
        </button>

        {/* Submenu UL: Render only if expanded and submenu is open */}
        {(!isSidebarCollapsed && isSubmenuOpen) && (
          <ul className="mt-1 space-y-1">
            {(item.subItems || []).map(subItem => (
              <SidebarItem key={subItem.path || subItem.name} item={subItem} toggleSidebarOnMobile={toggleSidebarOnMobile} level={level + 1} isSidebarCollapsed={isSidebarCollapsed} />
            ))}
            {/* Handle subSubItems if they exist directly under this item (like 'Master Data' example) */}
            {(item.subSubItems || []).map(subSubItem => (
               <SidebarItem key={subSubItem.path || subSubItem.name} item={subSubItem} toggleSidebarOnMobile={toggleSidebarOnMobile} level={level + 1} isSidebarCollapsed={isSidebarCollapsed} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  // Render logic for direct link items (no children)
  return (
    <li >
      <NavLink
        to={item.path || '#'} // Fallback path
        style={{ paddingLeft }}
        title={isSidebarCollapsed ? item.name : ""}
        className={({ isActive: isNavLinkActive }) =>
          `${commonItemClasses} ${isSidebarCollapsed ? 'justify-center' : ''} ${isNavLinkActive ? activeClasses : inactiveClasses}`
        }
        onClick={item.path ? toggleSidebarOnMobile : (e) => e.preventDefault()} // Prevent click if no path, otherwise toggle mobile
      >
        {item.icon && <span className={`${iconContainerClass} ${iconSizeClass}`}>{item.icon}</span>}
        {!isSidebarCollapsed && <span className="truncate">{item.name}</span>}
      </NavLink>
    </li>
  );
};


// --- 3. Main Sidebar Component ---
const Sidebar = ({ isMobileSidebarOpen, toggleMobileSidebar }) => { // Renamed props for clarity
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  const handleToggleDesktopCollapse = () => {
    setIsDesktopCollapsed(!isDesktopCollapsed);
  };

  return (
    <div className='h-screen  bg-yellow-100'>
      {/* Mobile Overlay: controlled by isMobileSidebarOpen */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden" // Darker overlay
          onClick={toggleMobileSidebar}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-40  h-full bg-gray-800 text-white transform transition-all duration-300 ease-in-out
                   flex flex-col
                   ${isMobileSidebarOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'} 
                   lg:translate-x-0 lg:static lg:inset-0 lg:shadow-none
                   ${isDesktopCollapsed ? 'lg:w-20' : 'lg:w-64'}`} // Slightly narrower expanded width
      >
        {/* Sidebar Header with Logo and Toggle Button */}
        <div className={`p-4 flex items-center border-b border-gray-700 min-h-[4rem] transition-all duration-300 ease-in-out ${isDesktopCollapsed ? 'justify-center' : 'justify-between'}`}>
          <Link 
            to="/admin/dashboard" 
            title="Dashboard" 
            className={`font-semibold text-sky-400 transition-opacity duration-300 ${isDesktopCollapsed ? 'text-2xl' : 'text-lg'}`} // Adjusted collapsed size
          >
            {isDesktopCollapsed ? <FaCar /> : 'MotorsNoLimit'} {/* Shorter name */}
          </Link>

          {/* Desktop Collapse/Expand Button (Top) */}
          <button
            onClick={handleToggleDesktopCollapse}
            className="hidden lg:flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            title={isDesktopCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label={isDesktopCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isDesktopCollapsed ? <FaAngleDoubleRight size={16} /> : <FaAngleDoubleLeft size={16} />} {/* Smaller icons */}
          </button>

          {/* Mobile Close Button (for mobile overlay) */}
          <button
            onClick={toggleMobileSidebar}
            className="text-gray-400 hover:text-white lg:hidden"
            aria-label="Close mobile sidebar"
          >
            <FaTimes size={22} />
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <nav className="flex-grow mt-3 px-2 overflow-y-auto pb-4"> {/* Reduced mt */}
          <ul className="space-y-1"> {/* Reduced space */}
            {adminSidebarMenuItems.map(item => (
              <SidebarItem
                key={item.id || item.name} // Use item.name as fallback key
                item={item}
                toggleSidebarOnMobile={toggleMobileSidebar}
                isSidebarCollapsed={isDesktopCollapsed}
              />
            ))}
          </ul>
        </nav>

        {/* Footer (optional, can be removed if top toggle is enough) */}
        <div className="p-2 mt-auto border-t border-gray-700 min-h-[3.5rem] flex items-center justify-center">
          <button
            onClick={handleToggleDesktopCollapse}
            className="hidden lg:flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg w-full"
            title={isDesktopCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isDesktopCollapsed ? <FaAngleDoubleRight size={16}/> : <FaAngleDoubleLeft size={16} />}
            {!isDesktopCollapsed && <span className="ml-2 text-xs whitespace-nowrap">Collapse</span>}
          </button>
           <div className="lg:hidden text-center text-xs text-gray-500">
             © {new Date().getFullYear()}
           </div>
        </div>
      </aside>
    </div>
  );
};
 
export default Sidebar;