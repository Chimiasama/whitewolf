#!/usr/bin/env python3
"""Build the UI bibliography from a catalogue snapshot and local book transcriptions.
Usage: python scripts/build-book-references.py /tmp/reference-inventory.json
Ranges bracket printed page markers; line numbers are never presented as pages.
"""
from pathlib import Path
import json,re,sys,bisect,unicodedata
root=Path(__file__).resolve().parents[1]
items=json.loads(Path(sys.argv[1]).read_text())
raw=(root/'lib/i18n.tsx').read_text()
en=json.loads(raw.split('const oEn = ',1)[1].split('\n};',1)[0]+'\n}')
pt=json.loads(raw.split('const oPt = ',1)[1].split('\n};',1)[0]+'\n}')
def norm(s):return re.sub(r'[^a-z0-9]','',unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode().lower())
translations={}
def pairs(a,b):
 if isinstance(a,dict) and isinstance(b,dict):
  for k in a:
   if k in b:
    if k=='name' and isinstance(a[k],str):translations[norm(b[k])]=a[k]
    else:pairs(a[k],b[k])
pairs(en,pt)
books={
'Vampiro5edptbr':('Vampiro: A Máscara — Livro Básico, 5ª edição','pt-BR'),
'Vampiro5edCompaniomptbr':('Vampiro: A Máscara — Guia Suplementar (Companion)','pt-BR'),
'Vapire5edenglish':('Vampire: The Masquerade — Corebook, 5th Edition','en'),
'Vampire5edPlayersGuide01':('Vampire: The Masquerade — Players Guide','en'),
'Vampire5edPlayersGuide02':('V5 Player’s Guide — Bully (conteúdo comunitário)','en'),
'Vampire5edCultsoftheBloddGods':('Vampire: The Masquerade — Cults of the Blood Gods','en'),
'Vampire5edChicagobyNight':('Vampire: The Masquerade — Chicago by Night','en'),
'Vampire5edAnarch':('Vampire: The Masquerade — Anarch','en'),
'Vapire5edCamarilla':('Vampire: The Masquerade — Camarilla','en'),
'Vampire5edForbiddenReligions':('Vampire: The Masquerade — Forbidden Religions','en'),
'Vampire5edLettheStreetsRunRed':('Vampire: The Masquerade — Let the Streets Run Red','en'),
'Vampire5edFallofLondom':('Vampire: The Masquerade — The Fall of London','en'),
'Vampire5edSecondInquisition':('Vampire: The Masquerade — Second Inquisition','en'),
'Vampire5edSabat':('Vampire: The Masquerade — Sabbat: The Black Hand','en'),
'Werewolf5ed':('Werewolf: The Apocalypse — Core Rulebook, 5th Edition','en'),
'Werewolf5edWyrmtide':('Werewolf: The Apocalypse — Wyrmtide','en'),
}
lines={f:(root/'docs'/f).read_text().splitlines() for f in books}
markers={}
for f,ls in lines.items():
 candidates=[]
 for i,l in enumerate(ls):
  t=re.sub(r'^COREBOOK\s*','',l.strip(),flags=re.I)
  if re.fullmatch(r'\d(?:\s*\d){0,2}',t):
   n=int(re.sub(r'\s','',t))
   if 4<=n<=450:candidates.append((i+1,n))
 tails=[];idx=[];prev=[]
 for j,(ln,n) in enumerate(candidates):
  k=bisect.bisect_left(tails,n);prev.append(idx[k-1] if k else -1)
  if k==len(tails):tails.append(n);idx.append(j)
  else:tails[k]=n;idx[k]=j
 j=idx[-1] if idx else -1;seq=[]
 while j>=0:seq.append(candidates[j]);j=prev[j]
 markers[f]=sorted(seq)

def cite(f,pages,section=None,anchor=None):
 out={'book':books[f][0],'language':books[f][1],'pages':str(pages),'file':f}
 if section:out['section']=section
 if anchor:out['anchor']=anchor
 return out

def at(f,line):
 m=markers[f];i=bisect.bisect_left([x[0] for x in m],line)
 before=m[max(0,i-1)];after=m[min(i,len(m)-1)]
 if after[1]-before[1]>8:return None
 return cite(f,str(before[1]) if before[1]==after[1] else f'{before[1]}–{after[1]}',anchor=line)

def anchor(text):
 result=[]
 for f,n in re.findall(r'docs/([\w]+)(?::L|:)(\d+)',text):
  if f in books:
   c=at(f,int(n))
   if c:result.append(c)
 return result

