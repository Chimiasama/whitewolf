"""Apply manually verified trait references after automatic bibliography extraction."""
import json,re
from pathlib import Path
root=Path(__file__).resolve().parents[1]
def apply_verified_references(b):
    data=json.loads((root/'data/advantageFullTexts.json').read_text())
    books={}
    for refs in b['entries'].values():
        for ref in refs:
            if ref.get('file'):books[ref['file']]={k:ref[k] for k in ['book','language','file']}
    for game,items in data.items():
        prefix='wolfadvantage' if game=='Werewolf' else 'advantage'
        for id,item in items.items():
            ref={**books[item['file']],'pages':item['pages']} if item['file'] else {'book':'Regra da casa já existente no aplicativo — fonte não localizada','language':'unverified','pages':''}
            b['entries'][prefix+':'+id]=[ref]
    raw=(root/'data/advantageFullTexts.ts').read_text().split('const aliases:Record<string,string>={',1)[1].split('};',1)[0]
    aliases=dict(re.findall(r"(\w+):'([^']+)'",raw))
    for id,base in aliases.items():
        if id not in data['Vampire']:b['entries']['advantage:'+id]=b['entries']['advantage:'+base]
    # Non-specialized package IDs share the Background's definition.
    for path in ['data/predators.ts','constants.ts']:
        raw=(root/path).read_text()
        ids=set(re.findall(r'''(?:id:\s*['"]|[af]\(\s*['"])([\w]+)['"]''',raw))
        for id in ids:
            if 'advantage:'+id in b['entries'] and id not in data['Vampire'] and id not in aliases:
                base=next((key for key in ['fame','resources','influence','allies','contacts','haven','herd','enemy'] if id.startswith(key+'_') or id.endswith('_'+key)),None)
                if base:b['entries']['advantage:'+id]=b['entries']['advantage:'+base]
    for key,items in json.loads((root/'data/thinBloodReferences.json').read_text()).items():
        for id in items:b['entries'][('thinmerit' if key=='thinMerits' else 'thinflaw')+':'+id]=[{**books['Vampiro5edptbr'],'pages':'182–184'}]
    return b
if __name__=='__main__':
    path=root/'data/bookReferences.json'
    path.write_text(json.dumps(apply_verified_references(json.loads(path.read_text())),ensure_ascii=False,indent=2)+'\n')
