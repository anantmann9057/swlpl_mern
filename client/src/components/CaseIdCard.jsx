export default function CaseIdCard(props) {
  return (
    <div className="m-2" key={props.key}>
      <div
        className="card text-white mb-3"
      style={{
        color:'darkcyan',
        backgroundColor:"darkcyan"
      }}
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
