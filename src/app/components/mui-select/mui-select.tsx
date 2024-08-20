import { year } from "../../../../server";
import { MenuItem, Select } from "@mui/material";

export const MuiSelect = () => (
    <Select
        value={2}
        size={`small`}
        id={`month-dd`}
        labelId={`month-dd`}
    >
        <MenuItem id={`dateVal1`} value={1}>
            March {year}
        </MenuItem>
        <MenuItem id={`dateVal2`} value={2}>
            April {year}
        </MenuItem>
        <MenuItem id={`dateVal3`} value={3}
            >May {year}
        </MenuItem>
    </Select>
)