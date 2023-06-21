interface MyButton {
	label: string;
	backgroundColor: "blue" | "red";
	handleClick: () => void;
}
const MyButton = ({
	label,
	backgroundColor,
	handleClick,
	...props
}: MyButton) => {
	const style = {
		backgroundColor: `${backgroundColor}`,
		color: backgroundColor === "blue" ? "white" : "black",
		border: "none",
	};
	return (
		<button
			type="button"
			style={style}
			onClick={handleClick}
			// onDoubleClick={() => alert(`double-clicked ${label}`)}
			{...props}
		>
			{label}
		</button>
	);
};

export default MyButton;
