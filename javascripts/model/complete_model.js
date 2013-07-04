//improve domains intervals for a better quality

var domain1D = DOMAIN([[0, 1]])([8]);
var domain2D = DOMAIN([[0, 1],[0, 1]])([8, 8]);
var detailed_domain2D = DOMAIN([[0, 1], [0, 1]])([32, 32]);

var CYLINDER = function(r,h){
  function C0(l){
  var s = CYL_SURFACE([r,h])(l);
  var b1 = DISK(r)(l);
  var b2 = T([2])([h])(b1);
  return STRUCT([s,b1,b2]);
  }
  return C0;
}

//2-curves bezier surface

var bs2 = function(l){
	var p1 = l[0];
	var p2 = l[1];
	var c1 = BEZIER(S0)(p1);
	var c2 = BEZIER(S0)(p2);
	//DRAW(STRUCT([MAP(c1)(domain1D),MAP(c2)(domain1D),MAP(c3)(domain1D)]));
	return MAP(BEZIER(S1)([c1, c2]))(domain2D);
}

//3-curves bezier surface

var bs3 = function(l){
  p1 = l[0];
  p2 = l[1];
  p3 = l[2];
  c1 = BEZIER(S0)(p1);
  c2 = BEZIER(S0)(p2);
  c3 = BEZIER(S0)(p3);
  //DRAW(STRUCT([MAP(c1)(dom1D),MAP(c2)(dom1D),MAP(c3)(domain1D)]));
  return MAP(BEZIER(S1)([c1,c2,c3]))(domain2D);
}

var BLACK = [50/255, 50/255, 50/255];
var BROWN = [202/255, 141/255, 72/255];

var farnsworth_house = function(){

  //terrain
  var terrain = COLOR([10/255, 100/255, 0])(T([1, 2])([-0.1, -5])(CUBOID([50, 0.1, 70])));

  //pillars
  var pil00 = CUBOID([0.5, 1.6, 0.5]);
  var pillars0 = STRUCT([T([2])([-6.5]), pil00, T([2])([6.5]), pil00, T([2])([13.5]), pil00]);
  var pil01 = CUBOID([0.5, 10, 0.5]);
  var pillars1 = STRUCT([T([2])([-6.5]), pil00, T([2])([6.5]), pil01, T([2])([13.5]), pil01, T([2])([13.5]), pil01, T([2])([13.5]), pil01]);
  var pillars2 = STRUCT([pil01, T([2])([13.5]), pil01, T([2])([13.5]), pil01, T([2])([13.5]), pil01]);
  var pillars = STRUCT([T([0, 2])([4+0.5, 7.5]), pillars0, T([0])([10+0.5]), pillars1, T([0])([25+0.5]), pillars2]);

  //floors
  var fl0z = 25;
  var fl0x = 10;
  var fl1z = 50;
  var fl1x = 25;
  var floor0 = CUBOID([fl0x, 1, fl0z]);
  var floor1 = CUBOID([fl1x, 1, fl1z]);
  var floor2 = CUBOID([fl1x+1, 0.5, fl1z+1]);
  var floors = STRUCT([T([0, 1])([5, 0.7]), floor0, T([0, 1, 2])([fl0x+0.5, 0.7+1+0.7, 5]), floor1, T([1])([6.9-1]), floor1, T([0, 1, 2])([-0.5, 1, -0.5]), floor2]);

  //stairs
  var step = CUBOID([0.8, 0.15, 7.5]);
  var steps0 = STRUCT([T([0, 1, 2])([1.8, 0.05, 10]), step, T([0, 1])([0.8, 0.35]), step, T([0, 1])([0.8, 0.35]), step, T([0, 1])([0.8, 0.35]), step]);
  var c000 = CUBOID([0.2, 2.5, 6.5]);
  var stair0 = STRUCT([steps0, T([0, 1, 2])([2.6, 0.05, 10+0.5]), R([0, 1])([-PI/2.75]), c000]);
  
  var steps1 = STRUCT([T([0, 1, 2])([11.1, 1.95, 10]), step, T([0, 1])([0.8, 0.5]), step, T([0, 1])([0.8, 0.5]), step, T([0, 1])([0.8, 0.5]), step, T([0, 1])([0.8, 0.5]), step, T([0])([0.4]), step]);
  var c001 = CUBOID([0.2, 3.65, 6.5]);
  var c002 = CUBOID([0.2, 0.5, 6.5]);
  var stair1 = STRUCT([steps1, T([0, 1, 2])([11.1+0.8, 1.95, 10+0.5]), R([0, 1])([-PI/3.15]), c001, T([1])([3.7]), R([0, 1])([PI/3.15-PI/2]), c002]);
  var stairs = STRUCT([stair0, stair1]);

  //windows
  var wind0 = CUBOID([0.1, 4.9, 10]);
  var wind1 = CUBOID([0.1, 4.9, 13]);
  var wind2 = CUBOID([9.5, 4.9, 0.1]);
  var wind3 = CUBOID([5, 4.9, 0.1]);
  var windows0 = STRUCT([T([0, 1, 2])([10+0.5+5, 0.7+1+0.7+0.7+1, 5+13.25]), wind0, T([2])([10+0.25]), wind1, T([2])([13+0.25]), wind1]);
  var windows1 = STRUCT([T([0, 1, 2])([10+0.5+5+0.25, 0.7+1+0.7+0.7+1, 5+13]), wind2, T([0])([9.5+0.25]), wind3, T([0])([5+0.25]), wind2]);
  var windows = STRUCT([COLOR([200/255, 200/255, 200/255, 0.5]), windows0, windows1, T([2])([23.5+0.5+13-0.1])(windows1), T([0])([25-0.1]), windows0]);

  //fixtures
  var fix0 = CUBOID([0.25, 4.9, 0.25]);
  var fixtures0 = STRUCT([T([0, 1, 2])([10+0.5+5, 0.7+1+0.7+0.7+1, 5+13]), fix0, T([2])([10.25]), fix0, T([2])([13.25]), fix0, T([2])([13.25]), fix0]);
  var fixtures1 = STRUCT([T([0, 1, 2])([10+10+5+0.25, 0.7+1+0.7+0.7+1, 5+13]), fix0, T([0])([5+0.25]), fix0]);
  var fixtures = STRUCT([fixtures0, fixtures1, T([2])([23.5+0.5+13-0.25])(fixtures1), T([0])([25-0.25]), fixtures0]);

  return STRUCT([terrain, windows, COLOR([255/255,255/255,255/255]), floors, stairs, pillars, fixtures]);

}

