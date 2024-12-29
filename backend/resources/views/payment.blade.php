<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>KLWB - PAYMENT</title>
</head>
<body>
	<form id="myform" method="post" name="sbiForm" action="{{$payment_url}}">
		<input type="hidden" name="EncryptTrans" value="{{$EncryptTrans}}">
		<input type="hidden" name="merchIdVal" value ="{{$merchantId}}"/>
</form>
</body>
<script type="text/javascript">
	function submitPayuForm() {
					var sbiForm = document.forms.sbiForm;
					sbiForm.submit();
	}
	window.onload = submitPayuForm;
</script>
</html>