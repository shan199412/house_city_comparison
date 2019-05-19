(function ($) {
    $(document).ready(function () {

        var citylist = [];


        // When drop down changed
        // $('#city_c').on('change', function () {
        //     $('input:checkbox').prop('checked', false);
        //     citylist = [];
        //     $('.svg3').hide();
        //     $('.alert1').hide();
        //     $('.diagram_title').hide();
        //     $('#drop').hide();
        //     // $('.result').hide();
        //     $('.svg3b').hide();
        //     $('.diagram_title2').hide();
        //     $('#drop2').hide();
        //     $('.select_type').hide();
        //
        //
        //     if ($('#city_c').val() !== "0") {
        //         // Reset checkbox
        //         $('#checkbox').children().show();
        //         // Hide the selected city from checkbox based on id
        //         $('#checkbox').children('#' + $('#city_c').val()).hide();
        //
        //         // Show section3
        //         $('.section3_c').fadeIn()
        //
        //         // auto scroll down to section3
        //         $('html, body').animate({
        //             scrollTop: $("div.section3_c").offset().top
        //         }, 1000)
        //
        //     } else {
        //         // $('.result').hide()
        //         $('.section3_c').hide()
        //         $('.diagram_title').hide()
        //         $('.diagram_title2').hide();
        //         $('.select_type').hide();
        //         // $('#drop').hide();
        //         // reset checkbox
        //     }
        // });

        // Limit number of click in checkbox to 3
        $('input:checkbox').on('change', function () {
            $('.alert1').hide()
            // $('.result').hide()
            $('.svg3').hide()
            $('.diagram_title').hide()
            $('#drop').hide();
            $('.svg3b').hide()
            $('.diagram_title2').hide()
            $('#drop2').hide();
            $('.select_type').hide();

            if ($('input:checkbox:checked').length > 4) {
                $(this).prop('checked', false)
            }
        });




        $('.submit_button_c').on('click', function () {
            // console.log(citysummary['Ballarat'])
            citylist = []
            // 1. get city from dropdown and append city list
            // 2. get cities from checkbox list

            $("input:checkbox:checked").each(function () {
                citylist.push($(this).attr('id'));
            });
            if (citylist.length === 1 || citylist.length === 0) {
                $('.alert1').show()
            } else {
                //button fadein
                $('.select_type').fadeIn();

            }



        })
        //when click rent button to show the chart
        $('.rent_but').on('click', function () {
            $('.diagram_title').fadeIn();
            $('.svg3b').hide();
            $('.diagram_title2').hide();

            $('#drop').fadeIn();
            thirdGraph(citylist);
            $('.svg3').fadeIn()

            $('html, body').animate({
                scrollTop: $("div.svg3").offset().top
            }, 1000)
        });
        // First type of graph

        $('.buy_but').on('click', function () {
            // Second type of graph
            $('.diagram_title2').fadeIn();
            $('.diagram_title').hide();
            $('.svg3').hide();
            $('#drop2').fadeIn();
            thirdGraph_b(citylist);
            $('.svg3b').fadeIn()

            $('html, body').animate({
                scrollTop: $("div.svg3b").offset().top
            }, 1000)
        });

    })
})(jQuery);