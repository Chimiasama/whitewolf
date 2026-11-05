import React from 'react';
import { PredatorTypeDetail } from '../types';
import {
  HUNTING_REFERENCES, HUNTING_RULES, HUNTING_STEPS, HUNTING_APPROACHES,
  OTHER_HUNTING_EXAMPLES, DOMAIN_HUNTING_NOTES, DOMAIN_HUNTING_SOURCE,
  HuntingTest,
} from '../data/huntingHelp';

function TestList({ tests }: { tests: HuntingTest[] }) {
  return <ul className="list-disc space-y-2 pl-5">{tests.map(test =>
    <li key={test.pool + test.source}>
      <strong>{test.pool}</strong> — {test.use}
      <p className="text-xs text-gray-400">Fonte: {test.source}.</p>
    </li>,
  )}</ul>;
}

export function HuntingReference({ predator: p }: { predator: PredatorTypeDetail }) {
  const reference = HUNTING_REFERENCES[p.id];
  const domainNotes = DOMAIN_HUNTING_NOTES[p.id];
  return <div className="space-y-4">
    <section className="space-y-2" aria-label="Testes de caçada e alimentação">
      <h3 className="font-bold">Testes de caçada e alimentação</h3>
      {reference ? <>
        <TestList tests={reference.tests} />
        {reference.note && <p>{reference.note}</p>}
        {reference.community && <p className="text-xs text-gray-400">Fonte comunitária de Bully; estas paradas não pertencem ao Players Guide oficial.</p>}
      </> : <p>Não há uma parada conferida para este tipo. Combine a abordagem e a parada com o Narrador.</p>}
    </section>
    {reference?.additionalTests?.length > 0 && <section className="space-y-2">
      <h4 className="font-bold">Teste adicional de situação</h4>
      <TestList tests={reference.additionalTests} />
    </section>}
    <section className="space-y-2">
      <h4 className="font-bold">Como resolver a caçada</h4>
      <p>{HUNTING_RULES}</p>
      <details>
        <summary className="cursor-pointer">Passo a passo da rolagem</summary>
        <ol className="list-decimal space-y-2 pl-5 mt-2">{HUNTING_STEPS.map(step => <li key={step}>{step}</li>)}</ol>
        <p className="mt-2">Exemplo: Força 3 + Briga 2 forma uma parada de 5d10. Com Fome 2, role 3 dados comuns e 2 Dados de Fome. A Dificuldade vem do território e das circunstâncias, não dos valores de Força e Briga.</p>
        <p className="text-xs text-gray-400 mt-2">Básico V5: regras de testes, pp. 117–123; Caçada, pp. 306–308; Tabela de Alimentação, p. 212.</p>
      </details>
    </section>
    {domainNotes && <details>
      <summary className="cursor-pointer">Modificadores de domínio para este tipo</summary>
      <p className="mt-2">Dependem das Qualidades de Domínio escolhidas pela coterie:</p>
      <ul className="list-disc pl-5 space-y-2">{domainNotes.map(note => <li key={note}>{note}</li>)}</ul>
      <p className="text-xs text-gray-400 mt-2">{DOMAIN_HUNTING_SOURCE}</p>
    </details>}
    <details>
      <summary className="cursor-pointer">Outras abordagens e exemplos dos livros</summary>
      <p className="my-2">Os exemplos abaixo dependem da cena; não se somam à parada habitual do predador.</p>
      <TestList tests={HUNTING_APPROACHES} />
      <h4 className="font-bold my-2">Exemplos específicos de suplementos</h4>
      <TestList tests={OTHER_HUNTING_EXAMPLES} />
    </details>
  </div>;
}
