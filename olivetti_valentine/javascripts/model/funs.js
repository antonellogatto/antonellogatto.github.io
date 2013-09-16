//improve domains intervals for a better quality

var domain1D = DOMAIN([[0, 1]])([8]);
var domain2D = DOMAIN([[0, 1],[0, 1]])([16, 16]);
var detailed_domain2D = DOMAIN([[0, 1], [0, 1]])([64, 64]);
var domcir0 = PROD1x1([INTERVALS(2*PI)(30), INTERVALS(1)(12)]);

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

var Circum = function(h, r){
  var Circum0 = function(v){
    return [r*COS(v[0]), r*SIN(v[0]), h];
  }
  return Circum0;
}


//generateNUBS() support function
var generateKnots = function(controlPoints){
  lun = controlPoints.length + 2 + 1;
  var nodeSeq = [];
  nodeSeq[0] = 0;
  nodeSeq[1] = 0;
  nodeSeq[2] = 0;
  for (i = 3; i <= lun - 4 ; i++) {
    nodeSeq[i] = i-2;
  };
  nodeSeq[lun-1] = i-2;
  nodeSeq[lun-2] = i-2;
  nodeSeq[lun-3] = i-2;
  return nodeSeq;
}

//the function create an array tha contains a mapped curve, defined by nubs
//curve = [0], nubs = [1]
var generateNUBS = function(controlPoints){
  var domain = INTERVALS(1)(50);
  var knots = generateKnots(controlPoints);
  var nubs = NUBS(S0)(2)(knots)(controlPoints);
  var curve = MAP(nubs)(domain);
  return [curve, nubs];
}