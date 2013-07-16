if (typeof â === "undefined") {
    var â = {gzipenabled:false};
}
(function() {
	var collapse = true;
	var devices = ['iPad'];
	for(var i=devices.length;i--;){ 
		if(navigator.userAgent.indexOf(devices[i])!=-1){ 
			collapse = false;
		}
	}
	if(collapse){ throw new Error('avalanche collapsing for all non-tablets'); }
})();
â.mountain = document.createElement("script");
â.mountain.type = "text/javascript";
â.mountain.async = true;
â.mountain.charset = "UTF-8";
â.mountain.g = â.gzipenabled ==false ? "" : ".jgz";
â.mountain.src = "http://dezgyyamnnprj.cloudfront.net/avalanche.min.js"+â.mountain.g;
â.powder = document.getElementById('apartmenttherapy-avalanche');
â.powder.style.marginLeft = '49px';
â.yodel = document.createComment("http://dezgyyamnnprj.cloudfront.net/style/apartmenttherapy/sherwin2.json");
â.powder.appendChild(â.yodel);
â.yodel = document.createComment("http://dezgyyamnnprj.cloudfront.net/content/apartmenttherapy/sherwin.json");
â.powder.appendChild(â.yodel);
â.powder.parentNode.insertBefore(â.mountain, â.powder);