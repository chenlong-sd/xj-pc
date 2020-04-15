
window.onload = function () {
    var w = document.body.clientWidth; //获取屏幕宽度
    // 这里*100 是为了取整数
    var x = parseInt((w * 100) / 375 * 10) / 10; //获取任意屏幕上的根节点字体大小
    document.getElementsByTagName('html')[0].style.fontSize = x + 'px';
    //监听屏幕宽度变化
    window.onresize = function () {
        var w = document.body.clientWidth; //获取屏幕宽度
        var x = parseInt((w * 100) / 375 * 10) / 10;; //获取任意屏幕上的根节点字体大小
        document.getElementsByTagName('html')[0].style.fontSize = x + 'px';
    }
}
