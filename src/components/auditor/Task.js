import c from "./Home.module.css";

const Task = (p) => {
  return (
    <div className={c.taskContariner}>
      <div className={c.details}>
        <div className={c.sequ}>
          <span className={c.til}>Seq</span>
          <span className={c.dataDet}>5</span>
        </div>
        <div className={c.cat}>
          <span className={c.til}>category</span>
          <span className={c.dataDet}>process</span>
        </div>
        <div className={c.task}>
          <span className={c.til}>task</span>
          <span className={c.dataDet}>
            Traitement de produit & compensant non conforme ( Chaque 2 heurs)
          </span>
        </div>
      </div>
      <div className={c.action}>
        <div className={c.sequ}>ok</div>
        <div className={c.sequ}>nok</div>
        <div className={c.sequ}>na</div>
      </div>
    </div>
  );
};

export default Task;
