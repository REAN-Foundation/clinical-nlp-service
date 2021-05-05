
export namespace ClinicalDataExtraction {

    export const Categories = {
        ClinicalTest: 'ClinicalTest',
        ClinicalObservation: 'ClinicalObservation',
        MedicalCondition: 'MedicalCondition',
        Biometrics: 'Biometrics',
        Anatomy: 'Anatomy',
        Diagnosis: 'Diagnosis',
        Symptoms: 'Symptoms',
        Treatment: 'Treatment',
        Notes: 'Notes',
        Medication: 'Medication',
        Procedure: 'Procedure',
        FamilyHistory: 'FamilyHistory',
        Encounter: 'Encounter',
        Therapy: 'Therapy',
        Diet: 'Diet',
        PhysicalActivity: 'PhysicalActivity',
        StressManagement: 'StressManagement',
        Addiction: 'Addiction',
        MedicalDevice: 'MedicalDevice',
        BodyFunction: 'BodyFunction',
        Societal: 'Societal',
        ProtectedHealthInformation: 'ProtectedHealthInformation',
        Unidentified: 'Unidentified',
    };

    // export const ClinicalTestTypes = {
    //     CellularAndChemicalAnalysis: 'CellularAndChemicalAnalysis', //e.g. Pathology
    //     DiagnosticImaging: 'DiagnosticImaging',                     //e.g. Radiology,
    //     PhysicalExamination: 'PhysicalExamination',
    //     VisualExamination: 'VisualExamination',
    //     GeneticTest: 'GeneticTest',
    //     GenericTest: 'GenericTest',
    //     Unidentified: 'Unidentified'
    // };

    export const ClinicalTestAttributes = {
        TestName: 'TestName',
        TestValue: 'TestValue',
        TestUnit: 'TestUnit',
        TestDate: 'TestDate',
        TestResult: 'Result',
        TestRemarks: 'TestRemarks',
        NormalRangeMin: 'NormalRangeMin',
        NormalRangeMax: 'NormalRangeMax',
        Unidentified: 'Unidentified',
    };

    export const BiometricsAttributes = {
        BiometricsName: 'BiometricsName',
        BiometricsResult: 'BiometricsResult',
        BiometricsValue: 'BiometricsValue',
        BiometricsUnit: 'BiometricsUnit',
        Remarks: 'Remarks',
        NormalRangeMin: 'NormalRangeMin',
        NormalRangeMax: 'NormalRangeMax',
        Unidentified: 'Unidentified',
    };

    export const MedicationAttributes = {
        BrandName: 'BrandName',
        GenericName: 'GenericName',
        Dosage: 'Dosage',
        DosageUnit: 'DosageUnit',
        Frequency: 'Frequency',
        FrequencyUnit: 'FrequencyUnit',
        Duration: 'Duration',
        Route: 'Route',
        Strength: 'Strength',
        Rate: 'Rate',
        Status: 'Status',
        TotalDosage: 'TotalDosage',
        Unidentified: 'Unidentified',
    };

    export const ProtectedHealthInformationAttributes = {
        Name: 'Name',
        Age: 'Age',
        Date: 'Date',
        Phone: 'Phone',
        Email: 'Email',
        Id: 'Id',
        Url: 'Url',
        Address: 'Address',
        Profession: 'Profession',
        Unidentified: 'Unidentified',
    };

    export const ContextSubject = {
        Patient: 'Patient',
        Family: 'Family',
        Other: 'Other',
        Default: 'Patient'
    }

    export class CodedTerm {
        term: string = '';
        norm_codes: string[] = [];
        confidence: number = 1;
        nlp_system_entity_code = '';
    };
    
    export class Entity {
        context_subject: string = 'Patient'; //Defaults to patient
        extraction_id: string = '';
        text: string = '';
        category: string = 'Unidentified';
        type: string = '';
        coded_terms: CodedTerm[] = [];
        is_relation_object: boolean = false;
        is_negated: boolean = false;
        begin_offset: number = -1;
        end_offset: number = -1;
    };

    export class Relation {

        context_subject: string = 'Patient'; //Defaults to patient
        statement: string = '';
        original_statement: string = '';
        category: string = 'Unidentified';
        type: string = 'Unidentified';
        keywords: string[] = [];
        entities: Entity[] = [];

        public extractOriginalStatement = (text: string) => {

            if (this.entities.length > 0 && text && text.length > 0) {

                var startOffset = text && text.length > 0 ? text.length - 1 : 15000;
                var endOffset = 0;

                for (var e of this.entities) {
                    if (e.begin_offset < startOffset) {
                        startOffset = e.begin_offset;
                    }
                    if (e.end_offset > endOffset) {
                        endOffset = e.end_offset;
                    }
                }
                if (
                    startOffset < endOffset &&
                    endOffset <= text.length - 1 &&
                    startOffset >= 0
                ) {
                    this.original_statement = text.slice(
                        startOffset,
                        endOffset
                    );
                }
            }
        };

        public constructStatement = () => {
            var texts = this.entities.map(x => x.text);
            this.statement = texts.join(' ');
        }

    };

    export class Extraction {
        patient_id: string = null;
        relations: Relation[] = [];
        chronology_date: Date = null;
    };
}
