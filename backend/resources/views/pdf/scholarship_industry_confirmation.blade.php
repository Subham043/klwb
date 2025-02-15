<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta charset="UTF-8">
    <title>Scholarship</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Noto+Serif+Kannada:wght@100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
        rel="stylesheet">



    <style>
        /* @font-face { font-family: Blanch; src: url('../../assets/fonts/Lohit-Kannada.ttf') format('truetype'); font-style: normal; font-weight:900; }
         */
        /* @import url('https://fonts.googleapis.com/css?family=Noto+Serif+Kannada&display=swap'); */
        /* @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap'); */

        body {
            font-family: "Noto Serif Kannada", sans-serif;

        }

        .center {
            text-align: center
        }

        p {
            margin: 0px;
        }

        .left {
            width: 50%;
            float: left
        }

        .clearfix {
            clear: both
        }

        #shcoolapp {
            width: 80%;
            margin: auto;
        }

        p {
            font-size: 12px
        }

        .dotted-line {
            font-family: sans-serif !important;
            font-weight: normal;
            font-size: 12px
        }

        .dashed-line {
            font-family: sans-serif !important;
            font-weight: 600;
            font-size: 12px
        }

        .bold {
            font-family: sans-serif !important;
            font-weight: bold
        }

        .bold-kannada {
            font-family: "Noto Serif Kannada", sans-serif;
            font-weight: bold
        }

        ol {
            padding-left: 15px;
            margin: 50px 0px
        }

        .mt10 {
            margin-top: 10px
        }
    </style>
</head>

