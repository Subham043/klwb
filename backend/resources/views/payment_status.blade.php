<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<meta http-equiv="refresh" content="0;{{	$redirect_url }}">
	<title>KLWB - PAYMENT STATUS</title>
	<style>
		/* HTML: <div class="loader"></div> */
		.container{
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100dvh;
					width: 100dvw;
					max-width: 100%;
					max-height: 100%;
		}
			.loader {
					width: 50px;
					aspect-ratio: 1;
					border-radius: 50%;
					border: 8px solid lightblue;
					border-right-color: orange;
					animation: l2 1s infinite linear;
			}
			@keyframes l2 {to{transform: rotate(1turn)}}
	</style>
</head>
<body>
	<div class="container">
		<div class="loader"></div>
	</div>
</body>
</html>