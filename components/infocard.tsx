import { Card, CardBody, CardFooter } from "@nextui-org/card";

export default function InfoCard({ value, name }: { value: string; name: string }) {
  if (name.includes("Campus")) {
    if (value.includes("City")) {
      value = "City";
    } else if (value.includes("DSC")) {
      value = "DSC";
    }
  }

  return (
    <Card key={name} className="flex flex-col justify-center items-center gap-2 p-2" radius="sm" shadow="sm">
      <CardBody className="text-center text-2xl font-medium mt-2 pb-1">{value}</CardBody>
      <CardFooter className="text-small justify-center pt-0">{name}</CardFooter>
    </Card>
  );
}
