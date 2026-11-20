import React from 'react';
import { BookSources, cleanBookText, powerReferenceKey } from '../lib/bookReferences';
import { useI18n } from '../lib/i18n';
import { DisciplineDetail, DisciplinePower } from '../types';
import { IMITATION_RULE } from '../data/expandedPowers';
import fullTexts from '../data/disciplinePowerTexts.json';

const texts: Record<string, { 'pt-BR'?: string; en?: string; communityDescription?: string; communityDescriptionPtBR?: string }> = fullTexts;

export function PowerDetails({ power, discipline, disciplineKey }: { power: DisciplinePower; discipline: DisciplineDetail; disciplineKey: string }) {
  const { locale, t } = useI18n();
  const imitation = /^imitate-([^-]+)-(.+)$/.exec(power.id);
  const sourceKey = imitation
    ? `power:${imitation[1]}:${imitation[2]}`
    : `power:${disciplineKey}:${power.id}`;
  const source = texts[sourceKey];
  const language = locale === 'pt' || !source?.en ? 'pt-BR' : 'en';
  const sourceText = source?.[language];
  const communityDescription = locale === 'pt' ? source?.communityDescriptionPtBR : source?.communityDescription;

  return (
    <div className="space-y-3">
      <p className="font-semibold">Nível {power.level}</p>
      {((!sourceText && !communityDescription) || imitation) && <p>{power.description}</p>}
      {communityDescription && (
        <section className="space-y-2">
          <h4 className="font-semibold">{locale === 'pt' ? 'Descrição da fonte (português)' : 'Source description (English)'}</h4>
          <p lang={locale === 'pt' ? 'pt-BR' : 'en'}>{communityDescription}</p>
        </section>
      )}
      {imitation && sourceText && <p>{IMITATION_RULE}</p>}
      {sourceText ? (
        <section className="space-y-2">
          <h4 className="font-semibold">{language === 'pt-BR' ? 'Texto da fonte (português)' : 'Source text (English)'}</h4>
          <div lang={language} className="space-y-3">
            {sourceText.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
        </section>
      ) : (
        <>
          {power.cost && <p>Custo: {power.cost}</p>}
          <p className="whitespace-pre-wrap">{cleanBookText(power.system)}</p>
          {!power.community && !imitation && <p className="text-gray-400">Resumo do catálogo.</p>}
        </>
      )}
      {power.amalgam?.map(req => (
        <p key={req.discipline}>Amálgama: {t(`disciplines.${req.discipline}.name`)} {req.level}</p>
      ))}
      {power.prerequisite && (
        <p>Pré-requisito: {discipline.powers.find(item => item.id === power.prerequisite)?.name || power.prerequisite}</p>
      )}
      {!!power.prerequisiteAny?.length && (
        <p>Pré-requisito (um deles): {power.prerequisiteAny.map(id => discipline.powers.find(item => item.id === id)?.name || id).join(' ou ')}</p>
      )}
    </div>
  );
}

export function DisciplineReference({ discipline, disciplineKey }: { discipline: DisciplineDetail; disciplineKey: string }) {
  return (
    <div className="space-y-4">
      <p>{discipline.description}</p>
      {[1, 2, 3, 4, 5].map(level => (
        <section key={level}>
          <h3 className="font-bold border-b pb-1">Nível {level}</h3>
          {discipline.powers.filter(power => power.level === level).map(power => (
            <article key={power.id} className="mt-3 space-y-2">
              <h4 className="font-semibold">{power.name}</h4>
              <PowerDetails power={power} discipline={discipline} disciplineKey={disciplineKey} />
              <BookSources sourceKey={powerReferenceKey(discipline.name, power.id)} title={power.name} />
            </article>
          ))}
        </section>
      ))}
    </div>
  );
}
