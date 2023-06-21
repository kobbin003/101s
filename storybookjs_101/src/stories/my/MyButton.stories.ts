import type { Meta, StoryObj } from "@storybook/react";

import MyButton from "./MyButton";

const meta: Meta<typeof MyButton> = {
	title: "MyComponents/MyButton",
	component: MyButton,
	tags: ["autodocs"],
	argTypes: { handleClick: { action: "handleClicked" } },
};
export default meta;
type Story = StoryObj<typeof meta>;
export const Red: Story = {
	args: {
		label: "red-button",
		backgroundColor: "red",
	},
};
export const Blue: Story = {
	args: {
		label: "blue-button",
		backgroundColor: "blue",
	},
};
