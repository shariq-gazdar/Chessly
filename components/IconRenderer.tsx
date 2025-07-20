import { createElement } from "react";
import * as Icons from "lucide-react";

type IconName = keyof typeof Icons;

interface IconRendererProps {
  name: IconName;
  size?: number;
  color?: string;
}

export default function IconRenderer({
  name,
  size = 24,
  color = "currentColor",
}: IconRendererProps) {
  const LucideIcon = Icons[name];
  if (
    typeof LucideIcon === "function" ||
    (typeof LucideIcon === "object" &&
      LucideIcon !== null &&
      "render" in LucideIcon)
  ) {
    return createElement(LucideIcon as React.ElementType, { size, color });
  }
  return null;
}
