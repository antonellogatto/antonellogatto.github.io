from pyplasm import *

BROWN = [202/255, 141/255, 72/255];

def FARNSWORTH_DESK(color):

	leg0 = CYLINDER([0.1, 3])(12);
	legs = STRUCT([T([1, 2])([0.2, 0.7]), leg0, T([1])([4-0.4])(leg0), T([2])([7-1.4]), leg0, T([1])([4-0.4])(leg0)]);

	plane0 = CUBOID([4, 7, 0.35]);
	plane1 = CUBOID([3.7, 2, 0.15]);
	planes = STRUCT([plane0, T([1, 2, 3])([0.15, -1.5, -0.15]), plane1, T([2])([7-0.5+1.5]), plane1]);

	c0 = CUBOID([0.01, 0.01, 0.7]);
	c1 = CUBOID([0.01, 1, 0.01]);
	c = STRUCT([c0, T([3])([0.7-0.01])(c1), T([2])([1-0.01])(c0)]);
	cs = STRUCT([T([1, 2, 3])([0.5, 7+0.25, 3]), c, T([1])([0.8]), c, T([1])([0.8]), c, T([1])([0.8]), c, T([1])([0.8]), c]);

	b0 = CUBOID([2, 4, 0.03]);
	b1 = CUBOID([1.98, 0.2, 0.03]);
	bs = STRUCT([COLOR([35/255, 35/255, 35/255]), T([1, 2, 3])([0.2, 1.5, 3+0.35]), b0, T([1, 2, 3])([0.02, 0.01, 0.03]), b1, T([2])([4-0.02-0.02-0.2]), b1]);

	return STRUCT([bs, cs, T([2])([-7.25-1.25])(cs), legs, T([3])([3]), COLOR(color), planes]);

#creation and positioning

desk = T([1, 2, 3])([39.5, 8.2, 45])(R([1, 3])(-PI/2)(R([2, 3])(-PI/2)(FARNSWORTH_DESK(BROWN))));

VIEW(desk);