var house = S([0, 1, 2])([2, 2, 2])(farnsworth_house());
DRAW(house);

var farnsworth_desk = function (color) {

var leg0 = CYLINDER(0.1, 3)([12, 1]);
var legs = STRUCT([T([0, 1])([0.2, 0.7]), leg0, T([0])([4-0.4])(leg0), T([1])([7-1.4]), leg0, T([0])([4-0.4])(leg0)]);

var plane0 = CUBOID([4, 7, 0.35]);
var plane1 = CUBOID([3.7, 2, 0.15]);
var planes = STRUCT([plane0, T([0, 1, 2])([0.15, -1.5, -0.15]), plane1, T([1])([7-0.5+1.5]), plane1]);

var c0 = CUBOID([0.01, 0.01, 0.7]);
var c1 = CUBOID([0.01, 1, 0.01]);
var c = STRUCT([c0, T([2])([0.7-0.01])(c1), T([1])([1-0.01])(c0)]);
var cs = STRUCT([T([0, 1, 2])([0.5, 7+0.25, 3]), c, T([0])([0.8]), c, T([0])([0.8]), c, T([0])([0.8]), c, T([0])([0.8]), c]);

var b0 = CUBOID([2, 4, 0.03]);
var b1 = CUBOID([1.98, 0.2, 0.03]);
var bs = STRUCT([COLOR([35/255, 35/255, 35/255]), T([0, 1, 2])([0.2, 1.5, 3+0.35]), b0, T([0, 1, 2])([0.02, 0.01, 0.03]), b1, T([1])([4-0.02-0.02-0.2]), b1]);

return STRUCT([bs, cs, T([1])([-7.25-1.25])(cs), legs, T([2])([3]), COLOR(color), planes]);
}

//creation and positioning

var desk = T([0, 1, 2])([39.5, 8.2, 45])(R([0,2])([-PI/2])(R([1,2])([-PI/2])(farnsworth_desk(BROWN))));
DRAW(desk);

var brno_chair = function(color){

  var points100 = [[2.98, 3], [2.63, 5.23], [2.62, 5.53], [4.76, 5.26]];
  var points101 = [[2.91, 3], [2.55, 5.35], [2.55, 5.59], [4.78, 5.32]];
  var leg_surf00 = bs2([points100, points101]);
  var leg000 = EXTRUDE([0.16])(leg_surf00);

  var points102 = [[2.91, 3], [3, 2.48], [3.11, 2.59], [4.8, 2.59]];
  var points103 = [[2.98, 3], [3.03, 2.48], [3.29, 2.68], [4.8, 2.64]];
  var leg_surf01 = bs2([points102, points103]);
  var leg001 = EXTRUDE([0.16])(leg_surf01);

  var points104 = [[4.4, 2.64], [4.4-0.16, 2.64]];
  var points105 = [[4.4, 2.59], [4.4-0.16, 2.59]];
  var leg_surf02 = bs2([points104, points105]);
  var leg002 = EXTRUDE([2.05])(leg_surf02);

  var brno_legs = STRUCT([leg000, leg001, T([2])([0.16]), leg002, T([2])([2.05]), leg000, leg001]);

  var points106 = [[4.49, 4.44], [4.55, 5.77], [4.63, 6], [4.85, 5.89]];
  var points107 = [[4.65, 4.23], [4.85, 5.89]];
  var pill100 = EXTRUDE([2.05])(bs2([points106, points107]));

  var points108 = [[2.69, 4.24], [2.32, 4.56], [3.73, 4.41], [4.48, 4.45]];
  var points109 = [[4.65, 4.23], [4.49, 4.44]];
  var pill101 = EXTRUDE([2.05])(bs2([points108, points109]));

  var brno_pillows = STRUCT([COLOR(color), T([2])([0.16]), pill100, pill101]);

  return STRUCT([brno_pillows, brno_legs]);
}

//creation and positioning

var brno_chair0 = T([0, 1, 2])([42, 5.62, 48])(R([0,2])([PI/2])(brno_chair(BROWN)));
DRAW(brno_chair0);

var brno_chair1 = T([0, 1, 2])([46, 5.62, 50])(R([0,2])([-PI/2])(brno_chair(BROWN)));
var brno_chair2 = T([0, 1, 2])([42, 5.62, 50])(R([0,2])([-PI/2])(brno_chair(BROWN)));
DRAW(brno_chair1);
DRAW(brno_chair2);

var boot_box = function (color) {
  var a = CUBOID([1.8, 0.05, 4.8]);
  var b = T([0, 1])([-0.05, 0.05])(CUBOID([0.05, 1.5, 4.8]));
  var c = T([0, 1, 2])([-0.05, 0.05, -0.05])(CUBOID([1.9, 1.7, 0.05]));
  var d = T([0, 1])([1.8, 0.05])(CUBOID([0.05, 1.7, 4.8]));
  var e = T([0, 1])([-0.05, 0.05+1.5])(CUBOID([0.05, 0.2, 2.1]));
  var f = T([0, 1])([-0.05, 0.05+1.7+0.01])(CUBOID([0.05, 0.3, 4.8]));
  var g = T([0, 1, 2])([-0.05, 0.05+1.7+0.01, -0.05])(CUBOID([1.9, 0.3, 0.05]));
  return STRUCT([COLOR(color), a, b, c, T([2])([4.8+0.05])(c), d, e, 
    T([2])([2.1+0.6])(e), f, T([0])([1.8+0.05])(f), g, T([2])([4.8+0.05])(g), T([1])([1.7+0.01+0.3])(a), 
    T([1, 2])([0.02, 0.05])(c), T([1, 2])([0.02, 4.8])(c), T([0, 1])([-0.05, 0.02])(d), T([0, 1])([-1.8+0.05, 0.02])(d)]);
}

//creation and positioning

