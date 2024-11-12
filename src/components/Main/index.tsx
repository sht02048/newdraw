import Paint from "../Paint";
import ToolBar from "../ToolBar";

export default function Main() {
  return (
    <main className="flex justify-between h-full px-32">
      <Paint />
      <ToolBar />
    </main>
  );
}
