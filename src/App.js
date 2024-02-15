import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
const gua64Str = [
  "乾䷀",
  "坤䷁",
  "屯䷂",
  "蒙䷃",
  "需䷄",
  "讼䷅",
  "师䷆",
  "比䷇",
  "小畜䷈",
  "履䷉",
  "泰䷊",
  "否䷋",
  "同人䷌",
  "大有䷍",
  "谦䷎",
  "豫䷏",
  "随䷐",
  "蛊䷑",
  "临䷒",
  "观䷓",
  "噬嗑䷔",
  "贲䷕",
  "剥䷖",
  "复䷗",
  "无妄䷘",
  "大畜䷙",
  "颐䷚",
  "大过䷛",
  "坎䷜",
  "离䷝",
  "咸䷞",
  "恒䷟",
  "遁䷠",
  "大壮䷡",
  "晋䷢",
  "明夷䷣",
  "家人䷤",
  "睽䷥",
  "蹇䷦",
  "解䷧",
  "损䷨",
  "益䷩",
  "夬䷪",
  "姤䷫",
  "萃䷬",
  "升䷭",
  "困䷮",
  "井䷯",
  "革䷰",
  "鼎䷱",
  "震䷲",
  "艮䷳",
  "渐䷴",
  "归妹䷵",
  "丰䷶",
  "旅䷷",
  "巽䷸",
  "兑䷹",
  "涣䷺",
  "节䷻",
  "中孚䷼",
  "小过䷽",
  "既济䷾",
  "未济䷿",
];
const gua64 = gua64Str.map((item) => {
  return { name: item.slice(0, item.length - 1), str: item };
});

const guaDepStr = [
  "乾为天",
  "坤为地",
  "水雷屯",
  "山水蒙",
  "水天需",
  "天水讼",
  "地水师",
  "水地比",
  "风天小畜",
  "天泽履",
  "地天泰",
  "天地否",
  "天火同人",
  "火天大有",
  "地山谦",
  "雷地豫",
  "泽雷随",
  "山风蛊",
  "地泽临",
  "风地观",
  "火雷噬嗑",
  "山火贲",
  "山地剥",
  "地雷复",
  "天雷无妄",
  "山天大畜",
  "山雷颐",
  "泽风大过",
  "坎为水",
  "离为火",
  "泽山咸",
  "雷风恒",
  "天山遁",
  "雷天大壮",
  "火地晋",
  "地火明夷",
  "风火家人",
  "火泽睽",
  "水山蹇",
  "雷水解",
  "山泽损",
  "风雷益",
  "泽天夬",
  "天风姤",
  "泽地萃",
  "地风升",
  "泽水困",
  "水风井",
  "泽火革",
  "火风鼎",
  "震为雷",
  "艮为山",
  "风山渐",
  "雷泽归妹",
  "雷火丰",
  "火山旅",
  "巽为风",
  "兑为泽",
  "风水涣",
  "水泽节",
  "风泽中孚",
  "雷山小过",
  "水火既济",
  "火水未济",
];
const guaDep = guaDepStr.map((item) => {
  if (item[1] === "为") {
    return { name: item[0], start: item[2], end: item[2] };
  } else {
    return { name: item.slice(2), start: item[0], end: item[1] };
  }
});
const guaMap = gua64.map((item) => {
  return {
    name: item["name"],
    str: item["str"],
    start: guaDep.filter((item2) => item2["name"] === item["name"])[0][
      "start"
    ],
    end: guaDep.filter((item2) => item2["name"] === item["name"])[0]["end"],
  };
});

function App() {
  const [tokens, setTokens] = useState([]);

  const [showGuas, setShowGuas] = useState(guaMap);
  const addToken = (a) => {
    if (tokens.length === 3) {
      setTokens([]);
      return;
    }
    setTokens([...tokens, a.target.innerText]);
  };
  useEffect(() => {
    document.title = '六十四卦头尾串起名器';
  }, []);
  useEffect(() => {
    if (tokens.length === 0) {
      setShowGuas(guaMap);
    }
    if (tokens.length === 1) {
      const result = guaMap.filter(
        (item) => item["name"] === tokens[0].slice(0, tokens[0].length - 1)
      );
      
     
      const nextToken = result[0]["end"];
      const result2 =guaMap.filter(
        (item) => item["start"] === nextToken
      );
      setShowGuas(result2);
    }
    if (tokens.length === 2) {
      const result1 =guaMap.filter(
        (item) => item["name"] === tokens[0].slice(0, tokens[0].length - 1)
      );
      //  Map.groupBy(
      //   guaMap,
      //   ({ name }) => name === tokens[0].slice(0, tokens[0].length - 1)
      // );
      const result2 = guaMap.filter(
        (item) => item["name"] === tokens[1].slice(0, tokens[1].length - 1)
      );
      
      // Map.groupBy(
      //   guaMap,
      //   ({ name }) => name === tokens[1].slice(0, tokens[1].length - 1)
      // );
      const startToken = result1[0]["start"];
      const nextToken = result2[0]["end"];
      const result3 = guaMap.filter(
        ({ start, end }) => start === nextToken && end === startToken
      );
      // Map.groupBy(
      //   guaMap,
      //   ({ start, end }) => start === nextToken && end === startToken
      // );
      setShowGuas(result3);
    }
    if (tokens.length === 3) {
      setShowGuas([{ str: "清空" }]);
    }
  }, [tokens]);
  return (
    <div className="App">
      <header className="App-header">
      <p>六十四卦头尾串起名器</p>
      <div className="comment"> <p>六十四卦由八卦衍生而出，每一卦均有八卦中的两卦顺序而成。如“鼎益丰”三卦，鼎卦以离卦和巽卦组成，益卦以巽卦和震卦组成，丰卦以震卦和离卦组成，三卦头尾相连，象征往来无穷</p></div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>{tokens.map((item, index) => item)}</p>
        <hr></hr> 
       <div className="comment"> <p>点击卦象，串起卦象</p></div>
        <div className="Guas">
        {showGuas.map((item, index) => (
          <div key={index} onClick={addToken}>
            {item["str"]}
          </div>
        ))}{" "}
        </div>
      </header>
    </div>
  );
}

export default App;
