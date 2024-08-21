import classes from "./index.module.css";
import { PhotoView } from "react-photo-view";

export default function ImageViewer({ src }: { src: string | undefined }) {
  return (
    <PhotoView src={src}>
      <img src={src} alt="" className={classes.img} />
    </PhotoView>
  );
}
