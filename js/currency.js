
const AJAX = function(obj){
    obj = obj ? obj : {};
    obj.url = obj.url ? obj.url : '';
    obj.type = obj.type ? obj.type : 'get';
    obj.data = obj.data ? obj.data : {};
    obj.is_later = obj.is_later ? obj.is_later : false; //是否关闭等待弹窗
    obj.success = obj.success ? obj.success : (eve) => {

    };//成功返回
    obj.fail = obj.fail ? obj.fail : (eve) => {//失败返回
         
    };
    if (!obj.files) {//等待图标
        
    }

    $.ajax({
        url: obj.url,
        type: obj.type,
        data: obj.data,
        success: function(res) {
            if(res.code == '200'){
                obj.success(res)
            }else{
                obj.success(res)
            } 
        },
        error: function(err) {
            
        }
    });
};

function _ajax(obj) {

    if (typeof obj.success === 'function') {
        obj.success = function (res) {
            if (res.code === 200) {
                obj.success(res.data);
            }else if (res.code === 202) {
                layer.msg(res.msg ? res.msg : '网络繁忙！');
            }else if (res.code === 203) {
                // TODO token无效
            }else if (res.code === 205) {
                // TODO 重新登录
            }
        }
    }

    $.ajax({
        url: obj.url,
        type: obj.type,
        data: obj.data,
        success: function(res) {
            if(res.code == '200'){
                obj.success(res)
            }else{
                obj.success(res)
            }
        }
    });
}

/**
 * 用户缓存获取与设置
 * @param value
 * @returns {null|void}
 */
function userCache(value) {

    if (typeof value === 'object') {
        return window.localStorage.setItem(USER_CACHE_KEY, JSON.stringify(value));
    }

    let user = JSON.parse(window.localStorage.getItem(USER_CACHE_KEY));

    return user.hasOwnProperty(value) ? user[value] : null;
}



