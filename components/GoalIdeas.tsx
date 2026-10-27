import React,{useState} from 'react';
import {Character} from '../types';
import {storyIdeas} from '../data/storyIdeas';
export function GoalIdeas({character:c,kind,onChange}:{character:Character;kind:'ambition'|'desire';onChange:(key:keyof Character,value:any)=>void}){
 const [open,setOpen]=useState(false),[offset,setOffset]=useState(0);
 return <div className="mt-2 text-sm"><button type="button" className="underline" aria-expanded={open} onClick={()=>setOpen(!open)}>{kind==='ambition'?'Ideias de ambição':'Ideias de objetivo para a sessão'}</button>
 {open&&<div className="mt-2 border rounded p-3 space-y-3"><p>Escolha uma ideia para usar no campo e adapte como quiser.</p><ul className="space-y-2">{storyIdeas(c.gameType,kind,offset).map(idea=><li className="flex gap-3 justify-between" key={idea}><span>{idea}</span><button type="button" className="border rounded px-2 shrink-0" aria-label={'Usar ideia: '+idea} onClick={()=>{onChange(kind,idea);setOpen(false);}}>Usar</button></li>)}</ul><button type="button" className="underline" onClick={()=>setOffset(offset+4)}>Outras ideias</button></div>}</div>;
}
