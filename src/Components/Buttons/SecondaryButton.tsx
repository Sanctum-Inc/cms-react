const SecondaryButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
      <button
        className="w-full font-bold py-2 px-4 rounded-xl transition duration-300 text-red-700 bg-white border hover:cursor-pointer hover:animate-ping"
        {...props}
      />
    );
}

export default SecondaryButton;