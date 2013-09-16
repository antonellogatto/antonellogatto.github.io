
	var RED = [1,0,0];
	var BLACK = [20/255, 20/255, 20/255];
	var DARKGRAY = [50/255, 50/255, 50/255];
	var YELLOW = [219/255, 169/255, 1/255];
	var LIGHTGREEN = [125/200, 220/255, 0/255];
	var LIGHTRED = [255/200, 43/255, 43/255];

//keyboard
var points000 = [[4.19, 0.44, 0], [2.43, 0.44, 0], [2.43, 0.85, 0], 
	[2.26, 0.85, 0], [2.26, 0.33, 0], [4.19, 0.33, 0], 
	[4.19, 0.33, 0], [4.19, 0.33, 0], [4.19, 0.44, 0]];
var points001 = [[4.19, 0.44, 0], [5.96, 0.44, 0],
	[5.96, 0.85, 0], [6.13, 0.85, 0], [6.13, 0.33, 0], [4.19, 0.33, 0], 
	[4.19, 0.33, 0], [4.19, 0.33, 0], [4.19, 0.44, 0]];
var kbnub00 = generateNUBS(points000)[1];
var center_point0 = [2.4, 0.45, 0];
var surf000 = MAP(BEZIER(S1)([kbnub00, center_point0]))(detailed_domain2D);
var kbnub01 = generateNUBS(points001)[1];
var center_point1 = [6, 0.45, 0];
var surf001 = MAP(BEZIER(S1)([kbnub01, center_point1]))(detailed_domain2D);

var points002 = [[4.19, 0.44, 0.5], [2.43, 0.44, 0.5], [2.43, 0.85, 0.5], 
	[2.26, 0.85, 0.5], [2.26, 0.33, 0.5], [4.19, 0.33, 0.5], 
	[4.19, 0.33, 0.5], [4.19, 0.33, 0.5], [4.19, 0.44, 0.5]];
var points003 = [[4.19, 0.44, 0.5], [5.96, 0.44, 0.5],
	[5.96, 0.85, 0.5], [6.13, 0.85, 0.5], [6.13, 0.33, 0.5], [4.19, 0.33, 0.5], 
	[4.19, 0.33, 0.5], [4.19, 0.33, 0.5], [4.19, 0.44, 0.5]];
var kbnub02 = generateNUBS(points002)[1];
var center_point2 = [2.4, 0.45, 0.5];
var surf002 = MAP(BEZIER(S1)([kbnub02, center_point2]))(detailed_domain2D);
var kbnub03 = generateNUBS(points003)[1];
var center_point3 = [6, 0.45, 0.5];
var surf003 = MAP(BEZIER(S1)([kbnub03, center_point3]))(detailed_domain2D);

var surf004 = bs2([kbnub02, kbnub00]);
var surf005 = bs2([kbnub03, kbnub01]);

var keyboard = STRUCT([surf000, surf001, surf002, surf003, surf004, surf005]);
//DRAW(keyboard);
