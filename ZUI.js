; +
(function () {
    class ZUI {
        constructor() {

        }
        showTimeSelect(type) {
            new TimeLoad(type)
        }
        circuit(options) {
            new Circuit(options)
        }
        paging(options) {
            new Paging(options)
        }
        silder(options) {
            new Silder(options)
        }

    }
    self.ZUI = new ZUI()

    var tt, cc, xx, ss, date_defult = {
            year: 'yyyy',
            month: 'yyyy-MM',
            date: 'yyyy-MM-dd',
            time: 'HH-mm',
            datetime: 'yyyy-MM-dd-HH-mm'
        },
        circuit_defult = '.z-input-beautiful',
        paging_defult = {
            prev_next_text: '上一页|下一页',
            current: 1,
            page_len: 7,
        },
        silder_defult = {
            color: '#009688',
            pos: '0%',
            showNum: false,
            count: 100,
            disable: false,
            callBackMove: function (num) {

            },
            callBackMouseup: function (num) {

            }
        }

    function TimeLoad(type) {
        tt = this
        this.time_arr = this.formatTime(new Date(), date_defult[type.type])
        this.that = $(type.selector)
        this.that.click(function (e) {
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
    }, TimeLoad.prototype.createTimeElement = function (year, mouth, day) {
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
    }, TimeLoad.prototype.insertElement = function (that, e) {
        if (!$(that).nextAll('div.z-date-block').length) {
            var html_str = tt.createElement()
            $('body').append('<div id="z-show-top" style="width: 100vw;height: 100vh;position: fixed;top:0;z-index:1"></div>');
            $(that).after(html_str);
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
    }, TimeLoad.prototype.clear_select = function () {
        if ($('.z-date-transition').length == 0) return
        tt.z_select_simulator.removeClass('z-date-transition');
        tt.z_select_simulator.children('p').children('i').text('△')
    }, TimeLoad.prototype.selTime = function () {
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
    }, TimeLoad.prototype.insertTime = function () {
        var them = this.that.nextAll('.z-date-block').find('dl'),
            txt
        $(them).unbind('click').on('click', 'dd', function () {
            tt.clear_select()
            txt = $(this).text()
            tt.that.val(tt.sel_time + '-' + txt)
        })
    }, TimeLoad.prototype.changeDay = function (that, es) {
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
    }, TimeLoad.prototype.formatTime = function (date, format) {
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

    function Circuit() {
        cc = this
        cc.ipt_circuit = $(circuit_defult)
        $.each(cc.ipt_circuit, function (indexInArray, valueOfElement) {
            cc.createTemplate(valueOfElement)
        });
    }
    Circuit.prototype.createTemplate = function (value) {
        var ipt = $(value),
            z_text_arr = ipt.attr('z-text').split('|'),
            z_text = ipt.attr('checked') ? z_text_arr[1] : z_text_arr[0],
            z_check = ipt.attr('checked') ? '' : 'z-circuit-block-nosel',
            temp = `
                <div class="z-circuit-block ${z_check}">
                    <em>${z_text}</em>
                    <i></i>
                </div>
             `
        ipt.hide()
        ipt.after(temp);
        cc.circuitClick()
    }, Circuit.prototype.circuitClick = function () {
        $('.z-circuit-block').unbind('click').click(function () {
            var ipts = $(this).prevAll(circuit_defult),
                txts = ipts.attr('z-text').split('|')
            var cir = $(this)
            if (cir.attr('class').indexOf('z-circuit-block-nosel') == -1) {
                cir.addClass('z-circuit-block-nosel')
                cir.find('em').text(txts[0])
                ipts.removeAttr('checked')
                console.log(ipts.attr('checked'));
            } else {
                cir.removeClass('z-circuit-block-nosel')
                cir.find('em').text(txts[1])
                ipts.attr('checked', '0')
                console.log(ipts.attr('checked'));
            }
        })
    }

    function Paging(opt) {
        xx = this
        xx.callBack = opt.callBack
        $.each(opt, function (indexInArray, valueOfElement) {
            paging_defult[indexInArray] = valueOfElement
        });
        if (!paging_defult.count || !paging_defult.selector) {
            alert('参数count,selector必填!')
            return
        }
        xx.count = paging_defult.count
        xx.elem = $(paging_defult.selector)
        xx.prev_next_text = paging_defult.prev_next_text
        xx.page_len = paging_defult.page_len
        xx.current = paging_defult.current

        xx.insertElement()
    }
    Paging.prototype.createTemplate = function () {
        var t_arr = xx.prev_next_text.split('|'),
            i, b = '',
            c, str, f = xx.page_len
        if (f - xx.current <= 2 && xx.count - xx.current >= (f - 3)) {
            c = (f - 1 - 2) / 2,
                i = -c, str
            while (i <= c) {
                i == 0 ? b += '<a href="javascript:;" data-page="curr" class="zui-page-curr">' + (xx.current) + '</a>' : b += '<a data-page=' + (+xx.current + i) + '>' + (+xx.current + i) + '</a>'
                i++
            }
            str = `
                <a href="javascript:;" data-page="prev">${t_arr[0]}</a>
                <a href="javascript:;" data-page="1">1</a>
                <a href="javascript:;" data-page="mid" class="zui-page-spr">…</a>
                ${b}
                <a href="javascript:;" data-page="mid" class="zui-page-spr">…</a>
                <a href="javascript:;" data-page="${xx.count}">${xx.count}</a>
                <a href="javascript:;" data-page="next">${t_arr[1]}</a>
            `
        } else if (0 < xx.current && xx.current <= (f - 3)) {
            i = 1
            while (i <= (f - 2)) {
                i == +xx.current ? b += '<a href="javascript:;" data-page="curr" class="zui-page-curr">' + (i) + '</a>' : b += '<a href="javascript:;" data-page=' + (i) + '>' + (i) + '</a>'
                i++
            }
            str = `
                <a href="javascript:;" data-page="prev" class="zui-page-noallow">${t_arr[0]}</a>
                ${b}
                <a href="javascript:;" data-page="mid" class="zui-page-spr">…</a>
                <a href="javascript:;" data-page="${xx.count}">${xx.count}</a>
                <a href="javascript:;" data-page="next">${t_arr[1]}</a>
            `
        } else if ((xx.count - (f - 3)) < xx.current && xx.current <= xx.count) {
            i = (f - 2) - 1
            while (i >= 0) {
                xx.count - i == xx.current ? b += '<a data-page="curr" href="javascript:;" class="zui-page-curr">' + (xx.count - i) + '</a>' : b += '<a href="javascript:;" data-page=' + (xx.count - i) + '>' + (xx.count - i) + '</a>'
                i--
            }
            str = `
                <a href="javascript:;" data-page="prev">${t_arr[0]}</a>
                <a href="javascript:;" data-page="1">1</a>
                <a href="javascript:;" data-page="mid" class="zui-page-spr">…</a>
                ${b}
                <a href="javascript:;" data-page="next" class="zui-page-noallow">${t_arr[1]}</a>
            `
        }
        return str
    }, Paging.prototype.insertElement = function () {
        var str = this.createTemplate(),
            s = `
            <div class="zui-page">
                ${str}
            </div>
        `
        xx.elem.html(s)
        xx.pagingClick()
    }, Paging.prototype.pagingClick = function () {
        xx.elem.on('click', 'a', function (e) {
            var page = $(this).attr('data-page')
            if (page != 'curr' && page != 'mid') {
                if (page == 'prev') {
                    if (!$(this).attr('class')) {
                        xx.current--
                        xx.callBack(xx.current)
                        xx.elem.find('.zui-page').html(xx.createTemplate())
                    } else if ($(this).attr('class').indexOf('zui-page-noallow') != -1) return
                } else if (page == 'next') {
                    if (!$(this).attr('class')) {
                        xx.current++
                        xx.callBack(xx.current)
                        xx.elem.find('.zui-page').html(xx.createTemplate())
                    } else if ($(this).attr('class').indexOf('zui-page-noallow') != -1) return
                } else {
                    xx.callBack(page)
                    xx.current = page
                    xx.elem.find('.zui-page').html(xx.createTemplate())
                }
            }
        })
    }

    function Silder(opt) {
        ss = this
        $.each(opt, function (indexInArray, valueOfElement) {
            silder_defult[indexInArray] = valueOfElement
        });
        if (!silder_defult.elem) {
            alert('参数elem必填!')
            return
        }
        ss.elem = $(silder_defult.elem)
        ss.pos = silder_defult.pos
        ss.color = silder_defult.color
        ss.num = 0
        ss.count = silder_defult.count
        ss.disable = silder_defult.disable
        ss.callBackMove = silder_defult.callBackMove
        ss.callBackMouseup = silder_defult.callBackMouseup
        this.insertElement()
    }
    Silder.prototype.createTemplate = function () {
        var str = `
            <div class="zui-slider ${ss.disable? 'zui-disabled': ''}">
                <div class="zui-slider-tips" style="left: ${ss.pos}; display: none">${ss.pos.split('%')[0]}</div>
                <div class="zui-slider-bar" style="background: ${ss.color}; width: ${ss.pos}; left: 0%;"></div>
                <div class="zui-slider-wrap" style="left: ${ss.pos};">
                    <div class="zui-slider-wrap-btn" style="border: 2px solid ${ss.color};"></div>
                </div>
            </div>
        `
        return str
    }, Silder.prototype.insertElement = function () {
        var str = this.createTemplate()
        ss.elem.html(str)
        ss.silderWrap = ss.elem.find('div.zui-slider-wrap')
        ss.silder = ss.elem.find('div.zui-slider')
        ss.silderBar = ss.elem.find('div.zui-slider-bar')
        ss.silderTips = ss.elem.find('div.zui-slider-tips')
        this.addEVent()
    }, Silder.prototype.addEVent = function () {
        ss.silderWrap.mouseenter(function () {
            ss.silderTips.show()
        })
        ss.silderWrap.mouseleave(function () {
            ss.silderTips.hide()
        })
        if (ss.disable) return
        var silderLeft, silderWidth
        ss.silderWrap.mousedown(function () {
            silderLeft = ss.silder[0].getBoundingClientRect().left
            silderWidth = ss.silder.width()
            $('body').bind('mousemove', {
                silderLeft: silderLeft,
                silderWidth: silderWidth
            }, ss.move)
        });

        $('body').mouseup(function (e) {
            var c = ((e.clientX - silderLeft) / silderWidth) * 100
            if (c >= 100) {
                ss.num = 100
            } else if (c <= 0) {
                ss.num = 0
            }
            ss.callBackMouseup(ss.num)
            $('body').unbind('mousemove', ss.move)
        });
    }, Silder.prototype.move = function (e) {
        ss.num = ((e.clientX - e.data.silderLeft) / e.data.silderWidth) * 100
        if (ss.num > 100 || ss.num < 0) {
            return
        }
        ss.callBackMove(ss.num)
        ss.silderBar.css('width', ss.num + '%')
        ss.silderWrap.css('left', ss.num + '%')
        ss.silderTips.css('left', Math.round(ss.num) + '%')
        ss.silderTips.text(Math.round(ss.num / 100 * ss.count))
    }
})(window)