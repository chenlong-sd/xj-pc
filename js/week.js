function weeklyCalendar(dataArr, options, showData) {
    var that = this, _date = new Date(), currentDay = _date.getDay(), weekNum = $("#week_title").attr("ids");
    var description = {firstTitle: '观看直播', nextTitle: '下载讲义', listTitle: '讲义列表', methodsTitle: '下载'}
    var format = function (num) {
        var _f = num < 10 ? '0' + num : num;
        return _f
    }
    var createWeek = function () {
        var lis = '';
        var weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
        for (var i = 0, len = weeks_ch.length; i < len; i++) {
            lis += '<li>' + weeks_ch[i] + '</li>';
        }
        ;$("#weekUl").html(lis);
    }
    var countTime = function (n) {
        var getTime = _date.getTime() + (24 * 60 * 60 * 1000) * n;
        var needDate = new Date(getTime);
        var getYear = needDate.getFullYear();
        var getMonth = needDate.getMonth() + 1;
        var getDate = needDate.getDate();
        var obj = {'year': getYear, 'month': getMonth, 'date': getDate};
        return obj
    }

    var createDate = function (cDay) {
        var _cDay = cDay;
        var dateHtml = '';
        var currY = format(_date.getFullYear()), currM = format(_date.getMonth() + 1), currD = format(_date.getDate());
        let that = this
        for (var i = _cDay; i < _cDay + 14; i++) {
            if (currY == countTime(i).year && currM == countTime(i).month && currD == countTime(i).date) {
                dateHtml += '<section data-year=' + countTime(i).year + ' data-month=' + countTime(i).month + ' data-date=' + countTime(i).date + '>'
                    + '<h2 class="current">'
                    + '<a href="javascript:void(0)">' + format(countTime(i).date) + '</a>'
                    + '</h2>'
                    + '<ul class="optionsUl" data-year=' + countTime(i).year + ' data-month=' + countTime(i).month + ' data-date=' + countTime(i).date + '>'
                    + '</ul>'
                    // + '<div class="visit">出诊</div>'
                    + '</section>'
            } else {
                dateHtml += '<section data-year=' + countTime(i).year + ' data-month=' + countTime(i).month + ' data-date=' + countTime(i).date + '>'
                    + '<h2>'
                    + '<a href="javascript:void(0)">' + format(countTime(i).date) + '</a>'
                    + '</h2>'
                    + '<ul class="optionsUl" data-year=' + countTime(i).year + ' data-month=' + countTime(i).month + ' data-date=' + countTime(i).date + '>+ <li>11111</li>+'
                    + '</ul>'
                    // + '<div class="full">已满</div>'
                    + '</section>'
            }
        }
        $("#calendarBox").html(dateHtml);
        reminder();
    }
    var reminder = function () {
        var optionsUl = $(".optionsUl");
        $.each(optionsUl, function (index, element) {
            var optionsHtml = '';
            let $element = $(element);
            let ele_year = format($element.attr('data-year')), ele_month = format($element.attr('data-month')),
                ele_date = format($element.attr('data-date'));
            $.each(dataArr, function (ind, ele) {
                let show_date = ele.date.split('-');
                if (ele_year == show_date[0] && ele_month == show_date[1] && ele_date == show_date[2]) {
                    $element.prev().addClass("active");
                    $.each(ele.items, function (_index, _ele) {
                        optionsHtml += '<li>'
                            + '<p>' + _ele.classTime + '</p>'
                            + '<p>' + _ele.className + '</p>'
                        if (showData) {
                            optionsHtml += '<article>'
                                + '<a href="javascript:void(0)">' + description.firstTitle + '</a>'
                                + '<a href="javascript:void(0)" onclick="downListShow(this)">' + description.nextTitle + '</a>'
                                + '</article>'
                                + '<div class="down_list" onclick="downListHide(this)">'
                                + '<div class="down_list_c" onclick="stopmp()">'
                                + '<h1>' + description.listTitle + '</h1>'
                                + '<div class="jy_list">'
                            $.each(_ele.downList, function (index_, element_) {
                                optionsHtml += '<p>' + element_.downName + '<a data-address="' + element_.downAddress + '" href="javascript:void(0)">' + description.methodsTitle + '</a></p>'
                            })
                            optionsHtml += '</div>'
                                + '<h5 onclick="closeDownList(this)"></h5>'
                        }
                        optionsHtml += '</li>'
                    })
                    return true
                }
            })
            $(element).html(optionsHtml);
        })
    }
    var changeWeek = function (weekNum) {
        createDate(-currentDay + (14 * weekNum));
        $("#week_title").attr("ids", weekNum);
        titleTime();
    }
    $("#current").on("click", function () {
        weekNum = 0;
        changeWeek(weekNum);
    })
    $("#prevWeek").on("click", function () {
        weekNum--;
        changeWeek(weekNum);
    })
    $("#nextWeek").on("click", function () {
        weekNum++;
        changeWeek(weekNum);
    })
    var titleTime = function () {
        var section = $("#calendarBox").find("section");
        var titleHtml = '';
        titleHtml += format($(section[0]).attr('data-year')) + '/' + format($(section[0]).attr('data-month')) + '/' + format($(section[0]).attr('data-date')) + ' - '
            + format($(section[13]).attr('data-year')) + '/' + format($(section[13]).attr('data-month')) + '/' + format($(section[13]).attr('data-date')) ;
        $("#showDate").html(titleHtml);
    }
    $("#calendarBox").on("click", "h2", function () {
        var section = $("#calendarBox").find("section");
        let index = $(this).parent('section').index();
        let month = section[index].dataset.month < 10 ?'0'+section[index].dataset.month: section[index].dataset.month
        let day = section[index].dataset.date < 10 ?'0'+section[index].dataset.date: section[index].dataset.date
        var textDate = section[index].dataset.year+'-'+ month+'-'+day
        $(this).addClass("select");
        $(this).parent().siblings().find('h2').removeClass("select");
        options['clickDate'](textDate);
    })
    var initWeeklyCalendar = function () {
        createWeek();
        createDate(-currentDay);
        titleTime();
    }()
    $(".jy_list").on("click", "a", function () {
        options['clickDownLoad'](this);
    })
}

function downListShow(that) {
    that.parentNode.parentNode.getElementsByClassName('down_list')[0].style.display = "block";
}

function downListHide(that) {
    that.style.display = "none";
}

function closeDownList(that) {
    that.parentNode.parentNode.style.display = "none";
}

function stopmp(e) {
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
}
