import { Request, Response } from 'express';
import { CaseService } from '../service/caseService';

export class CaseController {
    constructor(private caseService: CaseService){}
    createCase = async (req: Request, res: Response) => {
        try{
            console.log("body", req.body);
            return res.json(await this.caseService.createCase(req.body))
        }
        catch (err){
            return res.status(500).json({msg: err})
        }
    }

    getCase = async (req: Request, res: Response) => {
        try{
            return res.json(await this.caseService.getCase())
        }
        catch (err){
            return res.status(500).json({msg: err})
        }
    }

    getCasebyID = async (req: Request, res: Response) => {
        let id = req.params.id
        try{
            return res.json(await this.caseService.getCasebyID(id))
        }
        catch (err){
            return res.status(500).json({msg: err})
        }
    }

    getNumberOfCaseStatus = async (req: Request, res: Response) => {
        try{
            return res.json(await this.caseService.getNumberOfCaseStatus())
        }
        catch (err){
            return res.status(500).json({msg: err})
        }
    }

    getCaseMonth = async (req: Request, res: Response) => {
        try{
            return res.json(await this.caseService.getCaseMonth())
        }
        catch (err){
            return res.status(500).json({msg: err})
        }
    }

    getDistrict = async (req: Request, res: Response) => {
        try{
            return res.json(await this.caseService.getDistrict())
        }
        catch (err){
            return res.status(500).json({msg: err})
        }
    }
} 