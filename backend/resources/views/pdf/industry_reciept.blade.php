@extends("pdf.layout.index")

@section("content")

<div id="app">
	<!-- Body form  -->
	<section class="board">
					<div class="container-wrap1">
									<div class="row m0">
													<div class="col s12 m12 l12">
																	<div class="download">
																	</div>
																	<div class="fund-reg">
																					<div class="title-track">
																									<img width="100px" src="{{ public_path("logo.png") }}" alt="">
																									<h5 class="sans_serif">K.A.S Letter(60606)</h5>
																									<h6 class="sans_serif">Payment Receipt</h6>
																					</div>
																					<div class="date-fund">
																									<p>Karnataka Labour Welfare Board Office</p>
																									<p><b class="sans_serif">Place : </b>Bangalore</p>
																									<p><b class="sans_serif">Date : </b>{{$payment->payed_on ? $payment->payed_on->format("d M Y") : ''}}</p>
																					</div>
																					<div class="receipt-detail">

																									<ul>
																													<li class="sans_serif">Recieved From <span style="text-decoration:underline;font-weight: 400;">{{$payment->industry->name ?? ''}}</span> </li>
																													<li class="sans_serif">Karnataka Labour Welfare Board  contribution fund for the Calender year  <span style="text-decoration:underline;font-weight: 400;">{{$payment->year}}</span></li>
																													<li class="sans_serif">Amount Rs: <span style="text-decoration:underline;font-weight: 400;"> {{$payment->price}} </span> </li>
																													<li class="sans_serif">Rs in Words <span style="text-decoration:underline;font-weight: 400;">{{$price_word}}</span> </li>

																													<li class="sans_serif"><small><b style="font-weight:bold;font-size:16px">Note : This is computer generated reciept signature is not required.</b> </small></li>
																									</ul>
																					</div>
																	</div>
													</div>
									</div>
					</div>
	</section>
</div>

@stop