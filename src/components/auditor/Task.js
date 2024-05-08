import c from "./Home.module.css";

const styleBg = (s) => {
  if (s === "NA") {
    return {
      backgroundColor: "#929D96",
    };
  }
  if (s === "NOK") {
    return {
      backgroundColor: "#CF3335",
    };
  }
  if (s === "OK") {
    return {
      backgroundColor: "#006B63",
    };
  }
};


const Task = (p) => {
    console.log(p.data);
    const onClickHandler=(e, t)=>{
        p.setResult(p.crew, p.data._id, t, )
    }
  return (
    <div className={c.taskContariner}>
      <div className={c.details} style={styleBg(p.data.result)}>
        <div className={c.cat}>
          <span className={c.til}>cat:</span>
          <span className={c.dataDet}>{p.data.category}</span>
        </div>
        <div className={c.sequ}>
          <span className={c.til}>Seq:</span>
          <span className={c.dataDet}>{p.data.sequence} </span>
        </div>
        <div className={c.task}>
          <span className={c.til}>task:</span>
          <span className={c.dataDet}>{p.data.task}</span>
        </div>
      </div>
      <div className={c.action}>
        <div
          className={c.sequsok}
          style={
            p.data.result === "OK"
              ? {
                  backgroundColor: "#006B63",
                  color:'white'
                }
              : {}
          }
          onClick={e=>onClickHandler(e, 'OK')}
        >
          ok
        </div>
        <div
          className={c.sequs}
          style={
            p.data.result === "NA"
              ? {
                  backgroundColor: "#929D96",
                }
              : {}
          }
          onClick={e=>onClickHandler(e, 'NA')}
        >
          na
        </div>
        <div
          className={c.sequsnk}
          style={
            p.data.result === "NOK"
              ? {
                  backgroundColor: "#CF3335",
                  color:'white'
                }
              : {}
          }
          onClick={e=>onClickHandler(e, 'NOK')}
        >
          nok
        </div>
      </div>
    </div>
  );
};

export default Task;