<body class="">
    <div style="border:1px solid black; padding: 100px 0px; ">
        <div class="container z-depth-2 mt15" id="shcoolapp">
            <div class="row">
                <div class="col m10 push-m1">
                    <div class="col s12 center">
                        <p>ಭಾಗ-2</p>
                        <p>ಉದ್ಯೋಗ ಪ್ರಮಾಣ ಪತ್ರ</p>
                        <p>(ಉದ್ಯೋಗಾದಾತರು ಭರ್ತಿಮಾಡಿ ತಪ್ಪದೆ ದೃಡೀಕರಿಸವುದು)</p><br>
                    </div>
                    <div class="col s12">
                        <div>

                            <p>ಕುಮಾರ/ಕುಮಾರಿ <span class="dotted-line"> &nbsp; {{ $application->basic_detail->name }}
                                    &nbsp; </span> ವಿದ್ಯಾರ್ಥಿಯ ತಂದೆ/ತಾಯಿ/ಪೋಷಕರು ಆದ
                                ಶ್ರೀ/ ಶ್ರೀಮತಿ <span class="dotted-line"> &nbsp; {{ $application->company->name }} &nbsp;
                                </span> ಇವರು <span class="dotted-line">&nbsp; {{ $application->industry->name }} &nbsp;
                                </span>
                                ಸಂಸ್ಥೆಯಲ್ಲಿ ಕೆಲಸಮಾಡುತಿದ್ದು, ಇವರ ತಿಂಗಳ ಸಂಬಳ (ಎಲ್ಲಾ ಭತ್ಯೆಗಳು ಸೇರಿದಂತೆ) ರೂ<span
                                    class="dotted-line"> &nbsp; {{ $application->company->msalary }} &nbsp; </span>
                                (ಅಕ್ಷರಗಳಲ್ಲಿ) <span class="dotted-line">&nbsp; {{ $msalary_word }} &nbsp;</span>
                                ಇರುತ್ತದೆ. {{ $application->application_year - 1 }}&nbsp; ನೇ ಡಿಸೆಂಬರ್ ತಿಂಗಳ ವೇತನದಲ್ಲಿ
                                ವಂತಿಕೆ ಕಡಿತ ಮಾಡಿ ಕಾರ್ಮಿಕ ಕಲ್ಯಾಣ ಮಂಡಳಿಗೆ ಪಾವತಿಸಲಾಗಿದೆಯೆಂದು ದೃಡೀಕರಿಸಲಾಗಿದೆ.</p>
                        </div>
                        <p><span class="dotted-line">{{ $application->application_year - 1 }}</span> ನೇ,ಕ್ಯಾಲೆಂಡರ್
                            ವರ್ಷಕ್ಕೆ ಕಾರ್ಮಿಕ ಕಲ್ಯಾಣ ನಿಧಿಗೆ ವಂತಿಕೆ ಪಾವತಿಸಿರುವ ವಿವರ.</p>
                        <div>
                            <p>ವಂತಿಕೆ ಪಾವತಿಸಿದ ಮೊತ್ತ: <span class="dotted-line"> {{ $industryPayment->price }}
                                </span>&nbsp;&nbsp;&nbsp; ದಿನಾಂಕ: <span class="dotted-line">
                                    {{ $industryPayment->payed_on ? $industryPayment->payed_on->format('d M, Y') : '' }}
                                </span>&nbsp;&nbsp;&nbsp; ಚೆಕ್/ಡಿಡಿ/ಚಲನ್ ಸಂಖ್ಯೆ <span class="dotted-line">
                                    {{ $industryPayment->pay_id }} </span> </p>
                            {{-- @if ($application->application_year <= 2022)
																														<p>ವಂತಿಕೆ ಪಾವತಿಸಿದ ಮೊತ್ತ:  <span class="dotted-line"> <?php echo !empty($pays->price) ? $pays->price : ''; ?>  </span>&nbsp;&nbsp;&nbsp; ದಿನಾಂಕ:  <span class="dotted-line">  <?php echo !empty($pays->payed_on) ? date('d M, Y', strtotime($pays->payed_on)) : ''; ?> </span>&nbsp;&nbsp;&nbsp; ಚೆಕ್/ಡಿಡಿ/ಚಲನ್ ಸಂಖ್ಯೆ  <span class="dotted-line">  <?php echo !empty($pays->pay_id) ? $pays->pay_id : ''; ?> </span> </p>
						@else
						<p>ವಂತಿಕೆ ಪಾವತಿಸಿದ ಮೊತ್ತ:  <span class="dotted-line"> <?php echo !empty($info->reference_industry) && $info->mode_industry == 1 ? (!empty($pays->price) ? $pays->price : '') : $info->amount_industry; ?>  </span>&nbsp;&nbsp;&nbsp; ದಿನಾಂಕ:  <span class="dotted-line">  <?php echo !empty($info->reference_industry) && $info->mode_industry == 1 ? (!empty($pays->payed_on) ? date('d M, Y', strtotime($pays->payed_on)) : '') : date('d M, Y', strtotime($info->date_offline_industry)); ?> </span>&nbsp;&nbsp;&nbsp; ಚೆಕ್/ಡಿಡಿ/ಚಲನ್ ಸಂಖ್ಯೆ  <span class="dotted-line">  <?php echo !empty($info->reference_industry) && $info->mode_industry == 1 ? (!empty($pays->pay_id) ? $pays->pay_id : '') : $info->dd_industry; ?> </span> </p>
						@endif --}}
                        </div>
                    </div><br>

                    <div class="col s12 m5 foo-address left">
                        <p>ಸ್ಥಳ: <span class="dashed-line"> {{ $application->company->taluq->name ?? '' }} </span></p>
                        <p>ದಿನಾಂಕ: <span class="dashed-line">
                                {{ $application->company_approve ? $application->company_approve->format('d M, Y') : '' }}
                            </span></p>
                        <p>ದೂರವಾಣಿ ಸಂಖ್ಯೆ/ಮೊಬೈಲ್ ಸಂಖ್ಯೆ: <span class="dashed-line">
                                {{ $application->industry->auth->phone ?? '' }} </span></p>
                    </div>
                    <div class="col s12 m5 push-m2 foo-address left">
                        <p>ಉದ್ಯೋಗ ಸಂಸ್ಥೆಯ ಅಧಿಕೃತ ಅಧಿಕಾರಿ ಪಧಾನಾಮ/ಸಹಿ ಮತ್ತು ಮೊಹರು </p>
                        <br>
                        <span class="dashed-line"> {{ $application->industry->auth->name ?? '' }} </span>
                        <img src="{{ storage_path('app/public/' . $application->industry->auth->sign ?? '') }}"
                            width="80px" class="mr30" alt="sd">
                        <img src="{{ storage_path('app/public/' . $application->industry->auth->seal ?? '') }}"
                            width="80px" alt="df">
                    </div>
                    <div class="clearfix"></div>

                </div>
            </div>
        </div>
    </div>
</body>

</html>
