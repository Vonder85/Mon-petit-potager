import PlanteService from "../../services/PlanteService";

export const Home = () => {
  PlanteService.getPlantes();
  return <></>;
};
