import { Wizard } from "../Wizard/Wizard";
import Step1 from "../Wizard/Steps/Step1";
import Step2 from "../Wizard/Steps/Step2";

const AddProduct = () => {
  const steps = [Step1, Step2];

  return <Wizard steps={steps} />;
};

export default AddProduct;
