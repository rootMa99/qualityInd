import c from "./Home.module.css";

const Task = (p) => {
  console.log(p.data);
  return (
    <div className={c.taskContariner}>
      <div className={c.details}>
        <div className={c.sequ}>
          <span className={c.til}>Seq</span>
          <span className={c.dataDet}>{p.data.sequence} </span>
        </div>
        <div className={c.cat}>
          <span className={c.til}>category</span>
          <span className={c.dataDet}>{p.data.category}</span>
        </div>
        <div className={c.task}>
          <span className={c.til}>task</span>
          <span className={c.dataDet}>{p.data.task}</span>
        </div>
      </div>
      <div className={c.action}>
        <div className={c.sequs}>ok</div>
        <div className={c.sequs}>na</div>
        <div className={c.sequs}>nok</div>
      </div>
    </div>
  );
};

export default Task;
