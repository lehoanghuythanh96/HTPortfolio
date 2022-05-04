import React, {useEffect, useState} from "react";
import {Box, Divider, Drawer, List, ListItem, ListItemText} from "@mui/material";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {MenuItems} from "../../../../models/menuItems";
import {UserInfo} from "../../../../models/userinfo.interface";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../../store/models/corestore.interface";

export const ToggleLandingPageLefSidebar = new BehaviorSubject(false)

interface MyState {
    isOpen: boolean
    userInfo: UserInfo | null
}

export const LandingPageLeftSidebar = () => {

    let [isOpen, setIsOpen] = useState<boolean>(false)

    let userInfo$ = useSelector((state: AppState) => state.userInfo.data)

    useEffect(
        () => {
        }, [userInfo$]
    )

    let list = () => {
        return (
            <Box
                sx={{width: 250}}
                role="presentation"
            >
                <div className={'container'}>
                    <div className={'row py-2 justify-content-center'}>
                        <div className={'col-auto'}>
                            <img src="/mainHtLogo.png"
                                 width={'40px'}
                                 height={'40px'}
                                 className={'me-2'}
                            />
                            <span className={'fw-bold'}>HT's Porfolio</span>
                        </div>
                    </div>
                </div>
                <Divider></Divider>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                    {
                        MenuItems.map(
                            (item, i) => (

                                item.link ? (
                                    <Link to={item.link} key={i} style={{textDecoration: 'none', color: 'inherit'}}>
                                        <ListItem button onClick={() => item.action()}>
                                            <ListItemText primary={item.name}/>
                                        </ListItem>
                                    </Link>
                                ) : (
                                    <ListItem button key={i} onClick={() => item.action()}>
                                        <ListItemText primary={item.name}/>
                                    </ListItem>
                                )
                            )
                        )
                    }
                </List>
            </Box>
        )
    }

    let destroy$ = new Subject()

    useEffect(
        () => {
            ToggleLandingPageLefSidebar.pipe(
                takeUntil(destroy$)
            ).subscribe(
                val => {
                    setIsOpen(val)
                }
            )

            return () => {
                destroy$.next(true)
                destroy$.unsubscribe()
            }
        }
    )

    return (
        <div>
            <Drawer
                anchor={'left'}
                open={isOpen}
                onClick={() => ToggleLandingPageLefSidebar.next(false)}
            >
                {list()}
            </Drawer>
        </div>
    )
}