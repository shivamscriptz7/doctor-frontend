'use client';

import { useState, useMemo, useRef } from 'react';
import {
  Plus, X, Eye, Edit, Trash2, Printer, Search, ChevronDown, ChevronUp,
  ChevronsUpDown, FileText, Download, FlaskConical, User, Phone,
  Mail, Hash, CalendarDays, Stethoscope, TestTube2, Sheet
} from 'lucide-react';

// ─── THEME (from patient page) ────────────────────────────────────────────────
// emerald-600 #059669 | teal-600 #0d9488 | emerald-50 #f0fdf4 | teal-50 #f0fdfa
// slate-800 #1e293b  | slate-100 #f1f5f9

// ─── STATIC LAB TEST FIELDS (25 tests) ───────────────────────────────────────
// In production: fetch from /api/lab-fields?category=...
const LAB_TEST_FIELDS = {
  'CBC Test': [
    { field_key: 'hemoglobin',     field_name: 'Hemoglobin (Hb)',    default_unit: 'g/dL',       unit_options: ['g/dL','g/L'],              reference_range: '13.5 - 17.5', method: 'Cyanmethemoglobin',    field_type: 'number' },
    { field_key: 'rbcCount',       field_name: 'Total RBC Count',    default_unit: 'million/µL', unit_options: ['million/µL','×10¹²/L'],    reference_range: '4.5 - 5.5',   method: 'Electrical Impedance', field_type: 'number' },
    { field_key: 'hematocrit',     field_name: 'Hematocrit (PCV)',   default_unit: '%',           unit_options: ['%'],                       reference_range: '40 - 50',      method: 'Calculated',           field_type: 'number' },
    { field_key: 'mcv',            field_name: 'MCV',                default_unit: 'fL',          unit_options: ['fL'],                      reference_range: '80 - 100',     method: 'Calculated',           field_type: 'number' },
    { field_key: 'mch',            field_name: 'MCH',                default_unit: 'pg',          unit_options: ['pg'],                      reference_range: '27 - 32',      method: 'Calculated',           field_type: 'number' },
    { field_key: 'mchc',           field_name: 'MCHC',               default_unit: 'g/dL',        unit_options: ['g/dL'],                    reference_range: '32 - 36',      method: 'Calculated',           field_type: 'number' },
    { field_key: 'rdw',            field_name: 'RDW',                default_unit: '%',           unit_options: ['%'],                       reference_range: '11.5 - 14.5', method: 'Calculated',           field_type: 'number' },
    { field_key: 'wbcCount',       field_name: 'Total WBC Count',    default_unit: 'cells/µL',    unit_options: ['cells/µL','×10⁹/L'],       reference_range: '4,000 - 11,000', method: 'Flow Cytometry',    field_type: 'number' },
    { field_key: 'neutrophils',    field_name: 'Neutrophils',        default_unit: '%',           unit_options: ['%'],                       reference_range: '50 - 70',      method: 'Differential Count',   field_type: 'number' },
    { field_key: 'lymphocytes',    field_name: 'Lymphocytes',        default_unit: '%',           unit_options: ['%'],                       reference_range: '20 - 40',      method: 'Differential Count',   field_type: 'number' },
    { field_key: 'monocytes',      field_name: 'Monocytes',          default_unit: '%',           unit_options: ['%'],                       reference_range: '2 - 8',        method: 'Differential Count',   field_type: 'number' },
    { field_key: 'eosinophils',    field_name: 'Eosinophils',        default_unit: '%',           unit_options: ['%'],                       reference_range: '1 - 4',        method: 'Differential Count',   field_type: 'number' },
    { field_key: 'basophils',      field_name: 'Basophils',          default_unit: '%',           unit_options: ['%'],                       reference_range: '0 - 1',        method: 'Differential Count',   field_type: 'number' },
    { field_key: 'plateletCount',  field_name: 'Platelet Count',     default_unit: 'lakh/µL',     unit_options: ['lakh/µL','×10⁹/L'],        reference_range: '1.50 - 4.00', method: 'Electrical Impedance', field_type: 'number' },
  ],
  'Dengue NS1 Antigen': [
    { field_key: 'ns1Antigen',     field_name: 'NS1 Antigen',        default_unit: null, unit_options: ['Positive','Negative'],                       reference_range: 'Negative', method: 'Rapid Immunochromatography', field_type: 'select' },
    { field_key: 'igmAntibody',    field_name: 'IgM Antibody',       default_unit: null, unit_options: ['Positive','Negative'],                       reference_range: 'Negative', method: 'ELISA',                      field_type: 'select' },
    { field_key: 'iggAntibody',    field_name: 'IgG Antibody',       default_unit: null, unit_options: ['Positive','Negative'],                       reference_range: 'Negative', method: 'ELISA',                      field_type: 'select' },
    { field_key: 'interpretation', field_name: 'Interpretation',     default_unit: null, unit_options: ['Primary Infection','Secondary Infection','Non-dengue','Equivocal'], reference_range: 'Non-dengue', method: 'Clinical Interpretation', field_type: 'select' },
  ],
  'Liver Function Test': [
    { field_key: 'totalBilirubin',    field_name: 'Total Bilirubin',      default_unit: 'mg/dL', unit_options: ['mg/dL'], reference_range: '0.2 - 1.2',  method: 'Diazo Method',       field_type: 'number' },
    { field_key: 'directBilirubin',   field_name: 'Direct Bilirubin',     default_unit: 'mg/dL', unit_options: ['mg/dL'], reference_range: '0.0 - 0.3',  method: 'Diazo Method',       field_type: 'number' },
    { field_key: 'indirectBilirubin', field_name: 'Indirect Bilirubin',   default_unit: 'mg/dL', unit_options: ['mg/dL'], reference_range: '0.1 - 0.9',  method: 'Calculated',         field_type: 'number' },
    { field_key: 'sgpt',              field_name: 'SGPT (ALT)',            default_unit: 'U/L',   unit_options: ['U/L'],   reference_range: '7 - 56',     method: 'IFCC Kinetic',       field_type: 'number' },
    { field_key: 'sgot',              field_name: 'SGOT (AST)',            default_unit: 'U/L',   unit_options: ['U/L'],   reference_range: '10 - 40',    method: 'IFCC Kinetic',       field_type: 'number' },
    { field_key: 'alp',               field_name: 'Alkaline Phosphatase', default_unit: 'U/L',   unit_options: ['U/L'],   reference_range: '44 - 147',   method: 'IFCC Kinetic',       field_type: 'number' },
    { field_key: 'ggt',               field_name: 'GGT (Gamma GT)',       default_unit: 'U/L',   unit_options: ['U/L'],   reference_range: '9 - 48',     method: 'Kinetic Colorimetric', field_type: 'number' },
    { field_key: 'totalProtein',      field_name: 'Total Protein',        default_unit: 'g/dL',  unit_options: ['g/dL'],  reference_range: '6.0 - 8.3',  method: 'Biuret Method',      field_type: 'number' },
    { field_key: 'albumin',           field_name: 'Albumin',              default_unit: 'g/dL',  unit_options: ['g/dL'],  reference_range: '3.5 - 5.0',  method: 'BCG Dye Method',     field_type: 'number' },
    { field_key: 'globulin',          field_name: 'Globulin',             default_unit: 'g/dL',  unit_options: ['g/dL'],  reference_range: '2.0 - 3.5',  method: 'Calculated',         field_type: 'number' },
    { field_key: 'agRatio',           field_name: 'A/G Ratio',            default_unit: null,    unit_options: [],        reference_range: '1.0 - 2.0',  method: 'Calculated',         field_type: 'number' },
  ],
  'Kidney Function Test': [
    { field_key: 'bloodUrea',    field_name: 'Blood Urea',           default_unit: 'mg/dL',  unit_options: ['mg/dL'],           reference_range: '15 - 40',   method: 'Urease-GLDH',        field_type: 'number' },
    { field_key: 'creatinine',   field_name: 'Serum Creatinine',     default_unit: 'mg/dL',  unit_options: ['mg/dL'],           reference_range: '0.7 - 1.3', method: 'Jaffe Method',       field_type: 'number' },
    { field_key: 'bun',          field_name: 'BUN',                  default_unit: 'mg/dL',  unit_options: ['mg/dL'],           reference_range: '7 - 20',    method: 'Calculated',         field_type: 'number' },
    { field_key: 'uricAcid',     field_name: 'Uric Acid',            default_unit: 'mg/dL',  unit_options: ['mg/dL'],           reference_range: '3.5 - 7.2', method: 'Uricase Method',     field_type: 'number' },
    { field_key: 'calcium',      field_name: 'Calcium',              default_unit: 'mg/dL',  unit_options: ['mg/dL'],           reference_range: '8.5 - 10.5',method: 'Arsenazo III',       field_type: 'number' },
    { field_key: 'phosphorus',   field_name: 'Phosphorus',           default_unit: 'mg/dL',  unit_options: ['mg/dL'],           reference_range: '2.5 - 4.5', method: 'Ammonium Molybdate', field_type: 'number' },
    { field_key: 'sodium',       field_name: 'Sodium',               default_unit: 'mEq/L',  unit_options: ['mEq/L','mmol/L'], reference_range: '136 - 145', method: 'ISE',                field_type: 'number' },
    { field_key: 'potassium',    field_name: 'Potassium',            default_unit: 'mEq/L',  unit_options: ['mEq/L','mmol/L'], reference_range: '3.5 - 5.0', method: 'ISE',                field_type: 'number' },
    { field_key: 'chloride',     field_name: 'Chloride',             default_unit: 'mEq/L',  unit_options: ['mEq/L','mmol/L'], reference_range: '98 - 107',  method: 'ISE',                field_type: 'number' },
    { field_key: 'egfr',         field_name: 'eGFR',                 default_unit: 'mL/min', unit_options: ['mL/min/1.73m²'],  reference_range: '> 90',      method: 'CKD-EPI Formula',    field_type: 'number' },
  ],
  'Lipid Profile': [
    { field_key: 'totalCholesterol',  field_name: 'Total Cholesterol',  default_unit: 'mg/dL', unit_options: ['mg/dL','mmol/L'], reference_range: '< 200',  method: 'CHOD-PAP Method',    field_type: 'number' },
    { field_key: 'triglycerides',     field_name: 'Triglycerides',      default_unit: 'mg/dL', unit_options: ['mg/dL','mmol/L'], reference_range: '< 150',  method: 'GPO-PAP Method',     field_type: 'number' },
    { field_key: 'hdlCholesterol',    field_name: 'HDL Cholesterol',    default_unit: 'mg/dL', unit_options: ['mg/dL'],          reference_range: '> 40',   method: 'Direct Method',      field_type: 'number' },
    { field_key: 'ldlCholesterol',    field_name: 'LDL Cholesterol',    default_unit: 'mg/dL', unit_options: ['mg/dL'],          reference_range: '< 100',  method: 'Friedewald Formula', field_type: 'number' },
    { field_key: 'vldlCholesterol',   field_name: 'VLDL Cholesterol',   default_unit: 'mg/dL', unit_options: ['mg/dL'],          reference_range: '< 30',   method: 'Calculated',         field_type: 'number' },
    { field_key: 'nonHdlCholesterol', field_name: 'Non-HDL Cholesterol',default_unit: 'mg/dL', unit_options: ['mg/dL'],          reference_range: '< 130',  method: 'Calculated',         field_type: 'number' },
  ],
  'Thyroid Function Test': [
    { field_key: 't3',      field_name: 'T3 (Triiodothyronine)', default_unit: 'ng/dL',  unit_options: ['ng/dL','nmol/L'], reference_range: '60 - 200',   method: 'CLIA / ECLIA', field_type: 'number' },
    { field_key: 't4',      field_name: 'T4 (Thyroxine)',        default_unit: 'µg/dL',  unit_options: ['µg/dL','nmol/L'], reference_range: '4.5 - 12.0', method: 'CLIA / ECLIA', field_type: 'number' },
    { field_key: 'tsh',     field_name: 'TSH',                   default_unit: 'µIU/mL', unit_options: ['µIU/mL','mIU/L'],reference_range: '0.4 - 4.0',  method: 'CLIA / ECLIA', field_type: 'number' },
    { field_key: 'ft3',     field_name: 'Free T3 (fT3)',         default_unit: 'pg/mL',  unit_options: ['pg/mL'],          reference_range: '2.0 - 4.4',  method: 'ECLIA',        field_type: 'number' },
    { field_key: 'ft4',     field_name: 'Free T4 (fT4)',         default_unit: 'ng/dL',  unit_options: ['ng/dL'],          reference_range: '0.8 - 1.8',  method: 'ECLIA',        field_type: 'number' },
    { field_key: 'antiTpo', field_name: 'Anti-TPO Antibody',     default_unit: 'IU/mL',  unit_options: ['IU/mL'],          reference_range: '< 35',       method: 'CLIA',         field_type: 'number' },
  ],
  'Blood Sugar Test': [
    { field_key: 'fbg', field_name: 'Fasting Blood Glucose (FBS)',    default_unit: 'mg/dL', unit_options: ['mg/dL','mmol/L'], reference_range: '70 - 100', method: 'GOD-PAP Enzymatic', field_type: 'number' },
    { field_key: 'ppg', field_name: 'Post Prandial Glucose (2hr PP)', default_unit: 'mg/dL', unit_options: ['mg/dL','mmol/L'], reference_range: '< 140',    method: 'GOD-PAP Enzymatic', field_type: 'number' },
    { field_key: 'rbg', field_name: 'Random Blood Glucose (RBS)',     default_unit: 'mg/dL', unit_options: ['mg/dL','mmol/L'], reference_range: '70 - 140', method: 'GOD-PAP Enzymatic', field_type: 'number' },
  ],
  'HbA1c Test': [
    { field_key: 'hba1cPercent', field_name: 'HbA1c (%)',              default_unit: '%',     unit_options: ['%'],     reference_range: '< 5.7',    method: 'HPLC / Turbidimetry',  field_type: 'number' },
    { field_key: 'eag',          field_name: 'Estimated Avg Glucose',  default_unit: 'mg/dL', unit_options: ['mg/dL'], reference_range: '70 - 126', method: 'Calculated from HbA1c', field_type: 'number' },
  ],
  'Urine Routine & Microscopy': [
    { field_key: 'urineColour',        field_name: 'Colour',              default_unit: null, unit_options: ['Pale Yellow','Yellow','Dark Yellow','Amber','Colourless','Red','Brown'], reference_range: 'Pale Yellow', method: 'Visual Inspection', field_type: 'select' },
    { field_key: 'urineAppearance',    field_name: 'Appearance',          default_unit: null, unit_options: ['Clear','Slightly Turbid','Turbid','Cloudy'],                            reference_range: 'Clear',       method: 'Visual Inspection', field_type: 'select' },
    { field_key: 'urinePH',           field_name: 'Reaction (pH)',        default_unit: null, unit_options: ['4.5','5.0','5.5','6.0','6.5','7.0','7.5','8.0'],                       reference_range: '4.5 - 8.0',  method: 'Dipstick',          field_type: 'number' },
    { field_key: 'specificGravity',   field_name: 'Specific Gravity',     default_unit: null, unit_options: [],                                                                      reference_range: '1.003-1.030', method: 'Refractometer',     field_type: 'number' },
    { field_key: 'urineProtein',      field_name: 'Protein',              default_unit: null, unit_options: ['Nil','Trace','+1','+2','+3','+4'],                                     reference_range: 'Nil',         method: 'Dipstick / SSA',    field_type: 'select' },
    { field_key: 'urineGlucose',      field_name: 'Glucose',              default_unit: null, unit_options: ['Nil','Trace','+1','+2','+3','+4'],                                     reference_range: 'Nil',         method: 'Dipstick',          field_type: 'select' },
    { field_key: 'urineKetones',      field_name: 'Ketones',              default_unit: null, unit_options: ['Nil','Trace','+1','+2','+3'],                                          reference_range: 'Nil',         method: 'Dipstick',          field_type: 'select' },
    { field_key: 'pusCells',          field_name: 'Pus Cells (WBC)',      default_unit: '/hpf', unit_options: ['/hpf'],                                                              reference_range: '0 - 5',       method: 'Microscopy',        field_type: 'number' },
    { field_key: 'urineRbc',          field_name: 'RBC',                  default_unit: '/hpf', unit_options: ['/hpf'],                                                              reference_range: '0 - 2',       method: 'Microscopy',        field_type: 'number' },
    { field_key: 'epithelialCells',   field_name: 'Epithelial Cells',     default_unit: null, unit_options: ['Nil','Few','Moderate','Many'],                                         reference_range: 'Few',         method: 'Microscopy',        field_type: 'select' },
    { field_key: 'urineCasts',        field_name: 'Casts',                default_unit: null, unit_options: ['Nil','Hyaline','Granular','RBC Cast','WBC Cast'],                      reference_range: 'Nil',         method: 'Microscopy',        field_type: 'select' },
    { field_key: 'urineBacteria',     field_name: 'Bacteria',             default_unit: null, unit_options: ['Nil','Few','+','+2','+3'],                                             reference_range: 'Nil',         method: 'Microscopy',        field_type: 'select' },
  ],
  'Iron Studies': [
    { field_key: 'serumIron',     field_name: 'Serum Iron',          default_unit: 'µg/dL', unit_options: ['µg/dL'], reference_range: '60 - 170',  method: 'Ferrozine Method', field_type: 'number' },
    { field_key: 'tibc',          field_name: 'TIBC',                default_unit: 'µg/dL', unit_options: ['µg/dL'], reference_range: '250 - 370', method: 'Colorimetric',     field_type: 'number' },
    { field_key: 'transferrinSat',field_name: '% Transferrin Sat',   default_unit: '%',     unit_options: ['%'],     reference_range: '20 - 50',   method: 'Calculated',       field_type: 'number' },
    { field_key: 'serumFerritin', field_name: 'Serum Ferritin',      default_unit: 'ng/mL', unit_options: ['ng/mL'], reference_range: '12 - 300',  method: 'ECLIA',            field_type: 'number' },
  ],
  'Widal Test': [
    { field_key: 'typhiO',     field_name: 'S. Typhi O',       default_unit: null, unit_options: ['Negative','1:20','1:40','1:80','1:160','1:320','1:640'], reference_range: '< 1:80', method: 'Tube Agglutination', field_type: 'select' },
    { field_key: 'typhiH',     field_name: 'S. Typhi H',       default_unit: null, unit_options: ['Negative','1:20','1:40','1:80','1:160','1:320','1:640'], reference_range: '< 1:80', method: 'Tube Agglutination', field_type: 'select' },
    { field_key: 'paratyphiAO',field_name: 'S. Paratyphi AO',  default_unit: null, unit_options: ['Negative','1:20','1:40','1:80','1:160','1:320','1:640'], reference_range: '< 1:80', method: 'Tube Agglutination', field_type: 'select' },
    { field_key: 'paratyphiAH',field_name: 'S. Paratyphi AH',  default_unit: null, unit_options: ['Negative','1:20','1:40','1:80','1:160','1:320','1:640'], reference_range: '< 1:80', method: 'Tube Agglutination', field_type: 'select' },
    { field_key: 'paratyphiBO',field_name: 'S. Paratyphi BO',  default_unit: null, unit_options: ['Negative','1:20','1:40','1:80','1:160','1:320','1:640'], reference_range: '< 1:80', method: 'Tube Agglutination', field_type: 'select' },
    { field_key: 'paratyphiBH',field_name: 'S. Paratyphi BH',  default_unit: null, unit_options: ['Negative','1:20','1:40','1:80','1:160','1:320','1:640'], reference_range: '< 1:80', method: 'Tube Agglutination', field_type: 'select' },
  ],
  'Malaria (MP) Test': [
    { field_key: 'malarialParasite', field_name: 'Malarial Parasite',          default_unit: null, unit_options: ['Not Detected','P. falciparum','P. vivax','P. malariae','Mixed'], reference_range: 'Not Detected', method: 'Peripheral Smear / RDT', field_type: 'select' },
    { field_key: 'parasiteDensity',  field_name: 'Parasite Density',           default_unit: null, unit_options: ['Low','Moderate','High'],                                         reference_range: '-',            method: 'Peripheral Smear',       field_type: 'select' },
    { field_key: 'pfhrp2',           field_name: 'PfHRP2 Antigen (Falciparum)',default_unit: null, unit_options: ['Positive','Negative'],                                           reference_range: 'Negative',     method: 'Rapid Diagnostic Test',  field_type: 'select' },
    { field_key: 'pldh',             field_name: 'pLDH Antigen (Pan Malaria)', default_unit: null, unit_options: ['Positive','Negative'],                                           reference_range: 'Negative',     method: 'Rapid Diagnostic Test',  field_type: 'select' },
  ],
  'Hepatitis B (HBsAg)': [
    { field_key: 'hbsag',       field_name: 'HBsAg',          default_unit: null,    unit_options: ['Reactive','Non-Reactive'], reference_range: 'Non-Reactive', method: 'CLIA / ELISA',  field_type: 'select' },
    { field_key: 'hbeag',       field_name: 'HBeAg',          default_unit: null,    unit_options: ['Reactive','Non-Reactive'], reference_range: 'Non-Reactive', method: 'ELISA',         field_type: 'select' },
    { field_key: 'antiHbs',     field_name: 'Anti-HBs',       default_unit: 'mIU/mL',unit_options: ['mIU/mL'],                 reference_range: '> 10 (immune)',method: 'CLIA',          field_type: 'number' },
    { field_key: 'antiHbcTotal',field_name: 'Anti-HBc Total', default_unit: null,    unit_options: ['Reactive','Non-Reactive'], reference_range: 'Non-Reactive', method: 'CLIA',          field_type: 'select' },
  ],
  'Hepatitis C (HCV)': [
    { field_key: 'antiHcv',    field_name: 'Anti-HCV Antibody',default_unit: null,   unit_options: ['Reactive','Non-Reactive'], reference_range: 'Non-Reactive', method: 'CLIA / ELISA', field_type: 'select' },
    { field_key: 'hcvRna',     field_name: 'HCV RNA (PCR)',    default_unit: 'IU/mL',unit_options: ['IU/mL'],                  reference_range: 'Not Detected', method: 'Real-time PCR', field_type: 'number' },
  ],
  'HIV Test': [
    { field_key: 'hiv12Ab',field_name: 'HIV 1+2 Antibody',    default_unit: null,       unit_options: ['Reactive','Non-Reactive'], reference_range: 'Non-Reactive', method: 'CLIA / Rapid ICT', field_type: 'select' },
    { field_key: 'hivP24', field_name: 'HIV p24 Antigen',      default_unit: null,       unit_options: ['Reactive','Non-Reactive'], reference_range: 'Non-Reactive', method: 'ELISA',            field_type: 'select' },
    { field_key: 'cd4Count',field_name: 'CD4 Count',           default_unit: 'cells/µL', unit_options: ['cells/µL'],               reference_range: '500 - 1500',   method: 'Flow Cytometry',   field_type: 'number' },
  ],
  'ESR Test': [
    { field_key: 'esr1stHour',field_name: 'ESR 1st Hour', default_unit: 'mm/hr', unit_options: ['mm/hr'], reference_range: '0 - 15', method: 'Westergren Method', field_type: 'number' },
    { field_key: 'esr2ndHour',field_name: 'ESR 2nd Hour', default_unit: 'mm/hr', unit_options: ['mm/hr'], reference_range: '0 - 30', method: 'Westergren Method', field_type: 'number' },
  ],
  'CRP Test': [
    { field_key: 'crpQual',field_name: 'CRP (Qualitative)',    default_unit: null,   unit_options: ['Negative','Positive'], reference_range: 'Negative', method: 'Latex Agglutination', field_type: 'select' },
    { field_key: 'hscrp',  field_name: 'hsCRP (Quantitative)',default_unit: 'mg/L', unit_options: ['mg/L'],               reference_range: '< 1.0',    method: 'Turbidimetry',        field_type: 'number' },
  ],
  'Vitamin D Test': [
    { field_key: 'vitaminD',   field_name: '25-OH Vitamin D Total',default_unit: 'ng/mL', unit_options: ['ng/mL','nmol/L'],                                                             reference_range: '30 - 100', method: 'CLIA / ECLIA', field_type: 'number' },
    { field_key: 'vitDInterp', field_name: 'Interpretation',       default_unit: null,    unit_options: ['Deficient (<20)','Insufficient (20-29)','Sufficient (30-100)','Toxicity (>100)'], reference_range: 'Sufficient (30-100)', method: 'Clinical', field_type: 'select' },
  ],
  'Vitamin B12 Test': [
    { field_key: 'vitaminB12',  field_name: 'Vitamin B12 (Cobalamin)', default_unit: 'pg/mL', unit_options: ['pg/mL','pmol/L'],                                                          reference_range: '200 - 900', method: 'CLIA / ECLIA', field_type: 'number' },
    { field_key: 'vitB12Interp',field_name: 'Interpretation',          default_unit: null,    unit_options: ['Deficient (<200)','Low Normal (200-300)','Normal (300-900)','High (>900)'], reference_range: 'Normal (300-900)', method: 'Clinical', field_type: 'select' },
  ],
  'Uric Acid Test': [
    { field_key: 'uricAcidMale',  field_name: 'Serum Uric Acid (Male)',  default_unit: 'mg/dL', unit_options: ['mg/dL','µmol/L'], reference_range: '3.5 - 7.2', method: 'Uricase Method', field_type: 'number' },
    { field_key: 'uricAcidFemale',field_name: 'Serum Uric Acid (Female)',default_unit: 'mg/dL', unit_options: ['mg/dL','µmol/L'], reference_range: '2.6 - 6.0', method: 'Uricase Method', field_type: 'number' },
  ],
  'Calcium & Phosphorus': [
    { field_key: 'totalCalcium',   field_name: 'Total Calcium',   default_unit: 'mg/dL', unit_options: ['mg/dL','mmol/L'], reference_range: '8.5 - 10.5', method: 'Arsenazo III',       field_type: 'number' },
    { field_key: 'ionizedCalcium', field_name: 'Ionized Calcium', default_unit: 'mg/dL', unit_options: ['mg/dL','mmol/L'], reference_range: '4.6 - 5.3',  method: 'ISE',                field_type: 'number' },
    { field_key: 'seruPhosphorus', field_name: 'Phosphorus',      default_unit: 'mg/dL', unit_options: ['mg/dL'],          reference_range: '2.5 - 4.5',  method: 'Ammonium Molybdate', field_type: 'number' },
    { field_key: 'serumMagnesium', field_name: 'Magnesium',       default_unit: 'mg/dL', unit_options: ['mg/dL'],          reference_range: '1.7 - 2.2',  method: 'Xylidyl Blue',       field_type: 'number' },
  ],
  'Arthritis Panel': [
    { field_key: 'raFactorQual',  field_name: 'RA Factor (Qualitative)',  default_unit: null,   unit_options: ['Negative','Positive'],  reference_range: 'Negative', method: 'Latex Agglutination', field_type: 'select' },
    { field_key: 'raFactorQuant', field_name: 'RA Factor (Quantitative)',default_unit: 'IU/mL',unit_options: ['IU/mL'],                reference_range: '< 14',     method: 'Nephelometry',        field_type: 'number' },
    { field_key: 'antiCcp',       field_name: 'Anti-CCP Antibody',       default_unit: 'U/mL', unit_options: ['U/mL'],                 reference_range: '< 20',     method: 'ELISA',               field_type: 'number' },
    { field_key: 'ana',           field_name: 'ANA (Antinuclear Ab)',     default_unit: null,   unit_options: ['Negative','Positive'],  reference_range: 'Negative', method: 'IFA / ELISA',         field_type: 'select' },
    { field_key: 'asoTiter',      field_name: 'ASO Titer',               default_unit: 'IU/mL',unit_options: ['IU/mL'],                reference_range: '< 200',    method: 'Latex Agglutination', field_type: 'number' },
  ],
};

