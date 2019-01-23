const STLLoader = require('three-stl-loader')(THREE);
const loader = new STLLoader();

import { getStlPath } from './fileManage';

const getStl = (name, scale = 100, callback) => {
	const pathToStl = getStlPath(name);
	console.log('LOADING: ', name);
	loader.load(pathToStl, function (geometry) { //loadGeometry
		var material = new THREE.MeshNormalMaterial()
		let mano = new THREE.Mesh(geometry, material);
		mano.scale.x = ( scale/100 );
		mano.scale.y = ( scale/100 );
		mano.scale.z = ( scale/100 );
		console.log('-- generated:', name, `(scale: ${scale})`);
		callback(mano);
		return true;
	});
}
const getStlSync = (name, scale) => {
	return new Promise(
		function (resolve, reject) {
			getStl(name, scale, resolve);
		}
	);
}

const round5 = (x) => {
	return Math.ceil(x/5)*5;
}

const getScale = (mm) => {
	return round5(mm * 100 / 64);
}

export {
	getScale,
	getStlSync,
	getStl as default
}