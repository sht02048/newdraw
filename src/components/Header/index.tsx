import Title from "../Title";
import ToolBar from "../ToolBar";

export default function Header() {
  return (
    <div className="flex items-center h-16 px-6 bg-white shadow">
      <Title />
      <ToolBar />
    </div>
  );
}