heading_index={}
def locate(f,name):
 target=norm(name.split(':',1)[0])
 if len(target)<4:return None
 if f not in heading_index:
  index={};ls=lines[f]
  for i,l in enumerate(ls):
   cleaned=re.sub(r'^.*?Flaw:\s*\([^)]*\)\s*','',l)
   cleaned=re.sub(r'^[•■\s]+to[•\s]+','',cleaned)
   prefix=re.split(r'[:.]',cleaned,1)[0]
   if len(prefix)<85 and (':' in l or '.' in cleaned):index.setdefault(norm(prefix),[]).append(i+1)
   if len(l)>130:continue
   for count in range(1,4):
    candidate=norm(' '.join(ls[i:i+count]))
    index.setdefault(candidate,[]).append(i+1)
  heading_index[f]=index
 matches=heading_index[f].get(target,[])
 if not matches:return None
 selected=next((ln for ln in matches if ln>max(350,len(lines[f])*.035)),matches[0])
 return at(f,selected)

def find(name,english=None,order=None):
 for f in order or ['Vapire5edenglish','Vampiro5edCompaniomptbr','Vampire5edPlayersGuide01','Vampire5edPlayersGuide02','Vampire5edCultsoftheBloddGods','Vampire5edChicagobyNight','Vampire5edAnarch']:
  c=locate(f,english or translations.get(norm(name),name))
  if c:return [c]
 return []
refs={};aliases={};missing=[]
def put(key,name,cs):
 if cs:
  refs[key]=cs
  aliases.setdefault(norm(name),[]).append(key)
 else:missing.append((key,name))
core='Vampiro5edptbr';pg='Vampire5edPlayersGuide01';comp='Vampiro5edCompaniomptbr'
clans={'brujah':'65–67','gangrel':'69–73','malkavian':'75–79','nosferatu':'81–85','toreador':'87–91','tremere':'93–97','ventrue':'99–102','caitiff':'105–107','thinblood':'109–113'}
extra={'theministry':('34–36',None),'hecata':('22–24','125–149'),'banuhaqim':('16–18',None),'lasombra':('28–30',None),'ministry':('34–36',None)}
for id,c in items['clans'].items():
 if id in clans:cs=[cite(core,clans[id])]
 elif id in ['ravnos','salubri','tzimisce']:cs=[cite(comp,{'ravnos':'6–11','salubri':'12–15','tzimisce':'16–23'}[id])]
 elif id in extra:
  cs=[cite(pg,extra[id][0])]
  if extra[id][1]:cs.append(cite('Vampire5edCultsoftheBloddGods',extra[id][1],'Clã Hecata e sua organização'))
 else:cs=[]
 put('clan:'+id,c['name'],cs)
attrpages={'Strength':'155','Dexterity':'155','Stamina':'155','Charisma':'155–156','Manipulation':'155–156','Composure':'155–156','Intelligence':'156–157','Wits':'156–157','Resolve':'156–157'}
for id,name in items['attributes'].items():put('attribute:'+id,name,[cite(core,attrpages[id])])
for id,name in items['skills'].items():
 group='159–163' if id in ['Athletics','Brawl','Craft','Drive','Firearms','Larceny','Melee','Stealth','Survival'] else '164–167' if id in ['Animal Ken','Etiquette','Insight','Intimidation','Leadership','Performance','Persuasion','Streetwise','Subterfuge'] else '168–171'
 put('skill:'+id,name,[cite(core,group,'Habilidades')])
dpages={'animalism':'244–247','auspex':'248–252','celerity':'252–255','dominate':'255–258','fortitude':'258–260','obfuscate':'260–263','potence':'263–265','presence':'266–269','protean':'269–271','bloodsorcery':'272–275','thinbloodalchemy':'282–287'}
for id,d in items['disciplines'].items():
 cs=[cite(core,dpages[id])] if id in dpages else [cite('Vampire5edCultsoftheBloddGods','202–208','Oblivion')]
 put('discipline:'+id,d['name'],cs)
 for p in d.get('powers',[]):
  enname=en.get('disciplines',{}).get(id,{}).get('powers',{}).get(p['id'],{}).get('name')
  cs=anchor(p.get('system',''))
  if not cs and p['id'].startswith('imitate-'):
   cs=[cite(core,'282–287','Imitação de poderes por Alquimia Sangue-Ralo; opção gerada a partir da regra, não fórmula com título próprio.')]
   _,origin,powerid=p['id'].split('-',2)
   cs+=refs.get('power:'+origin+':'+powerid,[])
  companion_powers={'relievingTheBestialSoul':'24–25','oneWithTheEarth':'28','horrificForm':'27','obeah':'23–24','valeren':'25','vicissitude':'26','fleshCrafting':'26–27','chimerstry':'25–26','fataMorgana':'26','favorDoDomitor':'25'}
  if p['id'] in companion_powers:cs=[cite(comp,companion_powers[p['id']])]
  if p['id']=='awe':cs=[cite(core,'266–267','Fascínio (Awe)')]
  if not cs:
   found=find(p['name'],enname)
   if found and found[0]['file']=='Vapire5edenglish' and id in dpages:cs=[cite(core,dpages[id],p['name'])]
   else:cs=found
  put('power:'+id+':'+p['id'],p['name'],cs)
