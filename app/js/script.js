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
            tag: ['', 'visit', 'bar', 'alcohol', 'beer', 'nightlife', 'night life', 'pizza', 'johnny', 'mac'],
            src: 'img/macs.jpg',
            mkImg: 'img/beer.png',
            nums: '0',
            href: 'http://www.johnnymacbar.com/',
            id: 'mac',
            visibility: ko.observable(true),
            icon: null
        }, {

            position: {
                lat: 40.220001,
                lng: -74.000947
            },
            title: 'The Stone Pony',
            tag: ['', 'visit', 'music', 'concert', 'live', 'stone', 'pony', 'entertainment'],
            src: 'img/pony.jpg',
            mkImg: 'img/music.png',
            nums: '1',
            href: 'http://stoneponyonline.com/',
            id: 'pony',
            visibility: ko.observable(true),
            icon: null
        }, {
            position: {
                lat: 40.220239,
                lng: -74.002344
            },
            title: 'Porta Pizzeria',
            tag: ['', 'visit', 'bar', 'restaurant', 'pizza', 'nightclub', 'porta', 'wine'],
            src: 'img/porta.jpg',
            mkImg: 'img/pizza.png',
            nums: '2',
            href: 'http://pizzaporta.com/ASBURY-PARK',
            id: 'porta',
            visibility: ko.observable(true),
            icon: null
        }, {

            position: {
                lat: 40.2207,
                lng: -73.999884
            },
            title: 'Silverball Museum',
            tag: ['', 'visit', 'vacation', 'pinball', 'silverball', 'museum', 'silver'],
            src: 'img/silverball.jpg',
            mkImg: 'img/pinball.png',
            nums: '3',
            href: 'http://silverballmuseum.com/',
            id: 'silver',
            visibility: ko.observable(true),
            icon: null
        }, {
            position: {
                lat: 40.223796,
                lng: -73.998585
            },
            title: 'Convention Hall',
            tag: ['', 'visit', 'shopping', 'tourist', 'pictures', 'convention', 'hall'],
            src: 'img/hall.jpg',
            mkImg: 'img/shopping.png',
            nums: '4',
            href: 'https://en.wikipedia.org/wiki/Asbury_Park_Convention_Hall',
            id: 'hall',
            visibility: ko.observable(true),
            icon: null
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
        viewModel.searched();

    },


    searched: function() {

        console.log('filter goes here');

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
        viewModel.markerArray.forEach(function(eachMarker){
            eachMarker.setIcon(null);
            eachMarker.setAnimation(null);
            eachMarker.infowindow.close();
        });
    },

    markers: function() {
        viewModel.markerArray = [];

        model.places.forEach(function(marker){
            var newMark = new google.maps.Marker({
                map: viewModel.map,
                position: marker.position,
                icon: marker.icon,
                animation: google.maps.Animation.DROP,
                infowindow: new google.maps.InfoWindow({
                    content: marker.href
                })
            });

            viewModel.markerArray.push(newMark);

            newMark.addListener('click', function() {
                var that = this;
                viewModel.resetMarkers();
                this.setIcon(marker.mkImg);
                this.setAnimation(google.maps.Animation.BOUNCE);
                this.infowindow.open(viewModel.amp, this);
                

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

