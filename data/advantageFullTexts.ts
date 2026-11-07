import texts from './advantageFullTexts.json';
import {AdvantageFlaw, GameType} from '../types';
export interface FullAdvantageText {
  text:string; costs:number[]; file:string; pages:string; community:boolean;
  adaptation?:boolean; incomplete?:boolean; notes?:string[];
}
const catalogue=texts as unknown as Record<string,Record<string,FullAdvantageText>>;
const aliases:Record<string,string>={
 beasttamer_confidant:'beasttamer',routine_payforprey:'routine',no_haven_streetfeeder:'no_haven',outsider_watcher:'outsider_flaw_v',codeofhonor_wolf:'codeofhonor',
iron_gullet_bagger:'iron_gullet',darksecret_consensualist:'darksecret',beautiful_siren:'beautiful',routine_flaw:'routine',remorseful_confidant:'remorseful_merit',memoriam_dweller_confidant:'memoriamdweller_merit',conflicting_loyalties:'conflictingloyalties_flaw',dull_flaw:'dull_flaw_v',dark_secret_corporate:'darksecret',clan_infiltrator_eattherich:'claninfiltrator_merit',angry_beast_eattherich:'angrybeast_flaw',efficient_eater_hideandeat:'efficienteater_merit',slippery_hideandeat:'slippery_merit_v',obvious_predator_hideandeat:'obvious_predator',sadistic_flaw:'sadist',improved_ghouls_labrat:'improvedghouls_merit',blunted_fangs_labrat:'bluntedfangs',addiction_labrat:'addiction',blood_healer_hospitalhunter:'bloodhealer_merit',frigid_aura_hospitalhunter:'frigidaura_flaw',loremaster_localhaunt:'loremaster_merit_v',eerie_presence_localhaunt:'eeriepresence_flaw',obscure_lurkerincrowd:'obscure_merit_v',outsider_lurkerincrowd:'outsider_flaw_v',social_engineer_manicpixie:'socialengineer_merit',cannot_embrace_manicpixie:'cannotembrace_flaw',paranoia_onlinepredator:'paranoia',delay_destruction_opportunist:'delaydestruction_merit',overconfident_opportunist:'overconfident_flaw_v',apex_predator_packhunter:'apexpredator_merit',brash_packhunter:'brash_flaw_v',deep_sleeper_packhunter:'deepsleeper_flaw',despised_payforblood:'despised',danger_sense_streetfeeder:'dangersense_merit',destitute_streetfeeder:'destitute',sharp_senses_watcher:'sharpsenses',slippery_watcher:'slippery_merit_v',no_haven_watcher:'no_haven',daredevil_wolf:'daredevil',underestimated_wolf:'underestimated_merit_v',deaths_kiss_wolf:'deathskiss_flaw',
  osiris_mythic:'mythic_flaw',
  bloodleech_diablerist:'darksecret',bloodleech_shunned:'shunned',bloodleech_mortals:'prey_exclusion',
  cleaver_secret:'darksecret',graverobber_gullet:'iron_gullet',graverobber_obvious:'obvious_predator',
  grimreaper_exclusion:'prey_exclusion',scenequeen_exclusion:'prey_exclusion',scenequeen_disliked:'disliked',
  trapdoor_creepy:'creepy_haven',trapdoor_haunted:'haunted_haven',
  trapdoor_second_haven:'haven',montero_retainers:'retainers',trapdoor_retainers:'retainers',
  online_mask:'mask',online_zeroed:'mask_zeroed',online_cobbler:'mask_cobbler',pursuer_bloodhound:'bloodhound',
};
export function fullAdvantageText(id:string,game:GameType|null):FullAdvantageText|undefined {
  const group=catalogue[game===GameType.Werewolf?'Werewolf':'Vampire'];
  const alias=aliases[id]||(['fame','resources','influence','allies','contacts','haven','herd','enemy'].find(key=>id.startsWith(key+'_')||id.endsWith('_'+key)));
  return group[id]||group[alias||''];
}
/** Keep saved values intact; the catalogue controls new purchases only. */
export function withVerifiedAdvantageCost(item:AdvantageFlaw,game:GameType|null):AdvantageFlaw {
  const text=fullAdvantageText(item.id,game);
  return text?{...item,description:text.text,cost:text.costs[0],levels:text.costs}:item;
}
