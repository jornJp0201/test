 type LearningLog = {
    id: number;
    chapter: number;
    title: string;
    isCompleted: boolean;
};

function App() {
 
  const logs: LearningLog[] = [
    { id: 1, chapter: 0, title: "環境構築とTypeScriptの基本", isCompleted: true },
    { id: 2, chapter: 1, title: "コンポーネントとPropsの型", isCompleted: false },
  ];

 
  const getStatusMessage = (completed: boolean): string => {
    return completed ? "完了！" : "進行中";
  };

  return (
   <div style={{ padding: "20px" }}>
      <h1>学習記録アプリ</h1>

      <h2>学習リスト</h2>
      <ul>
        {/* ⭕️ OKな書き方: .map() で1つずつ取り出してプロパティを指定する */}
        {logs.map((item) => (
          <li key={item.id}>
            Chapter {item.chapter}: {item.title} 
            【{item.isCompleted ? "完了" : "進行中"}】
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;