import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';

const Notice = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-md mb-8">
        <Alert color="success" icon={HiInformationCircle}>
          <span className="font-medium">Notice:</span> The backend system is built using FastAPI and hosted on Deta Space. Since Deta Space is closing on October 17, 2024, this app will will stop working after that. I will either move it to a new platform or rewrite it with a different technology. Thank you!
        </Alert>
      </div>
    </div>
  );
};

export default Notice;
