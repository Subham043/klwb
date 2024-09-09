import { ReactNode } from "react";
import BaseCardContainer from "./BaseCardContainer";

export type ModalCardContainerProps = {
  children?: ReactNode;
  header: ReactNode;
};

export default function ModalCardContainer({children, header}: ModalCardContainerProps) {
  return (
    <BaseCardContainer bordered={true} class_name="info-modal-panel" header={header}>
					{children}
				</BaseCardContainer>
  );
}
