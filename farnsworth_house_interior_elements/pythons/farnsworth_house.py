from pyplasm import *

def FARNSWORTH_HOUSE(): 

	#terrain

	terrain = COLOR([10/255, 100/255, 0])(T([2, 3])([-0.1, -5])(CUBOID([50, 0.1, 70])));

	#pillars

	pil00 = CUBOID([0.5, 1.6, 0.5]);
	pillars0 = STRUCT([T([3])([-6.5]), pil00, T([3])([6.5]), pil00, T([3])([13.5]), pil00]);
	pil01 = CUBOID([0.5, 10, 0.5]);
	pillars1 = STRUCT([T([3])([-6.5]), pil00, T([3])([6.5]), pil01, T([3])([13.5]), pil01, T([3])([13.5]), pil01, T([3])([13.5]), pil01]);
	pillars2 = STRUCT([pil01, T([3])([13.5]), pil01, T([3])([13.5]), pil01, T([3])([13.5]), pil01]);
	pillars = STRUCT([T([1, 3])([4+0.5, 7.5]), pillars0, T([1])([10+0.5]), pillars1, T([1])([25+0.5]), pillars2]);

	#floors

	fl0z = 25;
	fl0x = 10;
	fl1z = 50;
	fl1x = 25;
	floor0 = CUBOID([fl0x, 1, fl0z]);
	floor1 = CUBOID([fl1x, 1, fl1z]);
	floor2 = CUBOID([fl1x+1, 0.5, fl1z+1]);
	floors = STRUCT([T([1, 2])([5, 0.7]), floor0, T([1, 2, 3])([fl0x+0.5, 0.7+1+0.7, 5]), floor1, T([2])([6.9-1]), floor1, T([1, 2, 3])([-0.5, 1, -0.5]), floor2]);

	#stairs

	step = CUBOID([0.8, 0.15, 7.5]);
	steps0 = STRUCT([T([1, 2, 3])([1.8, 0.05, 10]), step, T([1, 2])([0.8, 0.35]), step, T([1, 2])([0.8, 0.35]), step, T([1, 2])([0.8, 0.35]), step]);
	c000 = CUBOID([0.2, 2.5, 6.5]);
	stair0 = STRUCT([steps0, T([1, 2, 3])([2.6, 0.05, 10+0.5]), R([1, 2])(-PI/2.75), c000]);
	
	steps1 = STRUCT([T([1, 2, 3])([11.1, 1.95, 10]), step, T([1, 2])([0.8, 0.5]), step, T([1, 2])([0.8, 0.5]), step, T([1, 2])([0.8, 0.5]), step, T([1, 2])([0.8, 0.5]), step, T([1])([0.4]), step]);
	c001 = CUBOID([0.2, 3.65, 6.5]);
	c002 = CUBOID([0.2, 0.5, 6.5]);
	stair1 = STRUCT([steps1, T([1, 2, 3])([11.1+0.8, 1.95, 10+0.5]), R([1, 2])(-PI/3.15), c001, T([2])([3.7]), R([1, 2])(PI/3.15-PI/2), c002]);
	stairs = STRUCT([stair0, stair1]);

	#windows

	wind0 = CUBOID([0.1, 4.9, 10]);
	wind1 = CUBOID([0.1, 4.9, 13]);
	wind2 = CUBOID([9.5, 4.9, 0.1]);
	wind3 = CUBOID([5, 4.9, 0.1]);
	windows0 = STRUCT([T([1, 2, 3])([10+0.5+5, 0.7+1+0.7+0.7+1, 5+13.25]), wind0, T([3])([10+0.25]), wind1, T([3])([13+0.25]), wind1]);
	windows1 = STRUCT([T([1, 2, 3])([10+0.5+5+0.25, 0.7+1+0.7+0.7+1, 5+13]), wind2, T([1])([9.5+0.25]), wind3, T([1])([5+0.25]), wind2]);
	windows = STRUCT([COLOR([200/255, 200/255, 200/255, 0.5]), windows0, windows1, T([3])([23.5+0.5+13-0.1])(windows1), T([1])([25-0.1]), windows0]);

	#fixtures

	fix0 = CUBOID([0.25, 4.9, 0.25]);
	fixtures0 = STRUCT([T([1, 2, 3])([10+0.5+5, 0.7+1+0.7+0.7+1, 5+13]), fix0, T([3])([10.25]), fix0, T([3])([13.25]), fix0, T([3])([13.25]), fix0]);
	fixtures1 = STRUCT([T([1, 2, 3])([10+10+5+0.25, 0.7+1+0.7+0.7+1, 5+13]), fix0, T([1])([5+0.25]), fix0]);
	fixtures = STRUCT([fixtures0, fixtures1, T([3])([23.5+0.5+13-0.25])(fixtures1), T([1])([25-0.25]), fixtures0]);
	
	return STRUCT([terrain, windows, COLOR([255/255,255/255,255/255]), floors, stairs, pillars, fixtures]);

house = S([1, 2, 3])([2, 2, 2])(FARNSWORTH_HOUSE());

VIEW(house);