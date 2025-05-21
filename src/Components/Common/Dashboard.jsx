// src/components/admin/Sidebar.jsx

import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt, FaListAlt, FaCar, FaStore, FaCalendarDay, FaTools, FaStar,
  FaUsers, FaUserShield, FaUserTie, FaDatabase,
  FaBlog, FaImage, FaQuestionCircle, FaEnvelopeOpenText, FaBullseye,
  FaDollarSign, FaFileInvoiceDollar, FaTags, FaCreditCard, FaHistory,
  FaChartLine, FaMailBulk, FaSearchDollar, FaCog, FaHdd, FaHome, FaBullhorn,
  FaChevronDown, FaChevronRight, FaTimes,
  FaAngleDoubleLeft, FaAngleDoubleRight, FaCheckCircle // Added FaCheckCircle
} from 'react-icons/fa';
import { MdCategory, MdSettings, MdOutlineAnalytics, MdSecurity, MdRateReview } from 'react-icons/md';

// --- 1. Admin Sidebar Menu Configuration ---
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
    icon: <FaListAlt />, // Icon for general listing management
    subItems: [
      { name: 'Vehicle Listings', path: '/admin/listings/unverified/vehicles', icon: <FaCar /> },
      { name: 'Business Directory', path: '/admin/listings/directory', icon: <FaStore /> }, // Corrected "Directory (Business)"
      { name: 'Event Listings', path: '/admin/listings/unverified/events', icon: <FaCalendarDay /> },
    ],
  },
  {
    id: 'approvedListings',
    name: 'Approved Listings', // Corrected name (plural)
    icon: <FaCheckCircle />,   // Changed icon to better reflect "approved"
    subItems: [
      { name: 'Approved Vehicles', path: '/admin/listings/verified/vehicles', icon: <FaCar /> }, // Corrected name
      { name: 'Approved Events', path: '/admin/listings/verified/events', icon: <FaCalendarDay /> }, // Corrected name
      // Consider adding Approved Business Directory if it makes sense for your workflow:
      // { name: 'Approved Businesses', path: '/admin/listings/verified/directory', icon: <FaStore /> },
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
  // {
  //   id: 'enquiries',
  //   name: 'Enquiries & Leads',
  //   icon: <FaQuestionCircle />,
  //   subItems: [
  //     { name: 'View Enquiries', path: '/admin/enquiries/view', icon: <FaEnvelopeOpenText /> },
  //     { name: 'Lead Management', path: '/admin/enquiries/leads', icon: <FaBullseye /> },
  //   ],
  // },
  // {
  //   id: 'reviews',
  //   name: 'Reviews & Ratings',
  //   icon: <MdRateReview />,
  //   path: '/admin/reviews',
  // },
  // {
  //   id: 'reports',
  //   name: 'Analytics & Reporting',
  //   icon: <MdOutlineAnalytics />,
  //   subItems: [
  //     { name: 'Listing Performance', path: '/admin/reports/listings', icon: <FaChartLine /> },
  //     { name: 'User Engagement', path: '/admin/reports/users', icon: <FaChartLine /> },
  //   ],
  // },
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

  useEffect(() => {
    if (!isSidebarCollapsed && hasChildren && isChildActive(location, item.subItems || item.subSubItems)) {
      setIsSubmenuOpen(true);
    } else if (isSidebarCollapsed || !hasChildren || !isChildActive(location, item.subItems || item.subSubItems)) {
      // Close if sidebar collapses, or item has no children, or no child is active
      // This also helps reset the state if navigating away from an active child.
      setIsSubmenuOpen(false);
    }
  }, [location.pathname, isSidebarCollapsed, hasChildren, item.subItems, item.subSubItems, location]);


  const handleToggleSubmenu = (e) => {
    e.stopPropagation();
    if (isSidebarCollapsed && hasChildren) {
      return;
    }
    if (hasChildren) {
      setIsSubmenuOpen(!isSubmenuOpen);
    } else if (toggleSidebarOnMobile) {
      toggleSidebarOnMobile();
    }
  };

  const isActive = isUrlActive(location, item.path) || (!item.path && hasChildren && isChildActive(location, item.subItems || item.subSubItems));

  const paddingLeft = `${(isSidebarCollapsed ? 0.75 : 1) + level * (isSidebarCollapsed ? 0 : 1.25)}rem`;
  const itemHeightClass = "py-2.5";
  const iconContainerClass = `flex-shrink-0 ${isSidebarCollapsed ? 'w-full justify-center' : 'mr-3'}`;
  const iconSizeClass = isSidebarCollapsed ? 'text-xl' : 'text-lg';
  const commonItemClasses = `w-full flex items-center ${itemHeightClass} px-3 text-sm font-medium rounded-lg transition-all duration-150`;
  const activeClasses = 'bg-sky-600 text-white'; // Active state
  const inactiveClasses = 'text-gray-300 hover:bg-gray-700 hover:text-white'; // Inactive state


  if (hasChildren) {
    return (
      <li className=''> 
        <button
          onClick={handleToggleSubmenu}
          style={{ paddingLeft: isSidebarCollapsed && level > 0 ? `${(0.75 + (level-1) * 0)}rem` : paddingLeft }}
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

        {(!isSidebarCollapsed && isSubmenuOpen) && (
          <ul className="mt-1 space-y-1">
            {(item.subItems || []).map(subItem => (
              <SidebarItem key={subItem.path || subItem.name} item={subItem} toggleSidebarOnMobile={toggleSidebarOnMobile} level={level + 1} isSidebarCollapsed={isSidebarCollapsed} />
            ))}
            {(item.subSubItems || []).map(subSubItem => (
               <SidebarItem key={subSubItem.path || subSubItem.name} item={subSubItem} toggleSidebarOnMobile={toggleSidebarOnMobile} level={level + 1} isSidebarCollapsed={isSidebarCollapsed} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  // Render logic for direct link items (no children) - e.g., Dashboard
  return (
    <li> {/* Removed debug className */}
      <NavLink
        to={item.path || '#'}
        // Add 'end' prop if this link should only be active on exact path match, not for sub-paths.
        // Example: end={item.path === '/admin/dashboard'}
        // For dashboard, typically you want it active for exact match OR if it's a parent of other dashboard sections.
        // If '/admin/dashboard' is a standalone page, 'end' can be useful.
        // end 
        style={{ paddingLeft }}
        title={isSidebarCollapsed ? item.name : ""}
        className={({ isActive: isNavLinkActive }) => {
          // --- Debugging Tip for Dashboard "Not Fixed" ---
          // if (item.id === 'dashboard') {
          //   console.log('Dashboard NavLink:', { path: item.path, currentLoc: location.pathname, isNavLinkActive });
          // }
          return `${commonItemClasses} ${isSidebarCollapsed ? 'justify-center' : ''} ${isNavLinkActive ? activeClasses : inactiveClasses}`
        }}
        onClick={item.path ? toggleSidebarOnMobile : (e) => e.preventDefault()}
      >
        {item.icon && <span className={`${iconContainerClass} ${iconSizeClass}`}>{item.icon}</span>}
        {!isSidebarCollapsed && <span className="truncate">{item.name}</span>}
      </NavLink>
    </li>
  );
};


// --- 3. Main Sidebar Component ---
const Sidebar = ({ isMobileSidebarOpen, toggleMobileSidebar }) => {
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  const handleToggleDesktopCollapse = () => {
    setIsDesktopCollapsed(!isDesktopCollapsed);
  };

  return (
    // The div with bg-green-700 seems to be an outer wrapper, not the sidebar itself.
    // The sidebar is <aside className="... bg-gray-800 ...">
    // Ensure this outer div is not causing layout issues or covering the sidebar.
    // For simplicity, assuming it's part of a larger page layout.
    <div className='h-screen '> {/* Removed bg-green-700 if it's not intended for the direct parent of aside */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={toggleMobileSidebar}
          aria-hidden="true"
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 h-full bg-gray-800 text-white transform transition-all duration-300 ease-in-out
                   flex flex-col
                   ${isMobileSidebarOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'} 
                   lg:translate-x-0 lg:static lg:inset-0 lg:shadow-none
                   ${isDesktopCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
        <div className={`p-4 flex items-center border-b border-gray-700 min-h-[4rem] transition-all duration-300 ease-in-out ${isDesktopCollapsed ? 'justify-center' : 'justify-between'}`}>
          <Link 
            to="/admin/dashboard" 
            title="Dashboard" 
            className={`font-semibold text-sky-400 transition-opacity duration-300 ${isDesktopCollapsed ? 'text-2xl' : 'text-lg'}`}
          >
            {isDesktopCollapsed ? <FaCar /> : 'MotorsNoLimit'}
          </Link>

          <button
            onClick={handleToggleDesktopCollapse}
            className="hidden lg:flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
            title={isDesktopCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            aria-label={isDesktopCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isDesktopCollapsed ? <FaAngleDoubleRight size={16} /> : <FaAngleDoubleLeft size={16} />}
          </button>

          <button
            onClick={toggleMobileSidebar}
            className="text-gray-400 hover:text-white lg:hidden"
            aria-label="Close mobile sidebar"
          >
            <FaTimes size={22} />
          </button>
        </div>

        <nav className="flex-grow mt-3 px-2 overflow-y-auto pb-4">
          <ul className="space-y-1">
            {adminSidebarMenuItems.map(item => (
              <SidebarItem
                key={item.id || item.path || item.name} // Ensure unique key, path can be a good fallback
                item={item}
                toggleSidebarOnMobile={toggleMobileSidebar}
                isSidebarCollapsed={isDesktopCollapsed}
              />
            ))}
          </ul>
        </nav>

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