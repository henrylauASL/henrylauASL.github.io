import React, { useEffect, useState } from "react";
import { RowData, TableSort, TableSortProps } from "../components/TableSort";
import { Button, NativeSelect } from "@mantine/core";
import * as XLSX from 'xlsx';
import { api_origin } from "../Api";


const currentDate = new Date();
const day = currentDate.getDate().toString().padStart(2, '0');
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const year = currentDate.getFullYear().toString();
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const seconds = currentDate.getSeconds().toString().padStart(2, '0');

const dateTimeString = `${year}-${month}-${day} ${hours}${minutes}${seconds}`;

const data: TableSortProps['data'] = [
    { GUID: '', 
    caseID: '', 
    caseTitle: '', 
    caseDescription: '', 
    caseProgress: '', 
    substantiveReply: '',
    PIC:''
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
        const worksheet = XLSX.utils.json_to_sheet(caseDetails);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, `Case List ${dateTimeString}.xlsx`);
    }

    return (
        <div>
            <h2>Case Management</h2>
            <Button 
                color="teal" 
                style = {{marginBottom : '5px'}} 
                component="a"
                target="_blank"
                href="https://aslbdemo.workflowcloud.com/forms/c3e6e690-28a8-4351-add2-7ed7ea9d43a7">
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