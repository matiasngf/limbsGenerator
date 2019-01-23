import 'babel-polyfill';
const exportSTL = require('threejs-export-stl');
import { saveAs } from 'file-saver';
const path = require('path');
var JSZip = require("jszip");

import getFilesFor from './components/file-dir';
import CargarObjeto from './components/CargarObjeto';
import { checkPathFile, downloadMesh, downloadMultiple, getStlPath } from './components/fileManage';

const round5 = (x) => {
  return Math.ceil(x/5)*5;
}

const getScale = (mm) => {
  return round5(mm * 100 / 64) / 100;
}


const pr_type = 'left-hand';
const parts = getFilesFor(pr_type);

const downloadProsthesis = (type, mm) => {
  const parts = getFilesFor(type);
  const scale = getScale(mm);
  let promisesCheck = [];
  for(let i=0; i < parts.length; i++ ) {
    console.log(getStlPath(parts[i]));
    
    promisesCheck.push(checkPathFile( getStlPath(parts[i])) );
  }
  console.log(promisesCheck);
  
  Promise.all(promisesCheck).then( values => {
    console.log(values);
  } );
};



downloadProsthesis('left-hand', 32);



// console.log(r, parts[i]);
// if(r && i==0){
//   CargarObjeto(parts[i], escala, (objScaled) => {
//     // downloadMesh(objScaled, pr_type, escala, parts[i]);
//   });
// }