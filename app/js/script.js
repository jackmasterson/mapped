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
    ]
};

var Place = function() {

    model.places.forEach(function(each){
       // console.log(each);
    });

};

var viewModel = {

    init: function() {
        Place();
        viewModel.mapView();
    },    

    next: function() {

        $('.splash').fadeOut(function(){
            $('.nav').fadeIn();
        });
    },

    query: function() {

        viewModel.val = $('.query-input').val();
        $('.mapIt').fadeIn();
        viewModel.searched(model.places);
        //viewModel.searched(viewModel.markerArray);


    },


    searched: function(type) {

        viewModel.showArray = ko.observableArray();

        type.forEach(function(place){
            var tag = place.tag;
            tag.push(place.title);
            
            place.visible(false);
            console.log(place);
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
                lat: 40.222391,
                lng: -74.012082
            },
            scrollwheel: false,
            zoom: 15   
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
                animation: google.maps.Animation.DROP,
                infowindow: new google.maps.InfoWindow({
                    content: "<a target=_blank href="+marker.href+">"+
                        marker.title+"</a><br>"+
                        "<img class=info-img src="+marker.src+">"
                })
            }));

           // viewModel.markerArray.push(newMark);

           marker.newMark().addListener('click', function() {
                var that = this;
                viewModel.resetMarkers();
                this.setIcon(marker.mkImg);
                this.setAnimation(google.maps.Animation.BOUNCE);
                this.infowindow.open(viewModel.map, this);
                
                var timeout = window.setTimeout(stopBouncing, 2300);
                function stopBouncing() {
                    that.setAnimation(null)
                };

            });


        });
    },

    mapShow: function() {
         $('body,html').animate({
            scrollTop: $('#map').offset().top
         }, 800);

         $('.header').fadeOut();
         $('.sub-header').fadeOut();
    
    }
};




ko.applyBindings(viewModel.init());

