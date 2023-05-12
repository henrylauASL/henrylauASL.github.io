import { Request, Response } from 'express';
import { CaseService } from '../service/caseService';

export class CaseController {
    constructor(private caseService: CaseService){}
    createCase = async (req: Request, res: Response) => {
        try{
            console.log(req.body);
            return res.json(await this.caseService.createCase(req.body))
        }
        catch (err){
            return res.status(500).json({msg: err})
        }
    }
} 