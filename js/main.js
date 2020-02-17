$(document).ready(function () {

    $("#page-nav").onePageNav({
        currentClass: "active",
        chageHash: false,
        scrollSpeed: 750,
        scrollThreshold: 0.5,
        filter: '',
        easing: "swing",
        begin: function () {},
        end: function () {},
        scrollChange: function ($currentListItem) {}
    });

    $("#portfolio-project").mixItUp();

    // menu-icon

    const menuToggle = document.querySelector('#menu-togle');
    const mobileNavContainer = document.querySelector('#mobile-nav');  
    const divOverlay = document.querySelector('#overlay'); 
    const divBody = document.querySelector('body'); 
    

    menuToggle.onclick = function(){
        menuToggle.classList.toggle('menu-icon-active');
        mobileNavContainer.classList.toggle('mobile-nav--active'); 
        divOverlay.classList.toggle('active');  
        divBody.classList.toggle('noscroll');                  
    }

    // placeHolder

    const formRows = document.querySelectorAll('.form-row')
    const formRowsInputs = document.querySelectorAll(".form-input")

    for (let i = 0; i < formRows.length; i++) {

        formRows[i].addEventListener("click", function () {
            const placeholderElement = this.querySelector(".fake-placeholder");
            placeholderElement.classList.add("active");
        })
    }

    for (let i = 0; i < formRowsInputs.length; i++) {

        formRowsInputs[i].addEventListener("keyup", function () {

            const thisParent = this.parentElement;
            thisParent.querySelector("span").classList.add("active");
            if (this.value == '') {
                thisParent.querySelector("span").classList.remove("active");
            }
            if (thisParent.querySelector(".error").classList.contains('active')) {
                thisParent.querySelector("span").classList.add("active");

            }
        });
        formRowsInputs[i].addEventListener("blur", function () {
            const thisParent = this.parentElement;
            if (this.value == '') {
                thisParent.querySelector("span").classList.remove("active");
            }
        })
    }

    //form validate

    $('#contact-form').validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            theme: {
                required: true
            },
            message: {
                required: true
            }
        },
        messages: {
            email: {
                required: "Введите ваш Email",
                email: 'Некорректный email'
            },
            theme: {
                required: "Отсутствует тема сообщения"
            },
            message: {
                required: "Отсутствует сообщение"
            }
        },
        submitHandler: function (form) {
            ajaxFormSubmit();
        }
    });

    function ajaxFormSubmit() {
        let string = $('#contact-form').serialize();

        $.ajax({
            type: "POST",
            url: "php/mail.php",
            data: string,

            success: function (html) {
                $("#contact-form").slideUp(800);
                // $('#answer').html(html);
            }
        });
        return false;
    }

    $('#backtop').hide();

    $(window).scroll(function () {

        if ($(this).scrollTop() > 200) {
            $('#backtop').fadeIn();
        } else {
            $('#backtop').fadeOut();
        }        
    })

    window.addEventListener('resize', function(){
        menuToggle.classList.remove('menu-icon-active');
        mobileNavContainer.classList.remove('mobile-nav--active'); 
        divOverlay.classList.remove('active');  
        divBody.classList.remove('noscroll');
    }) 
    
})

    