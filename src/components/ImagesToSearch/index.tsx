type Props = {
  imageUrls: string[];
  onRemoveImageURL: (index: number) => void;
};

const ImagesToSearch = ({ imageUrls, onRemoveImageURL }: Props) => {
  if (!imageUrls.length) return null;

  return (
    <div className="flex gap-2 h-fit mt-5 flex-wrap justify-center">
      {imageUrls.filter(Boolean).map((image, index) => (
        <button
          onClick={() => onRemoveImageURL(index)}
          className={`w-[200px] rounded-lg aspect-square overflow-hidden hover:cursor-trash`}
        >
          <img src={image} alt="image" key={index} className="object-cover" />
        </button>
      ))}
    </div>
  );
};

export default ImagesToSearch;
