import { Router } from "express";
import { CaseService } from "./service/caseService";
import { CaseController } from "./controller/caseController";


export const routes = Router();

const caseService = new CaseService();
const caseController = new CaseController(caseService);

routes.post('/createCase', caseController.createCase)