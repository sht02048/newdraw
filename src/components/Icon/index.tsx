type Props = {
  src: string;
  handleClick?: () => void;
};

export default function Icon({ src, handleClick }: Props) {
  return (
    <button className="p-1 hover:bg-gray-100" onClick={handleClick}>
      <img src={src} className="cursor-pointer" />
    </button>
  );
}
