import React from 'react';
import texts from '../data/thinBloodReferences.json';
export function ThinBloodReference({category,id}:{category:'thinMerits'|'thinFlaws';id:string}) {
 return <div className="space-y-3"><p>{texts[category][id]}</p><p>Sem custo em pontos comuns: cada Defeito compensa uma Qualidade, e vice-versa. Escolha de uma a três de cada tipo. Não contam para o orçamento normal de Vantagens e Defeitos.</p></div>;
}
