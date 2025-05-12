import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";

const iconLibraries = {
  md: MdIcons,
  fa: FaIcons,
  ai: AiIcons,
  bs: BsIcons,
};

const IconRenderer = ({ icon, className = "text-xl" }) => {
  // If icon is already a component (like MdOutlineDashboardCustomize), just render it
  if (typeof icon === "function") {
    const Component = icon;
    return <Component className={className} />;
  }

  // Handle emoji or string name
  if (!icon || typeof icon !== "string") return null;

  // Emoji fallback
  if (!icon.includes("Md") && !icon.includes("Fa") && !icon.includes("Ai") && !icon.includes("Bs")) {
    return <span className={className}>{icon}</span>;
  }

  const prefix = icon.slice(0, 2).toLowerCase();
  const IconLib = iconLibraries[prefix];
  const IconComponent = IconLib?.[icon];

  return IconComponent ? <IconComponent className={className} /> : <span className={className}>{icon}</span>;
};

export default IconRenderer;
