
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