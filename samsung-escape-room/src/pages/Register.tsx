import { IonButton, IonCol, IonContent, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, useIonRouter } from '@ionic/react';
import './Register.css';
import SamsungHeader from '../components/SamsungHeader';
import { useRef } from 'react';
import { NativeStorage } from '@ionic-native/native-storage';

const Register: React.FC = () => {

  const registerUser = (e: any) => {
    e.preventDefault();
    if (name?.current.value !== '' && mobile?.current.value !== '' && id?.current.value !== '') {

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        redirect: "follow",
        body: JSON.stringify({
          name:name?.current.value,
          mobile:mobile?.current.value,
          id:id?.current.value
        })
      };

      fetch("https://us-central1-bluetooth-race.cloudfunctions.net/app/register-scores-classroom", requestOptions)
        .then((response) => response.json())
        .then((result) => {

          if (result.success) {
            localStorage.setItem('userId',result.data.id);
            router.push('/room');
          }
          
          
          
          console.log(result)})
        .catch((error) => console.error(error));


      
    } else {
      console.log("err", name, mobile, id)
    }
  }
  const name = useRef(undefined);
  const mobile = useRef(undefined);
  const id = useRef(undefined);
  const router = useIonRouter();
  return (
    <IonPage>

      <IonContent fullscreen className='content'>
        <SamsungHeader />
        <IonRow className="ion-align-items-center ion-justify-content-center">
          <IonCol className="ion-align-items-center ion-justify-content-center">
            <IonText>
              <h2 className='ion-text-center'>
                Complete your registration
              </h2>
            </IonText>
          </IonCol>
        </IonRow>
        <form className="ion-padding" onSubmit={registerUser}>
          <IonItem className='ion-margin-bottom'>
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput fill="outline" required type='text' ref={name} />
          </IonItem>
          <IonItem className='ion-margin-bottom'>
            <IonLabel position="stacked">Mobile Number</IonLabel>
            <IonInput fill="outline" required type="tel" ref={mobile} />
          </IonItem>
          <IonItem className='ion-margin-bottom'>
            <IonLabel position="stacked">ID Number</IonLabel>
            <IonInput fill="outline" required type="text" ref={id} />
          </IonItem>
          <IonButton className="ion-margin-top" type="submit" expand="block">
            Register
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Register;
