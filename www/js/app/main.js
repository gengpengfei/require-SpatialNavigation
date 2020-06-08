require(['jquery','navigation','../plugin/sdkApi'],function($,SpatialNavigation,sdkApi) {
  // 数据填充
  function fillSystemApp(){
    var sysApp = sdkApi.getSystemApp();
    var childrens = $("#app-store").children();
    if(childrens.length > 0){
      childrens.each(function(i,e){
        // <img src="file:/'+sysApp[i].icon+'"/>
        $(e).html('<div class="app-recommend-i row-center"><div class="app-name">'+sysApp[i].name+'</div></div>');
        $(e).attr({'clickType':'1',"clickUrl":sysApp[i].packageName})
      })
    }
  }
  function fillNormalApp(){
    var normalApp = sdkApi.getNormalApp();
    var childrens = $("#app-recommend").children();
    if(childrens.length > 0){
      childrens.each(function(i,e){
        // <img src="file:/'+normalApp[i].icon+'"/>
        $(e).html('<div class="app-recommend-i  row-center"><div class="app-name">'+normalApp[i].name+'</div></div>');
        $(e).attr({'clickType':'1',"clickUrl":normalApp[i].packageName})
      })
    }
  }

  fillSystemApp();
  fillNormalApp();

  $(function() {
    var SN = SpatialNavigation;
    SN.init();
    
    // 导航
    SN.add({
      id: 'menu',
      selector: '#menu .focusable',
      defaultElement: '#home',
      enterTo: 'last-focused'
    });
    // 头部
    SN.add({
      id: 'header',
      selector: '#header .focusable',
      enterTo: 'last-focused',
    });
    //-- homepage
    SN.add({
      id: 'homepage',
      selector: '#homepage .focusable',
      straightOnly:'true',
      enterTo: 'last-focused',
      leaveFor:{
        left:'#home'
      }
    });
    //-- video page 
    SN.add({
      id: 'videopage',
      selector: '#videopage .focusable',
      straightOnly:'true',
      enterTo: 'last-focused',
      leaveFor:{
        left:'#video'
      }
    });
    //-- music page 
    SN.add({
      id: 'musicpage',
      selector: '#musicpage .focusable',
      straightOnly:'true',
      enterTo: 'last-focused',
      leaveFor:{
        left:'#music'
      }
    });
    //-- game page 
    SN.add({
      id: 'gamepage',
      selector: '#gamepage .focusable',
      straightOnly:'true',
      enterTo: 'last-focused',
      leaveFor:{
        left:'#game'
      }
    });
    // 动画
    $('#homepage .focusable')
    .on('sn:willfocus', function(e) { 
      var SNInfo = e.originalEvent.detail;
      if(SNInfo.direction == 'up' || SNInfo.direction == 'down'){
        SN.pause();
        var elem = $('#homepage')
        $(this).ensureVertical(elem,function() {
          SN.focus(this);
          SN.resume();
        });
        return false;
      }else if(SNInfo.direction == 'left' || SNInfo.direction == 'right'){
        SN.pause();
        $(this).ensureHorizontal(function() {
          SN.focus(this);
          SN.resume();
        });
        return false;
      }else {
        SN.pause();
        setTimeout(function(){
          SN.focus(this);
          SN.resume();
        }.bind(this))
        return false;
      }
    });

    //-- 导航栏切换
    $('#menu .focusable')
    .on('sn:willfocus', function(e) { 
      var SNInfo = e.originalEvent.detail;
      if(SNInfo.direction == 'up' || SNInfo.direction == 'down'){
        console.log()
        $('.content')
          .addClass('hide')
          .filter('#' + this.id + 'page')
          .removeClass('hide');
      }

      SN.pause();
        setTimeout(function(){
          SN.focus(this);
          SN.resume();
        }.bind(this))
      return false;
    });

    //-- enter 事件
    $('.focusable')
      .on('sn:enter-down', function() {
        $(this).addClass('active');
      })
      .on('sn:enter-up', function() {
        var id = this.id;
        var $this = $(this);
        $this.removeClass('active');
        sendSDK().bind(this)
        pageCheck().bind(this);

      });
    SN.makeFocusable();
    SN.focus('menu');


    function sendSDK(){
      sdkApi.startApp($(this).attr("clickUrl"));
    }

    function pageCheck(){
      console.log(this);
      // $('#settings-container').removeClass('hide');
      // // Move focus to section "settings-dialog"
      // SN.focus('settings-dialog');
    }
  });
})
