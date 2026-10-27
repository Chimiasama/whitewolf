import React,{useEffect,useRef,useState} from 'react';
import {InfoModal} from './InfoModal';
/** Long press is confined to the label, never to selection or point controls. */
export function HelpLabel({title,content,children,block=false}:{title:string;content:React.ReactNode;children?:React.ReactNode;block?:boolean}){
 const [open,setOpen]=useState(false),timer=useRef<ReturnType<typeof setTimeout>|null>(null),start=useRef({x:0,y:0}),held=useRef(false);
 const clear=()=>{if(timer.current!==null){clearTimeout(timer.current);timer.current=null;}};
 useEffect(()=>clear,[]);
 const text=children||title;
 if(!content)return <span>{text}</span>;
 return <span className={block?"flex items-center gap-1 w-full text-left":"inline-flex items-center gap-1 max-w-full text-left"}>
 <span data-help-label={title} className={block?"select-none flex-1 min-w-0":"select-none"} style={{touchAction:'pan-y'}} onPointerDown={e=>{if(e.button!==0)return;clear();held.current=false;start.current={x:e.clientX,y:e.clientY};timer.current=setTimeout(()=>{timer.current=null;held.current=true;setOpen(true);},550);}} onPointerMove={e=>{if(Math.hypot(e.clientX-start.current.x,e.clientY-start.current.y)>10)clear();}} onPointerUp={clear} onPointerCancel={clear} onPointerLeave={clear} onClickCapture={e=>{if(held.current){held.current=false;e.preventDefault();e.stopPropagation();}}} onContextMenu={e=>{e.preventDefault();clear();setOpen(true);}}>{text}</span>
 <button type="button" className="shrink-0 text-gray-400 rounded px-1 focus-visible:ring-2 focus-visible:ring-red-400" aria-label={'Informações: '+title} aria-haspopup="dialog" onClick={e=>{e.stopPropagation();clear();setOpen(true);}}>ⓘ</button>
 {open&&<InfoModal title={title} onClose={()=>setOpen(false)}><div className="space-y-3 text-sm font-normal normal-case text-gray-200">{content}</div></InfoModal>}
 </span>;
}
