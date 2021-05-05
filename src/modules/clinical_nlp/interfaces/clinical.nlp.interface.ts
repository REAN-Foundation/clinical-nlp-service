
import { ClinicalDataExtraction } from './clinical.nlp.types';


export interface IClinicalNLPProvider {
  extract(text: string): Promise<ClinicalDataExtraction.Extraction>;
}