var box = boot_box(BROWN);
var boxes = STRUCT([T([0, 1, 2])([38, 8.2, 40]), R([0,2])([PI/2]), box, T([2])([4.8]), box]);
DRAW(boxes);

var barcelona_day_bed = function(color){
  //legs
  var legs37 = T([0, 1])([0.11, 0.11])(CYLINDER(0.11, 1.57)([12, 1]));
  var barcelona_day_bed_legs = STRUCT([legs37, T([0])([8.85+0.11])(legs37), T([1])([4.8-0.22]), legs37, T([0])([8.85+0.11])(legs37)]);

  //base
  var points086 = [[-1.25, 0.22, 2], [-1.82, -0.35, 2], [-1.82, -0.35, 1.57], [-1.25, 0.22, 1.57]];
  var points087 = [[10.21, 0.22, 2], [10.78, -0.35, 2], [10.78, -0.35, 1.57], [10.21, 0.22, 1.57]];
  var base_surf0 = bs2([points086, points087]);
  var base_surf1 = bs2([[[-1.25, 0.22, 2], [-1.25, 0.22, 1.57]], [[10.21, 0.22, 2], [10.21, 0.22, 1.57]]]);
  var points088 = [[-1.25, 4.58, 2], [-1.82, 4.8+0.35, 2], [-1.82, 4.8+0.35, 1.57], [-1.25, 4.58, 1.57]];
  var base_surf2 = bs2([points086, points088]);
  var base_surf3 = bs2([[[-1.25, 0.22, 2], [-1.25, 0.22, 1.57]], [[-1.25, 4.58, 2], [-1.25, 4.58, 1.57]]]);
  var points089 = [[10.21, 4.58, 2], [10.78, 4.8+0.35, 2], [10.78, 4.8+0.35, 1.57], [10.21, 4.58, 1.57]];
  var base_surf4 = bs2([points087, points089]);
  var base_surf5 = bs2([[[10.21, 0.22, 2], [10.21, 0.22, 1.57]], [[10.21, 4.58, 2], [10.21, 4.58, 1.57]]]);
  var base_surf6 = bs2([points088, points089]);
  var base_surf7 = bs2([[[-1.25, 4.58, 2], [-1.25, 4.58, 1.57]], [[10.21, 4.58, 2], [10.21, 4.58, 1.57]]]);
  var barcelona_day_bed_base = STRUCT([base_surf0, base_surf1, base_surf2, base_surf3, base_surf4, base_surf5, base_surf6, base_surf7]);

  //ropes 
  var points090 = [[0.22, 2], [-0.35, 2], [-0.35, 1.57], [0.22, 1.57]];
  var points091 = [[4.58, 2], [4.8+0.35, 2], [4.8+0.35, 1.57], [4.58, 1.57]];
  var points092 = [[0.22, 2+0.02], [-0.35-0.02, 2+0.02], [-0.35-0.02, 1.57-0.02], [0.22, 1.57-0.02]];
  var points093 = [[4.58, 2+0.02], [4.8+0.35+0.02, 2+0.02], [4.8+0.35+0.02, 1.57-0.02], [4.58, 1.57-0.02]];
  var rope10 = T([2])([-0.75])(EXTRUDE([0.5])(bs2([points090, points092])));
  var rope11 = T([2])([-0.75])(EXTRUDE([0.5])(bs2([points091, points093])));
  var rope12 = T([2])([-0.75])(EXTRUDE([0.5])(bs2([[[0.22, 2], [0.22, 2+0.02]], [[4.58, 2], [4.58, 2+0.02]]])));

  var barcelona_day_bed_ropes = R([1, 2])(PI/2)(R([0, 2])([PI/2])(COLOR([50/255, 50/255, 50/255])(STRUCT(REPLICA(11)([rope10, rope11, rope12, T([2])([0.5+0.5])])))));

  //mattress
  var mattress = T([0, 1, 2])([-1.65, -0.25, 2+0.02])(CUBOID([12.27, 5.25, 0.45]));

  //mattress squares
  var points094 = [[-1.1, -0.25, 2.47], [-1.1, -0.25, 2.65], [-1.1, 0.625, 2.65], [-1.1, 0.625, 2.47]];
  var pill24 = bs3([[[-1.65, -0.25, 2.47], [-1.65, 0.625, 2.47]], points094, [[-0.535, -0.25, 2.47], [-0.535, 0.625, 2.47]]]);
  var square_row = STRUCT(REPLICA(6)([pill24, T([1])([0.875])]));
  var pillow_squares0 = STRUCT(REPLICA(11)([square_row, T([0])([1.115])]));

  //mattress buttons
  var pillow_button03 = T([0, 1, 2])([-0.535, 0.625, 2.47+0.01])(CYLINDER(0.04, 0.01)([12, 1]));
  var pillow_buttons_row3 = STRUCT(REPLICA(5)([pillow_button03, T([1])([0.875])]));
  var pillow_buttons03 = STRUCT(REPLICA(10)([pillow_buttons_row3, T([0])([1.115])]));
  var barcelona_day_bed_mattress = STRUCT([mattress, pillow_squares0, pillow_buttons03]);

  //pillow 
  var pillow = T([1, 2])([-0.125, 2+0.02+0.4+0.45])(R([1, 2])([-PI/2])(CYLINDER(0.4, 5)([16,1])));

  return STRUCT([barcelona_day_bed_base, barcelona_day_bed_legs, barcelona_day_bed_ropes, COLOR(color), barcelona_day_bed_mattress, pillow]);
}

//creation and positioning

var bed = T([0,1,2])([45, 8.2, 70])(R([1, 2])([-PI/2])(barcelona_day_bed(BROWN)));
DRAW(bed);

