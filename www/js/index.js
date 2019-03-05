//global var
var exitBit = false;
var u = 'https://npathing.herokuapp.com';
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
   
    onDeviceReady: function() {

        cordova.plugins.diagnostic.registerLocationStateChangeHandler(function (state) {
            console.log("Location state changed to: " + state);
        }, function (error) {
            console.error("Error registering for location state changes: " + error);
        });
        document.addEventListener("online", onOnline, false);
        document.addEventListener("offline", onOffline, false);
        document.addEventListener('backbutton', function(event){
            event.preventDefault();
            if(exitBit){
                window.plugins.toast.hide();
                navigator.app.exitApp();
            }
            else{
                window.plugins.toast.showWithOptions(
                {
                  message: "Press again to exit",
                  duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
                  position: "bottom",
                  addPixelsY: -150
                });
                exitBit = true;
                setTimeout(function(){exitBit = false},2000);
            }
        });
        var pics=35;
        $('.js-playerStuff').show();
        $('.js-gameStuff').hide();
        var items = ['Truman', 'Sloth', 'toothless', 'sullivan', 'aceVentura', 'BruceAlmighty','Astrid','JackTheReaper','Elsa','MikeLebowsky','JamesDean','Hiccup','Ralph','Monoke','Shrek','Alcázar','sharkBait','Rastapopulous','Aviator', 'Parkins', 'Randall', 'Farquaad', 'BruceAlmighty','Astrid','JackTheReaper','Elsa','MikeLebowsky','JamesDean','Hiccup','Ralph','Monoke','Shrek','Alcázar','sharkBait','Rastapopulous'];
        var i = Math.floor(Math.random() * pics) + 1;
        $('#txtPlayerName').attr('placeholder',items[i]);
        $('#avatarContainer > img').prop('src','img/avatars/'+i+'.png');
        $('#txtPlayerName').on('keyup',function(){
            if($('#txtPlayerName').val().length>3){
                $('#btnPlayerOn').removeAttr('disabled');
            }
            else{
                $('#btnPlayerOn').attr('disabled','disabled');
            }
        });
        $('#btnPlayerOn').click(function(){
            $('.js-playerStuff').hide();
            $('#js-gameContainer').removeClass('col-xs-offset-1').removeClass('col-xs-10').addClass('col-xs-8');
            $('#gamesList').fadeIn('slow');
            //$('#gameTime').val(60); doesnt set the scope var!!:(
            $('.js-gameStuff').show();
            $('#avatarContainer2 > img').prop('src',$('#avatarContainer > img').prop('src'));
            $('#playerName').text($('#txtPlayerName').val());
            loadGames();
            //$('#hidPlayerAv').val(new URL($('#avatarContainer > img').prop('src')).pathname.split('/')[3]);
        });
        $('#txtGameName').on('keyup',function(){
            if($('#txtGameName').val().length>3  && $('#gameTime').find(":selected").text()!='Select time'){
                $('#btnGameOn').removeAttr('disabled');
            }
            else{
                $('#btnGameOn').attr('disabled','disabled');
            }
        });
        $('#gameTime').on('change',function(){
            if($('#txtGameName').val().length>3  && $('#gameTime').find(":selected").text()!='Select time'){
                $('#btnGameOn').removeAttr('disabled');
            }
            else{
                $('#btnGameOn').attr('disabled','disabled');
            }
        });
        $('.js-avRight').click(function(){
            var v = Number($('#avatarContainer > img').prop('src').split('/')[2].split('.')[0]);
            v = v==pics?1:v+1;
            $('#avatarContainer > img').prop('src',`img/avatars/${v}.png`);
        });
        $('.js-avLeft').click(function(){
            var v = Number($('#avatarContainer > img').prop('src').split('/')[2].split('.')[0]);
            v = v==1?pics:v-1;
            $('#avatarContainer > img').prop('src',`img/avatars/${v}.png`);
        });

        var socket = io.connect(u);
        $('#btnMsg').click(function(){
            socket.emit('testMsg', { my: 'data' });
        });
        socket.on('onTestMsg',function(data){
            alert(data.msg);
        });
    },
    // didLaunchAppFromLink:function(eventData) {
    //     alert('Did launch application from the link: ' + eventData.url);
    // }
};

function onOnline(){
    $('#divOffline').hide();  
}
function onOffline(){
    $('#divOffline').show();
}
function loadGames(){
    $('.js-gamesLoad').addClass('fa-spin');
    $.ajax({
        url:u+'/api/game',
        crossDomain:true,
        type: 'GET',
        dataType: 'jsonP',
        success: function(data){
            if(data){
                alert(`from succ:${data.game.length}`);
            }
        },
        error:function(xhr, status, error){
            var data = JSON.parse(xhr.responseText);
                if(data){
                    alert(`from err:${data.game.length}`);
                }
        }
    })
}