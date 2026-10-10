import {createRequire} from 'node:module';
import {mkdir,copyFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const require=createRequire(import.meta.url),{build}=require(process.env.ESBUILD_MODULE||'esbuild'),root=fileURLToPath(new URL('../',import.meta.url));
await mkdir(path.join(root,'lib'),{recursive:true});await copyFile(path.join(root,'src/index.js'),path.join(root,'lib/index.js'));
await build({absWorkingDir:root,entryPoints:['src/client.js'],outfile:'lib/client.js',bundle:true,format:'cjs',platform:'browser',target:'es2022',external:['react'],loader:{'.css':'text','.png':'dataurl'},sourcemap:true,banner:{js:'window.__ModuleLoader__.load({id:"dsh-pwnvader-wallpapers",factory:(require)=>{var module={exports:{}},exports=module.exports;'},footer:{js:'return module.exports;}});'}});
console.log('Built dsh-pwnvader-wallpapers.');
