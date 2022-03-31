(function () {

    /*
    Siemens Industrial Clock
    kurt.grigg@yahoo.co.uk
    */

    /* ^^^^^^^^^^^^^^ Config below ^^^^^^^^^^^^^^ */

    var clockSize = 290;
    var caseColour = 'rgba(125,89,60,1.0)';
    var caseShadow = 'rgba(0,0,0,0.4)';
    var dialColour = 'rgba(201,189,107,1.0)';
    var handColour = 'rgb(20,20,30)';
    var markColour = 'rgb(20,20,30)';
    var shineColour = 'rgba(255,255,255,1)';

    var glassReflectionType = 'convex';
        /* convex or flat */
        if (glassReflectionType == 'flat') {
            var reflection = 'http://i66.tinypic.com/2zoxm9z.png';
        }

    /* ^^^^^^^^^^^^^^^^ End config ^^^^^^^^^^^^^^ */

    var d = document;
    var mls = 100;
    var rnd = 'id'+Math.random() * 1;
    var idx = d.getElementsByTagName('div').length;
    d.write('<div id = "'+rnd+'" style="display:inline-block;line-height:0px;"></div>');
    var dum = '';
    var mhBez = '.3s cubic-bezier(0.666, 1.91, 0.333, 0)';
    var vb = '<svg height="'+xy(100)+'" width="'+xy(100)+'" viewBox="0 0 200 200">';    
    var then = performance.now();
    var prevmin, mincr, hincr;
    var e = 360/12;
    var degr = 0;
    var radi = Math.PI / 180;
    var offs = 60 * radi;
    var dgts = [];
    var nums = ['1','2','3','4','5','6','7','8','9','10','11','12'];


    var dt = new Date;
    // console.log( dt.getTimezoneOffset() ); // -480
    var dt = new Date;
    dt.setMinutes( dt.getMinutes() + dt.getTimezoneOffset() ); // 当前时间(分钟) + 时区偏移(分钟)
    
    var dt_hour = -7;
    var dt_min  = 0;
    
    function iniTime() { 
        var now = new Date();
        mincr = dt.getMinutes() + dt_min;
        hincr = dt.getHours() + dt_hour;
    }
    iniTime();
    mincr--;

    function xy (v) {
        return (v * clockSize / 100);
    }

    function genShadKillClone(c, v, x, y) {
        c.style.left = xy(x)+'px';
        c.style.top = xy(y)+'px';
        c.style.zIndex--;   
        var s = 'filter="url(#handShadow)"';
        var r = v.split('filter="url()"').join("");
        r = r.replace(/""/g, s);
        c.innerHTML = r;
    }

    /* Clock case and dial */

    var outerRim = d.createElement('div');
    outerRim.setAttribute('style', 'display:inline-block;'
        +'position: relative;'
        +'height: '+xy(116)+'px;'
        +'width: '+xy(116)+'px;'
        +'background-color: '+caseColour+';'
        +'border-radius: 50%;'
        +'box-shadow: inset -'+xy(0.5)+'px -'+xy(0.5)+'px '+xy(1.2)+'px -'+xy(0.7)+'px rgba(0,0,0,0.9),'
        +'inset '+xy(0.5)+'px '+xy(0.5)+'px '+xy(1.2)+'px -'+xy(0.2)+'px rgba(255,255,255,0.4),'
        +' '+xy(7)+'px '+xy(7)+'px '+xy(5)+'px -'+xy(1)+'px '+caseShadow+';'
        +'overflow: hidden;');
    d.getElementById(rnd).appendChild(outerRim);

    var shine = '<svg id="shn'+idx+'" xmlns="http://www.w3.org/2000/svg"'+ 
        'viewBox="0 0 200 200" width="100%" height="100%">'+
        '<defs>'+
        '<filter id="blur" color-interpolation-filters="sRGB">'+
        '<feFlood result="flood" flood-color="#fff" flood-opacity="1"/>'+
        '<feComposite result="composite1" operator="in" in2="SourceGraphic" in="flood"/>'+
        '<feGaussianBlur result="blur" stdDeviation="0.15" in="composite1"/>'+
        '<feOffset result="offset" dy="1" dx="0"/>'+
        '<feComposite result="composite2" operator="atop" in2="offset" in="offset"/>'+
        '</filter>'+
        '</defs>'+
        '<g transform="translate(2.6,1.5)" filter="url(#blur)">'+
         '<path fill="#fff" d="M 25.29439,28.704127 C 11.980013,42.659887 2.6767873,60.453438 0,79.99824 6.4643264,45.022412 31.776599,14.993444 65.504601,3.8936567 69.662254,2.3217769 77.023949,0.560584 79.50959,0 58.514565,3.0100943 39.604309,13.680346 25.29439,28.704127 Z"/>'+
        '</g></svg>';
    outerRim.innerHTML = shine;

    var light = d.createElement('div');
    light.setAttribute('style', 'display: block;'
        +'position: absolute;'
        +'margin: auto; top: 0; bottom: 0; left: 0; right: 0;'
        +'height: '+xy(117)+'px;'
        +'width: '+xy(117)+'px;' 
        +'border-radius: 50%;'
        +'background-image: linear-gradient(to top right, '
        +'rgba(0,0,0,0.6) 15%, '
        +'rgba(200,200,200,0.1) 50%, '
        +'rgba(0,0,0,0.6) 85%);');
    outerRim.appendChild(light);

    var centreRim = d.createElement('div');
    centreRim.setAttribute('style', 'display: block;'
        +'position: absolute;'
        +'margin: auto; top: 0; bottom: 0; left: 0; right: 0;'
        +'height: '+xy(110)+'px;'
        +'width: '+xy(110)+'px;'
        +'background-color: transparent;'
        +'border-radius: 50%;'
        +'box-shadow: -'+xy(0.5)+'px -'+xy(0.5)+'px '+xy(0.8)+'px 0 rgba(0,0,0,0.6), '
        +' '+xy(0.5)+'px '+xy(0.5)+'px '+xy(0.5)+'px -'+xy(0.4)+'px rgba(255,255,255,0.9);'
        +'overflow: hidden;');
    outerRim.appendChild(centreRim);

    var innerRim = d.createElement('div');
    innerRim.setAttribute('style', 'display: block;'
        +'position: absolute;'
        +'height: '+xy(110)+'px;'
        +'width: '+xy(110)+'px;'
        +'background-color: '+dialColour+';'
        +'margin: auto; top: 0;bottom: 0;left: 0;right: 0;' 
        +'box-shadow: inset 0 0 0 '+xy(1.5)+'px rgba(0,0,0,0.4),'
        +'inset '+xy(5)+'px '+xy(5)+'px '+xy(5)+'px '+xy(1.0)+'px rgba(0,0,0,0.2),'
        +'0 0 '+xy(1.5)+'px '+xy(0.3)+'px rgba(220,220,220,0.2);'
        +'border-radius: 50%;');
    outerRim.appendChild(innerRim);

    var dial = d.createElement('div');
    dial.setAttribute('style', 'display: block;'
        +'position: absolute;'
        +'height: '+xy(100)+'px;'
        +'width: '+xy(100)+'px;'
        +'margin: auto; top: 0; bottom: 0;left: 0;right: 0;' 
        +'border-radius: 50%;');
    innerRim.appendChild(dial);
    
    /* Clock dial and Siemens logo  */
    var face = '<svg id="sfc'+idx+'" xmlns="http://www.w3.org/2000/svg"'+ 
        'viewBox="0 0 200 200" width="100%" height="100%">'+
        '<defs>'+
        '<clipPath id="dialPath">'+
         '<circle cx="100" cy="100" r="100"/>'+
        '</clipPath>'+
        '<filter id="handShadow" color-interpolation-filters="sRGB">'+
         '<feFlood result="flood" flood-color="#000" flood-opacity="0.3"/>'+
         '<feComposite result="composite1" operator="in" in2="SourceGraphic" in="flood"/>'+
         '<feGaussianBlur result="blur" stdDeviation="0.5" in="composite1"/>'+
         '<feOffset result="offset" dy="0" dx="0"/>'+
         '<feComposite result="composite2" operator="atop" in2="offset" in="offset"/>'+
        '</filter>'+
        '<filter id="bleed" color-interpolation-filters="sRGB">'+
         '<feFlood result="flood" flood-color="#fff" flood-opacity="1.0"/>'+
         '<feComposite result="composite1" operator="in" in2="SourceGraphic" in="flood"/>'+
         '<feGaussianBlur result="blur" stdDeviation="0.1" in="composite1"/>'+
         '<feOffset result="offset" dy="0" dx="0"/>'+
         '<feComposite result="composite2" operator="atop" in2="offset" in="offset"/>'+
        '</filter>'+        '</defs>'+
        '<g id="SiemensLogo" transform="translate(82.5,45) scale(0.65, 0.65)">'+
        '<path fill-rule="evenodd" fill="'+markColour+'" d="M26.957 8.346c-.624.01-1.215.213-1.693.562-.68.496-1.144 1.293-1.197 2.206-.05.9.303 1.882 1.1 2.78l1.007 1.33-1.02.744-1.'+
        '582-2.17-.976.71 3.87 5.318.978-.71-1.58-2.17 1.04-.76.963 1.273c.592.78.725 1.44.65 1.98-.073.53-.366.96-.768 1.23-.41.27-.9.38-1.38.27-.48-.12-.96-.4'+
        '4-1.36-1.19l-1.25.65c.55 1.04 1.38 1.68 2.27 1.9.88.21 1.78.01 2.49-.48.702-.49 1.23-1.27 1.36-2.21.13-.94-.15-2-.92-3.02l-.948-1.25.81-.59 1.58 2.17.9'+
        '76-.71-3.87-5.32-.977.71 1.58 2.17-.83.6L26.25 13l-.02-.025c-.628-.69-.805-1.305-.777-1.8.03-.492.268-.892.62-1.15.357-.26.818-.37 1.325-.242.505.13 1.'+
        '086.506 1.62 1.352l1.19-.75C29.523 9.3 28.648 8.65 27.74 8.42c-.226-.057-.452-.09-.675-.093h-.126zM16.815 24.6v5.054h3.646v-1.31h-2.33v-.567h2.34v-1.31'+
        'h-2.34v-.556h2.34V24.6h-3.65zm12.967 0v5.054h3.646v-1.31h-2.335v-.567h2.337v-1.31h-2.337v-.556h2.335V24.6h-3.646zm-7.587 0l-.02 5.054h1.313v-3.298l1.63'+
        '5 1.928 1.634-1.927v3.297h1.314l-.02-5.053h-1.36l-1.56 1.77-1.56-1.76H22.2zm23.302 3.332q0 1.22-1.077 1.59-.375.13-.808.13-.907 0-1.683-.547l.53-1.007q'+
        '.56.507 1.11.507.24 0 .41-.113.2-.127.2-.36 0-.21-.22-.35-.17-.107-.55-.216-.47-.137-.59-.19-.19-.08-.33-.19-.39-.317-.39-.958 0-.67.4-1.11.46-.517 1.2'+
        '4-.517.782 0 1.534.4l-.504.97q-.41-.31-.83-.31-.2 0-.36.1-.18.12-.18.31t.238.33q.11.07.64.22.665.2.95.55.243.3.243.78zm-5.28 1.722h-1.32l-2.434-3.095v3'+
        '.09H35.14V24.6h1.323l2.433 3.092v-3.09h1.322v5.052zm-25.113 0h-1.322V24.6h1.322v5.054zm-3.033-1.722q0 1.22-1.07 1.59-.37.13-.81.13-.9 0-1.68-.547l.54-1'+
        '.007q.57.507 1.11.507.25 0 .42-.113.2-.127.2-.36 0-.21-.22-.35-.16-.107-.55-.216-.46-.137-.58-.19-.19-.08-.33-.19-.383-.317-.383-.958 0-.67.4-1.11.47-.'+
        '517 1.25-.517t1.533.4l-.507.97q-.41-.31-.83-.31-.2 0-.36.1-.182.12-.182.31t.24.33q.11.07.64.22.67.2.95.55.248.3.248.78z"/></g></svg>';
    dial.innerHTML = face;

    /* Outer ticks  */
    for (var i = 0; i < 60; i++) {
        var ot = document.createElementNS("http://www.w3.org/2000/svg", "line");
        with(ot) {
            if (i % 5) {
                setAttribute('x1', '100');
                setAttribute('y1', '1');
                setAttribute('x2', '100');
                setAttribute('y2', '4.5');
                setAttribute('stroke', markColour);
                setAttribute('stroke-width', '0.5');
                setAttribute('stroke-linecap', 'butt');
                setAttribute("transform","rotate("+i * 6+", 100, 100)"); 
            }
        } 
    d.getElementById('sfc'+idx).appendChild(ot);
    }

    /* Numbers and hour diamond ticks  */
    for (var i = 0; i < 12; i++) {
        var spac = (i > 8) ? xy(2.5) : 0;
        var ofst = (spac) ? xy(3.0) : 0;
        dgts[i] = d.createElement('div');
        dgts[i].setAttribute('style', 'display: inline-block;'
            +'position: absolute;'
            +'width: '+xy(20)+'px;'
            +'height: '+xy(20)+'px;'
            +'margin: auto;top: 0;bottom: 0; left: 0;right: 0;'
            +'font: '+xy(16)+'px  Times New Roman;'
            +'text-align: center;'
            +'text-indent: -'+ofst+'px;'
            +'letter-spacing: -'+spac+'px;'
            +'line-height: '+xy(20)+'px;'
            +'color: '+markColour+';'
            +'text-shadow: '+xy(0)+'px '+xy(-0.2)+'px 0px rgba(255,255,255,0.3);');
        dgts[i].innerHTML = nums[i];
        dial.appendChild(dgts[i]);
        degr += 30;
        dgts[i].style.top = xy(0) + xy(78) * Math.sin(-offs + e * i * radi) + 'px';
        dgts[i].style.left= xy(0) + xy(78) * Math.cos(-offs + e * i * radi) + 'px';

        var hdt = document.createElementNS ("http://www.w3.org/2000/svg", "path");
        with(hdt) {
            setAttribute("fill", markColour);
            setAttribute("stroke", "none");
            setAttribute("d", "m 98,3 2, 3 2,-3  -2, -3 z");
            setAttribute("transform","rotate("+i * 30+", 100, 100)"); 
        }
        d.getElementById('sfc'+idx).appendChild(hdt);
    }

    /* Generic container for all hands */
    var handContainers = 'display: block;'
        +'position: absolute;'
        +'height: '+xy(100)+'px;'
        +'width: '+xy(100)+'px;'
        +'font-size: 0px; line-height: 0px; padding: 0;'
        +'margin: auto; top: 0;bottom: 0; left: 0; right: 0;'
        +'transform-origin: center center;'

    /* Hour hand */
    var houContainer = d.createElement('div');
    houContainer.setAttribute('style', handContainers + 'transition: '+mhBez+';');
    houContainer.style.zIndex = 50;
    dial.appendChild(houContainer);
    var houHand = d.createElement('div');
    var housvg = vb +
    '<path d="m 100.01043,25.87703 c -0.178495,-0.0178 -0.360365,0.2729 -0.493185,0.92529 l -5.92463,29.103725 5.20649,48.385795 -0.0574,0 c -1.24622,8.32814 -1.40019,17.1491 -5.81379,24.048 4.5564,1.30935 9.279885,1.2377 14.144175,0 -4.4136,-6.8989 -4.56757,-15.71986 -5.8138,-24.048 l -0.0573,0 5.20648,-48.385795 -5.92558,-29.103725 c -0.11832,-0.58116 -0.29307,-0.90748 -0.47156,-0.92529 z" fill="'+handColour+'" "'+dum+'" /></svg>';
    houHand.innerHTML = housvg;
    houContainer.appendChild(houHand);
    var houShad = houContainer.cloneNode(true);
    dial.appendChild(houShad);
    genShadKillClone(houShad,housvg, 1, 3);

    /* Minute hand */
    var minContainer = d.createElement('div');
    minContainer.setAttribute('style',handContainers + 'transition: '+mhBez+';');
    minContainer.style.zIndex = 52;
    dial.appendChild(minContainer);
    var minHand = d.createElement('div');
    var minsvg =  vb + 
    '<path d="M 100.00586 0 C 99.903184 -0.020888204 99.799006 0.32009283 99.722656 1.0859375 L 96.314453 35.271484 L 98.330078 93.210938 A 7 7 0 0 0 93 100 A 7 7 0 0 0 98.400391 106.80664 C 97.427327 114.36859 96.899781 122.13113 92.927734 128.33984 C 97.484134 129.6492 102.20798 129.57754 107.07227 128.33984 C 103.10021 122.13111 102.57081 114.36861 101.59766 106.80664 A 7 7 0 0 0 107 100 A 7 7 0 0 0 101.66797 93.210938 L 103.68555 35.279297 L 100.27734 1.0859375 C 100.20934 0.40370179 100.10854 0.020902306 100.00586 0 z " fill="'+handColour+'" "'+dum+'"/></svg>';                                                                                                                                                   
    minHand.innerHTML = minsvg;
    minContainer.appendChild(minHand);
    var minShad = minContainer.cloneNode(true);
    dial.appendChild(minShad);
    genShadKillClone(minShad,minsvg, 1, 4);

    var nut = d.createElement('div');
    nut.setAttribute('style', 'display: block;'
        +'position: absolute;'
        +'height: '+xy(2)+'px;'
        +'width: '+xy(2)+'px;'
        +'margin: auto;top: 0;bottom: 0;left: 0;right: 0;'
        +'border: '+xy(0.2)+'px solid rgba(210,203,169,0.7);'
        +'border-radius: 50%;'
        +'background-color: #111;'
        +'box-shadow: 0 0 '+xy(0.2)+'px '+xy(0.2)+'px #333, inset 0 -'+xy(0.2)+'px '+xy(0.6)+'px 0 #ccc000;'
        +'z-index: 56;');
    innerRim.appendChild(nut);

    /* Clock glass */
    if (glassReflectionType == 'flat') {
    var glass = d.createElement('div');
    glass.setAttribute('style', 'display: block;'
        +'position: absolute;'
        +'height: '+xy(108.8)+'px;'
        +'width: '+xy(108.8)+'px;'
        +'margin: auto; top: 0; bottom: 0; left: 0;right: 0;' 
        +'border-radius: 50%;'
        +'background-image: url("'+reflection+'");'
        +'background-size: cover;'
        +'opacity: 0.3;'
        +'z-index: 56;'
        +'overflow: hidden;');
    innerRim.appendChild(glass);
    }
    else {
    var glass = d.createElement('div');
    glass.setAttribute('style', 'display: block;'
        +'position: absolute;'
        +'height: '+xy(110)+'px;'
        +'width: '+xy(110)+'px;'
        +'margin: auto; top: 0; bottom: 0; left: 0;right: 0;'
  	+'border-radius:50%;'
  	+'box-shadow: inset 0 0 '+xy(1)+'px '+xy(1)+'px rgba(0,0,0,0.1),'
        +'inset 0 -'+xy(20)+'px '+xy(50)+'px rgba(0,0,0,0.5);'
        +'transform: rotate(-45deg);'
        +'z-index: 56;');

    var shine = d.createElement('div');
    shine.setAttribute('style', 'display: block;'
	+'position: absolute;'
        +'margin: auto;'
        +'top: 2%;'
        +'left: 0; right: 0;'
	+'border-radius:50%;'
	+'width: 74%;'
	+'height: 54%;'
	+'background-image: linear-gradient(to bottom, rgba(250, 250, 255, 1) 2%, '
        +'rgba(250, 250, 255, 0.7) 30%, transparent 100%);'
	+'z-index: 57;');
    glass.appendChild(shine);
    innerRim.appendChild(glass);
    }


    /* Date window */
    var digitColour = 'rgb(255,255,255)';
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var n = new Date();
    ddy = days[dt.getDay()];
    ddt = dt.getDate();

    //calculate how many days for this month
    function getDuration (aa) {    
         let dtt = new Date()    
         var month = dtt.getMonth()    
         dtt.setMonth(dtt.getMonth()+aa + 1)   
         dtt.setDate(0)
         return dtt.getDate()  
    }
    var total_days;
    var hincr0;
    total_days=getDuration(0)
    if (hincr>=24) { 
        hincr0=hincr-24; 
        ddt=ddt+1;
        total_days=getDuration(0);
        if(ddt>total_days){ ddt=1; }
    }else if (hincr<0) { 
        hincr0=hincr+24;
        ddt=ddt-1;
        total_days=getDuration(-1);
        if(ddt==0){ ddt=total_days; }
    }else{ 
        hincr0=hincr; 
    }
    var ampm = hincr0 >= 12 ? 'PM' : 'AM';
    ddy=ampm;   // set AM or PM to ddy
    // console.log( "current variable: ", ddy, ddt, hincr, hincr0,ampm);


    var cntnr = d.createElement('div');
    cntnr.setAttribute('style', 'display: block;'
        +'position: absolute;'
        +'height: '+xy(8)+'px;'
        +'width: '+xy(17)+'px;'
        +'margin: auto; top: 0; bottom: 0;' 
        +'left: '+xy(65)+'px;'
        +'border:'+xy(0.1)+'px solid '+digitColour+';'
        +'background:#fff;'
        +'font: '+xy(4.5)+'px tahoma,sans-serif;'
        +'color: #444;'
        +'line-height: '+xy(6)+'px;'
        +'box-shadow: inset '+xy(.7)+'px '+xy(.7)+'px '+xy(.7)+'px 0 rgba(0,0,0,0.8);'
        +'padding:0;');
    dial.appendChild(cntnr);

    var day = d.createElement('div');
    day.setAttribute('style', 'display: block;'
        +'position: absolute;'
        +'height: '+xy(5.5)+'px;'
        +'width: '+xy(8.1)+'px;'
        +'top: '+xy(1)+'px;'
        +'left: '+xy(1)+'px;'
        +'border-right: .2px solid #555;'
        +'padding:0;');
    cntnr.appendChild(day);
    day.appendChild(d.createTextNode(ddy));

    var date = d.createElement('div');
    date.setAttribute('style', 'display: block;'
        +'position: absolute;'
        +'height: '+xy(5.5)+'px;'
        +'width: '+xy(5)+'px;'
        +'top: '+xy(1)+'px;'
        +'left: '+xy(9.5)+'px;'
        +'padding:0;');
    cntnr.appendChild(date);
    date.appendChild(d.createTextNode(ddt));



    function SiemensIndustrialClock() {
        var minutes = new Date().getMinutes();
        if (minutes !== prevmin) {
            mincr++;
        }
        prevmin = minutes;

        minContainer.style.transform = 'rotate(' + (mincr * 6) + 'deg) translateZ(0)';
         minShad.style.transform = 'rotate(' + (mincr * 6) + 'deg) translateZ(0)';
        houContainer.style.transform = 'rotate(' + ((hincr * 30) + (mincr / 2)) + 'deg) translateZ(0)';
         houShad.style.transform = 'rotate(' + ((hincr * 30) + (mincr / 2)) + 'deg) translateZ(0)';
    }

    function runClock() {
        var now = performance.now(); 
        if ((now - then) > (mls)) {
            SiemensIndustrialClock();
            then = performance.now();
        }
        window.requestAnimationFrame(runClock);
    } 

    window.addEventListener("load", runClock, false);
    window.addEventListener("focus", iniTime, false);
})();