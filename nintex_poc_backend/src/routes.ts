import { Router } from "express";
import { CaseService } from "./service/caseService";
import { CaseController } from "./controller/caseController";


export const routes = Router();

const caseService = new CaseService();
const caseController = new CaseController(caseService);

routes.get('/getCase', caseController.getCase)
routes.get('/getCasebyID/:id', caseController.getCasebyID)
routes.get('/getNumberOfCaseStatus', caseController.getNumberOfCaseStatus)
routes.get('/getCaseMonth', caseController.getCaseMonth)
routes.get('/getDistrict', caseController.getDistrict)
routes.post('/createCase', caseController.createCase)
routes.post('/insertDummyCase', caseController.insertDummyCase)