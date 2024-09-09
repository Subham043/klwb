import { ReactNode } from "react";
import BaseCardContainer from "./BaseCardContainer";

export type PanelCardContainerProps = {
  children?: ReactNode;
  header: ReactNode;
  class_name?: string;
};

export default function PanelCardContainer({
  children,
  header,
  class_name,
}: PanelCardContainerProps) {
  return (
    <BaseCardContainer
      bordered={true}
      shaded={true}
      class_name={class_name}
      header={header}
    >
      {children}
    </BaseCardContainer>
  );
}
