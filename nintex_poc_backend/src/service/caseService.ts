import { connectToDatabase } from "../../src/server";
import * as sql from 'mssql';

type caseType = {
  GUID: string;
  caseTitle: string;
  caseDescription: string;
  natureOfComplaint: string;
  moreOptions: string;
  remarks: string;
  caseProgress: string;
  dateOfReceipt: string;
  // dateOfAcknowledgement: string,
  substantiveReply: string;
  gender: string;
  complainant: string;
  HKID: string;
  passport: string;
  idOrPassport: string;
  country: string;
  phone: string;
  email: string;
  address: string;
  district: string;
  createdBy: string;
  lastModifiedBy: string;
};

export class CaseService {
  async createCase(caseType: caseType) {
    var pool = await connectToDatabase();
    const request = pool.request();
    const {
      GUID,
      caseTitle,
      caseDescription,
      natureOfComplaint,
      moreOptions,
      remarks,
      caseProgress,
      dateOfReceipt,
      substantiveReply,
      gender,
      complainant,
      HKID,
      passport,
      idOrPassport,
      country,
      phone,
      email,
      address,
      district,
      createdBy,
      lastModifiedBy,
    } = caseType;

    try {
      let query = `insert into caseDetails (GUID, caseTitle, caseDescription, natureOfComplaint, moreOptions, remarks, caseProgress, dateOfReceipt, substantiveReply, gender, complainant, HKID, passport, idOrPassport, country, phone, email, address, district, createdBy, lastModifiedBy, PIC) values 
          (@GUID, @caseTitle, @caseDescription, @natureOfComplaint, @moreOptions, @remarks, @caseProgress, @dateOfReceipt,@substantiveReply
            ,@gender, @complainant,@HKID,@passport,@idOrPassport, @country, @phone,@email, @address, @district, @createdBy, @lastModifiedBy, 'Pending')`;
          console.log("User added:", query);
          request.input('GUID', sql.NVarChar, GUID);
          request.input('caseTitle', sql.NVarChar, caseTitle);
          request.input('caseDescription', sql.NVarChar, caseDescription);
          request.input('natureOfComplaint', sql.NVarChar, natureOfComplaint);
          request.input('moreOptions', sql.NVarChar, moreOptions);
          request.input('remarks', sql.NVarChar, remarks);
          request.input('caseProgress', sql.NVarChar, caseProgress);
          request.input('dateOfReceipt', sql.NVarChar, dateOfReceipt);
          request.input('substantiveReply', sql.NVarChar, substantiveReply);
          request.input('gender', sql.NVarChar, gender);
          request.input('complainant', sql.NVarChar, complainant);
          request.input('HKID', sql.NVarChar, HKID);
          request.input('passport', sql.NVarChar, passport);
          request.input('idOrPassport', sql.NVarChar, idOrPassport);
          request.input('country', sql.NVarChar, country);
          request.input('phone', sql.NVarChar, phone);
          request.input('email', sql.NVarChar, email);
          request.input('address', sql.NVarChar, address);
          request.input('district', sql.NVarChar, district);
          request.input('createdBy', sql.NVarChar, createdBy);
          request.input('lastModifiedBy', sql.NVarChar,lastModifiedBy);
      let res = await request.query(query);
      return res;
    } catch (err) {
      console.error("Error (createCase)", err);
    } finally {
      pool.close();
    }
  }

  async getCase() {
    let pool = await connectToDatabase();
    try {
      return await pool
        .request()
        .query(
          `select GUID, caseID, caseTitle, caseDescription, caseProgress, substantiveReply, PIC from caseDetails`
        );
    } catch (err) {
      console.error("Error (getCase)", err);
    } finally {
      pool.close();
    }
  }

  async getCasebyID(id: number | string) {
    let pool = await connectToDatabase();
    try {
      return await pool
        .request()
        .query(`select * from caseDetails where id = ${id}`);
    } catch (err) {
      console.error("Error (getCase)", err);
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
          END`;
      return await pool.request().query(sql);
    } catch (err) {
      console.error("Error (getCase)", err);
      throw err;
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
          MONTH(dateOfReceipt)`;
      return await pool.request().query(sql);
    } catch (err) {
      console.error("Error (getCase)", err);
    } finally {
      pool.close();
    }
  }

  async getDistrict() {
    let pool = await connectToDatabase();
    try {
      let sql = `SELECT district, COUNT (district) as districtCount  FROM caseDetails GROUP BY district`;
      return await pool.request().query(sql);
    } catch (err) {
      console.error("Error (getCase)", err);
    } finally {
      pool.close();
    }
  }

  async insertDummyCase() {
    let pool = await connectToDatabase();
    try {
      // Generate and insert 100 dummy data into the table
      // Next time start at 1001
      for (let i = 101; i <= 1000; i++) {
        const caseTitle = `Dummy Case ${i}`;
        const result = await pool.query(
          `INSERT INTO caseDetails (caseTitle, caseDescription, substantiveReply, caseProgress, PIC) VALUES ('${caseTitle}', 'Dummy Case', '2023-05-30', 'other', 'Dummy')`
        );
        console.log(`Inserted case ${i}: ${result.rowsAffected} row(s)`);
      }
      return 200;
    } catch (err) {
      console.error("Error (getCase)", err);
    } finally {
      pool.close();
    }
  }
}
