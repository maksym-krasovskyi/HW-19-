import './style/main.scss'
import 'owl.carousel'
import 'owl.carousel/src/js/owl.navigation'
import Swiper from 'swiper/bundle'
import Masonry from 'masonry-layout'
import { Fancybox } from '@fancyapps/ui'
import lightGallery from 'lightgallery'
import 'justifiedGallery'

require('slick-carousel')

$(document).ready(function () {
    $('.corousel').slick({
        autoplay: true,
    })

    $('.owl-carousel').owlCarousel({
        nav: true,
        dots: true,
        autoplay: true,
        loop: true,
        autoplayTimeout: 3000,
        items: 1,
    })

    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,

        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    })

    const grid = document.querySelector('.grid')

    console.log(grid)

    const masonry = new Masonry(grid, {
        itemSelector: '.grid-item',
        columnWidth: 160,
        gutter: 20,
        fitWidth: true,
        resize: true,
    })

    Fancybox.bind('[data-fancybox="gallery"]', {
        dragToClose: false,

        Toolbar: false,
        closeButton: 'top',

        Image: {
            zoom: false,
        },

        on: {
            initCarousel: (fancybox) => {
                const slide = fancybox.Carousel.slides[fancybox.Carousel.page]

                fancybox.$container.style.setProperty(
                    '--bg-image',
                    `url("${slide.$thumb.src}")`
                )
            },
            'Carousel.change': (fancybox, carousel, to, from) => {
                const slide = carousel.slides[to]

                fancybox.$container.style.setProperty(
                    '--bg-image',
                    `url("${slide.$thumb.src}")`
                )
            },
        },
    })

    jQuery('#animated-thumbnails-gallery')
        .justifiedGallery({
            captions: false,
            lastRow: 'hide',
            rowHeight: 180,
            margins: 5,
        })
        .on('jg.complete', function () {
            lightGallery(
                document.getElementById('animated-thumbnails-gallery'),
                {
                    autoplayFirstVideo: false,
                    pager: false,
                    galleryId: 'nature',
                }
            )
        })
})
