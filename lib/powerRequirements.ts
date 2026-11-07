import {DisciplinePower} from '../types';
export function powerPrerequisitesMet(power:DisciplinePower,selected:string[]):boolean {
 return (!power.prerequisite||selected.includes(power.prerequisite))&&(!power.prerequisiteAny?.length||power.prerequisiteAny.some(id=>selected.includes(id)));
}
