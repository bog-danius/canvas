const a = new Vector(1,2);
console.log(a)

const SIZE = 40;
const COUNT_BLOCKS = 6;
const BULLET_SIZE = 8;

const HEIGHT_TURRET = 10;
const WIDTH_TURRET = 25;


const inp = document.getElementById('head');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Element for render
// [{type: "", ...}]
let arrayRenderElements = [];

