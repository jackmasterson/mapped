'use strict';

var map;

var model = {
        places: [
        {
            position: {
                lat: 40.216147,
                lng: -74.012914
            },
            title: 'Johnny Mac House Of Spirits',
            tag: ['bar', 'alcohol', 'beer', 'nightlife', 'night life', 'pizza'],
            src: 'img/macs.jpg',
            mkImg: 'img/beer.png',
            nums: '0',
            href: 'http://www.johnnymacbar.com/',
            id: 'mac',
            visible: ko.observable(true),
            icon: null,
            newMark: ko.observable()
        }, {

            position: {
                lat: 40.220001,
                lng: -74.000947
            },
            title: 'The Stone Pony',
            tag: ['music', 'concert', 'live', 'entertainment'],
            src: 'img/pony.jpg',
            mkImg: 'img/music.png',
            nums: '1',
            href: 'http://stoneponyonline.com/',
            id: 'pony',
            visible: ko.observable(true),
            icon: null,
            newMark: ko.observable()
        }, {
            position: {
                lat: 40.220239,
                lng: -74.002344
            },
            title: 'Porta Pizzeria',
            tag: ['bar', 'restaurant', 'pizza', 'nightclub', 'wine'],
            src: 'img/porta.jpg',
            mkImg: 'img/pizza.png',
            nums: '2',
            href: 'http://pizzaporta.com/ASBURY-PARK',
            id: 'porta',
            visible: ko.observable(true),
            icon: null,
            newMark: ko.observable()
        }, {

            position: {
                lat: 40.2207,
                lng: -73.999884
            },
            title: 'Silverball Museum',
            tag: ['vacation', 'pinball', 'museum', 'arcade'],
            src: 'img/silverball.jpg',
            mkImg: 'img/pinball.png',
            nums: '3',
            href: 'http://silverballmuseum.com/',
            id: 'silver',
            visible: ko.observable(true),
            icon: null,
            newMark: ko.observable()
        }, {
            position: {
                lat: 40.223796,
                lng: -73.998585
            },
            title: 'Convention Hall',
            tag: ['shopping', 'tourist', 'pictures'],
            src: 'img/hall.jpg',
            mkImg: 'img/shopping.png',
            nums: '4',
            href: 'https://en.wikipedia.org/wiki/Asbury_Park_Convention_Hall',
            id: 'hall',
            visible: ko.observable(true),
            icon: null,
            newMark: ko.observable()
        }
    ],
    surfInfo: ko.observableArray(),
    surfTime: [{time: '6am'}, {time:'Noon'}, {time:'6pm'}]
};

var viewModel = {

    init: function() {
      
        viewModel.mapView();
        viewModel.scrollDetect();
        viewModel.surf.init();
    },    

    next: function() {

        $('.splash').fadeOut(function(){
            $('.nav').fadeIn();
        });
    },

    scrollDetect: function(){

        $(window).scroll(function() {
            var height = $(window).scrollTop();

            if(height  >  300) {
                $('.nav').fadeIn();
            }

            else {
                $('.nav').fadeOut();
            }
        });
    },

    query: function() {

        viewModel.val = $('.query-input').val();
        $('.mapIt').fadeIn();
        viewModel.searched(model.places);
        viewModel.resetMarkers();
    },


    searched: function(type) {

        viewModel.showArray = ko.observableArray();

        type.forEach(function(place){
            var tag = place.tag;
            tag.push(place.title);
            
            place.visible(false);
            place.newMark().setMap(null);
            tag.forEach(function(each){
                var index = each.toLowerCase().indexOf(viewModel.val);
                if(index > -1){
                    viewModel.showArray.push(place);
                }
            });
                
            viewModel.showArray().forEach(function(each){
            
                if(each.title === place.title){
                    place.visible(true);
                    place.newMark().setMap(viewModel.map);
                }
            }); 

        });
       
    },

    mapView: function() {
        
        var mapDiv = document.getElementById('map');
        var mapOptions = {
            center: {
                lat: 40.220391,
                lng: -74.003082
            },
            scrollwheel: false,
            zoom: 16
        };

        viewModel.map = new google.maps.Map(mapDiv, mapOptions);
        viewModel.markers();

    },

    resetMarkers: function() {
        model.places.forEach(function(each){
            var eachMarker = each.newMark();
            eachMarker.setIcon(null);
            eachMarker.setAnimation(null);
            eachMarker.infowindow.close();
        });
    },

    hover: function() {

        var thisClass = '.'+this.id;
        $('.tags').hide();
        $(thisClass).fadeIn();
    },

    hoverOut: function() {
        $('.tags').hide();
    },

    markers: function() {
        viewModel.markerArray = [];

        model.places.forEach(function(marker){
            marker.newMark(new google.maps.Marker({
                map: viewModel.map,
                position: marker.position,
                icon: marker.icon,
                mkImg: marker.mkImg,
                animation: google.maps.Animation.DROP,
                infowindow: new google.maps.InfoWindow({
                    content: "<h2>"+
                                 "<a target=_blank href="
                                 +marker.href+">"+
                                  marker.title+"</a>"+
                             "</h2>"+
                             "<img class=info-img src="+marker.src+">"
                })
            }));

           marker.newMark().addListener('click', function() {

                viewModel.resetMarkers();
                viewModel.iconManip(marker.newMark());

            });


        });
    },

    markerClick: function() {
        var that = this;
        model.places.forEach(function(marker){
            viewModel.resetMarkers();
            viewModel.iconManip(that.newMark());
        });
        viewModel.mapShow();
        

    },

    iconManip: function(type){

        type.setIcon(type.mkImg);
        type.setAnimation(google.maps.Animation.BOUNCE);
        type.infowindow.open(viewModel.map, type);
        
        var timeout = window.setTimeout(stopBouncing, 2300);
        function stopBouncing() {
            type.setAnimation(null);
        };


    },

    mapShow: function() {
         $('body,html').animate({
            scrollTop: $('#map').offset().top
         }, 800);
    
    },

    surf: {
        init: function() {
        this.surfURL = 'http://magicseaweed.com/api/00e1e43e51248a4cb3431f4b73aeb4b3/forecast/?spot_id=857';
        this.surfInfo = model.surfInfo;

        viewModel.surf.render();
        
        },

        render: function() {
            var self = this;

            $.ajax({
                    url: this.surfURL,
                    dataType: 'jsonp'
                })
                .done(function(info) {

                    var sixAM = info[3];
                    var noon = info[5];
                    var sixPM = info[7];
                    var threeTimes = [];
                    threeTimes.push(sixAM, noon, sixPM);
                    info.forEach(function(data){
                        var time = data.localTimestamp;
                        var morning = time == '1469350800';
                        var midday = time == '1469372400';
                        var evening = time == '1469394000';
                        var date = new Date();
                        date.setTime(time * 1000);

                        var setTime = date;
                        var hour = setTime.getHours();
                        var hourFormat = hour + ':00am';
                        if(hour > 12){
                            hour = hour - 12;
                            hourFormat = hour + ':00pm';
                        }


                        if(morning || midday || evening){
                            model.surfInfo.push({time: hourFormat, data});
                        }
                    });
            });
        },

        show: function() {

            $('.surf-info').fadeIn();
            $('.nav').fadeOut();
        }
    },

    googleIt: function(clicked){
        var val = $('.query-input').val();
        console.log(val);
        window.open(
            'https://google.com/#q='+val+'+asbury+park+nj',
            '_blank'
        );
    }
};




ko.applyBindings(viewModel.init());

