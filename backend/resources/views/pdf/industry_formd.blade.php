@extends("pdf.layout.index")

@section("content")

<div id="app">
	<!-- Body form  -->
	<section class="board" style="padding:10px 10px 0px;">
					<div class="container-wrap1">
									<div class="row m0">
													<div class="col s12 m12">
																	<div class="formd-reg">
																					<div class="form-receipt">
																									<h3>FORM -'D'</h3>
																									<p>STATEMENT OF EMPLOYER'S AND EMPLOYEE'S CONTRIBUTION TO BE SENT BY THE EMPLOYER BY 15th JANUARY EVERY YEAR</p>
																					</div>
																					<!-- address detail -->
																					<div class="addre-pps">
																						<div class="table-form">
																										<table class="table-pp ">
																														<thead>
																																		<tr>
																																						<th width="70px">S.No</th>
																																						<th>Title</th>
																																						<th>Description</th>
																																		</tr>
																														</thead>
																														<tbody>
																																		<tr>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">1</td>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">Name & Address of the Establishment Total no. of units to be mentioned</td>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">{{$payment->industry->name ?? ''}}</td>
																																		</tr>
																																		<tr>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">2</td>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">Name of the Employers</td>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">{{$auth->name}}</td>
																																		</tr>
																																		<tr>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">3</td>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">Total No. of the Employees Whose Name & stand in the Establishment Register as on 31<sup>st</sup>December {{$payment->year}}</td>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">{{$payment->male + $payment->female}}</td>
																																		</tr>
																																		<tr>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">4</td>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">Employees Contribution @Rs.20</td>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">{{($payment->male + $payment->female)*20}}</td>
																																		</tr>
																																		<tr>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">5</td>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">Employer's Contribution @Rs. 40</td>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">{{($payment->male + $payment->female)*40}}</td>
																																		</tr>
																																		<tr>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">6</td>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">Total No. of the Items 4 & 5</td>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">{{(($payment->male + $payment->female)*20) + (($payment->male + $payment->female)*40)}}</td>
																																		</tr>
																																		<tr>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">7</td>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">Wether the Contribution is sent by Payment in favour of the Welfare Commissioner, Banglore</td>
																																						<td style="padding-left:10px !important;padding-right:10px !important;">
																																										<span><b>Amount</b> : {{$payment->price}}</span><br>
																																										<span><b>Interest</b> : {{$payment->interest}}</span><br>
																																										<span><b>Payment ID</b>   : {{$payment->pay_id}}</span><br>
																																										<span><b>Date :</b> {{$payment->payed_on->format("d M Y")}}</span>
																																						</td>
																																		</tr>
																														</tbody>
																										</table>

																										<div class="row">
																														<div class="col l12 m12 s12">
																																		<div class="place-date">
																																							<p><b>Place :</b>  {{$auth->city->name ?? ''}}</p>
																																						<div class="sign-emp">
																																					
																																							<div style="width:500px;float:right" >
																																							<img src="{{storage_path('app/public/'.$auth->sign)}}" class="img-responsive sign-w " alt="" style="max-width:150px"  >
																																							<img src="{{storage_path('app/public/'.$auth->seal)}}" class="img-responsive sign-w " alt="" style="max-width:150px">
																																							<h2>Signature of Employer And seal</h2>
																																							</div>
																																							<div style="clear:both:"></div>
																																							
																																						
																																						
																																			</div>
																																		</div>
																														</div>
																														<!-- <div class="col l12 m12 s12">
																																		<div class="form-note">
																																						<h6>Note :-</h6>
																																						<ol>
																																										<li>NEFT State Bank of India SB A/c No:30428019173 IFSC Code SBIN0040605 Mathikere Road Branch</li>
																																										<li>Syndicate Bank A/c No:04282010181335 IFSC Code SYNB0000428,Yeshwanthpura,Banglore.</li>
																																						</ol>

																																		</div>
																														</div> -->
																										</div>
																						</div>
																					</div>
																	</div>
													</div>
									</div>
					</div>
	</section>

	<!-- End Body form  -->

	<!-- End Body form  -->
	<!-- footer -->
	<!-- End footer -->
</div>

@stop