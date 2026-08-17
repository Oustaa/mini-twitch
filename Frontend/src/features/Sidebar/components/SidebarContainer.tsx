import type { FC, PropsWithChildren } from "react";

const SidebarContainer: FC<PropsWithChildren> = ({ children }) => {
  return <div className="px-3">{children}</div>;
};

export default SidebarContainer;
