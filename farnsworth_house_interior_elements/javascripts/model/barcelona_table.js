
var barcelona_table = function () {
	var leg0 = CUBOID([0.2, 2, 0.1]);
	var leg1 = T([1])([2-0.2])(CUBOID([6, 0.2, 0.1]));
	var legs0 = STRUCT([R([0, 2])([-PI/4]), leg0, leg1, T([0])([6-0.2]), leg0]);
	var legs = STRUCT([T([0, 2])([1, 1]), legs0, T([2])([4.5]), R([0, 2])([PI/2])(legs0)]);

	var plane = COLOR([200/255, 200/255, 200/255, 0.5])(CUBOID([6.5, 0.1, 6.5]));

	return STRUCT([legs, T([1])([2]), plane]);
}

//creazione e posizionamento

var table = T([0,1,2])([34, 8.2, 81])(barcelona_table());
DRAW(table);


