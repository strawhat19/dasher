import NavItem from "./NavItem";
import Menuitems from "./MenuItems";
import { Box, List } from "@mui/material";
import React, { useContext } from "react";
import NavGroup from "./NavGroup/NavGroup";
import { usePathname } from "next/navigation";
import { GlobalDataContext } from "@/app/datashare";

const SidebarItems = () => {
  const pathname = usePathname();
  const pathDirect = pathname;

  let { isMobileSidebarOpen, setMobileSidebarOpen } = useContext<any>(GlobalDataContext);

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {Menuitems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;