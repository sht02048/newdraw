import Icon from "../Icon";

export default function ToolBar() {
  return (
    <div className="mx-auto">
      <div className="flex justify-center w-64">
        <Icon src="/src/assets/grab.svg" />
        <Icon src="/src/assets/linear.svg" />
        <Icon src="/src/assets/circle.svg" />
        <Icon src="/src/assets/square.svg" />
        <Icon src="/src/assets/triangle.svg" />
      </div>
    </div>
  );
}
