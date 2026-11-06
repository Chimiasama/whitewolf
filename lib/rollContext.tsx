import {createContext,useContext} from 'react';
import {Attribute,Skill} from '../types';
import type {RollKind,PoolCategory} from './dice';
export interface RollRequest {kind?:RollKind;skill?:Skill;attribute?:Attribute;customPool?:number;category?:PoolCategory;}
export const QuickRollContext=createContext<((request:RollRequest)=>void)|null>(null);
export const useQuickRoll=()=>useContext(QuickRollContext);
