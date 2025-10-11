import { GridSection } from "../components/GridSection";
import { SettingsModal } from "../components/SettingsModal";

export const MainPage = () => {
  return (
    <main className="mainPage">
      <GridSection />
      <SettingsModal />
    </main>
  );
};
