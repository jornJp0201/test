 
 import {Header} from "./components/Header";
 import {LearningLog} from "./components/LearningLog";
 

function App() {

   type Learning= {
    id: number;
    chapter: number;
    title: string;
    isCompleted: boolean;
}; 
 
  const logs: Learning[] = [
    { id: 1, chapter: 0, title: "環境構築とTypeScriptの基本", isCompleted: true },
    { id: 2, chapter: 1, title: "コンポーネントとPropsの型", isCompleted: false },
  ];


 
  const getStatusMessage = (completed: boolean): string => {
    return completed ? "完了！" : "進行中";
  };

  return (
   <div style={{ padding: "20px" }}>
      <h1>学習記録アプリ(React学習用)      
      </h1>

      <h2>学習リスト</h2>

      <Header appName="TypeScript" totalCount={logs.length} />
      <ul>
        {logs.map((item) => (
          <LearningLog
            id={item.id}
            chapter={item.chapter}
            title={item.title}
            isCompleted={item.isCompleted}
          />
        ))}
      </ul>
      
    </div>
  );
}

export default App;