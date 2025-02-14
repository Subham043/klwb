<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KLWB - @yield('title')</title>
    <link rel="stylesheet" href="{{ asset('assets//bootstrap.css') }}" type="text/css">
    <link rel="stylesheet" href="{{ asset('assets/style.css') }}" type="text/css">
    <link rel="shortcut icon" href="{{ asset('assets/logo.png') }}" type="image/png">
    <style>
        .content-wrapper {
            background-image: url({{ asset('assets/rg-bg.jpg') }});
            height: 70dvh;
            background-size: cover;
        }

        .bg-white {
            background-color: #ebebeb !important;
        }

        .mid-lay {
            min-height: unset;
        }

        .about h4 {
            text-align: center !important;
            color: #da251d;
            font-size: 2.5rem;
        }
        
        .about p {
            text-align: center !important;
            font-size: 1.2rem;
            color: #222 !important;
        }

        .custom-btn{
            width: auto;
            padding: 10px 20px;
        }
    </style>
</head>

<body>
    <section class="comp-sec">

        <div class="container">

            <div class="row">

                <div class="col-md-8 col-8 col-sm-12 col-12">

                    <div class="logo">

                        <a href="">

                            <img src="{{ asset('assets/logo.png') }}" alt="" class="logobrand">

                        </a>

                    </div>

                    <div class="comp">

                        <h5>Education Assistance to children of the Organised workers those who pay Welfare Fund</h5>

                        <p>Karnataka Labour Welfare Board</p>

                        <p>Department Of Labour, Government of Karnataka</p>

                    </div>

                </div>

                <div class="col-md-4">
                    <div class="row">

                        <div class="col-6 text-center">
                            <img src="{{ asset('assets/head102.jpeg') }}" alt=""
                                style="height:80px;object-fit:contain;">
                            <p><code>Shri Siddaramaiah</code> <br><b>Hon'able Chief Minister</b> <br> <b>Govt. of
                                    Karnataka</b></p>
                        </div>
                        <div class="col-6 text-center">
                            <img src="{{ asset('assets/head101.jpeg') }}" alt=""
                                style="height:80px;object-fit:contain;">
                            <p><code>Shri Santosh S Lad</code> <br><b>Hon'ble Minister of Labour</b> <br> <b>Govt. of
                                    Karnataka</b></p>
                        </div>


                    </div>

                </div>

            </div>

        </div>

    </section>
    <nav class="navbar navbar-expand-lg custom-navbar">
        <p class="navbar-brand text-center text-light">Karnataka Labour Welfare Board</p>
    </nav>
    <div class="content-wrapper">
        <div class="container h-100">
            <div class="col-12 row justify-content-center align-items-center h-100">
                <div id="report" class="col-lg-6 col-md-8 col-sm-12">
                    <div class="mid-lay bg-white">

                        <div class="mid-lay-img">

                            <i class="fas fa-exclamation-triangle"></i>

                        </div>

                        <div class="about text-center">

                            <h4>@yield('code')</h4>

                            <p>@yield('message')</p>

                            <a href="{{ config('app.client_url')}}" class="btn btn-secondary custom-btn">Back to Home</a>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="footercompany">

        <div class="container">

            <div class="row text-center justify-content-center">

                <div class="col-sm-4">

                    © Copyright {{ date('Y') }}. All Rights Reserved.

                </div>

            </div>

        </div>

    </div>
</body>

</html>
