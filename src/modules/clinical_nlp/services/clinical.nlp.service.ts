
/// <reference path = "../interfaces/clinical.nlp.types.ts" />  

import { ClinicalDataExtraction } from "../interfaces/clinical.nlp.types";
import { IClinicalNLPProvider } from "../interfaces/clinical.nlp.interface";
import { injectable, inject } from "tsyringe";

////////////////////////////////////////////////////////////////////////

@injectable()
export class ClinicalNLPService {

  constructor(@inject("IClinicalNLPProvider") private _extractor: IClinicalNLPProvider) {
  }

  extract = async (text: string): Promise<ClinicalDataExtraction.Extraction> => {
    return await this._extractor.extract(text);
  }
};

////////////////////////////////////////////////////////////////////////
