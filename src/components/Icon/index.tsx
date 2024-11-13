type Props = {
  src: string;
};

export default function Icon({ src }: Props) {
  return (
    <button className="p-1 hover:bg-gray-100">
      <img src={src} className="cursor-pointer" />
    </button>
  );
}
