$(document).ready(function(){
    var initArry = {v:false,h:false};
    /*垂直滚动*/
    var swiper = new Swiper('.swiper-container-v', {
        direction: 'vertical',
        slidesPerView: 1,
        mousewheel: true,
        pagination: {
            el: '.swiper-pagination-v',
            clickable: true,
        },
        on:{
            touchMove: function(event){
                if(swiper.activeIndex === 0){
                    $('.platform-enter-flex').css('display','none');
                }
            },
            transitionEnd: function(){
                if(swiper.activeIndex === 0){
                    $('.platform-enter-flex').css('display','none');
                } else {
                    $('.platform-enter-flex').css('display','block');
                }
            },
            init:function(){
                initArry.v = true;
                if(initArry.h){
                    setTimeout(hideLoading,500)
                }
            }
        }
    });
    // swiper.slideTo(6, 2, false);//切换到第一个slide，速度为1秒
    /*左右滚动*/
    var swiperV = new Swiper('.swiper-container-h', {
        nested:true,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        loop:true,
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        coverflowEffect: {
            rotate: 50,
            stretch: $('html').hasClass('s_phone') ? 50 : 200,
            depth: 0,
            modifier: 1,
            slideShadows : false,
        },
        pagination: {
            el: '.swiper-pagination-h'
        },
        on:{
            init:function(){
                initArry.h = true;
                if(initArry.v){
                    setTimeout(hideLoading,500)
                }
            }
        }
    });
    $('.swiper-button-prev').bind('click',function(){
        swiperV.slidePrev();
    });
    $('.swiper-button-next').bind('click',function(){
        swiperV.slideNext();
    });
    // $('#pmenu').bind('click',function(){
    //     $('.menu-container').addClass('menu-active');
    // });
    // $('body').bind('click',function(e){
    //     var target = e.target;
    //     var box = $('.right-con')[0];
    //     if(!box.contains(target) && target.className.indexOf('menu') === -1){
    //         $('.menu-container').removeClass('menu-active');
    //     }
    // })
});
function hideLoading(){
    $('.loading').addClass('loading-hide');
}

function formatHnm(obj) {
    if(obj.__emptyHintEl){
        if(obj.value == obj.__emptyHintEl.innerHTML)
            return;
    }
    str = obj.value.replace(/[ ]/g, "");
    if (str.length > 22) {
        obj.value = str.substr(0, 22);
    }
    obj.value = obj.value.replace(/\D/g, '').replace(/\s/g, '').replace(
        /(\d{5})(?=\d)/g, "$1 ");
}
function commOnKeyPress_(e, sType, oElement, iLength){
    if(13 == window.event.keyCode){
        validate();
        return false;
    }
    return commOnKeyPress(e, sType, oElement, iLength);
}
//***************************** 输入功能函数 begin********************************/

