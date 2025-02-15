export default function CaseIdCard(props) {
  return (
    <div className="m-2">
      <div
        className="card text-white bg-info mb-3"
     
      >
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <div>
            {props.icon}
          </div>
          <p className="card-text">{props.cases}</p>
        </div>
      </div>
    </div>
  );
}
