const colorMap = {
    red: 'bg-red-500 hover:bg-red-700',
    blue: 'bg-blue-500 hover:bg-blue-700',
    green: 'bg-green-500 hover:bg-green-700',
    gray: 'bg-gray-500 hover:bg-gray-700',
};


interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    color?: keyof typeof colorMap;
    centerText?: boolean;
}

const PrimaryButton = ({ color = 'blue', centerText = true, ...props }: PrimaryButtonProps) => {
    const base =
        'w-full text-white font-bold py-2 px-4 rounded-xl transition duration-300 mb-4';
    const alignment = centerText ? 'text-center' : '';
    const colorClasses = colorMap[color];

    return (
      <button
        className={`${base} ${colorClasses} ${alignment}`}
        type="button"
        {...{
          ...props,
        }}
      />
    );
}

export default PrimaryButton;