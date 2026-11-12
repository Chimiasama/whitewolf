import React, {createContext, useContext} from 'react';
import bibliography from '../data/bookReferences.json';

export interface BookReference {
  book: string;
  pagination?: "pdf";
  language: string;
  pages: string;
  section?: string;
  file?: string;
  anchor?: number;
}
export const BookReferenceScope = createContext('Vampire');
const entries = bibliography.entries as Record<string, BookReference[]>;
const aliases = bibliography.aliases as Record<string, string[]>;
const normalize = (value: string) => value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');

export function catalogReferenceKey(label: string, id: string): string | undefined {
  const value = normalize(label);
  const disciplineKey=(aliases[normalize(label.split('—')[0].trim())]||[]).find(key=>key.startsWith('discipline:'));
  if(disciplineKey && entries[disciplineKey.replace('discipline:','power:')+':'+id]) return disciplineKey.replace('discipline:','power:')+':'+id;
  const prefixes = value.includes('predador') ? ['predator']
    : value.includes('sangueralo') ? (value.includes('defeito') ? ['thinflaw'] : ['thinmerit'])
    : value.includes('cerimonia') ? ['ceremony'] : value.includes('ritua') ? ['ritual','rite']
    : value.includes('loresheet') || value.includes('conhecimento') ? ['loresheet']
    : value.includes('disciplina') ? ['discipline'] : value.includes('dons') ? ['gift']
    : value.includes('talisma') ? ['talisman'] : ['advantage','wolfadvantage','gift','rite','ritual','ceremony'];
  return prefixes.map(prefix => `${prefix}:${id}`).find(key => entries[key]);
}

export function getBookReferences(title: string, sourceKey?: string, game = 'Vampire'): BookReference[] {
  const clean = title.replace(/^Caçada:\s*/i,'').replace(/\s*·\s*nível\s*\d+.*$/i,'').replace(/^\[Comunitário \/ opcional\]\s*/i,'');
  let keys = sourceKey && entries[sourceKey] ? [sourceKey] : aliases[normalize(clean)] || [];
  if (game === 'Werewolf') {
    keys = keys.map(key => {
      const wolfKey = key.replace(/^attribute:/,'wolfattribute:').replace(/^skill:/,'wolfskill:').replace(/^advantage:/,'wolfadvantage:');
      return entries[wolfKey] ? wolfKey : key;
    });
    if (keys.some(key=>/^(gift|rite|tribe|auspice|talisman|wolf)/.test(key))) keys=keys.filter(key=>/^(gift|rite|tribe|auspice|talisman|wolf)/.test(key));
  } else if (keys.some(key=>!/^(gift|rite|tribe|auspice|talisman|wolf)/.test(key))) keys=keys.filter(key=>!/^(gift|rite|tribe|auspice|talisman|wolf)/.test(key));
  const unique = new Map<string, BookReference>();
  for (const key of keys) for (const ref of entries[key] || []) unique.set(`${ref.book}:${ref.pages}:${ref.section||''}`, ref);
  return [...unique.values()];
}

export function BookSources({title = '', sourceKey}: {title?: string; sourceKey?: string}) {
  const game=useContext(BookReferenceScope);
  const references=getBookReferences(title,sourceKey,game);
  if(!references.length)return null;
  return <aside aria-label="Referências bibliográficas" className="book-sources mt-5 border-t border-gray-600 pt-4 text-sm text-left">
    <h4 className="font-semibold mb-2">Onde consultar nos livros</h4>
    <ul className="space-y-2">{references.map((ref,i)=><li key={i}>
      <span className="font-medium">{ref.book}</span>
      {ref.pages && <span> — {ref.pages.includes('–')||ref.pages.includes('-')||ref.pages.includes(',')?'páginas':'página'} {ref.pages}</span>}
      {ref.pagination==='pdf'&&<span> do PDF (sem numeração impressa)</span>}
      {ref.language!=='unverified' && <span> ({ref.language==='pt-BR'?'português brasileiro':'inglês'})</span>}
      {ref.section && <span className="block text-xs text-gray-400">{ref.section}</span>}
    </li>)}</ul>
    {references.some(r=>r.pages&&r.pagination!=='pdf')&&<p className="mt-2 text-xs text-gray-400">Numeração impressa do livro; pode diferir do contador de páginas do PDF.</p>}
  </aside>;
}

/** Hide extraction coordinates in product copy; bibliography uses printed pages. */
export function cleanBookText(text: string): string {
  return text.replace(/\(?docs\/[A-Za-z0-9_]+(?::L?\d+)?(?:, seção [^;.)]+)?\)?/g, '').replace(/;\s*[;.]/g, '.').replace(/\s+([,;.])/g, '$1').trim();
}

export function powerReferenceKey(disciplineName: string, id: string): string | undefined {
  const key=(aliases[normalize(disciplineName)]||[]).find(key=>key.startsWith('discipline:'));
  return key ? key.replace('discipline:','power:')+':'+id : undefined;
}
