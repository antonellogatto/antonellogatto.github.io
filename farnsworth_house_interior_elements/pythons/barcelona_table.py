
def BARCELONA_TABLE():
	leg0 = CUBOID([0.2, 2, 0.1]);
	leg1 = T([2])([2-0.2])(CUBOID([6, 0.2, 0.1]));
	legs0 = STRUCT([R([1, 3])(-PI/4), leg0, leg1, T([1])([6-0.2]), leg0]);
	legs = STRUCT([T([1, 3])([1, 1]), T([3])([4.5])(legs0), R([1, 3])(PI/2)(legs0)]);

	plane = COLOR([200/255, 200/255, 200/255, 0.5])(CUBOID([6.5, 0.1, 6.5]));

	return STRUCT([legs, T([2])([2]), plane]);

#creation and positioning

table = T([1, 2, 3])([34, 8.2, 81])(BARCELONA_TABLE());
VIEW(table);


