import { ReactNode } from "react";
import { Panel } from "rsuite";

export type BaseCardContainerProps = {
  children?: ReactNode;
  header: ReactNode;
  class_name?: string;
  bordered?: boolean;
  shaded?: boolean;
  style?: React.CSSProperties;
};

export default function BaseCardContainer({children, header, class_name, bordered, shaded, style}: BaseCardContainerProps) {
  return (
    <Panel
      header={header}
      className={class_name}
      bordered={bordered}
      shaded={shaded}
      style={style}
    >
      {children}
    </Panel>
  );
}
