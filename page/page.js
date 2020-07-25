; +
(function () {
    class ZUI {
        constructor() {

        }
        paging(options) {
            new Paging(options)
        }

    }
    self.ZUI = new ZUI()

    var xx, paging_defult = {
        prev_next_text: '上一页|下一页',
        current: 1,
        page_len: 7,
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
})(window)