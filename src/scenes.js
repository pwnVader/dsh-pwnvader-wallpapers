import * as aurora from '../vendor/ascii-rest/aurora.ts';
import * as fjord from '../vendor/ascii-rest/aurora-fjord.ts';
import * as earth from '../vendor/ascii-rest/earthrise.ts';
import * as matrix from '../vendor/ascii-rest/matrix-rain.ts';
import * as coast from '../vendor/ascii-rest/night-coast.ts';
import * as stars from '../vendor/ascii-rest/starfield.ts';
const pieces={'ascii-aurora':aurora,'ascii-aurora-fjord':fjord,'ascii-earthrise':earth,'ascii-matrix-rain':matrix,'ascii-night-coast':coast,'ascii-starfield':stars};
export function createScenes(){const frames=new Map();return function draw(ctx,w,h,t,scene,light){ctx.clearRect(0,0,w,h);ctx.fillStyle=light?'#dbe4ea':'#08101e';ctx.fillRect(0,0,w,h);
 if(pieces[scene]){let cached=frames.get(scene);if(!cached){const piece=pieces[scene],meta=piece.meta,canvas=document.createElement('canvas');canvas.width=meta.cols*8;canvas.height=meta.rows*(meta.cell===1?8:16);cached={meta,frame:piece.default(),canvas,colors:new Uint8Array(meta.cols*meta.rows)};frames.set(scene,cached);}
  const {meta,frame,canvas,colors}=cached,c=canvas.getContext('2d'),rows=frame(t,{paper:light,color:colors}).split('\n');c.clearRect(0,0,canvas.width,canvas.height);c.font='14px monospace';c.textBaseline='top';
  rows.forEach((row,y)=>[...row].forEach((glyph,x)=>{if(glyph===' ')return;c.fillStyle=meta.palette?.[colors[y*meta.cols+x]]||(light?'#31516d':'#67d5c7');if(meta.cell===1){c.fillRect(x*8,y*8,7,7);}else c.fillText(glyph,x*8,y*16);}));
  const scale=Math.max(w/canvas.width,h/canvas.height);ctx.imageSmoothingEnabled=false;ctx.drawImage(canvas,(w-canvas.width*scale)/2,(h-canvas.height*scale)/2,canvas.width*scale,canvas.height*scale);return;
 }
 if(scene==='space'){for(let i=0;i<180;i++){const x=((i*83.71+t*(i%3+1)*3)%w),y=(Math.sin(i*13.37)*.5+.5)*h;ctx.fillStyle=`rgba(${light?'35,65,105':'185,219,255'},${.25+.5*(Math.sin(t+i)*.5+.5)})`;ctx.fillRect(x,y,i%9===0?3:1,i%9===0?3:1);}return;}
 for(let band=0;band<7;band++){ctx.beginPath();for(let x=0;x<=w;x+=8){const y=scene==='ocean'?h*(.42+band*.075)+Math.sin(x/w*12+t*(.25+band*.04)+band)*h*.028:h*(.18+band*.055)+Math.sin(x/w*7+t*.35+band*.32)*h*.14;if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.closePath();ctx.fillStyle=scene==='ocean'?`hsla(${198+band*4},65%,${light?65:22+band*3}%,.24)`:`hsla(${145+band*16},75%,${light?50:45}%,.08)`;ctx.fill();}
};}
