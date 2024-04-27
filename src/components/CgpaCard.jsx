import { Card } from 'flowbite-react';
const CgpaCard = (props) => {
  return (
    <div>
      <div className="flex align-center justify-center">
        <div className="max-w-[400px] m-4">
          <Card className="p-8">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">{props.cgpa}</h1>
            <p className="font-normal text-gray-700 dark:text-gray-400">Out of 4</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CgpaCard;
