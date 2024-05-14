export const getCurrentWeekNumber = () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const weekNumber = Math.floor(diff / oneWeek) + 1;
  // const dayOfWeek = now.getDay() || 7;
  // const correctedWeekNumber = dayOfWeek === 1 ? weekNumber + 2 : weekNumber + 1;
  const correctedWeekNumber = weekNumber + 1;

  return (
    now.getFullYear() + "-W" + String(correctedWeekNumber).padStart(2, "0")
  );
};
export const getCurrentWeek = () => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const weekNumber = Math.floor(diff / oneWeek) + 1;
  // const dayOfWeek = now.getDay() || 7;
  // const correctedWeekNumber = dayOfWeek === 1 ? weekNumber + 1 : weekNumber ;
  const correctedWeekNumber = weekNumber;
  return (
    now.getFullYear() + "-W" + String(correctedWeekNumber).padStart(2, "0")
  );
};

export const getChartCrewSV = (d) => {
  const rd = [];
  d.forEach((e) => {
    const s = {
      crew: e.crew,
      project: e.project,
      line: e.line,
      family: e.family,
      shift: e.shift,
      ok: 0,
      nok: 0,
      na: 0,
    };
    e.tasks.forEach((i) => {
      if (i.result === "OK") {
        s.ok += 1;
      }
      if (i.result === "NA") {
        s.na += 1;
      }
      if (i.result === "NOK") {
        s.nok += 1;
      }
    });
    rd.push(s);
  });

  return rd;
};

export const colorBgCond = (d) => {
  const cal = (d.ok / (d.ok + d.nok + d.na)) * 100;

  if (cal >= 98) {
    return "#4E7C88";
  }
  if (cal < 98 && cal >= 96) {
    return "#774c03";
  }
  if (cal < 96) {
    return "#690001";
  }
};

export const getChartFamily = (d) => {
  const rd = [];
  d.forEach((e) => {
    if (rd.length === 0) {
      rd.push({
        project: e.project,
        family: e.family,
        shift: e.shift,
        ok: e.ok,
        nok: e.nok,
        na: e.na,
      });
    } else {
      const i = rd.findIndex((f) => f.family === e.family);
      if (i > -1) {
        rd[i].ok += e.ok;
        rd[i].na += e.na;
        rd[i].nok += e.nok;
      } else {
        rd.push({
          project: e.project,
          family: e.family,
          shift: e.shift,
          ok: e.ok,
          nok: e.nok,
          na: e.na,
        });
      }
    }
  });
  return rd;
};

export const getChartProject = (d) => {
  const rd = [];
  d.forEach((e) => {
    if (rd.length === 0) {
      rd.push({
        project: e.project,
        shift: e.shift,
        ok: e.ok,
        nok: e.nok,
        na: e.na,
      });
    } else {
      const i = rd.findIndex((f) => f.project === e.project);
      if (i > -1) {
        rd[i].ok += e.ok;
        rd[i].na += e.na;
        rd[i].nok += e.nok;
      } else {
        rd.push({
          project: e.project,
          shift: e.shift,
          ok: e.ok,
          nok: e.nok,
          na: e.na,
        });
      }
    }
  });
  return rd;
};

