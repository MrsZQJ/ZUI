; +
(function () {
    class ZUI {
        constructor() {

        }
        silder(options) {
            new Silder(options)
        }

    }
    self.ZUI = new ZUI()

    var ss, silder_defult = {
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
        if (silder_defult.showNum) {
            ss.silderWrap.mouseenter(function () {
                ss.silderTips.show()
            })
            ss.silderWrap.mouseleave(function () {
                ss.silderTips.hide()
            })
        }
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