import {useQuery} from "@apollo/client";
import {graphQLqueries} from "../../store/graphQLqueries.list";
import {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import {TableWithSelection} from "../UI_Components/Tables/TableWithSelection";
import {HeadCell} from "../../models/tableUI.interface";

export const AdminAllPostTable = () => {

    let adminQuery = useQuery(graphQLqueries.AdminPanelQuery,
        {
            fetchPolicy: "cache-and-network"
        }
    )

    let headCells : HeadCell[] = [
        {
            id: 'id',
            numeric: false,
            hidden: true,
            disablePadding: false,
            label: 'ID',
        },
        {
            id: 'postTitle',
            numeric: false,
            hidden: false,
            disablePadding: false,
            label: 'Title',
        },
        {
            id: 'postDate',
            numeric: false,
            hidden: false,
            disablePadding: false,
            label: 'Date',
        }
    ]

    let [tableData, setTableData] = useState<any[]>([])

    let afterDeleteRowFn = () => {
        adminQuery.refetch()
    }

    useEffect(
        () => {
            let data : any[] = adminQuery.data?.adminPanel?.allBlogPosts
            if (!data) {
                return
            }

            if (data) {
                data = data.map((item) => {
                    let copy = {...item}
                    if (copy.postDate) {
                        let d = new Date(copy.postDate)
                        if (d.toLocaleString()) {
                            copy.postDate = d.toLocaleString()
                        }
                    }
                    return copy
                })
                setTableData (data)
            }

            if(adminQuery.error) {console.log(adminQuery.error)}
        },
        [adminQuery]
    )

    return (
        <Container>
            <Row>
                <Col>
                    <TableWithSelection
                        headCells={headCells}
                        rows = {tableData}
                        rowMainKey={'id'}
                        deleteRowApiUrlSuffix={"blog/post/deletebyids/"}
                        afterDeleteRowFn={afterDeleteRowFn}
                    />
                </Col>
            </Row>
        </Container>
    )

}