var barcelona_pouf = function(color){

//legs
var points062 = [[5.46, 4.67], [4.87, 5.27], [4.49, 5.42], [4.1, 5.37]];
var points063 = [[5.55, 4.72], [5.24, 4.94], [4.73, 5.56], [4.1, 5.44]];
var legs30 = bs2([points062, points063]);

var points064 = [[5.46, 4.67], [5.17, 4.3], [4.5, 3.87], [3.9, 3.92]];
var points065 = [[5.57, 4.59], [5.41, 4.65], [4.97, 3.82], [3.91, 3.87]];
var legs31 = bs2([points064, points065]);

var points066 = [[5.57, 4.59], [5.75, 4.49], [6.3, 3.8], [7.18, 3.87]];
var points067 = [[5.64, 4.64], [5.9, 4.47], [6.26, 3.9], [7.19, 3.92]];
var legs32 = bs2([points066, points067]);

var points068 = [[5.64, 4.64], [5.52, 4.64], [6.36, 5.48], [7, 5.37]];
var points069 = [[5.55, 4.72], [5.75, 4.72], [6.21, 5.57], [7, 5.44]];
var legs33 = bs2([points068, points069]);

var legs34 = SIMPLICIAL_COMPLEX([[5.46, 4.67], [5.57, 4.59], [5.64, 4.64], [5.55, 4.72]])([[0, 1, 2], [0, 2, 3]]);

var barcelona_pouf_legs0 = STRUCT([EXTRUDE([0.16]), legs30, legs31, legs32, legs33, legs34]);

var legs35 = bs2([[[4.1, 5.37], [4.1, 5.44]], [[4.26, 5.37], [4.26, 5.44]]]);
var legs36 = bs2([[[7, 5.37], [7, 5.44]], [[6.84, 5.37], [6.84, 5.44]]]);

var barcelona_pouf_legs1 = STRUCT([EXTRUDE([2.78]), legs35, legs36]);
var barcelona_pouf_legs = STRUCT([barcelona_pouf_legs0, T([2])([0.16]), barcelona_pouf_legs1, T([2])([2.78]), barcelona_pouf_legs0]);

//ropes
var points070 = [[4.26, 5.37], [4.1, 5.37], [4.1, 5.44], [7, 5.44], [7, 5.37], [6.84, 5.37]];
var points071 = [[4.26, 5.37-0.02], [4.1-0.02, 5.37-0.02], [4.1-0.02, 5.44+0.02], [7+0.02, 5.44+0.02], [7+0.02, 5.37-0.02], [6.84, 5.37-0.02]];
var ropeNUBS08 =  NUBS(S0)(1)([0,0,1,2,3,4,5,5])(points070);
var ropeNUBS09 =  NUBS(S0)(1)([0,0,1,2,3,4,5,5])(points071);
var rope09 = T([2])([0.18])(EXTRUDE([0.22])(MAP(BEZIER(S1)([ropeNUBS08, ropeNUBS09]))(domain2D)));
var barcelona_pouf_ropes = COLOR([50/255, 50/255, 50/255])(STRUCT(REPLICA(7)([rope09, T([2])([0.22+0.20])])));

//pillow 
var points072 = [[4.05, 5.46, 0], [4.05, 5.46, -0.1], [4.55, 5.46, -0.1], 
[6.55, 5.46, -0.1], [7.05, 5.46, -0.1], [7.05, 5.46, 0], 
[7.05, 5.46, 3.1], [7.05, 5.46, 3.2], [6.55, 5.46, 3.2], 
[4.55, 5.46, 3.2], [4.05, 5.46, 3.2], [4.05, 5.46, 3.1], [4.05, 5.46, 1], [4.05, 5.46, 0]];
var points073 = [[4.05, 5.76, 0], [4.05, 5.76, -0.1], [4.55, 5.76, -0.1], 
[6.55, 5.76, -0.1], [7.05, 5.76, -0.1], [7.05, 5.76, 0], 
[7.05, 5.76, 3.1], [7.05, 5.76, 3.2], [6.55, 5.76, 3.2], 
[4.55, 5.76, 3.2], [4.05, 5.76, 3.2], [4.05, 5.76, 3.1], [4.05, 5.76, 1], [4.05, 5.76, 0]];

var pillNUBS00 =  NUBS(S0)(2)([0,0,0,1,2,3,4,5,6,7,8,9,10,11,13,13,13])(points072);
var pillNUBS01 =  NUBS(S0)(2)([0,0,0,1,2,3,4,5,6,7,8,9,10,11,13,13,13])(points073);
var pill_surf0 = MAP(BEZIER(S1)([pillNUBS00, [5.5, 5.46, 1]]))(domain2D);
var pill_surf1 = MAP(BEZIER(S1)([pillNUBS01, [5.5, 5.76, 1]]))(domain2D);
var pill_surf2 = MAP(BEZIER(S1)([pillNUBS00, pillNUBS01]))(domain2D);

//pillow_squares
var points074 = [[4.1, 5.76, -0.025], [4.79, 5.76, -0.1]];
var points075 = [[4.05, 5.76, 0.3], [4.05, 5.94, 0.3], [4.79, 5.94, 0.3], [4.79, 5.76, 0.3]];
var points076 = [[4.1, 5.76, 0.7], [4.79, 5.76, 0.7]];
var pill20 = bs3([points074, points075, points076]);

var points077 = [[5.54, 5.76, -0.1], [4.79, 5.76, -0.1]];
var points078 = [[5.54, 5.76, 0.3], [5.54, 5.94, 0.3], [4.79, 5.94, 0.3], [4.79, 5.76, 0.3]];
var points079 = [[5.54, 5.76, 0.7], [4.79, 5.76, 0.7]];
var pill21 = bs3([points077, points078, points079]);

var points080 = [[5.54, 5.76, -0.1], [6.29, 5.76, -0.1]];
var points081 = [[5.54, 5.76, 0.3], [5.54, 5.94, 0.3], [6.28, 5.94, 0.3], [6.29, 5.76, 0.3]];
var points082 = [[5.54, 5.76, 0.7], [6.29, 5.76, 0.7]];
var pill22 = bs3([points080, points081, points082]);

var points083 = [[7, 5.76, -0.05], [6.29, 5.76, -0.1]];
var points084 = [[7.05, 5.76, 0.3], [6.94, 5.91, 0.3], [6.28, 5.94, 0.3], [6.29, 5.76, 0.3]];
var points085 = [[7, 5.76, 0.7], [6.29, 5.76, 0.7]];
var pill23 = bs3([points083, points084, points085]);

var pillow_squares = STRUCT(REPLICA(4)([pill20, pill21, pill22, pill23, T([2])([0.825])]));

//pillow buttons
var pillow_button02 = T([0, 1, 2])([4.79, 5.76+0.01, 0.7])(R([1, 2])([PI/2])(CYLINDER(0.04, 0.01)([12, 1])));
var pillow_buttons_row2 = STRUCT(REPLICA(3)([pillow_button02, T([0])([0.75])]));
var pillow_buttons02 = STRUCT(REPLICA(3)([pillow_buttons_row2, T([2])([0.825])]));
var barcelona_pouf_pillow = STRUCT([pill_surf0, pill_surf1, pill_surf2, pillow_squares, pillow_buttons02]);

return STRUCT([barcelona_pouf_legs, barcelona_pouf_ropes, COLOR(color), barcelona_pouf_pillow]);
}

