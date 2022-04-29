import React from "react";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {Snackbar} from "@mui/material";

export const toggleSnackbar = new BehaviorSubject<string>("")

interface MyState {
    isOpen: boolean
    message: string
}

export class UI_Snackbar extends React.Component {

    state: MyState = {
        isOpen: false,
        message: ""
    }

    destroy$ = new Subject();

    componentDidMount() {
        toggleSnackbar.pipe(
            takeUntil(this.destroy$)
        ).subscribe(
            res => {
                if(res !== "") {
                    this.setState({isOpen: true, message: res})
                }
            }
        )
    }

    componentWillUnmount() {
        this.destroy$.next(false)
        this.destroy$.unsubscribe()
    }

    render() {
        return(
            <Snackbar
                open={this.state.isOpen}
                autoHideDuration={3000}
                message={this.state.message}
                onClose={() => this.setState({isOpen: false})}
                anchorOrigin={{ vertical: "bottom", horizontal: "center"}}
            />
        )
    }
}