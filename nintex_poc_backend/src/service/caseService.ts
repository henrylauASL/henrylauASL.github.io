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
  // dateOfAcknowledgement: string,
  substantiveReply: string,
  gender: string,
  complainant: string,
  HKID: string,
  passport: string,
  idOrPassport: string,
  country: string,
  phone: string,
  email: string,
  address: string,  
  district: string,
  createBy: string,
  lastModifiedBy: string
}

export class CaseService {
    async createCase(caseType : caseType) {
        var pool = await connectToDatabase();
        try {
          let sql = `insert into caseDetails (GUID, caseTitle, caseDescription, natureOfComplaint, moreOptions, remarks, caseProgress, dateOfReceipt, substantiveReply, gender, complainant, HKID, passport, idOrPassport, country, phone, email, address, district, createdBy, lastModifiedBy, PIC) values 
          ('${caseType.GUID}', N'${caseType.caseTitle}', N'${caseType.caseDescription}', '${caseType.natureOfComplaint}', '${caseType.moreOptions}'
          , N'${caseType.remarks}', '${caseType.caseProgress}', '${caseType.dateOfReceipt}','${caseType.substantiveReply}','${caseType.gender}', N'${caseType.complainant}','${caseType.HKID}','${caseType.passport}','${caseType.idOrPassport}', '${caseType.country}', '${caseType.phone}','${caseType.email}', N'${caseType.address}', '${caseType.district}', '${caseType.createBy}', '${caseType.lastModifiedBy}', 'Pending')`
          console.log(sql)
            return await pool.request().query(sql);
          } catch (err) {
            console.error('Error (createCase)', err);
          } finally {
            pool.close();
          }
    }

    async getCase() {
      let pool = await connectToDatabase();
      try {
          return await pool.request().query(`select GUID, caseID, caseTitle, caseDescription, caseProgress, dateOfReceipt, substantiveReply, PIC from caseDetails`)
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

    async getNumberOfCaseStatus() {
      let pool = await connectToDatabase();
      try {
          let sql = `SELECT 
          COUNT(*) AS totalCases, 
          caseProgress, 
          COUNT(caseProgress) AS progressCount
        FROM 
          caseDetails 
        GROUP BY 
          caseProgress
        ORDER BY 
          CASE caseProgress
            WHEN 'Completed' THEN 1
            WHEN 'In Progress' THEN 2
            WHEN 'New' THEN 3
            WHEN 'Suspended' THEN 4
            ELSE 5
          END`
          return await pool.request().query(sql)
      }catch (err) {
            console.error('Error (getCase)', err);
          } finally {
            pool.close();
          }
    }

    async getCaseMonth() {
      let pool = await connectToDatabase();
      try {
          let sql = `SELECT
          YEAR(dateOfReceipt) AS year,
          MONTH(dateOfReceipt) AS month,
          COUNT(*) AS num_records
        FROM
          caseDetails
        WHERE YEAR(dateOfReceipt) = 2023
        GROUP BY
          YEAR(dateOfReceipt),
          MONTH(dateOfReceipt)
        ORDER BY
          YEAR(dateOfReceipt),
          MONTH(dateOfReceipt)`
          return await pool.request().query(sql)
      }catch (err) {
            console.error('Error (getCase)', err);
          } finally {
            pool.close();
          }
    }

    async getDistrict() {
      let pool = await connectToDatabase();
      try {
          let sql = `SELECT district, COUNT (district) as districtCount  FROM caseDetails GROUP BY district`
          return await pool.request().query(sql)
      }catch (err) {
            console.error('Error (getCase)', err);
          } finally {
            pool.close();
          }
    }
}