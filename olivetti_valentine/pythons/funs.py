#improve domains intervals for a better quality

domain1D = INTERVALS(1)(8);
domain2D = PROD([INTERVALS(1)(8),INTERVALS(1)(8)]);
detailed_domain2D = PROD([INTERVALS(1)(32),INTERVALS(1)(32)]);

#2-curves bezier surface

def BS2(l):
	p1 = l[0];
	p2 = l[1];
	c1 = BEZIER(S1)(p1);
	c2 = BEZIER(S1)(p2);
	return MAP(BEZIER(S2)([c1, c2]))(domain2D);


#3-curves bezier surface

def BS3(l):
  p1 = l[0];
  p2 = l[1];
  p3 = l[2];
  c1 = BEZIER(S1)(p1);
  c2 = BEZIER(S1)(p2);
  c3 = BEZIER(S1)(p3);
  return MAP(BEZIER(S2)([c1,c2,c3]))(domain2D);
