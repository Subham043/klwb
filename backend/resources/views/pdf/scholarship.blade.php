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
																					<th colspan="2" style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">ONLINE SCHOLARSHIP APPLICATION FORM</th>
																			</tr>
																			<tr>
																					<td colspan="2" style="text-align: center"><img class="p-image" width="100px" src="{{ public_path("logo.png") }}" alt=""><br>
																							Karnataka Labour Welfare Board<br>
																							ಸಂಘಟಿತ ಕಾರ್ಮಿಕರ ಮಕ್ಕಳಿಂಧ ಪ್ರೋತ್ಸಹ ಧನ ಸಹಾಯಕಾಗಿ ಅರ್ಜಿ
																					</td>
																			</tr>

																			<!-- student Details -->
																			<tr>
																					<th align="left" colspan="2" style="border:none;">Student Personal Details</th>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Student Name :</span> {{$application->basic_detail->name}} </td>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Father Name :</span> {{$application->basic_detail->father_name}}</td>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Mother Name :</span> {{$application->basic_detail->mother_name}} </td>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Mobile Number :</span> {{$application->basic_detail->parent_phone}}</td>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Gender :</span> {{$application->basic_detail->gender}} </td>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Graduation :</span> {{$application->mark->graduation->name}}</td>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Present Class / Course :</span> {{$application->mark->class->name}} {{$application->mark->course->name ? "/ ".$application->mark->course->name : ""}} </td>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Present School Name :</span> {{$application->institute->name}}</td>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Present School Address :</span> {{$application->institute->auth->address->address}} </td>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Student Present Address :</span> {{$application->basic_detail->address}}</td>
																			</tr>

																			<tr>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Submitted On:</span> {{$application->date->format("d M Y, h:m A")}} </td>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Application Year:</span> {{$application->application_year}} </td>
																			</tr>




																			<!-- student Previous Year Class Details -->
																			<tr>
																					<th align="left" colspan="2" style="border:none;">Previous Year Class and Marks</th>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Class Name :</span> {{$application->mark->prv_class}} </td>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Marks :</span> {{$application->mark->prv_marks}}</td>
																			</tr>
																			<tr>
																				<td colspan="2" align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Marks card Copy:</span> {{$application->mark->prv_markcard_link ? "SUBMITTED" : "NOT SUBMITTED"}} </td>
																			</tr>
																			<tr>
																					<th align="left" colspan="2" style="border:none;">Scheduled Caste / Scheduled Tribes? Certificate</th>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Scheduled Caste / Scheduled Tribes :</span> {{$application->basic_detail->is_scst ? "YES" : "NO"}}</td>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Category :</span> {{$application->basic_detail->category}}</td>
																			</tr>
																			@if($application->basic_detail->is_scst)
																			<tr>
																					<td colspan="2" align="left">Caste Certificate File / Number:</span> {{$application->basic_detail->cast_certificate_link ? "SUBMITTED" : "NOT SUBMITTED"}} {{$application->basic_detail->cast_no}} </td>
																			</tr>
																			@endif
																			<!-- Industry Details -->
																			<tr>
																					<th align="left" colspan="2" style="border:none;">Industry Detail</th>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Parent / Guardian Name :</span> {{$application->company->name}}</td>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Who is Working :</span> {{$application->company->who_working_text}}</td>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Relationship between student & parent :</span> {{$application->company->relationship}} </td>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Monthly Salary :</span> {{$application->company->msalary}} </td>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Industry Name :</span> {{$application->industry->name}} </td>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Taluk :</span> {{$application->company->taluq->name}} </td>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">District :</span> {{$application->company->district->name}} </td>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Pin Code :</span> {{$application->company->pincode}} </td>
																			</tr>

																			<!-- Aadhaar card Details -->
																			<tr>
																					<th align="left" colspan="2" style="border:none;">Aadhaar card Details</th>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Aadhaar :</span> {{$application->basic_detail->adharcard_no}}</td>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Aadhaar card File :</span> {{$application->basic_detail->adharcard_file_link ? "SUBMITTED" : "NOT SUBMITTED"}} </td>
																			</tr>

																			<tr>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Father's Aadhaar Number :</span> {{$application->basic_detail->f_adhar}}</td>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Father's Aadhaar card File :</span> {{$application->basic_detail->f_adharfile_link ? "SUBMITTED" : "NOT SUBMITTED"}} </td>
																			</tr>

																			<tr>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Mother's Aadhaar :</span> {{$application->basic_detail->m_adhar}}</td>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Mother's Aadhaar card File :</span> {{$application->basic_detail->m_adharfile_link ? "SUBMITTED" : "NOT SUBMITTED"}} </td>
																			</tr>



																			<!-- Bank Details -->
																			<tr>
																					<th align="left" colspan="2" style="border:none;">Bank Details</th>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Bank name :</span> {{$application->account->name}}</td>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Branch name :</span> {{$application->account->branch}}</td>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Account Type :</span> {{$application->account->account_type}}</td>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Account Holder name :</span> {{$application->account->holder}} </td>
																			</tr>
																			<tr>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Account Number :</span> {{$application->account->acc_no}}</td>
																					<td align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">IFSC Code No :</span> {{$application->account->ifsc}} </td>
																			</tr>
																			<tr>
																					<td colspan="2" align="left"><span style="font-weight: bold; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;">Passbook Front Page Copy :</span> {{$application->account->passbook_link ? "SUBMITTED" : "NOT SUBMITTED"}}</td>
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