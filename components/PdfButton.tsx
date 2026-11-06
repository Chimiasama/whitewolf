import React,{useRef,useState} from 'react';
import {Character} from '../types';
import {useI18n} from '../lib/i18n';
export function PdfButton({character,label='Salvar PDF'}:{character:Character;label?:string}){
 const {t}=useI18n();const [busy,setBusy]=useState(false),[status,setStatus]=useState('');const lock=useRef(false);
 return <span className="inline-flex min-w-0 flex-col gap-1"><button type="button" disabled={busy} className="min-h-11 rounded border border-gray-600 px-4 py-2 disabled:opacity-40" onClick={async()=>{if(lock.current)return;lock.current=true;setBusy(true);setStatus('');try{const {exportCharacterPdf}=await import('../lib/characterPdf');const result=await exportCharacterPdf(character,t);setStatus(result.warnings.join(' ')||`PDF gerado: ${result.pages} páginas.`);}catch(e){setStatus(`Não foi possível exportar o PDF. ${e instanceof Error?e.message:'Tente novamente.'}`);}finally{setBusy(false);lock.current=false;}}}>{busy?'Gerando PDF…':label}</button>{status&&<span role="status" className="text-xs text-gray-300 break-words">{status}</span>}</span>;
}
