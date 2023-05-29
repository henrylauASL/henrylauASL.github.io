import React, { useEffect, useState } from "react";
import { RowData, TableSort, TableSortProps } from "../components/TableSort";
import { Button } from "@mantine/core";
import * as XLSX from 'xlsx';
import { api_origin } from "../Api";



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
        fetch(`${api_origin}/getCase`)
        .then((res)=>res.json())
        .catch((err)=>({error: String(err)}))
        .then((json)=> {
            setCaseDetails(json.recordset);
        });
    },[])

    const exportExcel = () => {
        const daytime = Date().toLocaleString()
        const worksheet = XLSX.utils.json_to_sheet(caseDetails);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, `Report ${daytime}.xlsx`);
    }

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
            <Button 
                color="yellow" 
                style = {{marginBottom : '5px', marginLeft : '5px'}} 
                onClick={exportExcel}>
                Export Case
            </Button>
            <TableSort data={caseDetails}/>
        </div>
    );
}