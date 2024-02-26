import { IonRow, IonCol, IonImg, IonText } from '@ionic/react';
import './SamsungHeader.css';

interface ContainerProps {
  name: string;
}

const SamsungHeader: React.FC = () => {
  return (
    <>
      <IonRow className="ion-align-items-center ion-justify-content-center">
        <IonCol className="logo ion-align-items-center ion-justify-content-center">
          <IonImg src="/logo.svg" className='img'>
          </IonImg>
        </IonCol>
      </IonRow>
      <IonRow className="ion-align-items-center ion-justify-content-center">
        <IonCol className="title ion-align-items-center ion-justify-content-center">
          <IonText>
            <h2 className='ion-text-center'>
              Galaxy AI<br></br>
              Escape Room
            </h2>
          </IonText>
        </IonCol>
      </IonRow>

    </>

  );
};

export default SamsungHeader;
