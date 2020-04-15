let URL = 'http://47.108.203.134/'//服务器路径
// let URL = 'http://192.168.5.130/medical/public/'//本地路径
let URL_img = 'http://47.108.203.134/upload/'//图片路径
// let URL_img = 'http://192.168.5.130/medical/public/upload/'//图片路径
let USER = {
    'path':'../../image/home/swiper_1.png',

};//用户信息
// localStorage.getItem('SHOPPING_GOODS') 获取购物车商品
let SHOPPING_GOODS = 'SHOPPING_GOODS';
let SEARCH = 'SEARCH';//搜索内容
// let UID = '2603'//用户id
let UID = localStorage.getItem('user_id');//用户id
//首页
let Home ={
    index:'index',//首页接口get
    getautograph:'getautograph',
    authurl:'authurl',//获取code
    register:'register',//通过code获取账号信息
    user_info:'user_info',//通过id获取账号信息
}
//分类
let Classificaton = {
    classify:'shop/classify',//获取商品类型数据 get
    type_lists:'shop/type_lists',//商品类型获取商品数据 get
    goods_index:'shop/goods_index',//商品详情 get
    goods_evaluate:'shop/goods_evaluate',//商品评论 get
    collect:'shop/collect',//商品收藏 post
    collect_cancel_all:'shop/collect_cancel_all',//批量取消收藏 post
    index_search:'shop/index_search',//搜索列表
}
//购物车
let Shopping = {
    order_list:'shop/order_list',//获取订单列表 get
    place_order:'shop/place_order',//下单成功，post
    pay_place_order:'shop/pay_place_order',//商品购买微信支付下单post
    integral_pay:'shop/integral_pay',//积分支付 post
    order_cancel:'shop/order_cancel',//取消订单 post
    order_detail:'shop/order_detail',//订单详情 get
    confirm_take:'shop/confirm_take',//确定收货 post
    evaluate_create:'shop/evaluate_create',//发布评论
    return_goods_add:'shop/return_goods_add',//申请退货 post
    return_cancel:'shop/return_cancel',//取消退货 post
    return_reason:'shop/return_reason',//退货原因 get
    return_express:'shop/return_express',//提交退货信息 post
    
}

// 我的
let My = {
    address_add:'shop/address_add',//新增收货地址 post
    address_get:"shop/address_get",//获取收货地址列表 get
    address_del:'shop/address_del',//收货地址删除 post
    address_default:'shop/address_default',//设置是用户默认使用地址post
    address_1:'shop/address_1',//获取单条地址数据 get
    address_edit:'shop/address_edit',//用户地址修改 post
    my_evaluate:'shop/my_evaluate',//我的评论 get
    my_collect:'shop/my_collect',//我的收藏 post
}

// localStorage.removeItem('user_id')

function getUrl (url) {
    if (!localStorage.getItem("user_id")) {
        $.get(URL+`user/warrant?url=${url}`, function(res){//param为参数---键值对方式
            console.log(res);
            if (res.code === 200) {
                location.href=`${res.msg}`
                $.get(URL+`user/data?code=${GetRequest().code}`, function(res){//param为参数---键值对方式
                    if (res.code === 200) {
                        localStorage.setItem('user_id',JSON.stringify(res.data))
                    }
                });
            }
        });
    }  else {
        var timestamp = (new Date()).getTime();
        let url = JSON.parse(localStorage.getItem("user_id"));
        if(timestamp/1000 >= url.expire_time){
            $.get(URL+`user/refresh?user_id=${url.id}`, function(res){//param为参数---键值对方式
                if (res.code === 200) {
                    localStorage.setItem('user_id',JSON.stringify(res.data))
                }
            });
        }
    }
}


// 获取指定时间的前一天后一天
function getNextDate(date,day) {
    var dd = new Date(date);
    dd.setDate(dd.getDate() + day);
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
    return y + "-" + m + "-" + d;
};
// 获取指定时间是星期几
function oneDay(y,m,d){
    var myDate=new Date();
    myDate.setFullYear(y,m-1,d);
    var week = myDate.getDay()
    switch(week){
        case 0:
            return '星期日';
        case 1:
            return '星期一';
        case 2:
            return '星期二';
        case 3:
            return '星期三';
        case 4:
            return '星期四';
        case 5:
            return '星期五';
        case 6:
            return '星期六';
    }
}
// 检查url 参数方法
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURI(r[2]);
    return null;
}
//页面传参 获取参数

function GetRequest() {

//获取url中"?"符后的字串，使用了两次decodeRUI解码

    var url = decodeURI(decodeURI(location.search));

    var rque_str = new Object();

    if (url.indexOf("?") != -1) {

        var str = url.substr(1);

        strs = str.split("&");

        for (var i = 0; i < strs.length; i++) {

            rque_str[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);

        }

        return rque_str;
    }
}


// textarea 自适应高度
var autoTextarea = function(elem, extra, maxHeight) {
    extra = extra || 0;
    var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
            isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
            addEvent = function(type, callback) {
                elem.addEventListener ?
                        elem.addEventListener(type, callback, false) :
                        elem.attachEvent('on' + type, callback);
            },
            getStyle = elem.currentStyle ? function(name) {
                var val = elem.currentStyle[name];
                if (name === 'height' && val.search(/px/i) !== 1) {
                    var rect = elem.getBoundingClientRect();
                    return rect.bottom - rect.top -
                            parseFloat(getStyle('paddingTop')) -
                            parseFloat(getStyle('paddingBottom')) + 'px';
                };
                return val;
            } : function(name) {
                return getComputedStyle(elem, null)[name];
            },
            minHeight = parseFloat(getStyle('height'));
    elem.style.resize = 'none';
    var change = function() {
        var scrollTop, height,
                padding = 0,
                style = elem.style;
        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;
        if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        };
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
                height = maxHeight - padding;
                style.overflowY = 'auto';
            } else {
                height = elem.scrollHeight - padding;
                style.overflowY = 'hidden';
            };
            style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
        };
    };
    addEvent('propertychange', change);
    addEvent('input', change);
    addEvent('focus', change);
    change();
};

// 显示页面
// setTimeout(show,200)
// function show(){
//     document.getElementById('index').style.visibility="visible";
//     console.log('123')
// }
//返回
function retur() {//返回上一页面
    window.history.go(-1);
}
