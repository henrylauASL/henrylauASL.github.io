import React, { useEffect, useState } from "react";
import { RowData, TableSort, TableSortProps } from "../components/TableSort";
import { Button, NativeSelect } from "@mantine/core";
import * as XLSX from 'xlsx';
import { api_origin } from "../Api";
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';


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
    caseID : '', 
    caseTitle: '', 
    caseDescription: '', 
    caseProgress: '', 
    substantiveReply: '',
    PIC:''
}

];

export default function CaseManagement() {
    const [caseDetails, setCaseDetails] = useState<TableSortProps['data']>(data);
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    useEffect(()=>{
        fetch(`${api_origin}/getCase`)
        .then((res)=>res.json())
        .catch((err)=>({error: String(err)}))
        .then((json)=> {
            setCaseDetails(json.recordset);
        });
    },[])

    let dataSet = caseDetails.map((x)=>({
        'Case ID' : x.caseID,
        'Case Description' : x.caseDescription,
        'Case Progress' : x.caseProgress,
        'Substantive Reply Date' : x.substantiveReply.slice(0, 10),
        'PIC' : x.PIC,
    }))


     const exportExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(dataSet);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, `Case List ${dateTimeString}.xlsx`);
    }

    return (
        <div>
            <h2>Case Management</h2>
            <div style={{display:'flex'}}>
            {/* <NativeSelect
                style = {{marginBottom : '5px',  marginRight : '5px'}} 
                data={['Please Select', 'Completed', 'In progress', 'New', 'Suspended']}
                label="Case Status"
                maw={200}
            />
            <DatePickerInput
                style = {{marginBottom : '5px',  marginRight : '5px'}}
                type="range"
                label="Pick dates range"
                placeholder="Pick dates range"
                value={value}
                onChange={setValue}
                maw={400}
            /> */}
            </div>
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

