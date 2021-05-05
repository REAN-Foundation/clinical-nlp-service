import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { container } from 'tsyringe';
import * as path from 'path';
import * as fs from 'fs';
import { Helper } from '../../common/helper';

/// <reference path = "./clinical.nlp.types.ts" />

import { ClinicalNLPService } from './services/clinical.nlp.service';
import { ClinicalNLP_GCP } from './provider_impl/clinical.nlp.provider.gcp';
import { ClinicalNLP_AWS } from './provider_impl/clinical.nlp.provider.aws';

const mode = 'gcp';
//const __dirname = path.resolve();

////////////////////////////////////////////////////////////////////////////////////

export class Test_ClinicalNLP {

    public static test = async () => {
        try {
            const rawDataPaths = [
                './lab_reports',
                './diagnostics',
                './consultations',
            ];

            const testDataPath = path.join(process.cwd(), '/test_data/clinical-nlp/');

            for await (const rdp of rawDataPaths) {

                const rawDataDirectory = path.join(testDataPath, rdp);
                const rawDataFiles = fs.readdirSync(rawDataDirectory);

                // Generate output folder if it does not exist
                const outfolder = path.join(testDataPath, 'output', rdp);
                if (!fs.existsSync(outfolder)) {
                    fs.mkdirSync(outfolder);
                }

                for await (const filename of rawDataFiles) {
                    let name = filename.split(/(\\|\/)/g).pop();
                    name = name.replace('.txt', '');

                    const rawDataFile = path.join(
                        rawDataDirectory,
                        `${name}.txt`
                    );

                    if(!fs.existsSync(rawDataFile)){
                        continue;
                    }

                    console.log('Processing -> ' + `${name}.txt with nlp-> ` + mode);

                    // const stats = fs.statSync(rawDataFile);
                    // if (!stats.isFile()) {
                    //     continue;
                    // }

                    const rawdata = fs.readFileSync(rawDataFile, {
                        encoding: 'utf8',
                        flag: 'r',
                    });

                    var outfile = path.join(
                        outfolder,
                        `${name}_extraction.json`
                    );

                    if (mode !== 'gcp') {
                        outfile = path.join(
                            outfolder,
                            `${name}_aws_extraction.json`
                        );
                        container.register(
                            'IClinicalNLPProvider',
                            ClinicalNLP_AWS
                        );
                    } else {
                        outfile = path.join(
                            outfolder,
                            `${name}_gcp_extraction.json`
                        );
                        container.register(
                            'IClinicalNLPProvider',
                            ClinicalNLP_GCP
                        );
                    }
                    const extractionService = container.resolve(
                        ClinicalNLPService
                    );

                    const extraction = await extractionService.extract(rawdata);
                    Helper.dumpJson(extraction, outfile);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
}
