@extends("emails.layouts.index")

@section("content")

				<div class="u-row-container" style="padding: 0px;background-color: transparent">
								<div class="u-row"
												style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #00437d;">
												<div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
																<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #00437d;"><![endif]-->

																<!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
																<div class="u-col u-col-100"
																				style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
																				<div style="height: 100%;width: 100% !important;">
																								<!--[if (!mso)&(!IE)]><!-->
																								<div
																												style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
																												<!--<![endif]-->

																												<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0"
																																cellspacing="0" width="100%" border="0">
																																<tbody>
																																				<tr>
																																								<td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 10px;font-family:'Lato',sans-serif;"
																																												align="left">

																																												<div
																																																style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
																																																<p style="font-size: 14px; line-height: 140%; text-align: center;">
																																																				<span
																																																								style="font-size: 28px; line-height: 39.2px; color: #ffffff; font-family: Lato, sans-serif;">Scholarship Approved </span>
																																																</p>
																																												</div>

																																								</td>
																																				</tr>
																																</tbody>
																												</table>

																												<!--[if (!mso)&(!IE)]><!-->
																								</div><!--<![endif]-->
																				</div>
																</div>
																<!--[if (mso)|(IE)]></td><![endif]-->
																<!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
												</div>
								</div>
				</div>

				<div class="u-row-container" style="padding: 0px;background-color: transparent">
								<div class="u-row"
												style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
												<div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
																<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

																<!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
																<div class="u-col u-col-100"
																				style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
																				<div style="height: 100%;width: 100% !important;">
																								<!--[if (!mso)&(!IE)]><!-->
																								<div
																												style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
																												<!--<![endif]-->

																												<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0"
																																cellspacing="0" width="100%" border="0">
																																<tbody>
																																				<tr>
																																								<td style="overflow-wrap:break-word;word-break:break-word;padding:20px 20px 10px;font-family:'Lato',sans-serif;"
																																												align="left">

																																												<div
																																																style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
																																																<p style="font-size: 14px; line-height: 140%;">
																																																				<span
																																																								style="font-size: 18px; line-height: 25.2px; color: #666666;">Dear
																																																								{{ $name ?? 'Student' }},</span>
																																																</p>
																																																<p style="font-size: 14px; line-height: 140%;">
																																																				&nbsp;</p>
																																																<p style="font-size: 14px; line-height: 140%;">
																																																				<span style="font-size: 18px; line-height: 25.2px; color: #666666;">{{$msg}}</span>
																																																</p>
																																																<p style="font-size: 14px; line-height: 140%;">
																																																				&nbsp;</p>
																																												</div>

																																								</td>
																																				</tr>
																																</tbody>
																												</table>

																												<table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0"
																																cellspacing="0" width="100%" border="0">
																																<tbody>
																																				<tr>
																																								<td style="overflow-wrap:break-word;word-break:break-word;padding:20px 20px 10px;font-family:'Lato',sans-serif;"
																																												align="left">

																																												<div
																																																style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
																																																<p style="font-size: 14px; line-height: 140%;">
																																																				<span
																																																								style="color: #888888; font-size: 14px; line-height: 19.6px;"><em><span
																																																																style="font-size: 16px; line-height: 22.4px;">Please
																																																																ignore this email if you did not
																																																																register.</span></em></span><br /><span
																																																								style="color: #888888; font-size: 14px; line-height: 19.6px;"><em><span
																																																																style="font-size: 16px; line-height: 22.4px;">&nbsp;</span></em></span>
																																																</p>
																																												</div>

																																								</td>
																																				</tr>
																																</tbody>
																												</table>

																												<!--[if (!mso)&(!IE)]><!-->
																								</div><!--<![endif]-->
																				</div>
																</div>
																<!--[if (mso)|(IE)]></td><![endif]-->
																<!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
												</div>
								</div>
				</div>
@stop
