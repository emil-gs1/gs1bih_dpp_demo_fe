import { Wizard } from "../Wizard/Wizard";
import Step1 from "../Wizard/Steps/Step1";
import Step2 from "../Wizard/Steps/Step2";
import Step3 from "../Wizard/Steps/Step3";
import Step4 from "../Wizard/Steps/Step4";
import Step5 from "../Wizard/Steps/Step5";
import Step6 from "../Wizard/Steps/Step6";
import Step7 from "../Wizard/Steps/Step7";
import Step8 from "../Wizard/Steps/Step8";
import Step9 from "../Wizard/Steps/Step9";
import GenerateQrCode from "../Wizard/Steps/GenerateQrCode";

const AddProduct = () => {
  const steps = [
    { title: "Verified By GS1", component: Step1 },
    { title: "Proizvod", component: Step2 },
    { title: "Brand", component: Step3 },
    { title: "Reciklaža", component: Step4 },
    { title: "Njega proizvoda", component: Step5 },
    { title: "Compliance", component: Step6 },
    { title: "Digital Id", component: Step7 },
    { title: "Materijal", component: Step8 },
    { title: "Lanac snabdijevanja", component: Step9 },
    { title: "QR Kod", component: GenerateQrCode },
  ];

  return <Wizard steps={steps} />;
};

export default AddProduct;
