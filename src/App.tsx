import { useState, useEffect } from "react"; // ← useEffect を追加！
import { Header } from "./components/Header";
import { LearningLog } from "./components/LearningLog";
import { AddLogForm } from "./components/AddLogForm";

type Learning = {
  id: number;
  chapter: number;
  title: string;
  isCompleted: boolean;
};

function App() {
  const initiallogs: Learning[] = [
    { id: 1, chapter: 0, title: "環境構築とTypeScriptの基本", isCompleted: true },
    { id: 2, chapter: 1, title: "コンポーネントとPropsの型", isCompleted: true },
    { id: 3, chapter: 2, title: "State（状態）管理とイベントハンドリング", isCompleted: false },
  ];

  // ① 初期値の設定：LocalStorage に保存されたデータがあればそれを読み込み、無ければ initiallogs を使う
  const [logs, setLogs] = useState<Learning[]>(() => {
    const savedLogs = localStorage.getItem("learning_logs");
    if (savedLogs) {
      return JSON.parse(savedLogs); // 文字列から元の配列オブジェクトに復元
    }
    return initiallogs;
  });

  // ② logs の値が更新されるたびに、自動で LocalStorage に保存する
  useEffect(() => {
    localStorage.setItem("learning_logs", JSON.stringify(logs));
  }, [logs]);

  const toggleComplete = (targetId: number): void => {
    const updatedLogs = logs.map((item) => {
      if (item.id === targetId) {
        return { ...item, isCompleted: !item.isCompleted };
      }
      return item;
    });
    setLogs(updatedLogs);
  };

  const addLog = (title: string, chapter: number): void => {
    const newLog: Learning = {
      id: Date.now(),
      chapter: chapter,
      title: title,
      isCompleted: false,
    };
    setLogs([...logs, newLog]);
  };

  const deleteLog = (targetId: number): void => {
  // 指定された targetId 以外の要素だけで新しい配列を作る（＝指定したIDを削除）
  const updatedLogs = logs.filter((item) => item.id !== targetId);
  setLogs(updatedLogs); // State更新 ➔ useEffectによってLocalStorageも自動更新！
};

  const completedCount = logs.filter((item) => item.isCompleted).length;

  return (
    <div style={{ padding: "20px" }}>
      <h1>学習記録アプリ(React学習用)</h1>
      <h2>学習リスト</h2>

      <Header
        appName="TypeScript"
        totalCount={logs.length}
        completedCount={completedCount}
      />

      <ul>
        {logs.map((item) => (
          <LearningLog
            key={item.id}
            id={item.id}
            chapter={item.chapter}
            title={item.title}
            isCompleted={item.isCompleted}
            onToggle={toggleComplete}
            onDelete={deleteLog}
          />
        ))}
      </ul>

      <AddLogForm onAddLog={addLog} />
    </div>
  );
}

export default App;