//creation and positioning

var pouf = T([0,1,2])([53, 4.35, 56.5])(barcelona_pouf(BROWN));
DRAW(pouf);

var barcelona_table = function () {
  var leg0 = CUBOID([0.2, 2, 0.1]);
  var leg1 = T([1])([2-0.2])(CUBOID([6, 0.2, 0.1]));
  var legs0 = STRUCT([R([0, 2])([-PI/4]), leg0, leg1, T([0])([6-0.2]), leg0]);
  var legs = STRUCT([T([0, 2])([1, 1]), legs0, T([2])([4.5]), R([0, 2])([PI/2])(legs0)]);

  var plane = COLOR([200/255, 200/255, 200/255, 0.5])(CUBOID([6.5, 0.1, 6.5]));

  return STRUCT([legs, T([1])([2]), plane]);
}

//creation and positioning

var table = T([0,1,2])([34, 8.2, 81])(barcelona_table());
DRAW(table);

var barcelona_chair = function(color){

  //skeleton - legs
  var points000 = [[4.59, 3.84, 0], [4.79, 3.7, 0], [3.66, 3.21, 0], [3.05, 3.29, 0]];
  var points001 = [[4.78, 3.68, 0], [4.66, 3.84, 0], [4.15, 3.21, 0], [3.06, 3.26, 0]]
  var legs00 = bs2([points000, points001]);

  var points002 = [[4.78, 3.68, 0], [5.11, 3.37, 0], [5.32, 3.2, 0], [5.81, 3.17, 0]];
  var points003 = [[4.76, 3.77, 0], [5.09, 3.46, 0], [5.29, 3.23, 0], [5.84, 3.21, 0]];
  var legs01 = bs2([points002, points003]);

  var points004 = [[4.76, 3.77, 0], [4.75, 3.89, 0], [5.77, 4.4, 0], [5.88, 5.84, 0]];
  var points005 = [[4.66, 3.87, 0], [4.75, 3.75, 0], [5.78, 4.64, 0], [5.84, 5.85, 0]];
  var legs02 = bs2([points004, points005]);

  var points006 = [[4.66, 3.87, 0], [4.48, 3.94, 0], [4.2, 4.4, 0], [3.18, 4.51, 0]];
  var points007 = [[4.62, 3.8, 0], [4.61, 3.83, 0], [4.21, 4.35, 0], [3.19, 4.48, 0]];
  var legs03 = bs2([points006, points007]);
  
  var legs04 = SIMPLICIAL_COMPLEX([[4.62, 3.8, 0], [4.66, 3.87, 0], [4.78, 3.68, 0], [4.76, 3.77, 0]])([[0, 1, 2],[1, 2, 3]]);
  var legs05 = SIMPLICIAL_COMPLEX([[3.05, 3.29, 0], [3.06, 3.26, 0], [3.05, 3.29, 0.1], [3.06, 3.26, 0.1]])([[0, 1, 2],[1, 2, 3]]);
  var legs06 = SIMPLICIAL_COMPLEX([[5.81, 3.17, 0], [5.84, 3.21, 0], [5.81, 3.17, 0.1], [5.84, 3.21, 0.1]])([[0, 1, 2],[1, 2, 3]]);
  var legs07 = SIMPLICIAL_COMPLEX([[5.88, 5.84, 0], [5.84, 5.85, 0], [5.88, 5.84, 0.1], [5.84, 5.85, 0.1]])([[0, 1, 2],[1, 2, 3]]);
  var legs08 = SIMPLICIAL_COMPLEX([[3.18, 4.51, 0], [3.19, 4.48, 0], [3.18, 4.51, 0.1], [3.19, 4.48, 0.1]])([[0, 1, 2],[1, 2, 3]]);

  var legs09 = STRUCT([legs00, legs01, legs02, legs03, legs04]);

  var points010 = [[4.59, 3.84, 0.1], [4.79, 3.7, 0.1], [3.66, 3.21, 0.1], [3.05, 3.29, 0.1]];
  var legs10 = bs2([points000, points010]);

  var points011 = [[4.78, 3.68, 0.1], [4.66, 3.84, 0.1], [4.15, 3.21, 0.1], [3.06, 3.26, 0.1]];
  var legs11 = bs2([points001, points011]);

  var points012 = [[4.78, 3.68, 0.1], [5.11, 3.37, 0.1], [5.32, 3.2, 0.1], [5.81, 3.17, 0.1]];
  var legs12 = bs2([points002, points012]);

  var points013 = [[4.76, 3.77, 0.1], [5.09, 3.46, 0.1], [5.29, 3.23, 0.1], [5.84, 3.21, 0.1]];
  var legs13 = bs2([points003, points013]);

  var points014 = [[4.76, 3.77, 0.1], [4.75, 3.89, 0.1], [5.77, 4.4, 0.1], [5.88, 5.84, 0.1]];
  var legs14 = bs2([points004, points014]);

  var points015 = [[4.66, 3.87, 0.1], [4.75, 3.75, 0.1], [5.78, 4.64, 0.1], [5.84, 5.85, 0.1]];
  var legs15 = bs2([points005, points015]);

  var points016 = [[4.66, 3.87, 0.1], [4.48, 3.94, 0.1], [4.2, 4.4, 0.1], [3.18, 4.51, 0.1]];
  var legs16 = bs2([points006, points016]);
  var points017 = [[4.62, 3.8, 0.1], [4.61, 3.83, 0.1], [4.21, 4.35, 0.1], [3.19, 4.48, 0.1]];
  var legs17 = bs2([points007, points017]);

  var legs0 = STRUCT([legs05, legs06, legs07, legs08, legs09, legs10, legs11, 
    legs12, legs13, legs14, legs15, legs16, legs17, T([2])([0.1]), legs09]);

  var legs18 = SIMPLICIAL_COMPLEX([[3.19, 4.48, 0.1], [3.19, 4.48, 0.1+2.48], [3.18, 4.51, 0.1], [3.18, 4.51, 0.1+2.48]])([[0, 1, 2],[1, 2, 3]]);
  var legs19 = SIMPLICIAL_COMPLEX([[3.19+0.12, 4.48-0.02, 0.1], [3.19+0.12, 4.48-0.02, 0.1+2.48], [3.18+0.12, 4.515-0.02, 0.1], [3.18+0.12, 4.515-0.02, 0.1+2.48]])([[0, 1, 2],[1, 2, 3]]);
  var legs20 = SIMPLICIAL_COMPLEX([[3.19, 4.48, 0.1], [3.19, 4.48, 0.1+2.48], [3.19+0.12, 4.48-0.02, 0.1], [3.19+0.12, 4.48-0.02, 0.1+2.48]])([[0, 1, 2],[1, 2, 3]]);
  var legs21 = SIMPLICIAL_COMPLEX([[3.18, 4.51, 0.1], [3.18, 4.51, 0.1+2.48], [3.18+0.12, 4.515-0.02, 0.1], [3.18+0.12, 4.515-0.02, 0.1+2.48]])([[0, 1, 2],[1, 2, 3]]);
  var legs1 = STRUCT([legs18, legs19, legs20, legs21]);

  var legs22 = SIMPLICIAL_COMPLEX([[5.88, 5.84, 0.1], [5.88, 5.84, 0.1+2.48], [5.84, 5.85, 0.1], [5.84, 5.85, 0.1+2.48]])([[0, 1, 2],[1, 2, 3]]);
  var legs23 = SIMPLICIAL_COMPLEX([[5.8768-0.01, 5.84-0.12, 0.1], [5.8768-0.01, 5.84-0.12, 0.1+2.48], [5.839-0.01, 5.85-0.12, 0.1], [5.839-0.01, 5.85-0.12, 0.1+2.48]])([[0, 1, 2],[1, 2, 3]]);
  var legs24 = SIMPLICIAL_COMPLEX([[5.88, 5.84, 0.1], [5.8768-0.01, 5.84-0.12, 0.1], [5.88, 5.84, 0.1+2.48], [5.8768-0.01, 5.84-0.12, 0.1+2.48]])([[0, 1, 2],[1, 2, 3]]);
  var legs25 = SIMPLICIAL_COMPLEX([[5.84, 5.85, 0.1], [5.839-0.01, 5.85-0.12, 0.1], [5.84, 5.85, 0.1+2.48], [5.839-0.01, 5.85-0.12, 0.1+2.48]])([[0, 1, 2],[1, 2, 3]]);
  var legs2 = STRUCT([legs22, legs23, legs24, legs25]);

  var legs26 = SIMPLICIAL_COMPLEX([[4.923, 4, 0.1], [4.923, 4, 0.1+2.48], [4.958, 3.98, 0.1], [4.958, 3.98, 0.1+2.48]])([[0, 1, 2],[1, 2, 3]]);
  var legs27 = SIMPLICIAL_COMPLEX([[4.875, 3.96, 0.1], [4.875, 3.96, 0.1+2.48], [4.892, 3.92, 0.1], [4.892, 3.92, 0.1+2.48]])([[0, 1, 2],[1, 2, 3]]);
  var legs28 = SIMPLICIAL_COMPLEX([[4.923, 4, 0.1], [4.875, 3.96, 0.1], [4.923, 4, 0.1+2.48], [4.875, 3.96, 0.1+2.48]])([[0, 1, 2],[1, 2, 3]]);
  var legs29 = SIMPLICIAL_COMPLEX([[4.958, 3.98, 0.1], [4.892, 3.92, 0.1], [4.958, 3.98, 0.1+2.48], [4.892, 3.92, 0.1+2.48]])([[0, 1, 2],[1, 2, 3]]);
  var legs3 = STRUCT([legs26, legs27, legs28, legs29]);

  var barcelona_legs = STRUCT([legs0, legs1, legs2, legs3, T([2])([0.1+2.48]), legs0]);

  //ropes
  var points018 = [[3.19+0.12, 4.46, 0.1], [3.189, 4.477, 0.1], [3.178, 4.515, 0.1], [3.19+0.12, 4.495, 0.1], 
  [4.923, 4, 0.1], [4.96, 3.98, 0.1], [4.905, 3.93, 0.1], [4.89, 3.915, 0.1], [4.875, 3.955, 0.1]];
  var ropeNUBS00 =  NUBS(S0)(1)([0,0,1,2,3,4,5,6,7,8,8])(points018);
  var points019 = [[3.19+0.12, 4.46, 0.22], [3.189, 4.477, 0.22], [3.178, 4.515, 0.22], [3.19+0.12, 4.495, 0.22], 
  [4.923, 4, 0.22], [4.96, 3.98, 0.22], [4.905, 3.93, 0.22], [4.89, 3.915, 0.22], [4.875, 3.955, 0.22]];
  var ropeNUBS01 = NUBS(S0)(1)([0,0,1,2,3,4,5,6,7,8,8])(points019);
  var points020 = [[3.19+0.12, 4.45, 0.1], [3.18, 4.47, 0.1], [3.165, 4.525, 0.1], [3.2+0.12, 4.51, 0.1], 
  [4.923, 4.02, 0.1], [4.985, 3.99, 0.1], [4.94, 3.95, 0.1], [4.87, 3.935, 0.1], [4.875, 3.95, 0.1]];
  var ropeNUBS02 =  NUBS(S0)(1)([0,0,1,2,3,4,5,6,7,8,8])(points020);
  var points021 = [[3.19+0.12, 4.45, 0.22], [3.18, 4.47, 0.22], [3.165, 4.525, 0.22], [3.2+0.12, 4.51, 0.22], 
  [4.923, 4.02, 0.22], [4.985, 3.99, 0.22], [4.94, 3.95, 0.22], [4.87, 3.935, 0.22], [4.875, 3.95, 0.22]];
  var ropeNUBS03 =  NUBS(S0)(1)([0,0,1,2,3,4,5,6,7,8,8])(points021);
  var rope01 = MAP(BEZIER(S1)([ropeNUBS00, ropeNUBS01]))(domain2D);
  var rope02 = MAP(BEZIER(S1)([ropeNUBS00, ropeNUBS02]))(domain2D);
  var rope03 = MAP(BEZIER(S1)([ropeNUBS01, ropeNUBS03]))(domain2D);
  var rope04 = MAP(BEZIER(S1)([ropeNUBS02, ropeNUBS03]))(domain2D);
  var ropes0 = STRUCT(REPLICA(9)([T([2])([0.012]), rope01, rope02, rope03, rope04, T([2])([0.12+0.01+0.15])]));

  var points022 = [[5.885, 5.85-0.12, 0.1], [5.9, 5.866, 0.1], [5.825, 5.865, 0.1], [5.72, 5.44, 0.1], [5.07, 4.09, 0.1], [4.97, 3.98, 0.1], [4.89, 3.915, 0.1], [4.875, 3.955, 0.1]];
  var ropeNUBS04 =  NUBS(S0)(1)([0,0,1,2,3,4,5,6,7,7])(points022);
  var points023 = [[5.885, 5.85-0.12, 0.25], [5.9, 5.86, 0.25], [5.825, 5.865, 0.25], [5.72, 5.44, 0.25], [5.07, 4.09, 0.25], [4.97, 3.98, 0.25], [4.89, 3.915, 0.25], [4.875, 3.955, 0.25]];
  var ropeNUBS05 = NUBS(S0)(1)([0,0,1,2,3,4,5,6,7,7])(points023);
  var points024 = [[5.875, 5.84-0.12, 0.1], [5.88, 5.84, 0.1], [5.84, 5.85, 0.1], [5.73, 5.44, 0.1], [5.08, 4.08, 0.1], [4.995, 3.99, 0.1], [4.87, 3.935, 0.1], [4.875, 3.95, 0.1]];
  var ropeNUBS06 =  NUBS(S0)(1)([0,0,1,2,3,4,5,6,7,7])(points024);
  var points025 = [[5.875, 5.84-0.12, 0.25], [5.88, 5.84, 0.25], [5.84, 5.85, 0.25], [5.73, 5.44, 0.25], [5.08, 4.08, 0.25], [4.995, 3.99, 0.25], [4.87, 3.935, 0.25], [4.875, 3.95, 0.25]];
  var ropeNUBS07 =  NUBS(S0)(1)([0,0,1,2,3,4,5,6,7,7])(points025);
  var rope05 = MAP(BEZIER(S1)([ropeNUBS04, ropeNUBS05]))(domain2D);
  var rope06 = MAP(BEZIER(S1)([ropeNUBS04, ropeNUBS06]))(domain2D);
  var rope07 = MAP(BEZIER(S1)([ropeNUBS05, ropeNUBS07]))(domain2D);
  var rope08 = MAP(BEZIER(S1)([ropeNUBS06, ropeNUBS07]))(domain2D);
  var ropes1 = T([2])([0.01])(STRUCT(REPLICA(8)([T([2])([0.012+0.12]), rope05, rope06, rope07, rope08, T([2])([0.15+0.01])])));

  var barcelona_ropes = STRUCT([COLOR([50/255, 50/255, 50/255]), ropes0, ropes1]);

  //pillows
  //bottom pillow
  var points026 = [[5.14, 4.24, 0], [3.23, 4.77, 0]];
  var points027 = [[5.1, 4.15, 0], [4.61, 4.26, 0], [3.64, 4.49, 0], [3.17, 4.69, 0]];
  var points028 = [[5.04, 4.08, 0], [3.16, 4.58, 0]];
  var pill00 = bs3([points026, points027, points028]);
  var points029 = [[5.14, 4.24, 2.7], [3.23, 4.77, 2.7]];
  var points030 = [[5.1, 4.15, 2.7], [4.61, 4.26, 2.7], [3.64, 4.49, 2.7], [3.17, 4.69, 2.7]];
  var points031 = [[5.04, 4.08, 2.7], [3.16, 4.58, 2.7]];
  var pill01 = bs3([points029, points030, points031]);
  var pill02 = bs3([[[5.14, 4.24, 0], [5.14, 4.24, 2.7]], [[5.1, 4.15, 0], [5.1, 4.15, 2.7]], [[5.04, 4.08, 0], [5.04, 4.08, 2.7]]]);
  var pill03 = bs3([[[3.23, 4.77, 0], [3.23, 4.77, 2.7]], [[3.17, 4.69, 0], [3.17, 4.69, 2.7]], [[3.16, 4.58, 0], [3.16, 4.58, 2.7]]]);
  var pill04 = bs2([points026, points029]);
  var pill05 = bs2([points028, points031]);

  var pillow00 = STRUCT([pill00, pill01, pill02, pill03, pill04, pill05]);

  //bottom pillow squares
  var points032 = [[3.69, 4.65, 0.27], [3.51, 4.88, 0.27], [3.45, 4.9, 0.27], [3.25, 4.77, 0.27]];
  var points033 = [[3.69, 4.65, 0], [3.25, 4.77, 0]];
  var points034 = [[3.69, 4.65, 0.54], [3.25, 4.77, 0.54]];
  var pill06 = bs3([points033, points032, points034]);

  var points035 = [[4.17, 4.51, 0.27], [4.16, 4.68, 0.27], [3.75, 4.83, 0.27], [3.69, 4.65, 0.27]];
  var points036 = [[4.17, 4.51, 0], [3.69, 4.65, 0]];
  var points037 = [[4.17, 4.51, 0.54], [3.69, 4.65, 0.54]];
  var pill07 = bs3([points036, points035, points037]);

  var points038 = [[4.17, 4.51, 0.27], [4.22, 4.67, 0.27], [4.67, 4.56, 0.27], [4.66, 4.37, 0.27]];
  var points039 = [[4.17, 4.51, 0], [4.66, 4.37, 0]];
  var points040 = [[4.17, 4.51, 0.54], [4.66, 4.37, 0.54]];
  var pill08 = bs3([points039, points038, points040]);

  var points041 = [[5.12, 4.25, 0.27], [5.03, 4.44, 0.27], [4.67, 4.56, 0.27], [4.66, 4.37, 0.27]];
  var points042 = [[5.12, 4.25, 0], [4.66, 4.37, 0]];
  var points043 = [[5.12, 4.25, 0.54], [4.66, 4.37, 0.54]];
  var pill09 = bs3([points042, points041, points043]);

  var pillow01 = STRUCT(REPLICA(5)([pill06, pill07, pill08, pill09, T([2])([0.54])]));
  var pillow_button00 = T([0, 1, 2])([3.69+0.01, 4.65+0.01, 0.54])(R([0, 1])([-PI/15])(R([1, 2])([PI/2])(CYLINDER(0.04, 0.01)([12, 1]))));
  var pillow_buttons_row0 = STRUCT([pillow_button00, T([0, 1])([4.17-3.7, 4.51-4.65]), pillow_button00, T([0, 1])([4.66-4.17, 4.37-4.51]), pillow_button00]);
  var pillow_buttons00 = STRUCT(REPLICA(4)([pillow_buttons_row0, T([2])([0.54])]));

  //back pillow
  var points044 = [[5.13, 4.28, 0], [5.36, 4.63, 0], [5.75, 5.46, 0], [5.79, 5.84, 0]];
  var points045 = [[5.04, 4.31, 0], [5.35, 4.81, 0], [5.56, 5.32, 0], [5.7, 5.9, 0]];
  var points046 = [[4.98, 4.35, 0], [5.24, 4.84, 0], [5.47, 5.36, 0], [5.61, 5.91, 0]];
  var pill10 = bs3([points044, points045, points046]);

  var points047 = [[5.13, 4.28, 2.7], [5.36, 4.63, 2.7], [5.75, 5.46, 2.7], [5.79, 5.84, 2.7]];
  var points048 = [[5.04, 4.31, 2.7], [5.35, 4.81, 2.7], [5.56, 5.32, 2.7], [5.7, 5.9, 2.7]];
  var points049 = [[4.98, 4.35, 2.7], [5.24, 4.84, 2.7], [5.47, 5.36, 2.7], [5.61, 5.91, 2.7]];
  var pill11 = bs3([points047, points048, points049]);

  var pill12 = bs3([[[5.13, 4.28, 0], [5.13, 4.28, 2.7]], [[5.04, 4.31, 0], [5.04, 4.31, 2.7]], [[4.98, 4.35, 0], [4.98, 4.35, 2.7]]]);
  var pill13 = bs3([[[5.79, 5.84, 0], [5.79, 5.84, 2.7]], [[5.7, 5.9, 0], [5.7, 5.9, 2.7]], [[5.61, 5.91, 0], [5.61, 5.91, 2.7]]]);
  var pill14 = bs2([points047, points044]);
  var pill15 = bs2([points046, points049]);
  var pillow02 = STRUCT([pill10, pill11, pill12, pill13, pill14, pill15]);

  //back pillow squares
  var points050 = [[4.98, 4.38, 0.27], [4.92, 4.45, 0.27], [5.08, 4.78, 0.27], [5.16, 4.72, 0.27]];
  var points051 = [[4.98, 4.38, 0], [5.16, 4.72, 0]];
  var points052 = [[4.98, 4.38, 0.54], [5.16, 4.72, 0.54]];
  var pill16 = bs3([points051, points050, points052]);

  var points053 = [[5.34, 5.11, 0.27], [5.26, 5.22, 0.27], [5.02, 4.72, 0.27], [5.16, 4.72, 0.27]];
  var points054 = [[5.34, 5.11, 0.54], [5.16, 4.72, 0.54]];
  var points055 = [[5.34, 5.11, 0], [5.16, 4.72, 0]];
  var pill17 = bs3([points054, points053, points055]);

  var points056 = [[5.34, 5.11, 0.27], [5.2, 5.13, 0.27], [5.41, 5.62, 0.27], [5.48, 5.52, 0.27]];
  var points057 = [[5.34, 5.11, 0], [5.48, 5.52, 0]];
  var points058 = [[5.34, 5.11, 0.54], [5.48, 5.52, 0.54]];
  var pill18 = bs3([points057, points056, points058]);

  var points059 = [[5.6, 5.89, 0.27], [5.5, 5.85, 0.27], [5.38, 5.54, 0.27], [5.48, 5.52, 0.27]];
  var points060 = [[5.6, 5.89, 0], [5.48, 5.52, 0]];
  var points061 = [[5.6, 5.89, 0.54], [5.48, 5.52, 0.54]];
  var pill19 = bs3([points060, points059, points061]);

  var pillow03 = STRUCT(REPLICA(5)([pill16, pill17, pill18, pill19, T([2])([0.54])]));
  var pillow_button01 = T([0, 1, 2])([5.16-0.01, 4.72, 0.54])(R([0, 1])([PI/2-PI/10])(R([1, 2])([PI/2])(CYLINDER(0.04, 0.01)([12, 1]))));
  var pillow_buttons_row1 = STRUCT([pillow_button01, T([0, 1])([5.16-4.99, 5.11-4.72]), pillow_button01, T([0, 1])([5.34-5.19, 5.52-5.11]), pillow_button01]);
  var pillow_buttons01 = STRUCT(REPLICA(4)([pillow_buttons_row1, T([2])([0.54])]));
  var barcelona_pillows = STRUCT([COLOR(color), pillow00, pillow01, pillow_buttons00, pillow02, pillow03, pillow_buttons01]);

  return STRUCT([barcelona_pillows, barcelona_ropes, barcelona_legs]);

}

//creation and positioning

var barcelona_chair0 =  T([0,1,2])([43, 5.1, 77.5])(R([0, 2])([PI])(S([0,1,2])([1.25,1.25,1.25])(barcelona_chair(BROWN))));
DRAW(barcelona_chair0);

var barcelona_chair1 =  T([0,1,2])([47, 5.1, 76])(R([0, 2])([-PI/2])(S([0,1,2])([1.25,1.25,1.25])(barcelona_chair(BROWN))));
DRAW(barcelona_chair1);