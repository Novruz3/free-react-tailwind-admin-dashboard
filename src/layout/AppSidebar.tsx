import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import { LiaHomeSolid } from "react-icons/lia";
import {
  TbCategory2,
  TbMessageExclamation,
  TbBrandDatabricks,
} from "react-icons/tb";
import { RiStoreLine, RiFontSize2, RiShoppingBag4Line } from "react-icons/ri";
import { PiTrash } from "react-icons/pi";
import { BiStore } from "react-icons/bi";

import { ChevronDownIcon } from "../assets/icons";
import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: {
    name: string;
    icon: React.ReactNode;
    path: string;
    pro?: boolean;
    new?: boolean;
  }[];
};

const navItems: NavItem[] = [
  {
    icon: <LiaHomeSolid />,
    name: "Home",
    subItems: [
      { icon: <BiStore />, name: "Shops", path: "/", pro: false },
      {
        icon: <RiShoppingBag4Line />,
        name: "Products",
        path: "/products",
        pro: false,
      },
    ],
  },
  { icon: <TbCategory2 />, name: "Categories", path: "/categories" },
  { icon: <RiStoreLine />, name: "Shop Centers", path: "/shopCenters" },
  { icon: <RiFontSize2 />, name: "Sizes", path: "/sizes" },
  { icon: <TbMessageExclamation />, name: "Complaints", path: "/complaints" },
  { icon: <TbBrandDatabricks />, name: "Brands", path: "/brands" },
  { name: "Trash", icon: <PiTrash />, path: "/trash" },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main";
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  const isParentActive = (nav: NavItem) =>
    nav.subItems?.some((s) => s.path === location.pathname);

  useEffect(() => {
    navItems.forEach((nav, index) => {
      if (nav.subItems && isParentActive(nav)) {
        setOpenSubmenu({ type: "main", index });
      }
    });
  }, [location.pathname]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `main-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prev) =>
      prev?.index === index ? null : { type: "main", index }
    );
  };

  const renderMenuItems = (items: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index)}
              className={`menu-item group ${
                isParentActive(nav) || openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              }`}
            >
              <span
                className={`menu-item-icon-size ${
                  isParentActive(nav) || openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>

              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}

              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>

                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}

          {nav.subItems &&
            openSubmenu?.index === index &&
            (isExpanded || isHovered || isMobileOpen) && (
              <div
                ref={(el) => {
                  subMenuRefs.current[`main-${index}`] = el;
                }}
                className="overflow-hidden transition-all duration-300"
                style={{
                  height:
                    openSubmenu?.index === index
                      ? `${subMenuHeight[`main-${index}`]}px`
                      : "0px",
                }}
              >
                <ul className="mt-2 space-y-1 ml-9">
                  {nav.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        to={subItem.path}
                        className={`menu-dropdown-item ${
                          isActive(subItem.path)
                            ? "menu-dropdown-item-active"
                            : "menu-dropdown-item-inactive"
                        }`}
                      >
                        <span
                          className={`menu-item-icon-size ${
                            isActive(subItem.path)
                              ? "menu-item-icon-active"
                              : "menu-item-icon-inactive"
                          }`}
                        >
                          {subItem.icon}
                        </span>
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 h-screen border-r transition-all duration-300 z-50
        ${isExpanded || isHovered || isMobileOpen ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          <img
            src="/images/logo/logo-icon.svg"
            alt="Logo"
            width={32}
            height={32}
          />
        </Link>
      </div>

      <div className="flex flex-col overflow-y-auto no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">{renderMenuItems(navItems)}</div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