predpages={'alleycat':'178','bagger':'176–177','bloodleech':'177','cleaver':'178','consensualist':'175–176','farmer':'176','osiris':'176','sandman':'177','scenequeen':'177','siren':'177–178'}
pgpred={'extortionist':'107','graverobber':'108','grimreaper':'108','montero':'108','pursuer':'108–109','trapdoor':'109'}
for p in items['predators']:
 if p['id'] in predpages:cs=[cite(core,predpages[p['id']]),cite(core,'306–308','Caçada e Paradas de Predador')]
 elif p['id'] in pgpred:cs=[cite(pg,pgpred[p['id']])]
 else:
  page=re.search(r'p\. (\d+)',(root/'data/huntingHelp.ts').read_text().split('"'+p['id']+'":',1)[1].split('"source":',1)[1].split('\n',1)[0])
  cs=[cite('Vampire5edPlayersGuide02',page[1])] if page else find(p['name'],p.get('englishName'),['Vampire5edPlayersGuide02'])
 put('predator:'+p['id'],p['name'],cs)
for category in ['rituals','ceremonies','gifts','rites','loresheets','banes','talismans','advantages','wolfAdvantages']:
 prefix={'rituals':'ritual','ceremonies':'ceremony','gifts':'gift','rites':'rite','loresheets':'loresheet','banes':'bane','talismans':'talisman','advantages':'advantage','wolfAdvantages':'wolfadvantage'}[category]
 for item in items[category]:
  id=item.get('id',item.get('clan'));name=item['name'];text=' '.join(str(item.get(k,'')) for k in ['description','reference','system'])
  cs=anchor(text)
  if not cs and category=='advantages' and 'Players Guide' in text and (m:=re.search(r'p\. (\d+)',text)):
   cs=[cite(pg,m[1])]
  if not cs and category=='banes':
   m=re.search(r'p\. (\d+)',text);cs=[cite(pg,m[1])] if m else []
  if not cs and category=='loresheets':
   m=re.search(r'p\. (\d+)',text);cs=[cite(core,m[1])] if m else []
  if not cs and category=='rituals' and item.get('page'):cs=[cite(core,item['page'])]
  if not cs:
   order=['Werewolf5ed','Werewolf5edWyrmtide'] if category in ['talismans','wolfAdvantages'] else None
   cs=find(name,item.get('english'),order)
  # Prefer the Portuguese basic for generic core Advantages; cite the verified section.
  if cs and category=='advantages' and cs[0]['file']=='Vapire5edenglish':cs=[cite(core,'179–194','Vantagens, Qualidades, Defeitos e Antecedentes')]
  put(prefix+':'+str(id),name,cs)
  for level in item.get('levels',[]) if category=='loresheets' else []:
   put('loresheet:'+str(id)+':'+str(level['level']),level['name'],cs)
for id,t in items['tribes'].items():put('tribe:'+id,t['name'],[cite('Werewolf5ed',str(t['page'])+'–'+str(t['page']+1))])
for id,name in items['auspices'].items():put('auspice:'+id,name,[cite('Werewolf5ed',{'ragabash':'56','theurge':'56–57','philodox':'57','galliard':'57–58','ahroun':'58'}[id])])
for group,prefix in [('thinMerits','thinmerit'),('thinFlaws','thinflaw')]:
 for id,name in items[group].items():put(prefix+':'+id,name,[cite(core,'182–184','Qualidades e Defeitos de Sangues-Ralos')])