const ALL_TEST_NAMES = Object.keys(LAB_TEST_FIELDS);

// ─── STATIC SAMPLE REPORTS ────────────────────────────────────────────────────
let NEXT_ID = 3;
const INITIAL_REPORTS = [
  {
    id: 1,
    reportNumber: 'LAB-2024-0001',
    patientId: 'PT123456',
    patientName: 'Shivam Shakya',
    age: 26, gender: 'Male',
    mobile: '9876543210',
    email: 'shivam@example.com',
    referredBy: 'Dr. Anil Sharma',
    sampleId: 'SMP789012',
    sampleType: 'Whole Blood',
    collectionDate: '2024-05-21T09:15',
    reportTemplate: 'Standard Template',
    printFormat: 'A4',
    includeRefRange: true,
    includeMethod: true,
    status: 'final',
    selectedTests: ['CBC Test', 'Liver Function Test'],
    results: {
      'CBC Test': { hemoglobin: { value: '14.2', unit: 'g/dL' }, rbcCount: { value: '5.12', unit: 'million/µL' }, hematocrit: { value: '42.6', unit: '%' }, mcv: { value: '83.2', unit: 'fL' }, mch: { value: '27.7', unit: 'pg' }, mchc: { value: '33.3', unit: 'g/dL' }, rdw: { value: '13.1', unit: '%' }, wbcCount: { value: '6800', unit: 'cells/µL' }, plateletCount: { value: '2.45', unit: 'lakh/µL' } },
      'Liver Function Test': { totalBilirubin: { value: '0.7', unit: 'mg/dL' }, directBilirubin: { value: '0.2', unit: 'mg/dL' }, sgpt: { value: '25', unit: 'U/L' }, sgot: { value: '22', unit: 'U/L' }, alp: { value: '78', unit: 'U/L' }, totalProtein: { value: '7.2', unit: 'g/dL' }, albumin: { value: '4.6', unit: 'g/dL' }, globulin: { value: '2.6', unit: 'g/dL' }, agRatio: { value: '1.8', unit: '' } },
    },
    createdAt: '2024-05-21',
  },
  {
    id: 2,
    reportNumber: 'LAB-2024-0002',
    patientId: 'PT654321',
    patientName: 'Priya Verma',
    age: 32, gender: 'Female',
    mobile: '9123456780',
    email: 'priya@example.com',
    referredBy: 'Dr. Sunita Rao',
    sampleId: 'SMP001234',
    sampleType: 'Serum',
    collectionDate: '2024-05-22T10:30',
    reportTemplate: 'Standard Template',
    printFormat: 'A4',
    includeRefRange: true,
    includeMethod: true,
    status: 'draft',
    selectedTests: ['Dengue NS1 Antigen', 'CBC Test'],
    results: {
      'Dengue NS1 Antigen': { ns1Antigen: { value: 'Negative', unit: '' }, igmAntibody: { value: 'Negative', unit: '' }, iggAntibody: { value: 'Negative', unit: '' }, interpretation: { value: 'Non-dengue', unit: '' } },
      'CBC Test': { hemoglobin: { value: '12.1', unit: 'g/dL' }, rbcCount: { value: '4.20', unit: 'million/µL' }, wbcCount: { value: '7200', unit: 'cells/µL' }, plateletCount: { value: '1.80', unit: 'lakh/µL' } },
    },
    createdAt: '2024-05-22',
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const makeEmptyForm = () => ({
  patientId: '', patientName: '', age: '', gender: '',
  mobile: '', email: '', referredBy: '',
  sampleId: '', sampleType: 'Whole Blood', collectionDate: '',
  reportTemplate: 'Standard Template', printFormat: 'A4',
  includeRefRange: true, includeMethod: true, status: 'draft',
  selectedTests: [], results: {},
});

const genReportNumber = () => {
  const y = new Date().getFullYear();
  return `LAB-${y}-${String(NEXT_ID++).padStart(4, '0')}`;
};

const fmtDateTime = (str) => {
  if (!str) return '-';
  const d = new Date(str);
  return d.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
};

// ─── PRINT PDF ────────────────────────────────────────────────────────────────
const printLabReport = (report) => {
  const pagesHtml = report.selectedTests.map((testName, tIdx) => {
    const fields = LAB_TEST_FIELDS[testName] || [];
    const testResults = report.results[testName] || {};
    const isFirst = tIdx === 0;

    const rowsHtml = fields.map(f => {
      const res = testResults[f.field_key] || {};
      const val = res.value || '';
      const unit = res.unit || f.default_unit || '';
      const ref = f.reference_range || '';
      const method = f.method || '';
      return `
        <tr>
          <td style="padding:7px 12px;border-bottom:1px solid #e2e8f0;font-size:13px;color:#1e293b">${f.field_name}</td>
          <td style="padding:7px 12px;border-bottom:1px solid #e2e8f0;font-size:13px;font-weight:700;color:#0f172a">${val || '-'}</td>
          <td style="padding:7px 12px;border-bottom:1px solid #e2e8f0;font-size:13px;color:#475569">${unit}</td>
          ${report.includeRefRange ? `<td style="padding:7px 12px;border-bottom:1px solid #e2e8f0;font-size:13px;color:#64748b">${ref}</td>` : ''}
          ${report.includeMethod ? `<td style="padding:7px 12px;border-bottom:1px solid #e2e8f0;font-size:13px;color:#64748b">${method}</td>` : ''}
        </tr>`;
    }).join('');

    const colCount = 3 + (report.includeRefRange ? 1 : 0) + (report.includeMethod ? 1 : 0);

    return `
      <div style="page-break-after:always;padding:24px 32px;max-width:800px;margin:0 auto;font-family:Arial,Helvetica,sans-serif">
        <!-- HEADER -->
        <div style="display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:14px;border-bottom:3px solid #059669;margin-bottom:16px">
          <div style="display:flex;align-items:center;gap:12px">
            <div style="width:54px;height:54px;border:2.5px solid #059669;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:900;color:#059669">+</div>
            <div>
              <div style="font-size:22px;font-weight:900;color:#059669">HealthCare Diagnostics</div>
              <div style="font-size:11px;color:#6b7280;margin-top:2px">Accurate • Reliable • Trusted</div>
            </div>
          </div>
          <div style="text-align:right;font-size:12px;color:#374151;line-height:2">
            <div>123, Wellness Street, Health City</div>
            <div>New Delhi - 110001</div>
            <div>011-12345678 | info@healthcarediagnostics.com</div>
          </div>
        </div>

        <!-- TITLE -->
        <div style="text-align:center;font-size:17px;font-weight:900;letter-spacing:3px;color:#059669;text-transform:uppercase;padding:10px 0 14px;border-bottom:1px solid #d1fae5;margin-bottom:16px">
          LAB BLOOD TEST REPORT
        </div>

        <!-- PATIENT INFO BOX -->
        <div style="display:grid;grid-template-columns:1fr 1fr;border:1px solid #d1fae5;margin-bottom:16px">
          <div style="padding:12px 16px;border-right:1px solid #d1fae5">
            ${[
              ['Patient Name', report.patientName],
              ['Age / Gender', `${report.age} Y / ${report.gender}`],
              ['Patient ID', report.patientId],
              ['Referred By', report.referredBy || '-'],
            ].map(([l, v]) => `
              <div style="display:flex;gap:6px;margin-bottom:7px;font-size:13px">
                <span style="width:110px;font-weight:600;color:#374151;flex-shrink:0">${l}</span>
                <span style="color:#9ca3af;flex-shrink:0">:</span>
                <span style="font-weight:700;color:#111827">${v}</span>
              </div>`).join('')}
          </div>
          <div style="padding:12px 16px">
            ${[
              ['Sample Type', report.sampleType],
              ['Registration No', report.reportNumber],
              ['Collected On', fmtDateTime(report.collectionDate)],
              ['Reported On', fmtDateTime(new Date().toISOString())],
            ].map(([l, v]) => `
              <div style="display:flex;gap:6px;margin-bottom:7px;font-size:13px">
                <span style="width:110px;font-weight:600;color:#374151;flex-shrink:0">${l}</span>
                <span style="color:#9ca3af;flex-shrink:0">:</span>
                <span style="font-weight:700;color:#111827">${v}</span>
              </div>`).join('')}
          </div>
        </div>

        <!-- PAGE LABEL -->
        <div style="font-size:11px;color:#6b7280;margin-bottom:10px;text-align:right">
          Test ${tIdx + 1} of ${report.selectedTests.length}
        </div>

        <!-- RESULTS TABLE -->
        <table style="width:100%;border-collapse:collapse;border:1px solid #d1fae5">
          <thead>
            <tr style="background:#0f4c35">
              <th style="padding:10px 12px;text-align:left;font-size:13px;font-weight:700;color:#fff;width:35%">Test Name</th>
              <th style="padding:10px 12px;text-align:left;font-size:13px;font-weight:700;color:#fff;width:12%">Result</th>
              <th style="padding:10px 12px;text-align:left;font-size:13px;font-weight:700;color:#fff;width:12%">Unit</th>
              ${report.includeRefRange ? `<th style="padding:10px 12px;text-align:left;font-size:13px;font-weight:700;color:#fff;width:18%">Reference Range</th>` : ''}
              ${report.includeMethod ? `<th style="padding:10px 12px;text-align:left;font-size:13px;font-weight:700;color:#fff">Method</th>` : ''}
            </tr>
            <tr style="background:#f0fdf4">
              <td colspan="${colCount}" style="padding:8px 12px;font-size:13px;font-weight:800;color:#065f46;letter-spacing:0.5px">
                ${testName.toUpperCase()}
              </td>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>

        <!-- FOOTER -->
        <div style="margin-top:20px;padding-top:14px;border-top:1px solid #d1fae5;display:flex;justify-content:space-between;align-items:flex-end">
          <div style="font-size:11.5px;color:#374151;line-height:1.8">
            <strong style="font-size:12px;color:#059669">Note:</strong><br>
            • This is an electronically generated report.<br>
            • Please correlate clinically.<br>
            • Report is valid without signature.
          </div>
          <div style="text-align:right">
            <div style="font-family:Georgia,serif;font-size:22px;font-style:italic;color:#374151">Ritu Malhotra</div>
            <div style="border-top:1px solid #374151;margin:4px 0"></div>
            <div style="font-size:12px;font-weight:700;color:#059669">Dr. Ritu Malhotra</div>
            <div style="font-size:11px;color:#6b7280">MD (Pathology)<br>Consultant Pathologist<br>Reg. No. DMC/12345</div>
          </div>
        </div>

        <!-- BOTTOM BANNER -->
        <div style="text-align:center;margin-top:16px;padding:8px;background:#059669;color:#fff;font-size:13px;font-weight:700;letter-spacing:1px">
          Thank you for choosing HealthCare Diagnostics
        </div>
      </div>`;
  }).join('');

  const w = window.open('', '', 'height=900,width=870');
  if (!w) return;
  w.document.write(`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Lab Report - ${report.reportNumber}</title>
    <style>*{box-sizing:border-box;margin:0;padding:0}body{background:#fff}@media print{@page{margin:0.4cm;size:A4}*{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}}</style>
    </head><body>${pagesHtml}</body></html>`);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 600);
};

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  if (!isOpen) return null;
  const sizes = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-5xl', xl: 'max-w-6xl' };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} border border-slate-100 flex flex-col max-h-[92vh] overflow-hidden`} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 rounded-t-2xl flex-shrink-0">
          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"><X className="w-5 h-5 text-slate-500" /></button>
        </div>
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}

