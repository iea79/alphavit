/*!
 *
 * Evgeniy Ivanov - 2018
 * busforward@gmail.com
 * Skype: ivanov_ea
 *
 */

var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod
function isTouch() { return TempApp.touchDevice(); } // for touch device


$(document).ready(function() {
    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	// Запрет "отскока" страницы при клике по пустой ссылке с href="#"
	$('[href="#"]').click(function(event) {
		event.preventDefault();
	});

    // Inputmask.js
    // $('[name=tel]').inputmask("+9(999)999 99 99",{ showMaskOnHover: false });
    // formSubmit();

    $('.partners__wrap').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<i class="icon_prev" />',
        nextArrow: '<i class="icon_next" />',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    // infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });

    checkOnResize();

    $('select').select2();

});

$(window).resize(function(event) {
    var windowWidth = $(window).width();
    // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
    if (TempApp.resized == windowWidth) { return; }
    TempApp.resized = windowWidth;

	checkOnResize();
});

function checkOnResize() {
    // fontResize();
    // stikyMenu();
}

function swichHomeTabs() {
    $('[data-swich]').on('click', function() {
        console.log($(this).data('swich'));
        var id = $(this).data('swich');
        $('[data-swich].active').removeClass('active');
        $(this).addClass('active');

        $('.homePanes__item.active').removeClass('active');
        $(id).addClass('active');
    })
}

swichHomeTabs();

function openMobileNav() {
    $('.navbar__toggle').on('click', function() {
        var wrapp = $('.header__bottom');

        wrapp.toggleClass('open');
    });
};
openMobileNav();

// Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
function stikyMenu() {
    var wrapp;
    if (isXsWidth()) {
        wrapp = $('.header');
    } else {
        wrapp = $('.header__bottom');
    };
    var HeaderTop = wrapp.offset().top + $('.home').innerHeight();
    var currentTop = $(window).scrollTop();

    setNavbarPosition();

    $(window).scroll(function(){
        setNavbarPosition();
    });

    function setNavbarPosition() {
        currentTop = $(window).scrollTop();

        if( currentTop > HeaderTop ) {
            wrapp.addClass('stiky');
        } else {
            wrapp.removeClass('stiky');
        }

        $('.navbar__link').each(function(index, el) {
            var section = $(this).attr('href');

            if ($('section').is(section)) {
                var offset = $(section).offset().top;

                if (offset <= currentTop && offset + $(section).innerHeight() > currentTop) {
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }
            }
        });
    }
};
// stikyMenu();

function swichTabs() {
	var tab = $('[data-tab]'),
		pane = $('[data-pane]'),
        more = $('.js_more'),
        item;

	tab.on('click', function(e) {
		// e.preventDefault();

		// $(this).attr('data-tab') // data-tab
		var id = $(this).data('tab') // data-tab

		tab.removeClass('active');
		$(this).addClass('active');

        switch (id) {
            case "car":
                swichItem("car");
                break;
            case "cargo":
                swichItem("cargo");
                break;
            case "spec":
                swichItem("spec");
                break;
            case "hardware":
                swichItem("hardware");
                break;
            case "air":
                swichItem("air");
                break;
            case "water":
                swichItem("water");
                break;
            case "house":
                swichItem("house");
                break;
            case "back":
                swichItem("back");
                break;
            case "all":
                // swichItem("back");
                showAllItem();
                break;
            default:

        }

	});

    more.on('click', function() {
        var current = $('[data-tab].active').data('tab');
        // console.log(current);
        if (current == 'all') {
            $('[data-filter]').removeClass('hidden');
        } else {
            $('[data-filter='+current+']').removeClass('hidden');
        }
        $(this).hide();
    })

    function showAllItem() {
        item = $('[data-filter]');
        item.each(function(i) {
            if (i < 4) {
                // console.log($(this).data('filter'));
                $(this).removeClass('hidden');
                // more.hide();
            } else {
                $(this).addClass('hidden');
                // more.show();
            }
        });
        console.log(item.length);
        showMoreBtn(item.length);
    }
    showAllItem();

    function swichItem(id) {
        $('[data-filter]').addClass('hidden');

        item = $('[data-filter="'+id+'"]');
        item.each(function(i) {
            if (i < 4) {
                // console.log($(this).data('filter'));
                $(this).removeClass('hidden');
                // more.hide();
            } else {
                $(this).addClass('hidden');
                // more.show();
            }
        });
        console.log(item.length);
        showMoreBtn(item.length);
    }

    function showMoreBtn(i) {
        if (i < 4) {
            more.hide();
        } else {
            more.show();
        }
    }

};
swichTabs();

