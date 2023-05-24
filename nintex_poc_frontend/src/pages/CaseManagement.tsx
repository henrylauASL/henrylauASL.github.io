import React, { useEffect, useState } from "react";
import { RowData, TableSort, TableSortProps } from "../components/TableSort";
import { Button } from "@mantine/core";

const data: TableSortProps['data'] = [
    { GUID: '1', 
    caseID: 'REF-0001', 
    caseTitle: 'Bab', 
    caseDescription: 'Acme Inc.', 
    caseProgress: 'New', 
    // dateOfReceipt: '',
    substantiveReply: '2023-03-01',
    PIC:'john.doe@example.com'
}

];

export default function CaseManagement() {
    const [caseDetails, setCaseDetails] = useState<TableSortProps['data']>(data);
    useEffect(()=>{
        fetch(`http://localhost:8000/getCase`)
        .then((res)=>res.json())
        .catch((err)=>({error: String(err)}))
        .then((json)=> {
            setCaseDetails(json.recordset);
        });
    },[])

    return (
        <div>
            <h2>Case Management</h2>
            <Button 
                color="teal" 
                style = {{marginBottom : '5px'}} 
                component="a"
                target="_blank"
                href="https://aslbdemo.workflowcloud.com/forms/cb6c3885-2f11-448c-9acf-383898d1bf4b">
                Add Case
            </Button>
            <TableSort data={caseDetails}/>
        </div>
    );
}