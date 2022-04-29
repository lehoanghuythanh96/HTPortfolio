import {Breadcrumbs, Typography} from "@mui/material";
import React from "react";
import {toggleSnackbar} from "./UI_Snackbar";
import {allRoutes} from "../../models/allRoutes";
import {globalSettings} from "../../environments/environments";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export class MyBreadCrumb extends React.Component<any, any> {

    MyLink = styled(Link)`
      text-decoration: none;
      opacity: 0.7;
      color: ${globalSettings.secondaryTextColor};
    `

    getBreadCrumbs() {
        let currentUrl = window.location.href;
        let currentSuffix = currentUrl.replace(`${window.location.origin}/`, "")
        let allCrumbs = currentSuffix.split("/")
        allCrumbs.forEach(
            (item, index) => {
                if (item.includes("?")) {
                    allCrumbs.splice(index, 1)
                }
            }
        )
        if (allCrumbs.length > 2 || allCrumbs.length === 0) {
            toggleSnackbar.next("Too many or no components (max. 2) in url suffix, breadcrumb is not working")
            return
        }

        let firstItem = allRoutes.find(item => item.path == allCrumbs[0])
        if (!firstItem) {
            toggleSnackbar.next("Initial item not found, breadcrumb is not working")
            return
        }

        let FirstLink = this.MyLink

        if(allCrumbs.length == 1) {
            FirstLink = styled(this.MyLink)`
              opacity: 1;
            `
        }

        let NewBreadcrumb = <FirstLink
            color="inherit"
            to={`/${firstItem.path}`}
        >
            {firstItem.name}
        </FirstLink>

        let CurrentPosition = null;
        let secondItem;

        if (firstItem.children && firstItem.children.length > 0 && allCrumbs[1]) {
            secondItem = firstItem.children.find(item => item.path == allCrumbs[1])
            if (secondItem) {
                CurrentPosition = <Typography color={globalSettings.secondaryTextColor}>
                    {secondItem.name}
                </Typography>
            }
        }

        return (
            <Breadcrumbs aria-label="breadcrumb">
                <this.MyLink color="inherit" to="/">
                    Home
                </this.MyLink>
                {NewBreadcrumb}
                {CurrentPosition}
            </Breadcrumbs>
        )

    }

    render() {
        return (
            <div role="presentation">
                {this.getBreadCrumbs()}
            </div>
        );
    }
}