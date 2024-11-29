import { Text } from "rsuite";
import PdfViewer from "./PdfViewer";
import ImageViewer from "./ImageViewer";

type Props = {
	src?: string;
	name?: string;
	notFound?: string
}

export default function FileViewer(props: Props) {
	if(!props.src){
		return (
			<Text color="red">{props.notFound || 'File not found'}</Text>
		)
	}
	if(props.src.includes('.pdf')){
		return (
			<PdfViewer src={props.src} name={props.name} />
		)
	}
	return (
		<ImageViewer src={props.src} />
	)
}