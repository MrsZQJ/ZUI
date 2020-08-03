# 前端UI框架    

##### 时间选择器---[效果](https://mrszqj.github.io/ZUI/form/form.html)

| 参数名    | 参数值            |
| --------- | ----------------- |
| selector* | 选择器---id,class |
| type*     | datetime          |

##### page分[效果](https://mrszqj.github.io/ZUI/page/page.html)

| 参数名         | 参数值                                        |
| -------------- | --------------------------------------------- |
| prev_next_text | 自定义上一页下一页按钮名字 ('上一页\|下一页') |
| count*         | 总页数                                        |
| selector*      | 选择器---id,class                             |
| current        | 当前页数                                      |
| page_len       | 生成的分页个数                                |
| callBack       | 切换分页的回调函数,返回要切换的页面排序数     |

##### 开关 [效果](https://mrszqj.github.io/ZUI/form/form.html)

| 参数名    | 参数值            |
| --------- | ----------------- |
| selector* | 选择器---id,class |

##### 滑块 [效果](https://mrszqj.github.io/ZUI/silder/silder.html)

| 参数名          | 参数值                          |
| --------------- | ------------------------------- |
| color           | 默认#009688                     |
| pos             | 当前百分比                      |
| showNum         | 是否显示滑块移动的当前值        |
| count           | 总数                            |
| disable         | 是否禁用                        |
| elem            | 选择器---id,cass                |
| callBackMove    | 移动滑块时的回调函数,返回当前值 |
| callBackMouseup | 鼠标松开后的回调,返回当前值     |

##### 树形组件 [效果](https://mrszqj.github.io/ZUI/tree/tree.html)

| 参数名   | 参数值                                       |
| -------- | -------------------------------------------- |
| data     | 数据                                         |
| title    | 渲染生成元素显示的标题内容,填写数据的title名 |
| id       | 渲染生成元素显示的id序列,填写数据的title名   |
| elem     | 选择器---id,cass                             |
| children | 数据子节点对象名                             |
| iconfont | 字体图标css类名                              |
| callBack | 回调函数                                     |