function initMap() {
    var compCenter = {lat: 56.34431322385145, lng: 43.92857064999998};
    var center = {lat: 56.34431322385145, lng: 43.88857064999998};
    var zoom = 13;

    if (isXsWidth()) {
        center = compCenter;
        zoom = 12;
    }

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoom,
        center: center,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            }
        ]
    });

    var marker = new google.maps.Marker({
        position: compCenter,
        map: map,
        icon: 'img/marker.png'
    });

}

// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
function srollToId() {
    $('[data-scroll-to]').click( function(){
        var scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0) {
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
        }
        return false;
    });
};
srollToId();

function fontResize() {
    var windowWidth = $(window).width();
    if (windowWidth >= 1200) {
    	var fontSize = windowWidth/19.05;
    } else if (windowWidth < 1200) {
    	var fontSize = 60;
    }
	$('body').css('fontSize', fontSize + '%');
}

// Видео youtube для страницы
function uploadYoutubeVideo() {
    if ($(".js_youtube")) {

        $(".js_youtube").each(function () {
            // Зная идентификатор видео на YouTube, легко можно найти его миниатюру
            $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + this.id + '/sddefault.jpg)');

            // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
            $(this).append($('<img src="img/play.svg" alt="Play" class="video__play">'));

        });

        $('.video__play, .video__prev').on('click', function () {
            // создаем iframe со включенной опцией autoplay
            var wrapp = $(this).closest('.js_youtube'),
                videoId = wrapp.attr('id'),
                iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";

            if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

            // Высота и ширина iframe должны быть такими же, как и у родительского блока
            var iframe = $('<iframe/>', {
                'frameborder': '0',
                'src': iframe_url,
            })

            // Заменяем миниатюру HTML5 плеером с YouTube
            $(this).closest('.video__wrapper').append(iframe);

        });
    }
};


// Простая проверка форм на заполненность и отправка аяксом
function formSubmit() {
    $("[type=submit]").on('click', function (e){
        e.preventDefault();
        var form = $(this).closest('.form');
        var url = form.attr('action');
        var form_data = form.serialize();
        var field = form.find('[required]');
        // console.log(form_data);

        empty = 0;

        field.each(function() {
            if ($(this).val() == "") {
                $(this).addClass('invalid');
                // return false;
                empty++;
            } else {
                $(this).removeClass('invalid');
                $(this).addClass('valid');
            }
        });

        // console.log(empty);

        if (empty > 0) {
            return false;
        } else {
            $.ajax({
                url: url,
                type: "POST",
                dataType: "html",
                data: form_data,
                success: function (response) {
                    // // $('#success').modal('show');
                    // // console.log('success');
                    // console.log(response);
                    // // console.log(data);
                    // // document.location.href = "success.html";
                },
                error: function (response) {
                    // $('#success').modal('show');
                    // console.log('error');
                    // console.log(response);
                }
            });
        }

    });

    $('[required]').on('blur', function() {
        if ($(this).val() != '') {
            $(this).removeClass('invalid');
        }
    });

    $('.form__privacy input').on('change', function(event) {
        event.preventDefault();
        var btn = $(this).closest('.form').find('.btn');
        if ($(this).prop('checked')) {
            btn.removeAttr('disabled');
            // console.log('checked');
        } else {
            btn.attr('disabled', true);
        }
    });
}
formSubmit();
