export default function CaseIdCard(props) {
  return (
    <div className="w-100">
      <div
        className="card text-white bg-info mb-3 "
       
      >
        <div className="card-header">{props.header}</div>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.cases}</p>
        </div>
      </div>
    </div>
  );
}