//输入对象 格式 处理 (不能挡住中文 请使用： style="ime-mode:disabled"; onpaste="return false;");
//必须在 onkeypress event 才会有作用;
//    sType
//    "9" 仅能输入数字
//    "-9" 仅能输入数字与"-";
//    "N" 仅能输入数字, "."
//    "-N" 仅能输入数字, "."与"-";
//    "C" 仅能输入英文字母
//    "C9" 仅能输入英文字母和数字;
//    "9C" 仅能输入英文字母和数字
//	  "1C" 仅能输入英文字母和数字以及斜杠/
//    "T" 不准输入特殊字符;
//    oElement: 对象物件
//    iLength: 对象长度控制
function commOnKeyPress(e, sType, oElement, iLength) {

    var _isIE=false;// 判断是否为IE浏览器;
    var _iKeyCode;// 键盘事件值;
    // 判断是否为IE浏览器;
    if(navigator.appName == "Microsoft Internet Explorer") {
        _isIE=true;
        _iKeyCode = e.keyCode;
    }else {
        _isIE=false;
        _iKeyCode = e.which;
    }
    // ficommox的Backspace与tab处理;
    if(!_isIE && (_iKeyCode==13 || _iKeyCode==9||_iKeyCode==8 || _iKeyCode==0)){
        e.returnValue=true;
        return true;
    }

    // ENTER, TAB 至下一对象
    // IE 不是 Button 按 ENTER, TAB 至下一对象
    if (_isIE && (_iKeyCode==13 || _iKeyCode==9) && window.event.srcElement.type!="button") {
        window.event.keyCode = 9;
        return true;
    }

    // 判断中文字串长度
    if (!commEmpty(oElement)) {
        if (!commChkLength(oElement.value, iLength-1)) {
            e.returnValue=false;
            return false;
        }
    }
    // 类型转成大写;
    sType=sType.toUpperCase();
    // "9" 仅能输入０－９数字
    if (sType == "9") {
        if (_iKeyCode < 48  || _iKeyCode > 57){
            e.returnValue=false;
            return false;
        }
        return true;
    }

    // "9" 仅能输入０－９数字与,"-";
    if (sType == "-9") {
        if ((_iKeyCode < 48  || _iKeyCode > 57) && _iKeyCode!=43 &&_iKeyCode!=61 && _iKeyCode!=45 && _iKeyCode!=95){
            e.returnValue=false;
            return false;
        }
        return true;
    }

    // "N" 仅能输入数字, "."
    if (sType == "N") {
        if ((_iKeyCode < 48  || _iKeyCode > 57) && _iKeyCode!=46){
            e.returnValue=false;
            return false;
        }
        return true;
    }

    // "N" 仅能输入数字0-9, ".","-";
    if (sType == "-N") {
        if ((_iKeyCode < 48  || _iKeyCode > 57) && _iKeyCode!=46 && _iKeyCode!=43 &&_iKeyCode!=61 && _iKeyCode!=45 && _iKeyCode!=95){
            e.returnValue=false;
            return false;
        }
        return true;
    }

    // "C" 仅能输入英文字母
    if (sType == "C") {
        if (_iKeyCode < 65  || _iKeyCode > 123 ){
            e.returnValue=false;
            return false;
        }
        return true;
    }

    // "B" 仅能输入英文字母及数字
    if (sType == "C9" || sType == "9C") {
        if (!((_iKeyCode>=65 && _iKeyCode<=123) || (_iKeyCode>=48 && _iKeyCode<=57))){
            e.returnValue=false;
            return false;
        }
        return true;
    }

    // "1C" 仅能输入英文字母和数字以及斜杠/
    if (sType == "1C") {
        if (!((_iKeyCode>=65 && _iKeyCode<=123) || (_iKeyCode>=47 && _iKeyCode<=57))){
            e.returnValue=false;
            return false;
        }
        return true;
    }

    // "B" 仅能输入英文字母及数字
    if (sType == "C9" || sType == "9C") {
        if (!((_iKeyCode>=65 && _iKeyCode<=123) || (_iKeyCode>=48 && _iKeyCode<=57))){
            e.returnValue=false;
            return false;
        }
        return true;
    }

    // 不能输入特别字符;
    if(sType == "T" || sType == "t"){
        // var pattern = new
        // RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&mdash;—|{}【】‘；：”“'。，、？]");
        var pattern = new RegExp("[<\"]");
        var charStr = String.fromCharCode(_iKeyCode);
        if(pattern.test(charStr)){
            e.returnValue=false;
            return false;
        }
        return true;
    }
}
// ***************************** 输入功能函数 end********************************/
// 左边去空白(含中文的全角空白)
// sStr:传入之字串
function commLtrim(sStr) {
    //return sStr.replace(/(^\s*)/g, "");
    if(commEmpty(sStr)) return "";
    return sStr.replace(/(^\s*)|(^\u3000*)|(\u3000*$)|(^\ue4c6*)|(\ue4c6*$)|(\s*$)/g,"");
}

// 右边去空白 (含中文的全角空白)
// sStr:传入之字串;
function commRtrim(sStr) {
    //replace(/(\s*$)/g, "");
    if(commEmpty(sStr)) return "";
    return sStr.replace(/(\s*$)|(^\u3000*)|(\u3000*$)|(^\ue4c6*)|(\ue4c6*$)|(\s*$)/g,"");
}

// 左右边去空白(含中文的全角空白)
// sStr:传入之字串
function commTrim(sStr) {
    return commRtrim(commLtrim(sStr));
}

//判断是否为空白;
function commEmpty(oValue){
    if (oValue == null || oValue == "null" || oValue == "undefined" || oValue == "NaN" || oValue == ""){
        return true;
    }
    return false;
}

//取得字串长度(一个中文算1个长度);
//sStr:传入之字串
function commLength(sStr) {
    var _iLength = 0;
    for( var i=0; i < sStr.length ; i++) {
        _iLength +=1;
    }
    return _iLength;
}

//判断中文字串长度
//sStr:传入之字串
//iLength:传入之长度
function commChkLength(sStr, iLength) {
    if (commLength(sStr)>iLength)
        return false;
    return true;
}