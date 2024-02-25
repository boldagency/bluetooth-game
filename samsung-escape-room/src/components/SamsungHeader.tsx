import { IonRow, IonCol, IonImg } from '@ionic/react';
import './SamsungHeader.css';

interface ContainerProps {
  name: string;
}

const SamsungHeader: React.FC = () => {
  return (
    <IonRow className="ion-align-items-center ion-justify-content-center">
      <IonCol className="logo ion-align-items-center ion-justify-content-center">
        <IonImg src="/logo.svg" className='img'>
        </IonImg>
      </IonCol>
    </IonRow>
  );
};

export default SamsungHeader;
