import React, { useEffect, useState } from "react";
import { RowData, TableSort, TableSortProps } from "../components/TableSort";

const data: TableSortProps['data'] = [
    { GUID: '2', caseID: 'REF-0002', caseTitle: 'john.doe@example.com', caseDescription: 'Acme Inc.', caseProgress: 'New'},
    { GUID: '1', caseID: 'REF-0001', caseTitle: 'john.doe@example.com', caseDescription: 'Acme Inc.', caseProgress: 'New'},
    { GUID: '3', caseID: 'REF-0003', caseTitle: 'john.doe@example.com', caseDescription: 'Acme Inc.', caseProgress: 'New'},
    { GUID: '4', caseID: 'REF-0004', caseTitle: 'john.doe@example.com', caseDescription: 'Acme Inc.', caseProgress: 'New'},
    { GUID: '5', caseID: 'REF-0005', caseTitle: 'john.doe@example.com', caseDescription: 'Acme Inc.', caseProgress: 'New'},

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
            <TableSort data={caseDetails}/>
        </div>
    );
}