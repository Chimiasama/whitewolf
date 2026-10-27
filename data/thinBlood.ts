export const THIN_MERITS = {anarch:'Camaradas Anarquistas',contact:'Contato na Camarilla',catenating:'Sangue Vinculante',day:'Bebedor Diurno',affinity:'Afinidade com Disciplina',lifelike:'Semelhança com a Vida',alchemist:'Alquimista de Sangue-Fraco',resilience:'Resiliência Vampírica'};
export const THIN_FLAWS = {teeth:'Dentes de Bebê',bestial:'Temperamento Bestial',branded:'Marcado pela Camarilla',curse:'Maldição de Clã',dead:'Carne Morta',frailty:'Fragilidade Mortal',shunned:'Rejeitado pelos Anarquistas',dependency:'Dependência de Vitae'};
export function thinBloodIssues(c:any):string[]{
 const m=c.thinMerits||[],f=c.thinFlaws||[],issues=[];
 if(m.length<1||m.length>3||m.length!==f.length)issues.push('Sangue-Fraco: escolha de 1 a 3 Méritos e o mesmo número de Defeitos, separados do orçamento 7/2.');
 for(const [merit,flaw] of [['lifelike','dead'],['resilience','frailty'],['anarch','shunned']])if(m.includes(merit)&&f.includes(flaw))issues.push('Mérito e Defeito incompatíveis: '+THIN_MERITS[merit]+' / '+THIN_FLAWS[flaw]);
 if(c.bloodPotency!==0||c.generation<14||c.generation>16)issues.push('Sangue-Fraco: Potência de Sangue 0 e geração 14–16.');
 if(c.predatorType)issues.push('Sangue-Fraco não recebe pacote de predador.');
 if(f.includes('curse')){if(!c.thinCurse)issues.push('Escolha a Maldição herdada.');if(['brujah','gangrel'].includes(c.thinCurse)&&!f.includes('bestial'))issues.push('Essa Maldição exige Temperamento Bestial.');if(c.thinCurse==='tremere'&&!m.includes('catenating'))issues.push('Maldição Tremere exige Sangue Vinculante.');}
 const disciplines=Object.entries(c.disciplines||{}).filter(([,dots])=>Number(dots)>0);
 const affinity=disciplines.filter(([id])=>id!=='thinbloodalchemy');
 if(m.includes('affinity')?(affinity.length!==1||affinity[0][1]!==1):affinity.length>0)issues.push('Afinidade: escolha exatamente uma Disciplina com 1 ponto se possuir o Mérito; sem ele, não há Disciplina permanente inicial.');
 if(m.includes('alchemist')?c.disciplines?.thinbloodalchemy!==1:Number(c.disciplines?.thinbloodalchemy||0)>0)issues.push('Alquimista concede 1 ponto de Alquimia e exige uma fórmula; sem o Mérito, não há Alquimia inicial.');
 return issues;
}
