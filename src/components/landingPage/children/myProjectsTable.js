import React from "react";
import {Divider, ListItemText, MenuItem, MenuList, Typography} from "@mui/material";

export class MyProjectsTable extends React.Component {
    render() {
        return (
            <MenuList>
                <MenuItem>
                    <ListItemText>Cut</ListItemText>
                    <Typography variant="body2" color="text.secondary">
                        ⌘X
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemText>Copy</ListItemText>
                    <Typography variant="body2" color="text.secondary">
                        ⌘C
                    </Typography>
                </MenuItem>
                <MenuItem>
                    <ListItemText>Paste</ListItemText>
                    <Typography variant="body2" color="text.secondary">
                        ⌘V
                    </Typography>
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemText>Web Clipboard</ListItemText>
                </MenuItem>
            </MenuList>
        )
    }
}