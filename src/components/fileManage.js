import path from 'path';
const exportSTL = require('threejs-export-stl');
import { getAllFiles } from './partsDir';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const getStlPath = (name) => {
	return path.join(__dirname, 'stl', 'prosthesis', name+'.stl');
}

const checkPathFile = (url) => {
	return new Promise( function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.onload = function () {
			resolve(this.status == 200);
		};
		xhr.send();
	});
}

const downloadMesh = (mesh, type, scale, name) => {
	const buffer = exportSTL.fromMesh(mesh);
	const blob = new Blob([buffer], { type: exportSTL.mimeType });
	saveAs(blob, `${scale}-${type}-${name}.stl`);
}

const downloadAsZip = (objs, names, scale, type) => {
	console.log(names);
	
	let zip = new JSZip();

	for( let i=0; i<objs.length; i++ ){
		let buffer = exportSTL.fromMesh(objs[i]);
		let blob = new Blob([buffer], { type: exportSTL.mimeType });
		zip.file(`${scale}-${names[i]}.stl`, blob);
	}

	zip.generateAsync({type:"blob"})
	.then(function(content) {
		// see FileSaver.js
		console.log('Downloading');
		saveAs(content, `${type}.zip`);
	});
};

const checkAllPaths = () => {
	console.log('Chequeando piezas...');
	let parts = getAllFiles();
	let promisesCheck = [];
	for(let i=0; i < parts.length; i++ ) {
		let absolutePaths = getStlPath(parts[i]);
		console.log(absolutePaths);
		promisesCheck.push(checkPathFile( absolutePaths ) );
	}
	Promise.all(promisesCheck).then( values => {
		let foundError = false;
		for( let i=0; i<values.length; i++ ) {
			if(!values[i]) {
				foundError = true;
				console.error('Pieza no encontrada:', parts[i]);
			}
		}
		if(!foundError){
			console.log('%c Todas las piezas están correctas.', 'background: #8dd888; color: #000000');
		}
	} );
}


export {
	downloadMesh,
	downloadAsZip,
	checkPathFile,
	checkAllPaths,
	getStlPath
}