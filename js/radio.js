!function(n, e) {
    var t = n.documentElement
        , i = "orientationchange" in window ? "orientationchange" : "resize"
        , a = function() {
            var n = t.clientWidth;
            if (n) {
                var whdef,wW,rem,i = window.devicePixelRatio || 1;
                if(n > 1200){
                    whdef = 100/1920;// 表示1920的设计图,使用100PX的默认值
                    wW = window.innerWidth * (i || 1);// 当前窗口的宽度
                    rem = wW * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
                    t.className = 's_pc';
                    if(i){
                        rem /= i;
                    }
                } else {
                    whdef = 100/750;// 表示750的设计图,使用100PX的默认值
                    wW = window.innerWidth * (i || 1);// 当前窗口的宽度
                    rem = wW * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
                    t.className = 's_phone';
                    if(i){
                        rem /= i;
                    }
                }
                t.style.fontSize = rem +"px";
                document.querySelector('meta[name="viewport"]');
                t.setAttribute("data-dpi", i);
            }
        }
    ;
    n.addEventListener && (e.addEventListener(i, a, !1),
        n.addEventListener("DOMContentLoaded", a, !1),
        a())
}(document, window);
// !function(n, e) {
//     var t = n.documentElement
//         , i = "orientationchange" in window ? "orientationchange" : "resize"
//         , a = function() {
//             var n = t.clientWidth;
//
//             // Bees.stageWidth = t.offsetWidth || n;
//             // Bees.stageHeight = t.offsetHeight || n;
//
//             if (n) {
//                 var e = n / 320 * 18;
//                 e = e > 54 ? 54 : e,
//                 ~~e !== e && (e = ~~e),
//                 /windows phone|iphone|android/gi.test(window.navigator.userAgent) || (e = 18),
//                     t.REM2PX = 20,
//                     t.style.fontSize = e + "px";
//                 var i = window.devicePixelRatio;
//                 document.querySelector('meta[name="viewport"]');
//                 t.setAttribute("data-dpi", i)
//             }
//         }
//     ;
//     n.addEventListener && (e.addEventListener(i, a, !1),
//         n.addEventListener("DOMContentLoaded", a, !1),
//         a())
// }(document, window)