import { ReactNode } from "react";
import BaseCardContainer from "./BaseCardContainer";

export type MainCardContainerProps = {
  children?: ReactNode;
  header: ReactNode;
		style?: React.CSSProperties;
		class_name?: string;
		bordered?: boolean;
  shaded?: boolean;
};

export default function MainCardContainer({children, header, class_name, bordered=true, shaded=true, style}: MainCardContainerProps) {
  return (
    <BaseCardContainer bordered={bordered} shaded={shaded} style={style} class_name={`info-modal-panel ${class_name ? class_name : ''}`} header={header}>
					{children}
				</BaseCardContainer>
  );
}
