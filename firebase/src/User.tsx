import React, { FC } from "react";
import { UserType } from "./App";

const User: FC<UserType> = ({ name, age }) => {
	return (
		<div id="user">
			<p>{name}</p>
			<p>{age}</p>
			<button>update</button>
			<button>remove</button>
		</div>
	);
};

export default User;
