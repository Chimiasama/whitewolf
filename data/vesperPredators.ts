import rows from './vesperPredators.json';
import {PredatorTypeDetail} from '../types';
export const VESPER_BOOK='V5 New Predator Types — Vesper Burjoski (conteúdo comunitário)';
export const VESPER_FILE='V5NewPredatorTypes';
export const VESPER_PREDATORS:PredatorTypeDetail[]=rows.map(({pages,tests,...item})=>({...item,name:item.name.replace("[Comunitário / opcional] ",""),source:`${VESPER_BOOK}, p. ${pages} do PDF (sem numeração impressa).`,fixedAdvantages:item.advantages,fixedFlaws:item.flaws} as PredatorTypeDetail));
