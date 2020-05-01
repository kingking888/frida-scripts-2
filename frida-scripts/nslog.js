Interceptor.attach(Module.findExportByName("Foundation", "NSLog"), {
	onEnter: function(args) {
		console.log("[*] NSLog was called")
		console.log(ObjC.Object(ptr(args[0])))
		//console.log((ObjC.Object(ptr(args[0]))).toString())
		//console.log((ObjC.Object(args[0])).toString())
	}
});
//As per the Apple documentation NSLog calls NSLogv in the background but for some reason it is not working. Still working on a fix.
Interceptor.attach(Module.findExportByName("Foundation", "NSLogv"), {
	onEnter: function(args) {
		console.log("[*] NSLogv was called")
		console.log(ObjC.Object(ptr(args[0])))
	}
});