for id,name in items['attributes'].items():put('wolfattribute:'+id,name,[cite('Werewolf5ed','85–88','Attributes')])
for id,name in items['skills'].items():put('wolfskill:'+id,name,[cite('Werewolf5ed','89–95','Skills')])
# Manually checked headings whose extraction merges columns or uses a different title.
overrides={
 'advantage:repulsivetoanimals': [at('Vampire5edPlayersGuide02',1221)],
 'advantage:thirstforinnocence': [at('Vampire5edPlayersGuide02',1290)],
 'wolfadvantage:visual_goodwolfy': [cite('Werewolf5ed','98–99','Clement Lupus')],
 'wolfadvantage:spiritpact_companion': [cite('Werewolf5ed','105–106','Spirit Pact: Companion')],
 'wolfadvantage:spiritpact_host': [cite('Werewolf5ed','105–106','Spirit Pact: Host')],
 'wolfadvantage:folkloric_bane': [cite('Werewolf5ed','100–101','Folkloric Bane')],
 'wolfadvantage:folkloric_taboo': [cite('Werewolf5ed','100–101','Folkloric Block')],
 'wolfadvantage:folkloric_sign': [cite('Werewolf5ed','100–101','Folkloric Tell')],
 'wolfadvantage:visualFlaw_repulsive': [cite('Werewolf5ed','98–99','Repulsive')],
 'wolfadvantage:visualFlaw_ugly': [cite('Werewolf5ed','98–99','Ugly')],
 'wolfadvantage:suspect': [cite('Werewolf5ed','104','Person of Interest')],
 'wolfadvantage:recurringError': [cite('Werewolf5ed','104','Serial Error')],
 'wolfadvantage:conditionalPact': [cite('Werewolf5ed','105–106','Pact Condition')],
 'wolfadvantage:metamorphosis_lunaResilience': [cite('Werewolf5edWyrmtide','28','Luna’s Resilience')],
 'wolfadvantage:supernatural_formMastery': [cite('Werewolf5edWyrmtide','28–29','Gift Form Mastery')],
 'power:auspex:implantDream': [cite('Vampire5edPlayersGuide02','25–26','Implant Dream — conteúdo comunitário de Bully')],
 'talisman:tearOfGaia': [cite('Werewolf5ed','188','Gaia’s Tear')],
 'talisman:kingBrennusHammer': [cite('Werewolf5edWyrmtide','31–32','The Hammer of King Brennus')],
 'advantage:sadist': [cite('Vampire5edPlayersGuide02','13','Sadist — conteúdo comunitário de Bully')],
 'advantage:magicsusceptibility': [at('Vampire5edPlayersGuide02',1136)],
 'wolfadvantage:job_basic': [cite('Werewolf5ed','98','Day Job')],
 'wolfadvantage:job_confirmed': [cite('Werewolf5ed','98','Corroborated Day Job')],
 'wolfadvantage:moon_refreshed': [cite('Werewolf5ed','100','Moon-Quickened')],
 'wolfadvantage:moon_stoked': [cite('Werewolf5ed','100','Moon-Riled')],
 'wolfadvantage:mask_zeroed': [cite('Werewolf5ed','103–104','Zeroed')],
 'wolfadvantage:mask_cobbler': [cite('Werewolf5ed','104','Cobbler')],
 'wolfadvantage:substanceAbuse_incurable': [cite('Werewolf5ed','99–100','Hopeless Addiction')],
 'wolfadvantage:substanceAbuse_dependency': [cite('Werewolf5ed','99–100','Addiction')],
 'wolfadvantage:wyrmMarked': [cite('Werewolf5edWyrmtide','28','Wyrm-Marked Flesh')],
 'wolfadvantage:moonBane': [cite('Werewolf5edWyrmtide','28–29','Bad Moon Rising')],
 'wolfadvantage:hellHound': [cite('Werewolf5edWyrmtide','28–29','Hellhound')],
 'wolfadvantage:wolfMan': [cite('Werewolf5edWyrmtide','29','Wolf-Man')],
 'wolfadvantage:wyrmTouched_calamity': [cite('Werewolf5edWyrmtide','29','Wyrm-Touched: Wyrm of Calamity')],
 'wolfadvantage:wyrmTouched_soulEater': [cite('Werewolf5edWyrmtide','29','Wyrm-Touched: Wyrm of Consumption')],
 'wolfadvantage:wyrmTouched_corruption': [cite('Werewolf5edWyrmtide','29','Wyrm-Touched: Wyrm of Corruption')],
 'wolfadvantage:visual_imposingGlabro': [cite('Werewolf5edWyrmtide','28','Fair Glabro')],
}
for key,name in missing[:]:
 if key in overrides:
  refs[key]=[r for r in overrides[key] if r]
  aliases.setdefault(norm(name),[]).append(key)
  missing.remove((key,name))

# The app contains authored/community options that cannot be located in the provided books.
# Do not silently invent a page or attribute them to the core rules.
for key,name in missing:
 refs[key]=[{'book':'Referência bibliográfica não confirmada','language':'unverified','pages':'','section':'Não foi localizada uma página para este resumo nas transcrições disponíveis.'}]
 aliases.setdefault(norm(name),[]).append(key)
import runpy
verified=runpy.run_path(str(root/'scripts/update-advantage-references.py'))['apply_verified_references']({'entries':refs,'aliases':aliases})
(root/'data/bookReferences.json').write_text(json.dumps(verified,ensure_ascii=False,indent=2)+'\n')
(root/'docs/BOOK_REFERENCE_AUDIT.md').write_text('# Referências bibliográficas da interface\n\nGerado por scripts/build-book-references.py. Os intervalos delimitam páginas impressas identificadas no texto; não são posições do leitor PDF. Referências por seção são identificadas como tal.\n\n## Itens sem página confirmada\n\n'+'\n'.join('- '+k+' — '+n for k,n in missing)+'\n')
print(len(refs),'entradas;',len(missing),'pendentes:',missing)
