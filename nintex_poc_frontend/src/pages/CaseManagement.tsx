import React from "react";
import { TableSort, TableSortProps } from "../components/TableSort";

const data: TableSortProps['data'] = [
    { caseID: 'REF-0001', caseTitle: 'john.doe@example.com', caseDescription: 'Acme Inc.', caseStatus: 'Pending' },
    { caseID: 'REF-0002', caseTitle: 'john.doe@example.com', caseDescription: 'Acme Inc.', caseStatus: 'Pending' },
    { caseID: 'REF-0003', caseTitle: 'john.doe@example.com', caseDescription: 'Acme Inc.', caseStatus: 'Pending' },
    { caseID: 'REF-0004', caseTitle: 'john.doe@example.com', caseDescription: 'Acme Inc.', caseStatus: 'Pending' },
    { caseID: 'REF-0005', caseTitle: 'john.doe@example.com', caseDescription: 'Acme Inc.', caseStatus: 'Pending' },

];

export default function CaseManagement() {
    return (
        <div>
            <TableSort data={data}/>
        </div>
    );
}