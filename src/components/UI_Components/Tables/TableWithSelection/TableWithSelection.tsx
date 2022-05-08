import {setSearchKey$, setSearchTerm$, TableWithSelection_Body} from "./TableWithSelection_Body";
import {HeadCell} from "../../../../models/tableUI.interface";
import {Col, Container, Row} from "react-bootstrap";
import {UI_Input} from "../../UI_Input";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import * as React from "react";
import {Subject, takeUntil} from "rxjs";
import {useEffect, useState} from "react";

interface TableWithSelectionProps {
    headCells: HeadCell[],
    tableData: any[],
    rowMainKey: string,
    deleteRowApiUrlSuffix?: string
    afterDeleteRowFn?: () => void
}

export const TableWithSelection = (props: TableWithSelectionProps) => {

    let {headCells, tableData, rowMainKey, deleteRowApiUrlSuffix, afterDeleteRowFn} = props

    const [searchTerm, setSearchTerm] = useState<string>("")

    let destroy$ = new Subject()

    useEffect(
        () => {
            setSearchTerm$.pipe(
                takeUntil(destroy$)
            ).subscribe(
                res => {
                    setSearchTerm(res)
                }
            )

            let data = [...headCells.filter(
                item => item.filter
            )]
            if (data.length > 0) {
                setSearchTerm$.next(data[0].id)
            }

            return () => {
                destroy$.next(true)
                destroy$.unsubscribe()
            }
        }, [headCells]
    )

    const SearchBar = () => {
        return (
            <Row>
                <Col>
                    <UI_Input
                        onChange={(e) => setSearchKey$.next(e.target.value)}
                        label="Keyword"
                    />
                </Col>
                <Col>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Search Term</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={searchTerm}
                            label="Search by..."
                            onChange={(e: any) => setSearchTerm$.next(e.target.value)}
                        >
                            {
                                headCells.filter(
                                    item => item.filter
                                ).map(
                                    (item, i) => (
                                        <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                                    )
                                )
                            }
                        </Select>
                    </FormControl>
                </Col>
            </Row>
        )
    }

    return (
        <Container className="p-0">
            <Row>
                <Col>
                    <SearchBar/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TableWithSelection_Body {...props}/>
                </Col>
            </Row>
        </Container>
    )
}