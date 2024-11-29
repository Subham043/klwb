<!DOCTYPE html>
<html >
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta charset="UTF-8">
    <title>Scholarship</title>
 
    

    <style>
        /* @font-face { font-family: Blanch; src: url('../../assets/fonts/Lohit-Kannada.ttf') format('truetype'); font-style: normal; font-weight:900; }
         */
        /* @import url('https://fonts.googleapis.com/css?family=Noto+Serif+Kannada&display=swap'); */
								@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@100..900&family=Noto+Serif+Kannada:wght@100..900&display=swap');
        body { 
            font-family: "Noto Sans Kannada", sans-serif; 
           
        }
        .center{ text-align:center }
        p{margin:0px;}
        .left{width:50%; float:left}
        .clearfix{clear:both}
        #shcoolapp{
            width:80%;
            margin:auto;
        }
								p{
									font-size:12px
								}
        .dotted-line{
            font-weight:normal;
            font-size:12px
        }
        .dashed-line{
            font-weight:600;
            font-size:12px
        }
        .bold{
            font-weight:bold
        }
        ol{
            padding-left:15px;
            margin:50px 0px
        }
        .mt10{
            margin-top:10px
        }
    </style>
</head>
<body class="">
<div style="border:1px solid black; padding: 100px 0px; ">
	<div class="container z-depth-2 mt15" id="shcoolapp">
					<div class="row">
									<div class="col m10 push-m1">
													<div class="col s12">
																	<p class="bold center">ಭಾಗ-3</p>
																	<p class="bold center">ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಯ ಮುಖ್ಯಸ್ಥರ ಪ್ರಮಾಣ ಪತ್ರ</p>
																	<p class="center">(ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಯವರು ಭರ್ತಿ ಮಾಡಿ ತಪ್ಪದೇ ದೃಡೀಕರಿಸವುದು)</p>
													</div>
													<div class="col s12">
																	<ol>
																					<li>
																									<div>
																													<p>ಕುಮಾರ/ಕುಮಾರಿ <span class="dotted-line"> {{$application->basic_detail->name}} </span> ಇವರು ಕಳೆಧ ಸಾಲಿನಲ್ಲಿ
																													ನಡೆದ <span class="dotted-line"> {{$application->mark->prv_class}} </span> ತರಗತಿಯ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಶೇಕಡಾ <span class="dotted-line"> {{$application->mark->prv_marks}}% </span>  ಅಂಕಗಳನ್ನು
																													ಪಡೆದ್ದು   ತೇರ್ಗಡೆಯಾಗಿರುತಾರೆ.</p>
																									</div>
																					</li>
																					<li>
																									<div>
																													<p>{{date('Y', strtotime('-1 years')).'-'.date('Y')}}ನೇ ಶೈಕ್ಷಣಿಕ ಸಾಲಿನಲ್ಲಿ <span class="dotted-line"> {{$application->mark->graduation->name ?? ''}} {{$application->mark->course->name ?? ''}} {{$application->mark->class->name ?? ''}} </span> ತರಗತಿಯಲ್ಲಿ ವ್ಯಾಸಂಗ ಮಾಡುತ್ತಿದ್ದಾರೆಂದು ದೃಡೀಕರಿಸಲಾಗಿದೆ.</p>
																									</div>
																					</li>
																	</ol>
													</div>
													<div class="col s12 m5 foo-address left">
																	
																	<p>ಜಿಲ್ಲೆ: <span class="dashed-line"> {{$application->mark->district->name ?? ''}} </span></p> 
																	<p>ಸ್ಥಳ: <span class="dashed-line"> {{$application->mark->taluq->name ?? ''}} </span></p>
																	<p>ದಿನಾಂಕ: <span class="dashed-line"> {{$application->school_approve->format('d M, Y') ?? ''}} </span></p>
																	<p>ದೂರವಾಣಿ ಸಂಖ್ಯೆ (STD CODE ಸಹಿತ): <span class="dashed-line"> {{$application->institute->auth->phone ?? ''}} </span></p>
													</div>
													<div class="col s12 m5 push-m2 foo-address left">
																	<img src="{{storage_path('app/public/'.$application->institute->auth->principal_signature ?? '')}}" width="80px" class="mr30" alt="">
																	<img src="{{storage_path('app/public/'.$application->institute->auth->seal ?? '')}}" width="80px" alt="">
																	<p class="mt10">ಮುಖ್ಯೋಪಾಧ್ಯಾರ/ಪ್ರಾಂಶುಪಾಲರ ಸಹಿ ಹಾಗು ಮೊಹರು</p>
																	<br><br>
													</div>
													<div class="clearfix"></div>
													<div class="col s12 center foo-address"><p>( ವಿ.ಸೂ: ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಯ ಪೂರ್ಣ ವಿಳಾಸವುಳ್ಳ ಮೊಹರು ತಪ್ಪದೆ ಹಾಕುವುದು. )</p></div>
									</div>
					</div>
	</div>

</div>
</body>
</html>