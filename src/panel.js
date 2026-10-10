import {createElement,useEffect,useRef} from 'react';
export function installPanel(ctx,{id,title,controller,fields,actions=[],position=24}){
 function controls(){const root=document.createElement('section');root.className='pwn-panel';const heading=document.createElement('h2');heading.textContent=title;root.append(heading);const refreshers=[];
  for(const field of fields){const label=document.createElement('label');label.textContent=field.label;const input=document.createElement(field.options?'select':'input');input.name=field.key;
   if(field.options)for(const [value,name] of field.options){const option=document.createElement('option');option.value=value;option.textContent=name;input.append(option);}
   else{input.type=field.type||'range';for(const prop of ['min','max','step','accept'])if(field[prop]!=null)input[prop]=field[prop];}
   const read=()=>input.type==='checkbox'?input.checked:input.type==='range'?Number(input.value):input.value;
   input.onchange=()=>{if(field.type==='file'){if(input.files[0])void field.run(input.files[0]);input.value='';}else controller.update({[field.key]:read()});};
   if(field.type!=='file')refreshers.push(()=>{if(document.activeElement!==input){if(input.type==='checkbox')input.checked=controller.state[field.key];else input.value=controller.state[field.key];}});
   label.append(input);root.append(label);
  }
  for(const [name,run] of actions){const button=document.createElement('button');button.type='button';button.textContent=name;button.onclick=()=>void run();root.append(button);}
  const status=document.createElement('p');status.setAttribute('role','status');root.append(status);
  const refresh=()=>{refreshers.forEach(fn=>fn());status.textContent=controller.status||'';},off=controller.subscribe(refresh);refresh();
  return {element:root,dispose(){off();root.remove();}};
 }
 const dialog=document.createElement('dialog');dialog.className='pwn-dialog';dialog.setAttribute('aria-label',title);const close=document.createElement('button');close.textContent='Cerrar';close.onclick=()=>dialog.close();const view=controls();dialog.append(close,view.element);document.body.append(dialog);ctx.effect(()=>()=>{view.dispose();dialog.remove();});
 function Settings(){const ref=useRef(null);useEffect(()=>{const view=controls();ref.current.append(view.element);return()=>view.dispose();},[]);return createElement('div',{ref,'data-pwn-settings':id});}
 function Launcher(){return createElement('button',{className:'pwn-launcher',style:{right:position},onClick:()=>dialog.showModal(),'aria-label':'Abrir '+title},title);}
 ctx.effect(()=>ctx.slots.inject('settings.general.item',()=>ctx.slots.register({name:'settings.general.item',id,order:70},Settings)));
 ctx.effect(()=>ctx.slots.inject('shell.overlay',()=>ctx.slots.register({name:'shell.overlay',id,order:70},Launcher)));
}
