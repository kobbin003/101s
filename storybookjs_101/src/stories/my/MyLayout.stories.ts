import type { Meta, StoryObj } from "@storybook/react";

import MyLayout from "./MyLayout";

const meta: Meta<typeof MyLayout> = {
	title: "MyComponents/MyLayout",
	component: MyLayout,
	tags: ["autodocs"],
	// argTypes: { handleClick: { action: "handleClicked" } },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const GridLayout: Story = {
	args: {
		layoutType: "grid",
		numberOfChildren: 4,
	},
};
export const FlexLayout: Story = {
	args: {
		layoutType: "flex",
		numberOfChildren: 4,
	},
};
