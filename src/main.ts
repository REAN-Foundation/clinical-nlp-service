import * as dotenv from "dotenv";
import "reflect-metadata"
import { container } from 'tsyringe';
import * as path from 'path';
import * as fs from 'fs';
import { Helper } from './common/helper';

import { Test_ClinicalNLP } from './modules/clinical_nlp/test';

const envPath = path.join(process.cwd(), '.env');
dotenv.config({ path: envPath });

////////////////////////////////////////////////////////////////////////////////////


(async () => {
  try {    

    await Test_ClinicalNLP.test();

  } catch (error) {
    console.log(error);
  }
})();
