define(function(){
    'use strict';
    function getSystemApp(){
        if(window.jsUtils) return jsUtils.getAllAppInfo(0);
        return [{
            name:"google",
            packageName:"com.seraphic.openinet",
            icon:"",
            isSystemApp:false,
            isUserApp:false
        },{
            name:"google",
            packageName:"com.seraphic.openinet",
            icon:"",
            isSystemApp:false,
            isUserApp:false
        },{
            name:"google",
            packageName:"com.seraphic.openinet",
            icon:"",
            isSystemApp:false,
            isUserApp:false
        }];
    }
    function getNormalApp(){
        if(window.jsUtils)  return jsUtils.getAllAppInfo(1);
        return [{
            name:"google",
            packageName:"com.seraphic.openinet",
            icon:"",
            isSystemApp:false,
            isUserApp:false
        },{
            name:"google",
            packageName:"com.seraphic.openinet",
            icon:"",
            isSystemApp:false,
            isUserApp:false
        },{
            name:"google",
            packageName:"com.seraphic.openinet",
            icon:"",
            isSystemApp:false,
            isUserApp:false
        },{
            name:"google",
            packageName:"com.seraphic.openinet",
            icon:"",
            isSystemApp:false,
            isUserApp:false
        }];
    }
    function startApp(packageName){
        if(window.jsUtils)  return jsUtils.startApp( packageName)
    }
    var _obj = {
        jsUtils:window.jsUtils ?window.jsUtils : {},
        getSystemApp:function(){
            return getSystemApp();
        },
        getNormalApp:function(){
            return getNormalApp();
        }, 
        startApp:function(packageName){
            return startApp(packageName);
        }
    }
    return _obj
})
