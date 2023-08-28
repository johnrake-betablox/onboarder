export default function Button({ children, onClick }) {
  return (
    <button type="button" className="button-primary" onClick={onClick}>
      {children}
    </button>
  );
}
