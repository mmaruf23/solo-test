export default function Button({ children, className, onClick = () => { }, type = "button" }) {
  return (
    <button onClick={onClick} className={`${className} px-4 py-2 rounded-lg`} type={type}>
      {children}
    </button>
  );
};
