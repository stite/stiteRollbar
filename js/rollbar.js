/*rollbar.js v1.0.1 http://www.stite.net  2017-04-14*/
(function(global){
  var RollBar,rollStyle,rChildStyle;
  RollBar = function(data){

    // 默认值
    (data.rollbarY == void 0)?data.rollbarY=true:data.rollbarY;
    (data.rollbarX == void 0)?data.rollbarX=false:data.rollbarX;

    var _this = this;
    _this.melH = _this.elch = this.percentY = this.percentX  = _this.elcw = _this.melW =0;
    _this.elY = _this.elX = _this.childH = _this.childXH = _this.elW = _this.elH = _this.clientY = _this.clientX = _this.startY = _this.startX = 0;
    this.y = 0;
    this.x = 0;
    // 样式Y处理
    (data.bgShow!=void 0&&data.bgShow)?(data.bgColor = "rgba("+data.bgColor+",0)"||"#999"):(data.colour||"#999")
    data.bgColor?data.bgColor:data.bgColor="#d0d0d0";
    rollStyle = {
      width:(data.width||5),
      position:"absolute",
      background:data.bgColor,
      zIndex : 10,
      top: "15px",
      right:"5px",
      bottom:"15px",
      borderRadius:"8px",
    }
    rChildStyle = {
      width:(data.width||5),
      position:"absolute",
      height:"20%",
      background:data.colour||"#999",
      zIndex : 11,
      top: "0px",
      right:"0px",
      borderRadius:"8px"
    }
    // 样式X处理
    rollXStyle = {
      height:(data.width||5),
      position:"absolute",
      background:data.bgColor||"#999",
      zIndex : 10,
      left: "15px",
      right:"15px",
      bottom:"5px",
      borderRadius:"8px"
    }

    rChildXStyle = {
      height:(data.width||5),
      position:"absolute",
      width:"20%",
      background:data.colour||"#999",
      zIndex : 11,
      left: "0px",
      right:"0px",
      borderRadius:"8px"
    }
    // 获取当前DOM
    this.el = document.getElementById(data.el);
    if(!getStyle(this.el,"position")){
      this.el.style.position = "relative";
    }
    
    // 当前DOM子级；
    this.childEl = this.el.getElementsByTagName("*")[0];
    this.childEl.style.position = "relative";

    // 最大滚动值
    _this.melH = outerStyle(this.el,"height");
    _this.elch = outerStyle(this.childEl,"height");
    _this.melW = outerStyle(this.el,"width");
    _this.elcw = outerStyle(this.childEl,"width");
    this.maxScrollY = _this.elch-_this.melH;
    this.maxScrollX = _this.elcw-_this.melW;
    // 绑定滚轮事件
    this.el.addEventListener('mousewheel',function(ev){
      rollbarFn(_this,ev);
      if(data.callback){
        data.callback(ev)
      }
      ev.stopPropagation();
    },false);

    this.el.addEventListener('DOMMouseScroll',function(ev){
      rollbarFn(_this,ev);
      if(data.callback){
        data.callback(ev)
      }
      ev.stopPropagation();
    },false);


    if(data.rollbarY != void 0&&data.rollbarY){
      // Y滚动条
      this.RollElY = document.createElement('div');
      this.RollChild = document.createElement('p');
      
      for(s in rollStyle){
        this.RollElY.style[s] = rollStyle[s];
      }
      for(a in rChildStyle){
        this.RollChild.style[a] = rChildStyle[a];
      }

      this.RollElY.appendChild(this.RollChild);
      this.el.appendChild(this.RollElY);

      // 计算滚动条高度
      _this.childH = getStyle(this.RollChild,"height");
      _this.elH = getStyle(this.RollElY,"height");

      // 绑定事件
      rollMove(_this,_this.RollChild,"Y");
    }
    if(data.rollbarX!= void 0&&data.rollbarX){
      // X滚动条
      this.RollElX = document.createElement('div');
      this.RollChildX = document.createElement('p');
      
      for(y in rollXStyle){
        this.RollElX.style[y] = rollXStyle[y];
      }
      for(e in rChildXStyle){
        this.RollChildX.style[e] = rChildXStyle[e];
      }

      this.RollElX.appendChild(this.RollChildX);
      this.el.appendChild(this.RollElX);

      // 计算滚动条高度
      _this.childXH = getStyle(this.RollChildX,"width");
      _this.elW = getStyle(this.RollElX,"width");
      
      // 绑定事件
      rollMove(_this,_this.RollChildX,"X");
    }
    if(_this.maxScrollY<0){
      _this.RollElY.style.display = "none";
    }
    if(_this.maxScrollX<0){
      _this.RollElX.style.display = "none";
    }
  }

  // 滚动至
  RollBar.prototype = {
    scrollTo:function(x,y,fn){
      elStyle(this,-y,-x);
      if(fn)fn();
    },
    refresh:function(fn){
      data  = this;
      // 最大滚动值
      this.melH = outerStyle(this.el,"height");
      this.elch = outerStyle(this.childEl,"height");
      this.melW = outerStyle(this.el,"width");
      this.elcw = outerStyle(this.childEl,"width");
      this.maxScrollY = this.elch-this.melH;
      this.maxScrollX = this.elcw-this.melW;

      if(data.rollbarY != void 0&&data.rollbarY){
        // 计算滚动条高度
        this.childH = getStyle(this.RollChild,"height");
        this.elH = getStyle(this.RollElY,"height");
      }
      if(data.rollbarX!= void 0&&data.rollbarX){
        // 计算滚动条高度
        this.childXH = getStyle(this.RollChildX,"width");
        this.elW = getStyle(this.RollElX,"width");
      }
      if(fn)fn();
    }
  }

  // 滚动赋值
  function rollbarFn(_this,ev){
    if(!Math.abs(ev.deltaY)) ev.deltaY = ev.detail;
    if(!Math.abs(ev.deltaX)) ev.deltaX = ev.detail;
    if(window.onmousewheel===null){
      _this.elY+=(ev.deltaY*-1);
      _this.elX+=(ev.deltaX*-1);
    }else{
      _this.elY+=(ev.deltaY*-5);
      _this.elX+=(ev.deltaX*-5);
    }
    elStyle(_this,_this.elY,_this.elX);
  }


  // 赋值到DOM
  function elStyle(_this,Top,Left){
    Top>0?Top=0:Top;
    Left>0?Left=0:Left;
    Top<-_this.maxScrollY?Top=-_this.maxScrollY:Top;
    Left<-_this.maxScrollX?Left=-_this.maxScrollX:Left;
    _this.elY = Top;
    _this.elX = Left;
    _this.y = parseInt(_this.elY);
    _this.x = parseInt(_this.elX);

    // 计算百分比
    _this.percentY = Math.abs(_this.elY/_this.maxScrollY)*100;
    _this.percentX = Math.abs(_this.elX/_this.maxScrollX)*100;

    // 滚动
    rollTransform(_this,_this.percentY,_this.percentX);

    // 不否出现滚动条
    if(_this.RollElY){
        rollDom(_this,_this.percentY,_this.percentX);
    }
  }

  // 获取样式
  function getStyle(obj, attr){
      if(obj.currentStyle){
          return obj.currentStyle[attr];
      }else{
          return getComputedStyle(obj, false)[attr];
      }
  }

  // 更改滚动值
  function rollTransform(_this,percentY,percentX){
    _this.elY = (_this.melH-_this.elch)/100*percentY;
    _this.elX = (_this.melW-_this.elcw)/100*percentX;
    _this.maxScrollY<0?_this.elY=0:_this.elY;
    _this.maxScrollX<0?_this.elX=0:_this.elX;
    // 改变滚动条值
    if(css3()){
      _this.childEl.style.transform = "translate("+(isNaN(_this.elX)?_this.elX=0:_this.elX)+"px,"+_this.elY+"px) translateZ(0px) scale(1)";
    }else{
      _this.childEl.style.left = _this.elX+"px";
      _this.childEl.style.top = _this.elY+"px";
    }
  }

  // 改变滚动条的高度及TOP
  function rollDom(_this,percenty,percentx){
    var rollY = (parseInt(_this.elH,10)-parseInt(_this.childH,10))/100*percenty;
    var rollX = (parseInt(_this.elW,10)-parseInt(_this.childXH,10))/100*percentx;
    if(css3()){
      if(_this.RollChild){
       _this.RollChild.style.transform = "translate(0,"+rollY+"px)";

      }
      if(_this.RollChildX){
       _this.RollChildX.style.transform = "translate("+rollX+"px,0px)";
      }
    }else{
      if(_this.RollChild){
       _this.RollChild.style.top = rollY+"px";

      }
      if(_this.RollChildX){
       _this.RollChildX.style.left = rollX+"px";
      }
    }
  }

  // 获取实际宽高
  function outerStyle(el,attr){
      if(attr=="width"){
          return parseInt(getStyle(el,"width"),10)+parseInt(getStyle(el,"paddingLeft"),10)+parseInt(getStyle(el,"paddingRight"),10);
      }else if(attr=="height"){
          return parseInt(getStyle(el,"height"),10)+parseInt(getStyle(el,"paddingTop"),10)+parseInt(getStyle(el,"paddingBottom"),10);
      }else{
          return parseInt(getStyle(el,attr),10);
      }
      
  }

  // 简单判断是否支持CSS3
  function css3(){
      try {
          return 'localStorage' in window && window['localStorage'] !== null;
        } 
      catch(e){
          return false;
      }
  }

  // 绑定mousemove事件
  function rollMove(_this,rollChild,xy){
    var top = left = 0;
    rollChild.onmousedown = function(ev){
      var currTop = (parseInt(_this.elH,10)-parseInt(_this.childH,10))/100*_this.percentY;
      var currLeft = (parseInt(_this.elW,10)-parseInt(_this.childXH,10))/100*_this.percentX;
      console.log(currTop)
      _this.startY = ev.clientY;
      _this.startX = ev.clientX;
      document.onmousemove = function(ev){
        _this.clientY = ev.clientY-_this.startY;
        _this.clientX = ev.clientX-_this.startX;
        top = _this.clientY+currTop;
        left = _this.clientX+currLeft;
        top<=0?top=0:top;
        left<=0?left=0:top;
        Math.abs(top)>=(parseFloat(_this.elH)-parseFloat(_this.childH))?top =(parseFloat(_this.elH)-parseFloat(_this.childH)):top;
        Math.abs(left)>=(parseFloat(_this.elW)-parseFloat(_this.childXH))?left =(parseFloat(_this.elW)-parseFloat(_this.childXH)):left;
        if(css3()){
          if(_this.RollChild){
            _this.RollChild.style.transform = "translate(0,"+top+"px)";
          }
          if(_this.RollChildX){
            _this.RollChildX.style.transform = "translate("+left+"px,0px)";
          }
        }else{
          if(_this.RollChild){
            _this.RollChild.style.top = -top+"px";
          }
          if(_this.RollChildX){
            _this.RollChildX.style.left = -left+"px";
          }
        }

        if(xy=="X"){
          _this.percentX = left/((parseFloat(_this.elW)-parseFloat(_this.childXH))/100);
        }else{
          _this.percentY = top/((parseFloat(_this.elH)-parseFloat(_this.childH))/100);
        }
        
        // 跟随滚动
        rollTransform(_this,_this.percentY,_this.percentX);

        ev.stopPropagation();
      }
    }
    document.onmouseup = function(){
        document.onmousemove = null;
        document.onmousedown = null;
    };
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = RollBar;
  if (typeof define === 'function') define(function() { return RollBar; });
  global.RollBar = RollBar;

})(window);