import 'babel-polyfill';

import { getFilesFor, getAllFiles } from './components/partsDir';
import getStl, {getStlSync, getScale} from './components/stlManage';
import { checkAllPaths, downloadMesh, downloadAsZip } from './components/fileManage';

console.log('%c Limbs generator. Made with <3 by matiasngf', 'background: #4772b2; color: #ffffff; padding: 5px');

const downloadProsthesis = (type, mm) => {
	const parts = getFilesFor(type);
	downloadMultipleParts(parts, mm);
};

const downloadMultipleParts = (parts, mm) => {
	let promiseParts = [];
	let scale = getScale(mm);
	console.log(parts);
	for(let i=0; i<parts.length; i++) {
		promiseParts.push( getStlSync(parts[i], scale) );
	}
	Promise.all(promiseParts).then( (values) => {
		console.log(values);
		downloadAsZip(values);
	});
}

class prosthesis {
	constructor() {
		this.parts = [];
		this.scale = 0;
		this.type = 'none';
		this.meshList = [];

		this.setScale = this.setScale.bind(this);
		this.setMM = this.setMM.bind(this);
		this.download = this.download.bind(this);
		this.getStl = this.getStl.bind(this);
		this.setType = this.setType.bind(this);
	}
	setScale(scale) {
		this.scale = scale
	}
	setMM(mm){
		this.scale = getScale(mm);
	}
	download() {
		console.log('Download started');
		downloadAsZip(this.meshList, this.parts, this.scale, this.type);
	}
	getStl(callback) {
		let promiseParts = [];
		for(let i=0; i<this.parts.length; i++) {
			promiseParts.push( getStlSync(this.parts[i], this.scale) );
		}
		Promise.all(promiseParts).then( (values) => {
			this.meshList = values;
			callback()
			
		});
	}
	setType(type) {
		const parts = getFilesFor(type);
		if(parts) {
			this.parts = parts;
			this.type = type;
		}
	}
}

let p = new prosthesis();
p.setType('left-hand');
p.setMM(70);
p.getStl( () => {
	p.download();
});


// downloadProsthesis('left-hand', 70);



// console.log(r, parts[i]);
// if(r && i==0){
//   CargarObjeto(parts[i], escala, (objScaled) => {
//     // downloadMesh(objScaled, pr_type, escala, parts[i]);
//   });
// }