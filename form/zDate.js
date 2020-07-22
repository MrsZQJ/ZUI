;
(function ($) {
    $.fn.extend({
        "showTimeSelect": function (options) {
            var timeLoad = new TimeLoad(defult[options.type], this)
        }
    })
    var defult = {
            year: 'yyyy',
            month: 'yyyy-MM',
            date: 'yyyy-MM-dd',
            time: 'HH-mm',
            datetime: 'yyyy-MM-dd-HH-mm'
        },
        tt

    function TimeLoad(type, that) {
        // console.log(type, that);
        tt = this
        this.type = type
        this.time_arr = this.formatTime(new Date(), type)
        this.that = that
        $(that).click(function (e) {
            tt.insertElement(this, e)
        });
    }

    TimeLoad.prototype.createElement = function () {
        var i = 0,
            y = '',
            m = '',
            dd = ''
        while (i <= 12) {
            y += '<li>' + (this.time_arr.yyyy - i) + '年</li>'
            i++
            m += '<li>' + i + '月</li>'
        }
        dd = this.createTimeElement(this.time_arr.yyyy, this.time_arr.MM, this.time_arr.dd)
        this.sel_time = this.time_arr.yyyy + '-' + this.time_arr.MM

        var element_str = `
        <div class="z-date-block">
        <div class="z-date-top-item">
            <div class="z-select-simulator">
                <p>${this.time_arr.yyyy}年 <i>△</i></p>
                <ul>
                    ${y}
                </ul>
            </div>
            <div class="z-select-simulator">
                <p>${this.time_arr.MM}月 <i>△</i></p>
                <ul>
                    ${m}
                </ul>
            </div>
        </div>
        <div class="z-date-middle-item">
            <ul>
                <li>日</li>
                <li>一</li>
                <li>二</li>
                <li>三</li>
                <li>四</li>
                <li>五</li>
                <li>六</li>
            </ul>
        </div>
        <div class="z-date-bottom-item">
            <dl>
                ${dd}
            </dl>
        </div>
    </div>
        `
        return element_str
    }

    TimeLoad.prototype.createTimeElement = function (year, mouth, day) {
        var week = new Date(year + '-' + mouth + '-1').getDay(),
            m_day = new Date(year, mouth, 0).getDate(),
            i = 0,
            dd = '',
            v = week + m_day,
            num = v
        v > 35 ? num = 42 : num = 35
        while (i < num) {
            i++
            if (i <= week) {
                dd += '<dd class="z-date-blank"></dd>'
            } else if (day) {
                if (i > week && day > (i - week)) {
                    dd += '<dd>' + (i - (week)) + '</dd>'
                } else if (day == (i - week)) {
                    dd += '<dd class="z-date-active">' + (i - week) + '</dd>'
                } else if (day < (i - week) && (i - week) <= m_day) {
                    dd += '<dd>' + (i - week) + '</dd>'
                } else {
                    dd += '<dd class="z-date-blank"></dd>'
                }
            } else {
                if (i > week && (i - week) <= m_day) {
                    dd += '<dd>' + (i - week) + '</dd>'
                } else {
                    dd += '<dd class="z-date-blank"></dd>'
                }
            }
        }
        return dd
    }

    TimeLoad.prototype.insertElement = function (that, e) {
        if (!$(that).nextAll('div.z-date-block').length) {
            var html_str = tt.createElement()
            $('body').append('<div id="z-show-top" style="width: 100vw;height: 100vh;position: fixed;top:0;z-index:1"></div>');
            $(that).parents('div.z-form-block').append(html_str);
            tt.z_date_block = tt.that.nextAll('div.z-date-block')
            tt.z_date_top_item = tt.z_date_block.children('div.z-date-top-item')
            tt.z_date_middle_item = tt.z_date_block.children('div.z-date-middle-item')
            tt.z_date_bottom_item = tt.z_date_block.children('div.z-date-bottom-item').children('dl')
            tt.z_select_simulator = tt.z_date_top_item.children('div.z-select-simulator')
        } else {
            this.z_date_block.show()
            $('body').append('<div id="z-show-top" style="width: 100vw;height: 100vh;position: fixed;top:0;z-index:1"></div>');
        }
        $('#z-show-top').click(function (e) {
            e.preventDefault();
            tt.z_date_block.hide();
            tt.clear_select()
            $(this).remove();
        });
        this.selTime()
        this.insertTime()
    }

    TimeLoad.prototype.clear_select = function () {
        if ($('.z-date-transition').length == 0) return
        tt.z_select_simulator.removeClass('z-date-transition');
        tt.z_select_simulator.children('p').children('i').text('△')
    }

    TimeLoad.prototype.selTime = function () {
        tt.z_select_simulator.unbind('click').click(function (e) {
            if ($(this).children('p').children('i').text() == '△') {
                tt.z_select_simulator.children('p').children('i').text('△')
                $(this).children('p').children('i').text('▽')
                tt.z_select_simulator.removeClass('z-date-transition')
                $(this).addClass('z-date-transition');
            } else {
                tt.clear_select()
            }
        });

        tt.z_select_simulator.on('click', 'li', function (e) {
            $(this).parents().prevAll('p').contents()[0].nodeValue = $(this).text()
            tt.changeDay(this, e)
        });
    }

    TimeLoad.prototype.insertTime = function () {
        var them = this.that.nextAll('.z-date-block').find('dl'),
            txt
        $(them).unbind('click').on('click', 'dd', function () {
            tt.clear_select()
            txt = $(this).text()
            tt.that.val(tt.sel_time + '-' + txt)
        })
    }

    TimeLoad.prototype.changeDay = function (that, es) {
        var txt = $(that).text(),
            a, b, element_str
        if (txt.indexOf('年') != -1) {
            a = txt.split('年')[0]
            b = $($(es.delegateTarget).siblings('.z-select-simulator').children('p')[0].childNodes[0]).text()
            b = b.split('月')[0]
        } else {
            b = txt.split('月')[0]
            a = $($(es.delegateTarget).siblings('.z-select-simulator').children('p')[0].childNodes[0]).text()
            a = a.split('年')[0]
        }
        element_str = this.createTimeElement(a, b)
        tt.z_date_bottom_item.html(element_str)
        this.sel_time = a + '-' + b
    }

    TimeLoad.prototype.formatTime = function (date, format) {
        var t_arr = {
            yyyy: date.getFullYear(),
            MM: date.getMonth() + 1,
            dd: date.getDate(),
            HH: date.getHours(),
            mm: date.getMinutes()
        }
        var reg = '/',
            substrs = '',
            format_arr = format.split('-'),
            r_t_arr = {}
        $.each(format_arr, function (indexInArray, valueOfElement) {
            r_t_arr[valueOfElement] = t_arr[valueOfElement]
        });
        return r_t_arr
    }

})(window.jQuery);