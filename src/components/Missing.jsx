import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <div>
      <div>
        <h1>Stranica nije pronađena</h1>
        <p>Stanica koju tražite nije pronađena</p>
        <div className="flexGrow">
          <Link to="/">Nazad na početnu stranicu</Link>
        </div>
      </div>
    </div>
  );
};

export default Missing;
