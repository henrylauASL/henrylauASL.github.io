import { caseType } from '../model/caseType'
import * as sql from 'mssql';
import { connectToDatabase } from '../src/server';
export class CaseService {
    async createCase(caseType : caseType) {
        var pool = await connectToDatabase();
        console.log(`${caseType.caseName}`);
        return await pool.request().query(`insert into caseDetails (caseName) values ('${caseType.caseName}')`);
        // return await pool.request().query('SELECT * FROM caseDetails');
    }
}