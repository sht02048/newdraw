import Title from "./Title";
import ToolBar from "./ToolBar";
import HistoryControl from "./HistoryControl";

export default function Header() {
  return (
    <div className="flex items-center h-16 px-6 bg-white shadow">
      <Title />
      <ToolBar />
      <HistoryControl />
    </div>
  );
}
