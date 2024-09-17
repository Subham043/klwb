@extends("pdf.layout.index")

@section("content")

<section class="sec-top">
	<div class="container-wrap">
			<div class="col l12 m12 s12">
					<div class="row">
							<div class="col m12 s12 l12">

									<div class="card">
											<div class="card-content">
													<div class="form-container">


															<table class="bordered">
																	<tbody>
																			<tr>
																					<td colspan="3" style="text-align: center">ONLINE SCHOLARSHIP APPLICATION FORM</td>
																			</tr>
																			<tr>
																					<td colspan="3" style="text-align: center"><img class="p-image" width="100px" src="{{ public_path("logo.png") }}" alt=""><br>
																							Karnataka Labour Welfare Board<br><br>
																							ಸಂಘಟಿತ ಕಾರ್ಮಿಕರ ಮಕ್ಕಳಿಂಧ ಪ್ರೋತ್ಸಹ ಧನ ಸಹಾಯಕಾಗಿ ಅರ್ಜಿ
																					</td>
																			</tr>

																			<!-- student Details -->
																			<tr>
																					<th align="left" colspan="3" style="padding:25px;border:none;padding-left:15px;">Student Personal Details</th>
																			</tr>
																			<tr>
																					<td colspan="2" align="left">Student Name : {{$application->basic_detail->name}} </td>
																					<td align="left">Father Name : {{$application->basic_detail->father_name}}</td>
																			</tr>
																			<tr>
																					<td colspan="2" align="left">Mother Name : {{$application->basic_detail->mother_name}} </td>
																					<td align="left">Mobile Number : {{$application->basic_detail->parent_phone}}</td>
																			</tr>
																			<tr>
																					<td colspan="2" align="left">Gender : {{$application->basic_detail->gender}} </td>
																					<td align="left">Graduation : {{$application->mark->graduation->name}}</td>
																			</tr>
																			<tr>
																					<td colspan="2" align="left">Present class/ Course : {{$application->mark->class->name}} / {{$application->mark->course->name}} </td>
																					<td align="left">Present School Name : {{$application->present_institute_name}}</td>
																			</tr>
																			<tr>
																					<td colspan="2" align="left">Present School Address : {{$application->basic_detail->name}} </td>
																					<td align="left">Student Present Address : {{$application->basic_detail->name}}</td>
																			</tr>

																			<tr>
																					<td colspan="2" align="left">Submitted On: {{$application->basic_detail->name}} </td>
																					<td align="left">Application Year: {{$application->basic_detail->name}} </td>
																			</tr>




																			<!-- student Previous Year Class Details -->
																			<tr>
																					<th align="left" colspan="3" style="padding:25px;border:none;padding-left:15px;">Previous Year Class and Marks</th>
																			</tr>
																			<tr>
																					<td colspan="2" align="left">Class Name : {{$application->basic_detail->name}} </td>
																					<td align="left">Marks : {{$application->basic_detail->name}}</td>
																			</tr>
																			<tr>
																					<td colspan="3" align="left">Marks card Copy: {{$application->basic_detail->name}} </td>
																			</tr>
																			<tr>
																					<th align="left" colspan="3" style="padding:25px;border:none;padding-left:15px;">Scheduled Caste / Scheduled Tribes? Certificate</th>
																			</tr>
																			<tr>
																					<td colspan="2" align="left">Scheduled Caste / Scheduled Tribes : {{$application->basic_detail->name}}</td>
																					<td align="left">Category : {{$application->basic_detail->name}}</td>
																			</tr>
																			<tr>
																					<td colspan="3" align="left">Caste Certificate File/ Number: {{$application->basic_detail->name}} </td>
																			</tr>






																			<!-- Industry Details -->
																			<tr>
																					<th align="left" colspan="3" style="padding:25px;border:none;padding-left:15px;">Industry Detail</th>
																			</tr>
																			<tr>
																					<td colspan="2" align="left">Parent / Guardian Name : {{$application->basic_detail->name}}</td>
																					<td align="left">Who is Working : {{$application->basic_detail->name}}</td>
																			</tr>
																			<tr>
																					<td colspan="2" align="left">Relationship between student & parent : {{$application->basic_detail->name}} </td>
																					<td align="left">Monthly Salary : {{$application->basic_detail->name}} </td>
																			</tr>
																			<tr>
																					<td colspan="2" align="left">Industry Name : {{$application->basic_detail->name}} </td>
																					<td align="left">Taluk : {{$application->basic_detail->name}} </td>
																			</tr>
																			<tr>
																					<td colspan="2" align="left">District : {{$application->basic_detail->name}} </td>
																					<td align="left">Pin Code : {{$application->basic_detail->name}} </td>
																			</tr>

																			<!-- Aadhaar card Details -->
																			<tr>
																					<th align="left" colspan="3" style="padding:25px;border:none;padding-left:15px;">Aadhaar card Details</th>
																			</tr>
																			<tr>
																					<td colspan="2" align="left">Aadhaar : {{$application->basic_detail->name}}</td>
																					<td colspan="1" align="left">Aadhaar card File : {{$application->basic_detail->name}} </td>
																			</tr>

																			<tr>
																					<td colspan="2" align="left">Father's Aadhaar Number : {{$application->basic_detail->name}}</td>
																					<td colspan="1" align="left">Father's Aadhaar card File : {{$application->basic_detail->name}} </td>
																			</tr>

																			<tr>
																					<td colspan="2" align="left">Mother's Aadhaar : {{$application->basic_detail->name}}</td>
																					<td colspan="1" align="left">Mother's Aadhaar card File : {{$application->basic_detail->name}} </td>
																			</tr>



																			<!-- Bank Details -->
																			<tr>
																					<th align="left" colspan="3" style="padding:25px;border:none;padding-left:15px;">Bank Details</th>
																			</tr>
																			<tr>
																					<td colspan="2" align="left">Bank name : {{$application->basic_detail->name}}</td>
																					<td colspan="1" align="left">Branch name : {{$application->basic_detail->name}}</td>
																			</tr>
																			<tr>
																					<td colspan="2" align="left">Account Type : {{$application->basic_detail->name}}</td>
																					<td colspan="1" align="left">Account Holder name : {{$application->basic_detail->name}} </td>
																			</tr>
																			<tr>
																					<td colspan="2" align="left">Account Number : {{$application->basic_detail->name}}</td>
																					<td colspan="1" align="left">IFSC Code No : {{$application->basic_detail->name}} </td>
																			</tr>
																			<tr>
																					<td colspan="3" align="left">Passbook Front Page Copy : {{$application->basic_detail->name}}</td>
																			</tr>
																	</tbody>
															</table>



													</div>
											</div>
									</div>
							</div><!-- cad end -->
					</div>
			</div>
	</div>
	</div>
</section>

@stop