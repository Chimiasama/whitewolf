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
    books['V5NewPredatorTypes']={'book':'V5 New Predator Types — Vesper Burjoski (conteúdo comunitário)','language':'en','file':'V5NewPredatorTypes'}
    for game,items in data.items():
        prefix='wolfadvantage' if game=='Werewolf' else 'advantage'
        for id,item in items.items():
            ref={**books[item['file']],'pages':item['pages']} if item['file'] else {'book':'Regra da casa já existente no aplicativo — fonte não localizada','language':'unverified','pages':''}
            if item.get('pagination'):ref['pagination']=item['pagination']
            b['entries'][prefix+':'+id]=[ref]
            if item.get('secondaryFile'):b['entries'][prefix+':'+id].append({**books[item['secondaryFile']],'pages':item['secondaryPages']})
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
    guide=books['Vampire5edPlayersGuide02']
    def guide_ref(page):return [{**guide,'pages':str(page)}]
    def alias(name,key):
        import unicodedata
        norm=re.sub(r'[^a-z0-9]','',unicodedata.normalize('NFKD',name).encode('ascii','ignore').decode().lower())
        b['aliases'][norm]=list(dict.fromkeys(b['aliases'].get(norm,[])+[key]))
    for power in json.loads((root/'data/unofficialGuidePowers.json').read_text()):
        key='power:'+power['discipline']+':'+power['id']
        b['entries'][key]=guide_ref(power['page'])
        alias(power['name'],key);alias(power['english'],key)
        if power['level']<=4:b['entries']['power:thinbloodalchemy:imitate-'+power['discipline']+'-'+power['id']]=guide_ref(power['page'])
    for key in ['power:auspex:scanTheRoom','power:oblivion:witnessTheEnd','power:thinbloodalchemy:imitate-auspex-scanTheRoom','power:thinbloodalchemy:imitate-oblivion-witnessTheEnd','advantage:supportive_presence']:b['entries'].pop(key,None)
    for id,predator in json.loads((root/'data/unofficialGuidePredators.json').read_text()).items():
        key='predator:'+id;b['entries'][key]=guide_ref(predator['page']);alias(predator['name'],key);alias(predator['englishName'],key)
        for grant in predator['advantages']+predator['flaws']:
            # Use the canonical reference where available; otherwise package source.
            if 'advantage:'+grant['id'] not in b['entries']:b['entries']['advantage:'+grant['id']]=guide_ref(predator['page'])
    for item in json.loads((root/'data/unofficialGuideRituals.json').read_text()):
        key=('ceremony:' if item['ceremony'] else 'ritual:')+item['id'];b['entries'][key]=guide_ref(item['page']);alias(item['name'],key);alias(item['english'],key)
    for predator in json.loads((root/'data/vesperPredators.json').read_text()):
        key='predator:'+predator['id'];b['entries'][key]=[{**books['V5NewPredatorTypes'],'pages':predator['pages'],'pagination':'pdf'}];alias(predator['name'].replace('[Comunitário / opcional] ',''),key);alias(predator['englishName']+' — Vesper Burjoski',key)
    return b
if __name__=='__main__':
    path=root/'data/bookReferences.json'
    path.write_text(json.dumps(apply_verified_references(json.loads(path.read_text())),ensure_ascii=False,indent=2)+'\n')
