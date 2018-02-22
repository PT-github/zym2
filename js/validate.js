Date.prototype.Format = function(fmt)
{
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

function show() {
    document.getElementById("Inpt").style.display = "block";
    document.getElementById("Btn").style.display = "none";
}
//验证
function validateHideId() {
    var hideId = document.getElementById("hideId").value;
    hideId = $.trim(hideId);
    document.getElementById("hideId").value = hideId;
    if (document.getElementById("hideId").value == "") {
        alert("请输入验证码！");
        return;
    }
    if (document.getElementById("hideId").value.length != 5) {
        alert("请输入5位长度的验证码！");
        return;
    }

    var re = /^[1-9]\d*$/;
    if (!re.test($("#hideId").val())) {
        alert("请输入5位数字的验证码！");
        return;
    }

    var hnmCode = $("#hnmCode").val();
    var hideId = $("#hideId").val();

    // 验证真伪
    $.post("validateHideId",{
            hnmCode : hnmCode,
            hideId2 : hideId
        },
        function(msg) {
            eval("msg="+msg);
            if (msg.error != "") {
                alert(msg.error);
            }else {
                alert("恭喜您，验证成功，该产品为惠农认证的正品。");
                $("#Inpt").hide();
            }
        });
}

function initPlaceHolders(){

    if('placeholder' in document.createElement('input')){ //如果浏览器原生支持placeholder
        return ;
    }
    function target (e){
        var e=e||window.event;
        return e.target||e.srcElement;
    };
    function _getEmptyHintEl(el){
        var hintEl=el.hintEl;
        return hintEl && g(hintEl);
    };
    function blurFn(e){
        var el=target(e);
        if(!el || el.tagName !='INPUT' && el.tagName !='TEXTAREA') return;//IE下，onfocusin会在div等元素触发
        var    emptyHintEl=el.__emptyHintEl;
        if(emptyHintEl){
            if(el.value == ""){
                el.value = emptyHintEl.innerHTML;
            }
        }
    };
    function focusFn(e){
        var el=target(e);
        if(!el || el.tagName !='INPUT' && el.tagName !='TEXTAREA') return;//IE下，onfocusin会在div等元素触发
        var emptyHintEl=el.__emptyHintEl;
        if(emptyHintEl){
            if(el.value == emptyHintEl.innerHTML){
                el.value = "";
            }
        }
    };
    if(document.addEventListener){//ie
        document.addEventListener('focus',focusFn, true);
        document.addEventListener('blur', blurFn, true);
    }else{
        document.attachEvent('onfocusin',focusFn);
        document.attachEvent('onfocusout',blurFn);
    }

    var elss=[document.getElementsByTagName('input'),document.getElementsByTagName('textarea')];
    for(var n=0;n<2;n++){
        var els=elss[n];
        for(var i =0;i<els.length;i++){
            var el=els[i];
            var placeholder=el.getAttribute('placeholder'),
                emptyHintEl=el.__emptyHintEl;
            if(placeholder && !emptyHintEl){
                emptyHintEl=document.createElement('span');
                emptyHintEl.innerHTML=placeholder;
                emptyHintEl.className='emptyhint';
                emptyHintEl.onclick=function (el){return function(){try{el.focus();}catch(ex){}}}(el);
                emptyHintEl.style.display='none';
                el.parentNode.insertBefore(emptyHintEl,el);
                el.__emptyHintEl=emptyHintEl;
                el.value=placeholder;
            }
        }
    }
}

function isNum(s) {

    if (s != null) {
        var r, re;
        re = /\d*/i; //\d表示数字,*表示匹配多个数字
        r = s.match(re);
        return (r == s) ? true : false;
    }
    return false;
}

function formatDate(now) {
    if(!now){
        return " ";
    }
    if(!isNum(now+"")){
        return now;
    }
    return new Date(now).Format("yyyy-MM-dd hh:mm:ss");
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
    // obj.value = obj.value.replace(/\D/g, '').replace(/\s/g, '').replace(
    //     /(\d{5})(?=\d)/g, "$1 ");
}

function linkPage(url) {
    window.open(url);
}

function validate(){
    var hnmId = document.getElementById("search").value;
    hnmId = $.trim(hnmId);
    hnmId = hnmId.replace(/[ ]/g,"");
    document.getElementById("search").value = hnmId;

    if(!isNum(hnmId)) {
        alert("请输入22位数字真源码！");
        return;
    } else if(document.getElementById("search").value==""){
        alert("请输入22位数字真源码！");
        return;
    }else if(document.getElementById("search").value=="请输入真源码22位数字"){
        alert("请输入22位数字真源码！");
        return;
    }else if(document.getElementById("search").value.length!=22){
        alert("请输入22位数字真源码！");
        return;
    }
    document.getElementById("validateForm").action="validate/"+document.getElementById("search").value;
    document.getElementById("validateForm").submit();
}

function commOnKeyPress_(e, sType, oElement, iLength){
    if(13 == window.event.keyCode){
        validate();
        return false;
    }
    return commOnKeyPress(e, sType, oElement, iLength);
}