function Card({ titleIcon, titleText, body }) {
  return (
    <div className="card-container">
      <div className="card-header">
        <div className="title-container">
          <span className="icon">{titleIcon}</span>
          <h1 className="title">{titleText}</h1>
        </div>
      </div>
      <div className="card-body">{body}</div>
    </div>
  );
}

export default Card;
