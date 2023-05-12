import { caseType } from '../model/caseType'
import { connectToDatabase } from '../src/server';

let time = new Date(Date.now());
export class CaseService {
    async createCase(caseType : caseType) {
        var pool = await connectToDatabase();
        try {
            return await pool.request().query(`insert into caseDetails (caseTitle, caseDescription, natureOfComplaint, moreOptions, remarks, caseProgress, dateOfReceipt, dateOfAcknowledgement, substantiveReply) values 
        (N'${caseType.caseTitle}', N'${caseType.caseDescription}', '${caseType.natureOfComplaint}', '${caseType.moreOptions}', N'${caseType.remarks}', '${caseType.caseProgress}', '${caseType.dateOfReceipt}', '${caseType.dateOfAcknowledgement}','${caseType.substantiveReply}')`);
          } catch (err) {
            console.error('Error querying database', err);
          } finally {
            pool.close();
          }
    }
}