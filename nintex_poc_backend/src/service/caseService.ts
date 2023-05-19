import { connectToDatabase } from '../../src/server';

type caseType = {
  GUID: string,
  caseTitle: string,
  caseDescription: string,
  natureOfComplaint: string,
  moreOptions: string,
  remarks: string,
  caseProgress: string,
  dateOfReceipt: string,
  dateOfAcknowledgement: string,
  substantiveReply: string,
}

let time = new Date(Date.now());
export class CaseService {
    async createCase(caseType : caseType) {
        var pool = await connectToDatabase();
        try {
            return await pool.request().query(`insert into caseDetails (GUID, caseTitle, caseDescription, natureOfComplaint, moreOptions, remarks, caseProgress, dateOfReceipt, dateOfAcknowledgement, substantiveReply) values 
        ('${caseType.GUID}', N'${caseType.caseTitle}', N'${caseType.caseDescription}', '${caseType.natureOfComplaint}', '${caseType.moreOptions}', N'${caseType.remarks}', '${caseType.caseProgress}', '${caseType.dateOfReceipt}', '${caseType.dateOfAcknowledgement}','${caseType.substantiveReply}')`);
          } catch (err) {
            console.error('Error (createCase)', err);
          } finally {
            pool.close();
          }
    }

    async getCase() {
      let pool = await connectToDatabase();
      try {
          return await pool.request().query(`select * from caseDetails`)
      }catch (err) {
            console.error('Error (getCase)', err);
          } finally {
            pool.close();
          }
    }

    async getCasebyID(id: number | string) {
      let pool = await connectToDatabase();
      try {
          return await pool.request().query(`select * from caseDetails where id = ${id}`)
      }catch (err) {
            console.error('Error (getCase)', err);
          } finally {
            pool.close();
          }
    }
}