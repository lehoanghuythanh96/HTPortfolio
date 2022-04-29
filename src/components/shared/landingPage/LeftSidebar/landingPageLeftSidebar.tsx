import React from "react";
import {BottomNavigationAction, Box, Divider, Drawer, List, ListItem, ListItemText} from "@mui/material";
import {BehaviorSubject, skipWhile, Subject, takeUntil} from "rxjs";
import {MenuItems} from "../../../../models/menuItems";
import HTMLReactParser from "html-react-parser";
import {UserInfo} from "../../../../models/userinfo.interface";
import {userInfo} from "os";
import {CoreStore} from "../../../../store/core.store";
import {Link} from "react-router-dom";

export const ToggleLandingPageLefSidebar = new BehaviorSubject(false)

interface MyState {
    isOpen: boolean
    userInfo: UserInfo | null
}

export class LandingPageLefSidebar extends React.Component <any, MyState> {

    state: MyState = {
        isOpen: false,
        userInfo: null
    }

    constructor(props: any) {
        super(props);
    }

    list = () => {
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

    destroy$ = new Subject()

    componentDidMount() {
        ToggleLandingPageLefSidebar.pipe(
            takeUntil(this.destroy$)
        ).subscribe(
            val => {
                this.setState({isOpen: val})
            }
        )

        CoreStore.userInfo$.pipe(
            takeUntil(this.destroy$),
            skipWhile(x => !x)
        ).subscribe(
            res => {
                this.setState({userInfo: res})
            }
        )
    }

    componentWillUnmount() {
        this.destroy$.next(true)
        this.destroy$.unsubscribe()
    }

    render() {
        return (
            <div>
                <Drawer
                    anchor={'left'}
                    open={this.state.isOpen}
                    onClick={() => ToggleLandingPageLefSidebar.next(false)}
                >
                    {this.list()}
                </Drawer>
            </div>
        )
    }
}