import { Wizard } from "../Wizard/Wizard";
import Step1 from "../Wizard/Steps/Step1";
import Step2 from "../Wizard/Steps/Step2";
import Step3 from "../Wizard/Steps/Step3";
import Step4 from "../Wizard/Steps/Step4";

const AddProduct = () => {
  const steps = [
    { title: "Verified", component: Step1 },
    { title: "Proizvod", component: Step2 },
    { title: "Brand", component: Step3 },
    { title: "Reciklaza", component: Step4 },
    { title: "Lanac snabdijevanja", component: Step2 },
  ];

  return <Wizard steps={steps} />;
};

export default AddProduct;
