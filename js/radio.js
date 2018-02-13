// window.devicePixelRatio = 1;
!function(n, e) {
    var t = n.documentElement
        , i = "orientationchange" in window ? "orientationchange" : "resize"
        , a = function() {
            var n = t.clientWidth;
            if (n) {
                var whdef = 100/1920;// 表示1920的设计图,使用100PX的默认值
                var wW = window.innerWidth * (window.devicePixelRatio || 1);// 当前窗口的宽度
                console.log(wW);
                var rem = wW * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
                t.className = 's_pc';
                var i = window.devicePixelRatio;
                if(i){
                    rem /= i;
                }
                t.style.fontSize = rem +"px";
                document.querySelector('meta[name="viewport"]');
                t.setAttribute("data-dpi", i)
            }
            // if(n){
            //     var e = n / 1920 * 10;
            //     n > 1200 ? (t.className = 's_pc', t.style.fontSize = e + "px" ): t.className = 's_phone';
            // }
        }
    ;
    n.addEventListener && (e.addEventListener(i, a, !1),
        n.addEventListener("DOMContentLoaded", a, !1),
        a())
}(document, window);
// $(window).resize(function ()// 绑定到窗口的这个事件中
// {
//
// });
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