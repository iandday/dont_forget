import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";
import { useLocation } from "react-router-dom";
import {
  archiveOutline,
  archiveSharp,
  bookmarkOutline,
  heartOutline,
  heartSharp,
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";
import "./Menu.css";
import routes from "../routes";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Inbox",
    url: "/folder/Inbox",
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: "Outbox",
    url: "/folder/Outbox",
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp,
  },
  {
    title: "Favorites",
    url: "/folder/Favorites",
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: "Archived",
    url: "/folder/Archived",
    iosIcon: archiveOutline,
    mdIcon: archiveSharp,
  },
  {
    title: "Trash",
    url: "/folder/Trash",
    iosIcon: trashOutline,
    mdIcon: trashSharp,
  },
  {
    title: "Spam",
    url: "/folder/Spam",
    iosIcon: warningOutline,
    mdIcon: warningSharp,
  },
  {
    title: "Settings",
    url: "/settings",
    iosIcon: warningOutline,
    mdIcon: warningSharp,
  },
];

//const labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu
      contentId='main'
      type='overlay'
    >
      <IonContent>
        <IonList id='inbox-list'>
          <IonListHeader>Dont Forget</IonListHeader>
          <IonNote>hi@ionicframework.com</IonNote>
          <IonMenuToggle autoHide={false} />
          {routes.map((appPage, index) => {
            return (
              <IonItem
                key={index}
                className={location.pathname === appPage.path ? "selected" : ""}
                routerLink={appPage.path}
                routerDirection='none'
                lines='none'
                detail={false}
              >
                <IonIcon
                  aria-hidden='true'
                  slot='start'
                  icon={appPage.icon}
                />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
