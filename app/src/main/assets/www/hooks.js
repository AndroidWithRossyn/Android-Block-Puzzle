/**
	GRADLE - KNOWLEDGE IS POWER
    ***** PROPRIETARY CODE *****
    @author : gradle (gradlecode@outlook.com)
	@date: 08/31/2019 16:13:00
	@version_name: gradle-logic
	@version_code: v6.0.0
	copyright @2019
*/

var gradle = {
    debug : false,
	isMobile : ( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) ),

	//Ads information :
	//===================
    banner         : 'ca-app-pub-3940256099942544/6300978111', //id placement banner
    interstitial   : 'ca-app-pub-3940256099942544/1033173712', //id placement interstitial

    isTesting      : true, //Ads mode testing. set to false for a production mode.
    enableBanner   : true, //Ads enable the banner. set to false to disable the banner.
    bannerAtBottom : true, //if false the banner will be at top
    overlap        : false,

	notifiBackbutton  : true, //for confirmation backbutton
    notifiMessage     : 'Do you want to exit the game ?',

	intervalAds    : 1,     //Ads each interval for example each 3 times

	//More Games : your developer link.
	developer_link : 'https://play.google.com/store/search?q=games',

	//GDPR : (respecting google new rules August-2019)
	privacy_link : 'https://play.google.com/store/search?q=king',


	//Events manager :
	//================
    event: function(ev, msg){
        gradle.process(ev,msg);gradle.log(ev,msg);
        switch(ev){
            case 'first_start':   //First start
                //gradle.showInter();
                break;
			case 'Button_Classic': //Button play classic
                gradle.showInter();
                break;
			case 'Button_Experiment': //Button play experiment
                gradle.showInter();
                break;
			case 'Game_Over': //End of the game
                gradle.showInter();
                break;
			case 'Menu': //Button play
                gradle.showInter();
                break;
			case 'Restart':
                gradle.showInter();
                break;
			case 'Sound':
                //gradle.showInter();
                break;
			case 'Privacy': //<-- End of the game (DEAD)
                gradle.privacy();
                break;
			case 'Close_Settings': // <-- End of game
                gradle.showInter();
                break;
			case 'more_games': // <-- End of game
                gradle.more();
                break;
			case 'test':
				//gradle.checkInterval() && gradle.showInter();
                break;
        }
    },


    log: function(val,msg){
        val && gradle.debug && console.log( gradle.isMobile && (typeof val === 'object' && val !== null) ? JSON.stringify(val) : val );
        msg && gradle.debug && console.log( gradle.isMobile && (typeof msg === 'object' && msg !== null) ? JSON.stringify(msg) : msg );
    },


	//Ready : /!\ DO NOT CHANGE, ONLY IF YOU ARE AN EXPERT.
	//=========================
    ready: function() {
        gradle.log('gradle ready ...');
        if(typeof admob !='undefined'){
            if(gradle.isTesting){
                admob.banner.config({
                    id: gradle.banner,
                    isTesting: true,
                    autoShow: true,
                    overlap: gradle.overlap,
                    offsetTopBar: false,
                    bannerAtTop: !gradle.bannerAtBottom
                });

                admob.interstitial.config({
                    id: gradle.interstitial,
                    isTesting: true,
                    autoShow: false,
                });
            }
            else{
                admob.banner.config({
                    id: gradle.banner,
                    autoShow: true,
                    overlap: gradle.overlap,
                    offsetTopBar: false,
                    bannerAtTop: !gradle.bannerAtBottom
                });

                admob.interstitial.config({
                    id: gradle.interstitial,
                    autoShow: false,
                });
            }
        }
        if(gradle.enableBanner && typeof admob!=='undefined'){
            admob.banner.prepare();
        }
        gradle.prepareInter();
         document.addEventListener('admob.banner.events.LOAD_FAIL', function(event) {
           gradle.log(event);
        });

        document.addEventListener('admob.banner.events.LOAD', function(event) {
           gradle.log(event);
        });

        document.addEventListener('admob.interstitial.events.LOAD_FAIL', function(event) {
           gradle.log(event);
        });

        document.addEventListener('admob.interstitial.events.LOAD', function(event) {
           gradle.log(event);
        });

        document.addEventListener('admob.interstitial.events.CLOSE', function(event) {
           gradle.log(event);
           admob.interstitial.prepare();
        });

		if(gradle.notifiBackbutton){
            document.addEventListener("backbutton", function() {
                navigator.notification.confirm(gradle.notifiMessage, function(buttonIndex){
                    if(buttonIndex == 1) {
                        navigator.app.exitApp();
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            }, !1);
        }
        document.addEventListener("visibilitychange", gradle.onVisibilityChanged, false);
		document.addEventListener("mozvisibilitychange", gradle.onVisibilityChanged, false);
		document.addEventListener("webkitvisibilitychange", gradle.onVisibilityChanged, false);
		document.addEventListener("msvisibilitychange", gradle.onVisibilityChanged, false);
		gradle.event('first_start');
		startGame();
		//gradle.hideSplash();
    },

    more: function(){
        (gradle.developer_link!=="")&&window.open(gradle.developer_link);
    },

	privacy: function(){
        (gradle.privacy_link!=="")&&window.open(gradle.privacy_link);
    },

    hideSplash: function(){
        if(gradle.isMobile){
            cordova.exec(null, null, "SplashScreen", "hide", []);
        }
    },

    process: function(ev, msg){
        switch(ev){
            case 'splash':
				gradle.hideSplash();
                break;
        }
    },

    prepareInter: function(){
        if(!gradle.isMobile || typeof admob=='undefined' || admob==null) return;
        admob.interstitial.prepare();
    },

    showInter: function(){
        if(!gradle.isMobile || typeof admob=='undefined' || admob==null) return;
        admob.interstitial.show();
    },

    run : function(){
        gradle.log('gradle run ...');
        gradle.isMobile ? document.addEventListener('deviceready', gradle.ready, false) :  gradle.ready();
    },

	onVisibilityChanged : function(){
	    console.log('onVisibilityChanged...');
		try{
			if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden){
				gradle_onPauseRequested();
			}else{
				gradle_onResumeRequested();
			}
		}catch(error){}
	},

	currentInterval : 0,
	checkInterval: function(){
		return (++gradle.currentInterval==gradle.intervalAds) ? !(gradle.currentInterval=0) : !1;
	},

	buildKey : function(key){
        return "gd.4006."+key;
    },

    getStorage: function(key, default_value){
        var value;
        try {
            value = localStorage.getItem(gradle.buildKey(key));
        }
        catch(error){
			return default_value;
        }
		if(value !== undefined && value !=null){
            value = window.atob(value);
        }
		else{
			value = default_value;
		}
        return value;
    },

    setStorage: function(key, value){
        var v = value;
        if(v !== undefined){
            v = window.btoa(v);
        }
        try{
            localStorage.setItem(gradle.buildKey(key), v);
            return value;
        }
        catch(error){
            return undefined;
        }
    }
};

gradle.run();