// ─── TEST SELECTOR DROPDOWN ───────────────────────────────────────────────────
function TestSelector({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const remaining = ALL_TEST_NAMES.filter(t => !selected.includes(t));

  const add = (t) => { onChange([...selected, t]); setOpen(false); };
  const remove = (t) => onChange(selected.filter(s => s !== t));

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {selected.map(t => (
          <span key={t} className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold">
            {t}
            <button onClick={() => remove(t)} className="hover:text-red-600"><X className="w-3.5 h-3.5" /></button>
          </span>
        ))}
      </div>
      <div className="relative">
        <button type="button" onClick={() => setOpen(!open)} className="w-full px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl text-left flex items-center justify-between text-slate-500 hover:border-emerald-200 transition-all">
          <span className="text-sm">Select Test / Package</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180 text-emerald-600' : ''}`} />
        </button>
        {open && remaining.length > 0 && (
          <div className="absolute z-30 w-full mt-1 bg-white border border-emerald-100 rounded-xl shadow-xl max-h-60 overflow-y-auto">
            {remaining.map(t => (
              <button key={t} type="button" onClick={() => add(t)} className="w-full px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2">
                <TestTube2 className="w-3.5 h-3.5 text-emerald-400" />{t}
              </button>
            ))}
          </div>
        )}
        {open && <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />}
      </div>
    </div>
  );
}

