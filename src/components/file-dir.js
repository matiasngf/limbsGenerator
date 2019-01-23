const path = require('path');

const fileDir = {
	"right-hand": [
		'RightPalm',
		'RightThumb',
	],
	'left-hand': [
		'LeftPalm',
		'LeftThumb',
	],
	'right-hand-no-thumb': [
		'RightPalmNoThumb',
	],
	'left-hand-no-thumb': [
		'LeftPalmNoThumb',
	]
}

const sharedFiles = [
	{
		types: ['right-hand', 'left-hand', 'right-hand-no-thumb', 'left-hand-no-thumb'],
		files: [
			'AtomicLabCover',
			'FingerMechanismHolder',
			'FingerStopper',
			'UpperArmFingerConnector',
			'UpperArmFingerSlider',
			'UpperArmHand',
			'UpperArmPalmConnector',
			'x1'
		],
	},
	{
		types: ['right-hand', 'left-hand'],
		files: [
			'UpperArmThumbShortConnector',
			'ThumbClip',
			'ThumbConnector',
			'ThumbScrew',
		]
	},
	{
		types: ['right-hand', 'right-hand-no-thumb'],
		files: [
			'RightFingers',
			'RightX2'
		]
	},
	{
		types: ['left-hand', 'left-hand-no-thumb'],
		files: [
			'LeftFingers',
			'LeftX2'
		]
	}
]

const getFilesFor = (type) => {
	if( type in fileDir ) {
		let filesRet = fileDir[type];
		for(let i=0; i < sharedFiles.length; i++){
			let toAdd = sharedFiles[i].types.filter( (o) => (o==type) );
			if(toAdd.length){
				filesRet = filesRet.concat(sharedFiles[i].files);
			}
		}
		return filesRet;
	} else {
		return false;
	}
}

export {
	getFilesFor as default
}