import {test,expect} from '@playwright/test';
async function start(page,game='Vampiro: A Máscara'){
 await page.addInitScript(()=>localStorage.setItem('whitewolf_locale','pt'));
 await page.goto('/');await page.getByRole('button',{name:'Criar personagem',exact:false}).click();await page.getByLabel(game,{exact:true}).check();await page.getByRole('button',{name:'Começar criação',exact:true}).click();if(page.viewportSize().width<640){for(let i=0;i<4;i++)await page.getByRole('button',{name:'Continuar',exact:true}).click();}else await page.getByRole('button',{name:'Vínculos e recursos',exact:false}).click();
 const picker=page.getByRole('region',{name:'Vantagens',exact:true});await picker.getByRole('button',{name:'Escolher',exact:true}).click();return picker;
}
for(const game of ['Vampiro: A Máscara','Lobisomem: O Apocalipse'])test(`Fama não duplica nem desaparece ao selecionar novamente: ${game}`,async({page})=>{
 await page.setViewportSize({width:390,height:844});const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 const picker=await start(page,game);await picker.getByRole('searchbox').fill('fama');
 for(let i=0;i<3;i++){
  await picker.getByRole('button',{name:'Escolher',exact:true}).dblclick();
  await expect(picker.getByRole('button',{name:'Selecionado',exact:true})).toBeDisabled();
  await picker.getByRole('button',{name:'Selecionado',exact:true}).evaluate((button:HTMLButtonElement)=>{button.click();button.click();});
  const selected=await page.evaluate(()=>JSON.parse(localStorage.getItem('whitewolf_draft_v2')!).advantages);
  expect(selected.filter(a=>a.id==='fame')).toHaveLength(1);
  await picker.getByLabel('Pontos de Fama',{exact:true}).selectOption('3');
  await expect(picker.getByLabel('Pontos de Fama',{exact:true})).toHaveValue('3');
  await picker.getByRole('button',{name:'Remover Fama',exact:true}).click();
  await expect(picker.getByRole('button',{name:'Escolher',exact:true})).toBeEnabled();
 }
 expect(errors).toEqual([]);await expect(picker).toBeVisible();
});
test('descrição de Fama mostra regras, cinco níveis e livro sem alterar a escolha',async({page})=>{
 const picker=await start(page);await picker.getByRole('searchbox').fill('fama');await picker.getByRole('button',{name:'Escolher',exact:true}).click();
 await picker.getByRole('button',{name:'Ver descrição: Fama',exact:true}).first().click();
 const dialog=page.getByRole('dialog',{name:'Fama',exact:true});await expect(dialog.getByText('Funcionamento e limites',{exact:true})).toBeVisible();await expect(dialog.getByRole('region',{name:'Níveis e efeitos'}).locator('dt')).toHaveCount(5);
 await expect(dialog).toContainText('reduz em 1');await expect(dialog.getByRole('complementary',{name:'Referências bibliográficas'})).toContainText('Vampiro: A Máscara');
 await dialog.getByRole('button',{name:'Fechar',exact:true}).click();await expect(picker.getByLabel('Pontos de Fama',{exact:true})).toHaveValue('1');
 await picker.getByRole('searchbox').fill('Focado');await picker.getByRole('button',{name:'Ver descrição: Focado',exact:true}).click();await expect(page.getByRole('dialog',{name:'Focado',exact:true})).toContainText('apenas um resumo');
});
test('consulta W5 e limites de pontos distinguem os dois livros e preservam valor antigo',async({page})=>{
 const picker=await start(page,'Lobisomem: O Apocalipse');await picker.getByRole('searchbox').fill('fama');await picker.getByRole('button',{name:'Ver descrição: Fama',exact:true}).click();
 const dialog=page.getByRole('dialog',{name:'Fama',exact:true});await expect(dialog).toContainText('audiência ou apoiadores');await expect(dialog.getByRole('complementary',{name:'Referências bibliográficas'})).toContainText('Werewolf');
 const result=await page.evaluate(async()=>{const {fnGetAdvantagesAndFlaws}=await import('/constants.ts');return ['Vampire','Werewolf'].map(game=>{const catalogue=fnGetAdvantagesAndFlaws(k=>k,game);return {allies:catalogue.find(a=>a.id==='allies').levels,contacts:catalogue.find(a=>a.id==='contacts').levels};});});
 for(const row of result){expect(row.allies).toEqual([1,2,3,4,5,6]);expect(row.contacts).toEqual([1,2,3]);}
 await dialog.getByRole('button',{name:'Fechar',exact:true}).click();await picker.getByRole('searchbox').fill('Contatos');await picker.getByRole('button',{name:'Escolher',exact:true}).click();
 await page.evaluate(()=>{const c=JSON.parse(localStorage.getItem('whitewolf_draft_v2')!);c.advantages.find(a=>a.id==='contacts').cost=4;localStorage.setItem('whitewolf_draft_v2',JSON.stringify(c));});
 await page.reload();await page.getByRole('button',{name:'Continuar personagem',exact:false}).click();
 const points=page.getByLabel('Pontos de Contatos',{exact:true});await expect(points).toHaveValue('4');await expect(points.locator('option:checked')).toContainText('valor salvo');await points.selectOption('3');
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('whitewolf_draft_v2')!).advantages.find(a=>a.id==='contacts').cost)).toBe(3);

});
