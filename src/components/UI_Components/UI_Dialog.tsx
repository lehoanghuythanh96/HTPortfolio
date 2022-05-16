import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import styled from "@emotion/styled";
import {BehaviorSubject, skipWhile, Subject, takeUntil} from "rxjs";

const MyDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialog-paper': {
        backgroundColor: "transparent",
        overflow: "initial",
        boxShadow: "none"
    }
}));

class DefaultContent extends React.Component {
    render() {
        return (<div></div>)
    }
}

export let dialogContent = new BehaviorSubject<React.FunctionComponent | null>(null)
export let toggleDialog = new BehaviorSubject<boolean>(false)

interface myState {
    isOpen: boolean,
    content: React.ComponentClass
}

export class UI_Dialog extends React.Component {

    destroy$ = new Subject<boolean>()

    state: myState = {
        content: DefaultContent,
        isOpen: false
    }

    componentDidMount() {
        toggleDialog.pipe(
            takeUntil(this.destroy$)
        ).subscribe(
            (res) => {
                this.setState({isOpen: res})
            }
        )
        dialogContent.pipe(
            takeUntil(this.destroy$),
            skipWhile(
                x => !x
            )
        ).subscribe(
            (res) => {
                this.setState({content: res})
            }
        )
    }

    componentWillUnmount() {
        this.destroy$.next(false)
        this.destroy$.unsubscribe()
    }

    render() {
        return (
            <div>
                <MyDialog
                    aria-labelledby="customized-dialog-title"
                    open={this.state.isOpen}
                    onClose={() => {this.setState({isOpen: false})}}
                >
                    <this.state.content></this.state.content>
                </MyDialog>
            </div>
        );
    }

}