import board from "../resource/img/board.png";
import x from "../resource/img/x.png";
import o from "../resource/img/o.png";
import note from "../resource/img/note.png";

export function createChordImage(name, f) {
  f = f.split(",");
  let signal = [];
  let capo = 100;
  for (let i = 0; i < f.length; i++) {
    if (f[i] !== '0' && f[i] !== "x") {
      if (Number(f[i]) < capo) capo = f[i];
    }
  }
  capo = capo === 100 ? 0 : --capo;
  for (let i = 0; i < f.length; i++) {
    switch (f[i]) {
      case "x":
        signal[i] = (
          <img
            src={x}
            alt=""
            style={{
              transform: "translate(-6px, -12px)",
              marginLeft: `calc(35.2px*${i})`,
            }}
            key={i}
          />
        );
        break;
      case '0':
        signal[i] = (
          <img
            src={o}
            alt=""
            style={{
              transform: "translate(-7px, -12px)",
              marginLeft: `calc(35.2px*${i})`,
            }}
            key={i}
          />
        );
        break;
      default:
        signal[i] = (
          <img
            src={note}
            alt=""
            style={{
              transform: "translate(-14.5px, -37px)",
              marginLeft: `calc(35.2px*${i})`,
              marginTop: `calc(54.75px*${f[i] - capo})`,
            }}
            key={i}
          />
        );
    }
  }
  return (
    <div className="test" key={name}>
      <div>Chord: {name}</div>
      <div style={{ color: { capo } === 0 ? "black" : "red" }}>
        Capo: {capo}
      </div>

      <div className="board">
        <img src={board} alt="" />
        {signal[0]}
        {signal[1]}
        {signal[2]}
        {signal[3]}
        {signal[4]}
        {signal[5]}
      </div>
    </div>
  );
}
