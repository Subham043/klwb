import { Heading, HeadingGroup, Text } from "rsuite";

type DetailInfoProps = {
  title: string;
  value?: string | number| JSX.Element | null;
};

export default function DetailInfo({ title, value }: DetailInfoProps) {
  return (
    <HeadingGroup className="m-0">
      <Heading level={6} className="info-heading">
        {title}
      </Heading>
      <Text>{value}</Text>
    </HeadingGroup>
  );
}