// ─── REPORT FORM ──────────────────────────────────────────────────────────────
function ReportForm({ form, setForm, onSubmit, onCancel, isEdit }) {
  const [expandedTests, setExpandedTests] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleTestsChange = (tests) => {
    setForm(prev => {
      const newResults = { ...prev.results };
      tests.forEach(t => { if (!newResults[t]) newResults[t] = {}; });
      Object.keys(newResults).forEach(t => { if (!tests.includes(t)) delete newResults[t]; });
      return { ...prev, selectedTests: tests, results: newResults };
    });
    const newExpanded = {};
    tests.forEach(t => { newExpanded[t] = true; });
    setExpandedTests(newExpanded);
  };

  const handleResultChange = (testName, fieldKey, key, value) => {
    setForm(prev => ({
      ...prev,
      results: {
        ...prev.results,
        [testName]: {
          ...prev.results[testName],
          [fieldKey]: { ...prev.results[testName]?.[fieldKey], [key]: value },
        },
      },
    }));
  };

  const toggleTest = (t) => setExpandedTests(prev => ({ ...prev, [t]: !prev[t] }));

  const inputCls = "w-full px-3 py-2 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700 text-sm";
  const labelCls = "block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* 1. Select Tests */}
      <div className="bg-slate-50 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">1</span>
          Select Test / Package
        </h3>
        <TestSelector selected={form.selectedTests} onChange={handleTestsChange} />
      </div>

      {/* 2. Patient Info */}
      <div className="bg-slate-50 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">2</span>
          Patient Information
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelCls}>Patient ID</label><input name="patientId" value={form.patientId} onChange={handleChange} placeholder="PT123456" className={inputCls} /></div>
          <div><label className={labelCls}>Patient Name *</label><input name="patientName" value={form.patientName} onChange={handleChange} required placeholder="Full name" className={inputCls} /></div>
          <div><label className={labelCls}>Age *</label><input name="age" value={form.age} onChange={handleChange} required type="number" min={1} max={120} placeholder="26" className={inputCls} /></div>
          <div>
            <label className={labelCls}>Gender *</label>
            <select name="gender" value={form.gender} onChange={handleChange} required className={inputCls}>
              <option value="">Select</option>
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>
          <div><label className={labelCls}>Mobile Number *</label><input name="mobile" value={form.mobile} onChange={handleChange} required placeholder="9876543210" className={inputCls} /></div>
          <div><label className={labelCls}>Email</label><input name="email" value={form.email} onChange={handleChange} type="email" placeholder="email@example.com" className={inputCls} /></div>
          <div className="col-span-2"><label className={labelCls}>Referred By</label><input name="referredBy" value={form.referredBy} onChange={handleChange} placeholder="Dr. Name" className={inputCls} /></div>
          <div><label className={labelCls}>Sample ID</label><input name="sampleId" value={form.sampleId} onChange={handleChange} placeholder="SMP789012" className={inputCls} /></div>
          <div>
            <label className={labelCls}>Sample Type *</label>
            <select name="sampleType" value={form.sampleType} onChange={handleChange} required className={inputCls}>
              {['Whole Blood','Serum','Plasma','Urine','Stool','Sputum','CSF','Swab'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div className="col-span-2"><label className={labelCls}>Collection Date & Time *</label><input name="collectionDate" value={form.collectionDate} onChange={handleChange} required type="datetime-local" className={inputCls} /></div>
        </div>
      </div>

      {/* 3. Test Results */}
      {form.selectedTests.length > 0 && (
        <div className="bg-slate-50 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">3</span>
            Test Results
          </h3>
          <div className="space-y-3">
            {form.selectedTests.map(testName => {
              const fields = LAB_TEST_FIELDS[testName] || [];
              const isExp = expandedTests[testName] !== false;
              return (
                <div key={testName} className="border border-emerald-100 rounded-xl overflow-hidden">
                  <button type="button" onClick={() => toggleTest(testName)} className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 transition-all">
                    <span className="font-semibold text-emerald-800 text-sm flex items-center gap-2">
                      <FlaskConical className="w-4 h-4" />{testName}
                      <span className="text-xs text-emerald-600 font-normal">({fields.length} fields)</span>
                    </span>
                    {isExp ? <ChevronUp className="w-4 h-4 text-emerald-600" /> : <ChevronDown className="w-4 h-4 text-emerald-600" />}
                  </button>
                  {isExp && (
                    <div className="p-4 bg-white">
                      <div className="grid grid-cols-5 gap-1 text-xs font-bold text-slate-500 uppercase tracking-wide px-2 mb-2">
                        <span className="col-span-2">Test Name</span><span>Result</span><span>Unit</span><span>Ref Range</span>
                      </div>
                      <div className="space-y-2">
                        {fields.map(f => {
                          const res = form.results[testName]?.[f.field_key] || {};
                          return (
                            <div key={f.field_key} className="grid grid-cols-5 gap-2 items-center px-2 py-1.5 rounded-lg hover:bg-slate-50">
                              <div className="col-span-2 text-sm text-slate-700">{f.field_name}</div>
                              <div>
                                {f.field_type === 'select' ? (
                                  <select value={res.value || ''} onChange={e => handleResultChange(testName, f.field_key, 'value', e.target.value)} className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-emerald-400">
                                    <option value="">--</option>
                                    {f.unit_options.map(o => <option key={o}>{o}</option>)}
                                  </select>
                                ) : (
                                  <input type="text" value={res.value || ''} onChange={e => handleResultChange(testName, f.field_key, 'value', e.target.value)} placeholder="Value" className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-emerald-400" />
                                )}
                              </div>
                              <div>
                                {f.unit_options.length > 1 && f.field_type !== 'select' ? (
                                  <select value={res.unit || f.default_unit || ''} onChange={e => handleResultChange(testName, f.field_key, 'unit', e.target.value)} className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-emerald-400">
                                    {f.unit_options.map(u => <option key={u}>{u}</option>)}
                                  </select>
                                ) : (
                                  <span className="text-xs text-slate-500 px-2">{f.default_unit || ''}</span>
                                )}
                              </div>
                              <div className="text-xs text-slate-400">{f.reference_range}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Report Options */}
      <div className="bg-slate-50 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-widest mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black">4</span>
          Report Options
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Report Template</label>
            <select name="reportTemplate" value={form.reportTemplate} onChange={handleChange} className={inputCls}>
              <option>Standard Template</option><option>Detailed Template</option><option>Compact Template</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Print Format</label>
            <select name="printFormat" value={form.printFormat} onChange={handleChange} className={inputCls}>
              <option>A4</option><option>A5</option><option>Letter</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={inputCls}>
              <option value="draft">Draft</option><option value="final">Final</option><option value="delivered">Delivered</option>
            </select>
          </div>
          <div className="flex items-center gap-6 pt-5">
            {[['includeRefRange','Include Reference Range'],['includeMethod','Include Method']].map(([name, lbl]) => (
              <label key={name} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input type="checkbox" name={name} checked={form[name]} onChange={handleChange} className="w-4 h-4 rounded accent-emerald-600" />
                {lbl}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">Cancel</button>
        <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all font-semibold shadow-lg flex items-center justify-center gap-2">
          <Printer className="w-4 h-4" />
          {isEdit ? 'Update & Print' : 'Generate & Print'}
        </button>
      </div>
    </form>
  );
}

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = { draft: 'bg-slate-100 text-slate-600', final: 'bg-emerald-100 text-emerald-700', delivered: 'bg-blue-100 text-blue-700' };
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${map[status] || 'bg-slate-100 text-slate-600'}`}>{status}</span>;
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function LabReportPage() {
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState({ type: null });
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(makeEmptyForm());
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', dir: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const openModal = (type, report = null) => {
    setSelected(report);
    if (type === 'add') setForm(makeEmptyForm());
    else if (type === 'edit' && report) setForm({ ...report });
    setModal({ type });
  };
  const closeModal = () => { setModal({ type: null }); setSelected(null); };

  const handleSubmit = (e) => {
    e.preventDefault();
    let saved;
    if (modal.type === 'edit') {
      setReports(prev => prev.map(r => r.id === selected.id ? { ...selected, ...form } : r));
      saved = { ...selected, ...form };
    } else {
      saved = { ...form, id: NEXT_ID, reportNumber: genReportNumber(), createdAt: new Date().toISOString().split('T')[0] };
      setReports(prev => [saved, ...prev]);
    }
    closeModal();
    setTimeout(() => printLabReport(saved), 100);
  };

  const handleDelete = () => {
    setReports(prev => prev.filter(r => r.id !== selected.id));
    closeModal();
  };

  const sorted = useMemo(() => {
    return [...reports].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.dir === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.dir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [reports, sortConfig]);

  const filtered = useMemo(() => sorted.filter(r =>
    r.patientName.toLowerCase().includes(search.toLowerCase()) ||
    r.patientId.toLowerCase().includes(search.toLowerCase()) ||
    r.reportNumber.toLowerCase().includes(search.toLowerCase()) ||
    r.mobile.includes(search) ||
    r.selectedTests.join(' ').toLowerCase().includes(search.toLowerCase())
  ), [sorted, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleSort = (key) => setSortConfig(prev => ({ key, dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc' }));
  const SortIcon = ({ k }) => sortConfig.key !== k ? <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400" /> : sortConfig.dir === 'asc' ? <ChevronUp className="w-3.5 h-3.5 text-emerald-600" /> : <ChevronDown className="w-3.5 h-3.5 text-emerald-600" />;

  const cols = [
    { key: 'reportNumber', label: 'Report No', icon: Hash },
    { key: 'patientId',    label: 'Patient ID', icon: Hash },
    { key: 'patientName',  label: 'Patient Name', icon: User },
    { key: 'mobile',       label: 'Mobile', icon: Phone },
    { key: 'sampleType',   label: 'Sample Type', icon: TestTube2 },
    { key: 'collectionDate', label: 'Collection Date', icon: CalendarDays },
    { key: 'referredBy',   label: 'Referred By', icon: Stethoscope },
    { key: 'status',       label: 'Status', icon: FileText },
    { key: 'createdAt',    label: 'Created', icon: CalendarDays },
  ];

  const stats = [
    { label: 'Total Reports', value: reports.length, color: 'text-slate-800' },
    { label: 'Final Reports', value: reports.filter(r => r.status === 'final').length, color: 'text-emerald-600' },
    { label: 'Draft Reports', value: reports.filter(r => r.status === 'draft').length, color: 'text-amber-600' },
    { label: 'Delivered',     value: reports.filter(r => r.status === 'delivered').length, color: 'text-blue-600' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Lab Reports</h1>
            <p className="text-slate-600">Generate and manage laboratory test reports</p>
          </div>
          <button onClick={() => openModal('add')} className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all font-semibold shadow-lg hover:shadow-xl flex items-center gap-2">
            <Plus className="w-5 h-5" /> Generate Lab Report
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <p className="text-sm text-slate-600 mb-1">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input type="text" placeholder="Search by patient name, ID, report number, test name..." value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-700" />
            {search && <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-700">Show:</span>
            <select value={perPage} onChange={e => { setPerPage(Number(e.target.value)); setCurrentPage(1); }} className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 text-slate-700 font-medium cursor-pointer">
              {[10,25,50,100].map(n => <option key={n} value={n}>{n} per page</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
              <tr>
                {cols.map(({ key, label, icon: Icon }) => (
                  <th key={key} className="px-4 py-3.5 text-left">
                    <button onClick={() => handleSort(key)} className="flex items-center gap-1.5 font-semibold text-sm text-slate-700 hover:text-emerald-600 transition-colors whitespace-nowrap">
                      <Icon className="w-3.5 h-3.5 text-emerald-500" />{label}<SortIcon k={key} />
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3.5 text-center"><span className="font-semibold text-sm text-slate-700">Tests</span></th>
                <th className="px-4 py-3.5 text-center"><span className="font-semibold text-sm text-slate-700">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginated.length > 0 ? paginated.map(r => (
                <tr key={r.id} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="px-4 py-3.5"><span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs font-semibold">{r.reportNumber}</span></td>
                  <td className="px-4 py-3.5 text-slate-600 text-sm">{r.patientId}</td>
                  <td className="px-4 py-3.5 font-semibold text-slate-800 text-sm whitespace-nowrap">{r.patientName}</td>
                  <td className="px-4 py-3.5 text-slate-600 text-sm">{r.mobile}</td>
                  <td className="px-4 py-3.5 text-slate-600 text-sm">{r.sampleType}</td>
                  <td className="px-4 py-3.5 text-slate-600 text-sm whitespace-nowrap">{r.collectionDate ? fmtDateTime(r.collectionDate) : '-'}</td>
                  <td className="px-4 py-3.5 text-slate-600 text-sm">{r.referredBy || '-'}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={r.status} /></td>
                  <td className="px-4 py-3.5 text-slate-600 text-sm">{r.createdAt}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-1 max-w-[180px]">
                      {r.selectedTests.map(t => (
                        <span key={t} className="px-1.5 py-0.5 bg-teal-50 text-teal-700 rounded text-xs font-medium">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openModal('view', r)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => openModal('edit', r)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Edit"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => printLabReport(r)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="Print"><Printer className="w-4 h-4" /></button>
                      <button onClick={() => openModal('delete', r)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={11} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <FlaskConical className="w-12 h-12 text-slate-300" />
                    <p className="text-slate-600 font-medium">No lab reports found</p>
                  </div>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-800">{Math.min((currentPage-1)*perPage+1, filtered.length)}</span> to{' '}
            <span className="font-semibold text-slate-800">{Math.min(currentPage*perPage, filtered.length)}</span> of{' '}
            <span className="font-semibold text-slate-800">{filtered.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(p => p-1)} disabled={currentPage===1} className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${currentPage===1 ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>Previous</button>
            {Array.from({length: Math.min(totalPages,5)}, (_,i)=>{
              let p = i+1;
              if(totalPages>5 && currentPage>3) p = currentPage-2+i;
              if(p > totalPages) return null;
              return <button key={p} onClick={()=>setCurrentPage(p)} className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${currentPage===p ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow' : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'}`}>{p}</button>;
            })}
            <button onClick={() => setCurrentPage(p => p+1)} disabled={currentPage===totalPages} className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${currentPage===totalPages ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}>Next</button>
          </div>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      <Modal isOpen={modal.type==='add'||modal.type==='edit'} onClose={closeModal} title={modal.type==='edit' ? 'Edit Lab Report' : 'Generate Lab Report'} size="xl">
        <ReportForm form={form} setForm={setForm} onSubmit={handleSubmit} onCancel={closeModal} isEdit={modal.type==='edit'} />
      </Modal>

      {/* VIEW MODAL */}
      <Modal isOpen={modal.type==='view'} onClose={closeModal} title="Lab Report Details" size="lg">
        {selected && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
              {[
                ['Report Number', selected.reportNumber],
                ['Patient ID', selected.patientId],
                ['Patient Name', selected.patientName],
                ['Age / Gender', `${selected.age} / ${selected.gender}`],
                ['Mobile', selected.mobile],
                ['Email', selected.email || '-'],
                ['Referred By', selected.referredBy || '-'],
                ['Sample ID', selected.sampleId || '-'],
                ['Sample Type', selected.sampleType],
                ['Collection Date', fmtDateTime(selected.collectionDate)],
                ['Status', selected.status],
                ['Created At', selected.createdAt],
              ].map(([l,v]) => (
                <div key={l}>
                  <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide mb-0.5">{l}</p>
                  <p className="font-semibold text-slate-800 text-sm">{v}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide mb-2">Selected Tests</p>
              <div className="flex flex-wrap gap-2">
                {selected.selectedTests.map(t => (
                  <span key={t} className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-semibold">{t}</span>
                ))}
              </div>
            </div>
            {Object.entries(selected.results).map(([testName, fields]) => (
              <div key={testName} className="border border-emerald-100 rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-gradient-to-r from-emerald-50 to-teal-50 font-semibold text-emerald-800 text-sm flex items-center gap-2">
                  <FlaskConical className="w-4 h-4" />{testName}
                </div>
                <table className="w-full text-sm">
                  <thead><tr className="bg-slate-50">
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500">Test Name</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500">Result</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500">Unit</th>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-slate-500">Reference Range</th>
                  </tr></thead>
                  <tbody>
                    {Object.entries(fields).map(([fk, fv]) => {
                      const meta = (LAB_TEST_FIELDS[testName] || []).find(f => f.field_key === fk);
                      return (
                        <tr key={fk} className="border-t border-slate-100">
                          <td className="px-4 py-2 text-slate-700">{meta?.field_name || fk}</td>
                          <td className="px-4 py-2 font-bold text-slate-900">{fv.value || '-'}</td>
                          <td className="px-4 py-2 text-slate-500">{fv.unit || meta?.default_unit || ''}</td>
                          <td className="px-4 py-2 text-slate-400">{meta?.reference_range || ''}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
            <div className="flex gap-3 pt-2 border-t border-slate-200">
              <button onClick={() => printLabReport(selected)} className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold flex items-center justify-center gap-2"><Printer className="w-4 h-4" />Print PDF</button>
              <button onClick={() => { closeModal(); openModal('edit', selected); }} className="flex-1 px-4 py-2.5 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-colors font-semibold">Edit Report</button>
              <button onClick={closeModal} className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">Close</button>
            </div>
          </div>
        )}
      </Modal>

      {/* DELETE MODAL */}
      <Modal isOpen={modal.type==='delete'} onClose={closeModal} title="Delete Report" size="sm">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Are you sure?</h3>
          <p className="text-sm text-slate-600 mb-6">Delete report <span className="font-semibold">{selected?.reportNumber}</span> for <span className="font-semibold">{selected?.patientName}</span>? This action cannot be undone.</p>
          <div className="flex gap-3">
            <button onClick={closeModal} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-semibold">Cancel</button>
            <button onClick={handleDelete} className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold">Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}