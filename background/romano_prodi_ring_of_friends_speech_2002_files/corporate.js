var corporate = {
	
	init: function()
	{
		euDocType = document.documentElement||document.body;
		corporate.buildSelect();
		corporate.minMaxCSS();
	},

	ready: function(func)
	{
	    if(corporate.domIsReady){func();return;}
		if(!corporate.loadEvents){corporate.loadEvents=[];}
		
		function isReady(){
			corporate.domIsReady=true;
			clearInterval(corporate.loadTimer);
			while( corporate.exec = corporate.loadEvents.shift()){corporate.exec();}
			if(corporate.ieReady){corporate.ieReady.onreadystatechange='';}
		}

	    if(!corporate.loadEvents[0])
	    {
	        if( document.addEventListener ) // Mozilla/Opera9
	        {
	            document.addEventListener("DOMContentLoaded",isReady,false);
	        }
	        else if( /*@cc_on!@*/false ) // IE
	        {
	        	(function(){if(!document.uniqueID && document.expando){return;}var t=document.createElement('document:ready');try{t.doScroll('left');isReady();}catch(err){setTimeout(arguments.callee,0);}})();
	        }
	        else if (/WebKit|KHTML|iCab/i.test(navigator.userAgent)) /* Safari, iCab, Konqueror */
	        {
	            corporate.loadTimer=setInterval(function(){if(/loaded|complete/.test(document.readyState)){isReady();}},10);
	        }

	        corporate.oldOnload=window.onload;
	        window.onload=function(){isReady();if(corporate.oldOnload){corporate.oldOnload();}};
	    }
	    corporate.loadEvents.push(func);
	},
	
	minMaxCSS: function()
	{
		var isIE6 = /*@cc_on!@*/false &&(!window.XMLHttpRequest);
		var layout = document.getElementById("euLayout");

		if( isIE6 && layout )
		{
			var minW = corporate.minW||null;
			var maxW = corporate.maxW||null;

			if( minW === null || maxW === null )
			{
				corporate.minW = parseInt(layout.currentStyle.minWidth || layout.currentStyle["min-width"],10)||0;
				corporate.maxW = parseInt(layout.currentStyle.maxWidth || layout.currentStyle["max-width"],10)||"auto";
				
				if(corporate.minW=="auto" || corporate.maxW=="auto"){return;}
				window.onresize = corporate.minMaxCSS;
				setTimeout(function(){corporate.minMaxCSS();},0);
			}
			else
			{
				layout.style.width  = (euDocType.clientWidth < (minW+2) ? minW+"px" : (euDocType.clientWidth > (maxW+2) && maxW != "auto" ) ? maxW+"px" : "auto");
			}
		}
	},
	
	buildSelect: function()
	{
		var c,h,r,i,s,t,o,p,h,e,x,b,R,a,I,j,E;
		
		// DOM CACHE
		
			c = document.getElementById("language_selector_box");	
			h = c.getElementsByTagName("li");
			r = c.getElementsByTagName('p')[0].innerHTML;
		
		// BUILD OPTIONS LIST
		
			o = "";
			
			for(var x = 0, p = h.length; x < p; x++)
			{
				b = h[x];
				R = b.getElementsByTagName('span');
				a = (R[0]) ? R : b.getElementsByTagName('a');
				I = a[0].href;
				I = (I) ? I : "none";
				j = a[0].innerHTML;
				e = a[0].title + " (" + j + ")";
				s = (R[0]) ? " selected='selected'" : "";
												
				o += "<option lang='"+j+"' value='"+I+"'"+s+">"+e+"</option>";
			}
			
		
		// NEW SOURCE
		
			e  = "<label class='accessibility' for='language_selector'>" + r + "</label> ";
			e += "<select id='language_selector' name='language_selector'>" + o + "</select>";
			
			c.innerHTML = e;
		
		// BIND EVENT
			
			t = false;
			s = document.getElementById("language_selector");
			
			function goToPage()
			{
				if( t == false )
				{
					p = s.options[s.selectedIndex].value;
					
					if( p != "none" )
					{
						location = p;
					}
				}
			}
			
			function checkKeyboard(event)
			{
				E = event || window.event;
				I = (E.keyCode ? E.keyCode: (E.charCode ? E.charCode: E.which));
				t = false;
				
				if( I==37 || I==38 || I==39 || I==40 || I==9 )
				{
					t = true;
					return;
				}
				else if( I==13 )
				{
					goToPage();
				}
			}
			
			s.onchange 	= goToPage;
			s.onkeydown = checkKeyboard;
	}	
};

corporate.ready(corporate.init);