import { IconButton } from "rsuite";
import classes from "./index.module.css";
import { PhotoView } from "react-photo-view";
import FileDownloadIcon from '@rsuite/icons/FileDownload';

export default function ImageViewer({ src }: { src: string | undefined }) {
  return (
    <PhotoView src={src}>
      <div className="mt-1">
        <div className="mb-1">
          <img src={src} alt="" className={classes.img} />
        </div>
        <IconButton 
          appearance="primary" 
          color="green" 
          icon={<FileDownloadIcon />} 
          onClick={(e) => {
            e.stopPropagation();
            window.open(src, "_blank");
          }}>
          Download
        </IconButton>
      </div>
    </PhotoView>
  );
}
