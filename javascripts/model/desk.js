var BROWN = [202/255, 141/255, 72/255];

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

//creazione e posizionamento

var desk = T([0, 1, 2])([39.5, 8.2, 45])(R([0,2])([-PI/2])(R([1,2])([-PI/2])(farnsworth_desk(BROWN))));

DRAW(desk);