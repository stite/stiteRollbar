# stiteRollbar
rollbar.js是一款用模拟滚动条的插件，可自定义颜色宽度滚动条的模拟插进，不基于任何库完全独立。
### 引用

```html
<script type="text/javascript" src="js/rollbar.min.js"></script>
```
[查看DEMO效果](http://www.stite.net/content/rollbar/demo.html)

>HTML代码

```html
<div class="content" id="content">
    <div class="main">
        <article>
            <div>
                &nbsp; &nbsp; &nbsp; &nbsp;生命里，一些缱绻，无论素净，还是喧哗，都已经被岁月赋予了清喜的味道，一些闲词，或清新，或淡雅，总会在某一个回眸的时刻醉了流年，濡湿了柔软的心，冥冥之中，我们沿着呼唤的风声，终于在堆满落花的秋里，再次重逢，念在天涯，心在咫尺，我相信，一米阳光，才是我们最好的距离。 &nbsp;&nbsp;</div>
                .......
        </article>
    </div>
</div>
```
>JS代码

```javascript
var roll =  new RollBar({
    el:"content",
    width: "3px",
    bgColor:"#d0d0d0",
    colour:"#000"
});
```
>初始化说明

```javascript
var roll2 =  new RollBar({
    el:"content2", // ID
    width: "15px", //滚动条宽度
    bgColor:"#d0d0d0", //滚动条背景颜色
    bgShow:false, //是否显示背景滚动条
    colour:"#000", //滚动条颜色
    rollbarY : true, //竖向滚动条是否显示
    rollbarX : false, //横向滚动条是否显示
    callback:function(ev){ 
        // 滚动条滚动时执行
    }
});
```
>参数
<table width="100%">
    <thead>
        <tr>
            <td>参数</td>
            <td>默认值</td>
            <td>说明</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>el</td>
            <td class="red">必填</td>
            <td>#ID的DMO，生成一个滚动条</td>
        </tr>
        <tr>
            <td>width</td>
            <td>5px</td>
            <td>滚动条的宽度。</td>
        </tr>
        <tr>
            <td>bgColor</td>
            <td>#d0d0d0</td>
            <td>滚动条的底部颜色。</td>
        </tr>
        <tr>
            <td>colour</td>
            <td>#999999</td>
            <td>滚动条颜色。</td>
        </tr>
        <tr>
            <td>bgShow</td>
            <td>false</td>
            <td>是否显示底部滚动条。</td>
        </tr>
        <tr>
            <td>rollbarY</td>
            <td>true</td>
            <td>是否显示坚向滚动条。</td>
        </tr>
        <tr>
            <td>rollbarX</td>
            <td>false</td>
            <td>是否显示横向滚动条。</td>
        </tr>
        <tr>
            <td>callback</td>
            <td>-</td>
            <td>滚动时执行的回调。</td>
        </tr>
    </tbody>
</table>

>方法

scrollTo(x,y,callback)滚动至哪个位置

```javascript
roll.scrollTo(0,100,function(){
    //执行回调
})
```
refresh(callback)刷新DMO，当DOM里面有元素变更时可刷新。

```javascript
roll.refresh(function(){
    //回调
})
```