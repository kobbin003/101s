interface MyLayout {
	numberOfChildren: number;
	layoutType: "grid" | "flex";
}
const MyLayout = ({ numberOfChildren, layoutType }: MyLayout) => {
	const containerGrid = {
		width: "100%",
		backgroundColor: "#f0e68c",
		display: "grid",
		grid: `auto/repeat(auto-fill,minmax(200px,1fr))`,
		gap: "10px 10px",
	};
	const itemStyleGrid = {
		backgroundColor: "green",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};

	const containerFlex = {
		width: "100%",
		backgroundColor: "#f0e68c",
		display: "flex",
		gap: "0 10px",
	};
	const itemStyleFlex = {
		backgroundColor: "green",
		minWidth: "200px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	};
	return (
		<div
			style={
				layoutType == "grid"
					? containerGrid
					: { ...containerFlex, flexWrap: "wrap" }
			}
		>
			{Array.from(Array(numberOfChildren).keys()).map((item) => (
				<p style={layoutType == "grid" ? itemStyleGrid : itemStyleFlex}>
					{item}
				</p>
			))}
		</div>
	);
};

export default MyLayout;
