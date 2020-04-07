import { Box } from "@material-ui/core";
import React from "react";
import { PanelForm } from "./PanelForm";

export function Panels({ panels, active }) {
  return (
    <>
      {panels.map((panel, idx) => (
        <Box key={idx} mb={1}>
          <PanelForm isActive={active === idx} panel={panel} index={idx} />
        </Box>
      ))}
    </>
  );
}
