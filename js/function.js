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
        ]
    });
    $('.sell__list').slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<i class="icon_prev" />',
        nextArrow: '<i class="icon_next" />',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    // infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });


    checkOnResize();

    $('select').select2();

    $('.homePanes__item').swipe({
        swipeLeft: function() {
            var count = $('.homePanes__item').length;
            if ($(this).index() === (count-1)) return false;
            $('.homePanes__item').removeClass('active');
            $('.homeTabs__item').removeClass('active');
            $(this).next().addClass('active');
            $('[data-swich="#'+$(this).attr("id")+'"]').next().addClass('active');
        },
        swipeRight: function() {
            var count = $('.homePanes__item').length;
            if ($(this).index() === 0) return false;
            $('.homePanes__item').removeClass('active');
            $('.homeTabs__item').removeClass('active');
            $(this).prev().addClass('active');
            $('[data-swich="#'+$(this).attr("id")+'"]').prev().addClass('active');
        }
    });

    swichTabs();

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

function slideProjects(el) {
    var slider = $('.projectSlider');

    $(el).appendTo(slider);

    slider.slick({
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        prevArrow: '<i class="icon_prev" />',
        nextArrow: '<i class="icon_next" />',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    })

    slider.slick('clickAdd', $(el));
}

slideProjects('[data-filter]');

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

function swichTabs() {
	var tab = $('[data-tab]'),
		pane = $('[data-pane]'),
        more = $('.js_more'),
        slider = $('.projectSlider'),
        item;

    // console.log('swichTabs');

	tab.on('click', function(e) {
		var id = $(this).data('tab') // data-tab

        console.log(id);

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

    function showAllItem() {
        slider.slick('unslick');
        $('.projectSlider [data-filter]').appendTo('.projectPanes__list');
        slideProjects('[data-filter]');
    }
    // showAllItem();

    function swichItem(id) {
        var current = '[data-filter="'+id+'"]';
        slider.slick('unslick');

        $('.projectSlider [data-filter]').appendTo('.projectPanes__list');

        slideProjects(current);

        // current.each(function(i) {
        //     $(this).appendTo(slider);
        // });

        // $('.projectPanes__list').slick('unslick');
        // slideProjects();

        // console.log(item.length);
        // showMoreBtn(item.length);
    }
    //
    // function showMoreBtn(i) {
    //     if (i < 4) {
    //         more.hide();
    //     } else {
    //         more.show();
    //     }
    // }

};
// swichTabs();
// console.log(swichTabs);

function initMap() {
    // 55.759906,37.5143593
    var compCenter = {lat: 55.760237, lng: 37.516485};
    var center = {lat: 55.760237, lng: 37.511485};
    var zoom = 16;

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
            $('.header__bottom').removeClass('open');
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
        }
        return false;
    });
};
srollToId();

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
                    $('.form__rezult').html('Ваше сообщение отправлено! <br>В ближайшее время наш специалист свяжется свами.');
                },
                error: function (response) {
                    // $('#success').modal('show');
                    // console.log('error');
                    // console.log(response);
                }
            });
        }

    });

    $('[required]').on('blur change', function() {
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
