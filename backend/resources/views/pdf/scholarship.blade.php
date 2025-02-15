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
																					<th colspan="2" style="text-align: center;" class="sans_serif">ONLINE SCHOLARSHIP APPLICATION FORM</th>
																			</tr>
																			<tr>
																					<td colspan="2" style="text-align: center"><img class="p-image" width="100px" src="{{ public_path("logo.png") }}" alt=""><br>
																							Karnataka Labour Welfare Board<br>
																							ಸಂಘಟಿತ ಕಾರ್ಮಿಕರ ಮಕ್ಕಳಿಂಧ ಪ್ರೋತ್ಸಹ ಧನ ಸಹಾಯಕಾಗಿ ಅರ್ಜಿ
																					</td>
																			</tr>

																			<!-- student Details -->
																			<tr>
																					<th align="left" colspan="2" style="border:none;" class="sans_serif">Student Personal Details</th>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Student Name :</span> {{$application->basic_detail->name}} </td>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Father Name :</span> {{$application->basic_detail->father_name}}</td>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Mother Name :</span> {{$application->basic_detail->mother_name}} </td>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Mobile Number :</span> {{$application->basic_detail->parent_phone}}</td>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Gender :</span> {{$application->basic_detail->gender}} </td>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Graduation :</span> {{$application->mark->graduation->name}}</td>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Present Class / Course :</span> {{$application->mark->class->name}} {{$application->mark->course->name ? "/ ".$application->mark->course->name : ""}} </td>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Present School Name :</span> {{$application->institute->name}}</td>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Present School Address :</span> {{$application->institute->auth->address->address}} </td>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Student Present Address :</span> {{$application->basic_detail->address}}</td>
																			</tr>

																			<tr>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Submitted On:</span> {{$application->date ? $application->date->format("d M Y, h:m A") : ''}} </td>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Application Year:</span> {{$application->application_year}} </td>
																			</tr>




																			<!-- student Previous Year Class Details -->
																			<tr>
																					<th align="left" colspan="2" style="border:none;" class="sans_serif">Previous Year Class and Marks</th>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Class Name :</span> {{$application->mark->prv_class}} </td>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Marks :</span> {{$application->mark->prv_marks}}</td>
																			</tr>
																			<tr>
																				<td colspan="2" align="left"><span style="font-weight: bold;" class="sans_serif">Marks card Copy:</span> {{$application->mark->prv_markcard_link ? "SUBMITTED" : "NOT SUBMITTED"}} </td>
																			</tr>
																			<tr>
																					<th align="left" colspan="2" style="border:none;" class="sans_serif">Scheduled Caste / Scheduled Tribes? Certificate</th>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Scheduled Caste / Scheduled Tribes :</span> {{$application->basic_detail->is_scst ? "YES" : "NO"}}</td>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Category :</span> {{$application->basic_detail->category}}</td>
																			</tr>
																			@if($application->basic_detail->is_scst)
																			<tr>
																					<td colspan="2" align="left">Caste Certificate File / Number:</span> {{$application->basic_detail->cast_certificate_link ? "SUBMITTED" : "NOT SUBMITTED"}} {{$application->basic_detail->cast_no}} </td>
																			</tr>
																			@endif
																			<!-- Industry Details -->
																			<tr>
																					<th align="left" colspan="2" style="border:none;" class="sans_serif">Industry Detail</th>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Parent / Guardian Name :</span> {{$application->company->name}}</td>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Who is Working :</span> {{$application->company->who_working_text}}</td>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Relationship between student & parent :</span> {{$application->company->relationship}} </td>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Monthly Salary :</span> {{$application->company->msalary}} </td>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Industry Name :</span> {{$application->industry->name}} </td>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Taluk :</span> {{$application->company->taluq->name}} </td>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">District :</span> {{$application->company->district->name}} </td>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Pin Code :</span> {{$application->company->pincode}} </td>
																			</tr>

																			<!-- Aadhaar card Details -->
																			<tr>
																					<th align="left" colspan="2" style="border:none;" class="sans_serif">Aadhaar card Details</th>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Aadhaar :</span> {{$application->basic_detail->adharcard_no}}</td>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Aadhaar card File :</span> {{$application->basic_detail->adharcard_file_link ? "SUBMITTED" : "NOT SUBMITTED"}} </td>
																			</tr>

																			<tr>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Father's Aadhaar Number :</span> {{$application->basic_detail->f_adhar}}</td>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Father's Aadhaar card File :</span> {{$application->basic_detail->f_adharfile_link ? "SUBMITTED" : "NOT SUBMITTED"}} </td>
																			</tr>

																			<tr>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Mother's Aadhaar :</span> {{$application->basic_detail->m_adhar}}</td>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Mother's Aadhaar card File :</span> {{$application->basic_detail->m_adharfile_link ? "SUBMITTED" : "NOT SUBMITTED"}} </td>
																			</tr>



																			<!-- Bank Details -->
																			<tr>
																					<th align="left" colspan="2" style="border:none;" class="sans_serif">Bank Details</th>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Bank name :</span> {{$application->account->name}}</td>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Branch name :</span> {{$application->account->branch}}</td>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Account Type :</span> {{$application->account->account_type}}</td>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Account Holder name :</span> {{$application->account->holder}} </td>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">Account Number :</span> {{$application->account->acc_no}}</td>
																					<td align="left"><span style="font-weight: bold;" class="sans_serif">IFSC Code No :</span> {{$application->account->ifsc}} </td>
																			</tr>
																			<tr>
																					<td colspan="2" align="left"><span style="font-weight: bold;" class="sans_serif">Passbook Front Page Copy :</span> {{$application->account->passbook_link ? "SUBMITTED" : "NOT SUBMITTED"}}</td>
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