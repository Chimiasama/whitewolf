#!/usr/bin/env python3
"""Reproducible discovery index; extracted anchors are not approved rules."""
from pathlib import Path
import re,hashlib,json
root=Path(__file__).resolve().parents[1]
books=sorted(p for p in (root/'docs').iterdir() if p.is_file() and p.name.startswith(('Vamp','Vapi','Werewolf')))
categories={
 'criação e progressão':r'character creation|creation summary|experience costs|trait costs|castoff summary|skill distribution|creating a',
 'identidade e narrativa':r'archetypes?$|^clan:|^auspice:|^tribe:|^ambition:|^convictions:|^touchstones:|^epitaph:',
 'poderes e requisitos':r'^cost:|^dice pools?:|^renown:|^total renown|^prerequisite|^amalgam:',
 'NPCs e antagonistas':r'^general difficult|^standard dice pools:|^exceptional dice pools:|^disciplines:|^notes / other traits:',
 'vantagens, ritos e equipamento':r'^merits?$|^flaws?$|^backgrounds?$|^loresheets?$|^rites?$|^rituals?$|^talismans?$|^ceremonies?$|^thin.blood alchemy$'
}
manifest=[];out=['# Índice de referências V5/W5','', 'Gerado por `python scripts/index-references.py`. Todos os arquivos são percorridos integralmente. As âncoras abaixo são resultados de busca em texto extraído/OCR, **não regras aprovadas nem confirmação de que cada parágrafo foi revisado**. Uma linha pode pertencer a mais de uma categoria. Leia o contexto no livro; a ordem de colunas pode estar alterada. Linhas são reproduzíveis para os hashes registrados; não são números de página.','']
for p in books:
 lines=p.read_text().splitlines();record={'file':p.name,'edition':'W5' if p.name.startswith('Werewolf') else 'V5','source_class':'community' if p.name=='Vampire5edPlayersGuide02' else 'publisher', 'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'lines':len(lines),'categories':{}}
 out += [f'## {p.name}', '',f"{record['edition']} · {record['source_class']} · {len(lines)} linhas · SHA-256 `{record['sha256']}`",'']
 for category,pattern in categories.items():
  anchors=[(i+1,l.strip()) for i,l in enumerate(lines) if re.search(pattern,l,re.I)]
  record['categories'][category]=len(anchors)
  out += [f'### {category} ({len(anchors)})','']
  out += [f'- [L{n}]({p.name}#L{n}): {label}' for n,label in anchors]
  out += ['']
 manifest.append(record)
(root/'docs/REFERENCE_INDEX.md').write_text('\n'.join(out).rstrip()+'\n')
(root/'docs/reference-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
print(f'{len(books)} fontes, {sum(r["lines"] for r in manifest)} linhas indexadas; '+str(sum(sum(r['categories'].values()) for r in manifest))+' âncoras.')
