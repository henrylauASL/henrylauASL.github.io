import { Router } from "express";
import express from 'express';
import { CaseController } from "../controller/caseController";
import { CaseService } from "../service/caseService";

export const routes = Router();

const caseService = new CaseService();
const caseController = new CaseController(caseService);

routes.post('/createCase', caseController.createCase)